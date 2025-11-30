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

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

/* -------------------- Helpers -------------------- */
// Verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    const decoded = await admin.auth().verifyIdToken(token, false);

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

/* -------------------- Email -------------------- */
// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

function generateResumeHTML(data) {
  // Destructure skills with defaults
  const skills = data.skills || {};
  const languages = skills.languages || [];
  const frameworks = skills.frameworks || [];
  const tools = skills.tools || [];
  const databases = skills.databases || [];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${data.personal.name} – Resume</title>

<style>
  /* Base Styles */
  body {
    font-family: Cambria, Georgia, "Times New Roman", serif;
    margin: 40px 30px;
    color: #000;
    line-height: 1.4; 
    font-size: 11pt;
  }

  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  h1 {
    text-align: center;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: bold;
    color: #000;
  }

  .header-info {
    text-align: center;
    font-size: 10pt;
    margin-bottom: 15px;
    color: #000;
  }
  
  h2 {
    font-size: 14pt;
    margin-top: 12px;
    margin-bottom: 6px;
    font-weight: bold;
    border-bottom: 1px solid #000; 
    padding-bottom: 2px;
    text-align: left;
    color: #000;
  }

  /* Flex Layout for Headers */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
    font-size: 11pt;
  }

  /* List Styling - Indentation Badhaya Hai (Tab Space) */
  ul {
    margin: 2px 0 8px 0; 
    padding-left: 35px; /* Increased to approx 1 Tab space */
  }
  
  li {
    margin-bottom: 2px;
  }

  .bold { font-weight: bold; }
</style>

</head>
<body>

<h1>${data.personal.name}</h1>

<div class="header-info">
  ${[
    data.personal.address,
    data.personal.email
      ? `<a href="mailto:${data.personal.email}">${data.personal.email}</a>`
      : null,
    data.personal.phone,
    data.personal.website
      ? `<a href="${
          data.personal.website
        }" target="_blank">${data.personal.website.replace(
          /^https?:\/\//,
          ""
        )}</a>`
      : null,
  ]
    .filter(Boolean)
    .join(" | ")}
  <br/>
  ${[
    data.personal.linkedin
      ? `<a href="${
          data.personal.linkedin
        }" target="_blank">linkedin.com/in/${data.personal.linkedin
          .split("/")
          .pop()}</a>`
      : null,
    data.personal.github
      ? `<a href="${
          data.personal.github
        }" target="_blank">github.com/${data.personal.github
          .split("/")
          .pop()}</a>`
      : null,
  ]
    .filter(Boolean)
    .join(" | ")}
</div>

${
  data.summary
    ? `
<h2>Professional Summary</h2>
<div style="text-align: justify;">${data.summary}</div>
`
    : ""
}

${
  data.education && data.education.length > 0
    ? `
<h2>Education</h2>
${data.education
  .map(
    (edu) => `
  <div style="margin-bottom: 6px;">
    <div class="section-header">
      <span><span class="bold">${edu.school}</span>, ${edu.degree}</span>
      <span>${edu.start} – ${edu.end}</span>
    </div>
    ${edu.grade ? `<ul><li>${edu.grade}</li></ul>` : ""}
  </div>
`
  )
  .join("")}
`
    : ""
}

${
  data.projects && data.projects.length > 0
    ? `
<h2>Projects</h2>
${data.projects
  .map(
    (proj) => `
  <div style="margin-bottom: 10px;">
    <div class="section-header">
      <span class="bold">${proj.title}${
      proj.description ? ` - ${proj.description}` : ""
    }</span>
      <span>
        ${proj.live ? `<a href="${proj.live}" target="_blank">Live</a>` : ""}
        ${proj.live && proj.github ? " | " : ""}
        ${
          proj.github
            ? `<a href="${proj.github}" target="_blank">GitHub</a>`
            : ""
        }
      </span>
    </div>
    
    <ul>
      ${
        proj.tools
          ? `
      <li>
        <span class="bold">Tools Used:</span> ${proj.tools}
      </li>
      `
          : ""
      }
      
      ${
        proj.points && proj.points.length > 0
          ? proj.points.map((pt) => `<li>${pt}</li>`).join("")
          : ""
      }
    </ul>
  </div>
`
  )
  .join("")}
`
    : ""
}

${
  data.experience && data.experience.length > 0
    ? `
<h2>Experience</h2>
${data.experience
  .map(
    (exp) => `
  <div style="margin-bottom: 10px;">
    <div class="section-header">
      <span><span class="bold">${exp.company}</span>, ${exp.role}</span>
      <span>${exp.start} – ${exp.end}</span>
    </div>
    ${
      exp.points && exp.points.length > 0
        ? `
    <ul>
      ${exp.points.map((pt) => `<li>${pt}</li>`).join("")}
    </ul>
    `
        : ""
    }
  </div>
`
  )
  .join("")}
`
    : ""
}

${
  skills &&
  (Array.isArray(skills) ? skills.length > 0 : Object.keys(skills).length > 0)
    ? `
<h2>Skills</h2>
<ul>
  ${
    !Array.isArray(skills)
      ? Object.keys(skills)
          .filter((key) => Array.isArray(skills[key]) && skills[key].length > 0)
          .map((key) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            return `
              <li>
                <span class="bold">${title}:</span> ${skills[key].join(", ")}.
              </li>
            `;
          })
          .join("")
      : `<li><span class="bold">Technical Skills:</span> ${skills.join(
          ", "
        )}.</li>`
  }
</ul>
`
    : ""
}

${
  data.achievements && data.achievements.length > 0
    ? `
<h2>Achievements & Certifications</h2>
<ul>
  ${data.achievements
    .map(
      (ach) => `
    <li>
      <div style="display: flex; justify-content: space-between;">
        <span><span class="bold">${ach.title}</span> – ${ach.issuer}</span>
        ${ach.link ? `<a href="${ach.link}" target="_blank">Link</a>` : ""}
      </div>
    </li>
  `
    )
    .join("")}
</ul>
`
    : ""
}

</body>
</html>
`;
}

module.exports = generateResumeHTML;

const html_to_pdf = require("html-pdf-node");

async function generatePDFfromHTML(html) {
  const file = { content: html };

  const options = {
    format: "A4",
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm",
    },
  };

  const pdfBuffer = await html_to_pdf.generatePdf(file, options);
  return pdfBuffer;
}

app.post("/api/send-resume", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: "Resume data required" });
    }

    // Get user profile
    const snap = await db.collection("users").doc(uid).get();
    if (!snap.exists)
      return res.status(404).json({ error: "Profile not found" });

    const profile = snap.data();
    const userEmail = profile.email;

    /* ------------------------ 1. HTML → PDF ------------------------ */
    const html = generateResumeHTML(resumeData);
    const pdfBytes = await generatePDFfromHTML(html); // returns Buffer

    /* ------------------------ 2. Email Send ------------------------ */
    /* ------------------------ 2. Email Send (SENDGRID) ------------------------ */
await sgMail.send({
  to: userEmail,
  from: {
    name: "ResumeQualify",
    email: process.env.EMAIL_FROM, // resumequalify.ats@gmail.com
  },
  replyTo: "support@resumequalify.ats.gmail.com", // ya wahi from
  subject: "Your ATS-Optimized Resume is Ready ✅",
  text: `Hi ${profile.username || ""},

Your resume has been generated successfully.

You can find it attached with this email.

Thanks for using ResumeQualify!`,
  html: `
    <p>Hi ${profile.username || ""},</p>
    <p>Your resume has been generated successfully. You can find it attached with this email.</p>
    <p>Thanks for using <b>ResumeQualify</b>!</p>
    <hr />
    <p style="font-size:12px;color:#555;">
      You are receiving this email because you used ResumeQualify to generate a resume.
    </p>
  `,
  attachments: [
    {
      content: Buffer.from(pdfBytes).toString("base64"),
      filename: `${profile.username}_Resume.pdf`,
      type: "application/pdf",
      disposition: "attachment",
      encoding: "base64",
    },
  ],
});


 
    /* ------------------------ 3. Cloudinary Upload (FIXED) ------------------------ */

    // Convert buffer to base64
    const base64PDF = `data:application/pdf;base64,${pdfBytes.toString(
      "base64"
    )}`;

    const uploadResult = await cloudinary.uploader.upload(base64PDF, {
      folder: "resumequalify_resumes",
      public_id: `resume_${uid}_${Date.now()}`,
      resource_type: "raw", // RAW for PDF
      access_mode: "public", // PUBLIC URL
      format: "pdf", // Ensure PDF format
    });

    // Save URL to Firestore
    await db.collection("users").doc(uid).set(
      {
        resumePdf: uploadResult.secure_url,
      },
      { merge: true }
    );

    /* ------------------------ 4. Response ------------------------ */
    res.json({
      success: true,
      cloudinaryUrl: uploadResult.secure_url,
      message: "Resume emailed & uploaded successfully!",
    });
  } catch (err) {
    console.error("PDF Generation Error:", err);
    res.status(500).json({
      error: "Failed to send resume",
      details: err.message,
    });
  }
});

// app.post("/api/send-resume", verifyToken, async (req, res) => {
//   try {
//     const uid = req.user.uid;
//     const { resumeData } = req.body;

//     if (!resumeData) {
//       return res.status(400).json({ error: "Resume data required" });
//     }

//     // Fetch profile (for email)
//     const snap = await db.collection("users").doc(uid).get();
//     if (!snap.exists) return res.status(404).json({ error: "Profile not found" });

//     const profile = snap.data();
//     const userEmail = profile.email;

//     // Create PDF
//     const pdfBytes = await createResumePDF(resumeData);

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: "Your Resume from ResumeQualify",
//       text: "Attached is your generated resume PDF.",
//       attachments: [
//         {
//           filename: `${profile.username}_Resume.pdf`,
//           content: Buffer.from(pdfBytes),
//         },
//       ],
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.json({
//       success: true,
//       message: "Resume sent successfully to your email",
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to send resume", details: err.message });
//   }
// });

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
      credit: 20,
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

    res.json({
      uid,
      ...snap.data(),
    });
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
