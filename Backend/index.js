require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());

const whiteListedOrigins = [
  "http://localhost:5173",
  "https://resumequalify.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / server to server calls
    if (whiteListedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you are sending cookies or auth headers
};

app.use(cors(corsOptions));

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});
const db = admin.firestore();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

/* -------------------- Helpers -------------------- */
// Verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
/*---------------------- home page -------------------- */
app.get("/", (req, res) => {
  res.send("Hello From ResumeQualify API"); //TESTING PURPOSE
});

/* -------------------- Signup -------------------- */
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username || undefined,
      emailVerified: false,
      disabled: false,
    });

    const userData = {
      uid: userRecord.uid,
      email,
      username: username,
      credit: 2,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("users").doc(userRecord.uid).set(userData);
    res.json({ message: "User created", profile: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* -------------------- Login -------------------- */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const API_KEY = process.env.FIREBASE_WEB_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    const uid = response.data.localId;
    const snap = await db.collection("users").doc(uid).get();
    const profileData = snap.exists ? snap.data() : null;

    res.json({
      uid,
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken,
      profile: profileData,
    });
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

/* -------------------- Refresh Token -------------------- */
app.post("/api/refreshToken", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const API_KEY = process.env.FIREBASE_WEB_API_KEY;

    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
    const response = await axios.post(url, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    res.json({
      idToken: response.data.id_token,
      refreshToken: response.data.refresh_token,
      uid: response.data.user_id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------- Profile APIs -------------------- */
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const snap = await db.collection("users").doc(uid).get();
    if (!snap.exists)
      return res.status(404).json({ error: "Profile not found" });
    res.json(snap.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch("/api/profile", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { uid: _ignoreUid, email: _ignoreEmail, ...data } = req.body;

    await db
      .collection("users")
      .doc(uid)
      .set(
        {
          ...data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    const updatedSnap = await db.collection("users").doc(uid).get();
    res.json({ message: "Profile updated", profile: updatedSnap.data() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* -------------------- ATS Scoring Helpers -------------------- */
const natural = require("natural");
const nlp = require("compromise");

const WEIGHTS = {
  skillsMatch: 0.7,
  experience: 0.15,
  actionVerbs: 0.1,
  buzzwords: 0.05,
};
const ACTION_VERBS = [
  "achiev",
  "adapt",
  "administ",
  "advis",
  "allocat",
  "analyz",
  "apply",
  "architect",
  "arrang",
  "assist",
  "automate",
  "benchmark",
  "brainstorm",
  "build",
  "calculat",
  "certifi",
  "collaborat",
  "communicat",
  "complet",
  "configur",
  "construct",
  "consult",
  "contribut",
  "coordinat",
  "creat",
  "customiz",
  "debug",
  "deliver",
  "demonstrat",
  "design",
  "develop",
  "direct",
  "document",
  "edit",
  "educat",
  "eliminat",
  "empower",
  "enable",
  "encourag",
  "enhanc",
  "engineer",
  "establish",
  "evaluat",
  "execut",
  "facilitat",
  "forecast",
  "formulat",
  "generat",
  "guide",
  "improv",
  "implement",
  "increas",
  "influenc",
  "initi",
  "innov",
  "install",
  "integrat",
  "instruct",
  "launc",
  "lead",
  "leverage",
  "maintain",
  "manag",
  "mentor",
  "migrat",
  "moderniz",
  "monitor",
  "negotiat",
  "optimiz",
  "organize",
  "oversee",
  "plan",
  "present",
  "prioritiz",
  "problem-solv",
  "program",
  "promot",
  "propos",
  "provid",
  "quantifi",
  "reduc",
  "refactor",
  "releas",
  "remodel",
  "repair",
  "report",
  "resolv",
  "restructur",
  "review",
  "revitaliz",
  "safeguard",
  "sav",
  "scale",
  "simplif",
  "streamlin",
  "strengthen",
  "strategiz",
  "supervis",
  "support",
  "surpass",
  "sustain",
  "test",
  "train",
  "transform",
  "translat",
  "updat",
  "upgrad",
  "validate",
  "verify",
  "win",
  "work",
];

const BUZZWORDS = [
  "agile",
  "algorithm",
  "analytics",
  "api",
  "application",
  "architecture",
  "artificial intelligence",
  "automation",
  "aws",
  "azure",
  "backend",
  "benchmark",
  "big data",
  "blockchain",
  "brand",
  "budget",
  "business analysis",
  "business intelligence",
  "ci/cd",
  "cloud",
  "cms",
  "compliance",
  "container",
  "conversion",
  "cost",
  "crm",
  "customer success",
  "cybersecurity",
  "data",
  "data-driven",
  "database",
  "data mining",
  "debugging",
  "deep learning",
  "deployment",
  "design patterns",
  "devops",
  "digital",
  "distributed",
  "disruption",
  "docker",
  "ecosystem",
  "efficiency",
  "elastic",
  "embedded",
  "emerging technologies",
  "engagement",
  "enterprise",
  "etl",
  "feature engineering",
  "framework",
  "frontend",
  "full-stack",
  "functional testing",
  "git",
  "growth",
  "impact",
  "incident management",
  "innovation",
  "insights",
  "integration",
  "internet of things",
  "iot",
  "java",
  "javascript",
  "jenkins",
  "jira",
  "kpi",
  "kubernetes",
  "latency",
  "leadership",
  "linux",
  "load balancing",
  "machine learning",
  "microservices",
  "migration",
  "mobile-first",
  "modernization",
  "mongodb",
  "mysql",
  "networking",
  "nodejs",
  "nosql",
  "object-oriented",
  "on-premise",
  "open source",
  "optimization",
  "oracle",
  "pipeline",
  "predictive analytics",
  "problem-solving",
  "productivity",
  "profitability",
  "project management",
  "prototype",
  "python",
  "quality assurance",
  "react",
  "revenue",
  "risk management",
  "roi",
  "saas",
  "scalability",
  "scrum",
  "security",
  "serverless",
  "service-oriented",
  "software development",
  "spark",
  "sql",
  "stakeholder",
  "strategy",
  "supply chain",
  "synergy",
  "system architecture",
  "throughput",
  "ui",
  "ui/ux",
  "uptime",
  "usability",
  "virtualization",
  "vision",
  "vmware",
  "web services",
  "workflow",
];

function normalize(text = "") {
  return (text || "")
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
    .replace(/\t+/g, " ")
    .replace(/\r?\n|\r/g, " ")
    .replace(/ +/g, " ")
    .replace(/[^a-zA-Z0-9%\.\-\/\s]/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeKeyword(text = "") {
  return text
    .toLowerCase()
    .replace(/[\.\-\/]/g, "") // remove dots, hyphens, slashes
    .replace(/\s+/g, "") // remove spaces
    .trim();
}

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function extractKeywords(text) {
  const norm = normalize(text);
  const tokens = tokenizer.tokenize(norm);
  const stopwords = new Set([
    "and",
    "or",
    "the",
    "a",
    "an",
    "with",
    "to",
    "for",
    "of",
    "in",
    "on",
    "at",
    "is",
    "are",
    "be",
    "this",
    "that",
    "we",
    "must",
    "should",
    "will",
  ]);
  return Array.from(
    new Set(
      tokens
        .filter((t) => t.length > 1 && !stopwords.has(t))
        .map((t) => stemmer.stem(t))
    )
  );
}

function stemSet(arr) {
  const s = new Set();
  arr.forEach((x) => {
    tokenizer.tokenize(normalize(x)).forEach((tok) => {
      if (tok.length > 1) s.add(stemmer.stem(tok));
    });
  });
  return s;
}

function estimateExperience(text) {
  const years = [...text.matchAll(/(?:19|20)\d{2}/g)].map((m) =>
    parseInt(m[0], 10)
  );
  if (years.length === 0) return 0;
  return Math.max(...years) - Math.min(...years) + 1;
}

function extractSkills(text) {
  const found = new Set();
  try {
    const doc = nlp(text);
    doc
      .nouns()
      .out("array")
      .forEach((phrase) => {
        const p = normalize(phrase);
        if (
          p.length < 2 ||
          [
            "experience",
            "years",
            "company",
            "project",
            "responsible",
            "team",
          ].includes(p)
        )
          return;
        tokenizer.tokenize(p).forEach((tok) => {
          if (tok.length > 1 && !/^\d+$/.test(tok))
            found.add(normalizeKeyword(tok));
        });
      });
  } catch (e) {}
  return Array.from(found);
}

function countActionVerbs(text) {
  const norm = normalize(text);
  let count = 0;
  ACTION_VERBS.forEach((v) => {
    if (norm.includes(stemmer.stem(v))) count++;
  });
  return count;
}

function countBuzzwords(text) {
  const norm = normalize(text);
  let count = 0;
  BUZZWORDS.forEach((b) => {
    if (norm.includes(stemmer.stem(b))) count++;
  });
  return count;
}

function computeScore({ resumeText, jdText }) {
  // Normalized keywords from JD
  const jdKeywords = jdText
    .split(/\s|,|\n/)
    .map(normalizeKeyword)
    .filter(Boolean);

  if (jdKeywords.length === 0) {
    return {
      finalScore: 0,
      breakdown: {},
      details: { message: "JD parsing failed" },
    };
  }

  // Resume skill extraction
  const resumeSkills = extractSkills(resumeText).map(normalizeKeyword);

  // Matching
  const matchedSkills = jdKeywords.filter((k) => resumeSkills.includes(k));
  const skillsPercent = (matchedSkills.length / jdKeywords.length) * 100;
  const skillsWeighted = skillsPercent * WEIGHTS.skillsMatch;

  // Experience calculation with project/internship bonus
  const projectCount = (resumeText.match(/project|internship|intern/i) || [])
    .length;
  const yearsExp = estimateExperience(resumeText) + projectCount * 0.5;
  const expWeighted =
    ((Math.min(100, yearsExp * 12) * WEIGHTS.experience) / 100) * 100;

  const actionWeighted =
    (Math.min(10, countActionVerbs(resumeText)) / 10) *
    WEIGHTS.actionVerbs *
    100;
  const buzzWeighted =
    (Math.min(5, countBuzzwords(resumeText)) / 5) * WEIGHTS.buzzwords * 100;

  const finalScore = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        skillsWeighted + expWeighted + actionWeighted + buzzWeighted
      )
    )
  );

  return {
    finalScore,
    breakdown: {
      skillsWeighted: Number(skillsWeighted.toFixed(2)),
      expWeighted: Number(expWeighted.toFixed(2)),
      actionWeighted: Number(actionWeighted.toFixed(2)),
      buzzWeighted: Number(buzzWeighted.toFixed(2)),
    },
    details: {
      yearsExp,
      matchedSkills,
      jdKeywords,
      resumeSkills: resumeSkills.slice(0, 200),
    },
  };
}

/* -------------------- ATS Scoring Endpoint -------------------- */
app.post("/api/ats-score", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    // Fetch user profile
    const snap = await db.collection("users").doc(uid).get();
    if (!snap.exists)
      return res.status(404).json({ error: "Profile not found" });
    const profile = snap.data();

    const { resumeText, jobDesc } = req.body;
    if (!jobDesc || jobDesc.trim().length < 10)
      return res
        .status(400)
        .json({ error: "Job Description (JD) is mandatory." });
    if (!resumeText || resumeText.trim().length < 10)
      return res.status(400).json({ error: "Resume text is empty." });

    // Compute ATS score (FREE)
    const result = computeScore({ resumeText, jdText: jobDesc });

    let suggestions = [];

    // Gemini suggestions (CREDIT-BASED)
    if (profile.credit > 0) {
      try {
        const { GoogleGenAI } = require("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_KEY });
        const model = "gemini-2.5-flash-lite";

        const contents = [
          {
            role: "user",
            parts: [
              {
                text: `Analyze the following resume and job description. Provide a maximum of 10 short suggestions to improve the resume for a better ATS score. Give only the suggestions. do not start with Here are the 5 suggestions to improve ATS score give only the suggestions. If the job description is undefined or empty, explain what is missing. If the resume is undefined or empty, explain what is missing. Reply point-wise in simple English. Do not add stars, numbers, or any other symbols. Only give the suggestions or error messages as described.
Resume:
${resumeText}

Job Description:
${jobDesc}

`,
              },
            ],
          },
        ];

        const response = await ai.models.generateContent({ model, contents });

        let suggestionsText =
          response.outputText ||
          response.candidates?.[0]?.content?.parts?.[0]?.text ||
          "[]";

        suggestionsText = suggestionsText
          .replace(/```json/i, "")
          .replace(/```/g, "")
          .trim();

        try {
          suggestions = JSON.parse(suggestionsText);
          if (!Array.isArray(suggestions)) suggestions = [suggestions];
        } catch {
          // fallback: split by line and take max 5 suggestions
          suggestions = suggestionsText
            .split(/\r?\n/) // split only on newlines
            .map((s) => s.replace(/^[-•\s]+/, "").trim()) // remove leading bullets or dashes
            .filter(Boolean)
            .slice(0);
        }

        // Decrement credit
        await db
          .collection("users")
          .doc(uid)
          .update({
            credit: admin.firestore.FieldValue.increment(-1),
          });
      } catch (err) {
        console.error("Gemini suggestions failed:", err);
        suggestions = [];
      }
    }

    // Return ATS score + optional Gemini suggestions
    res.json({
      success: true,
      score: result.finalScore,
      breakdown: result.breakdown,
      details: result.details,
      suggestions, // empty if no credit or failed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/* -------------------- Start Server -------------------- */
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
