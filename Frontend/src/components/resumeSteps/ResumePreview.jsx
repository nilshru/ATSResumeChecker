import React from "react";

function ResumePreview({ data = {} }) {
  // Styles based on the HTML/CSS template provided
  const styles = {
    page: {
      fontFamily: 'Cambria, Georgia, "Times New Roman", serif',
      color: "#000",
      lineHeight: "1.4",
      fontSize: "14.6px", // Approx 11pt
      padding: "40px 50px",
      backgroundColor: "#fff",
      maxWidth: "850px", 
      margin: "0 auto",
    },
    h1: {
      textAlign: "center",
      fontSize: "28px",
      marginTop: "0",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#000",
    },
    headerInfo: {
      textAlign: "center",
      fontSize: "13.3px", // Approx 10pt
      marginBottom: "15px",
      color: "#000",
    },
    h2: {
      fontSize: "18.6px", // Approx 14pt
      marginTop: "12px",
      marginBottom: "6px",
      fontWeight: "bold",
      borderBottom: "1px solid #000",
      paddingBottom: "2px",
      textAlign: "left",
      color: "#000",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      fontSize: "14.6px", // 11pt
      marginBottom: "2px",
    },
    // Updated List Style: Added 'listStyleType' to show bullets
    ul: {
      margin: "2px 0 8px 0",
      paddingLeft: "25px", // Indentation for bullets
      listStyleType: "disc", // <--- YEH ZARURI HAI BULLETS DIKHANE KE LIYE
    },
    li: {
      marginBottom: "2px",
    },
    link: {
      color: "#000",
      textDecoration: "none",
    },
    bold: {
      fontWeight: "bold",
    },
  };

  // Helper to format links
  const formatLink = (url) => url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Helper to Render Contact Info
  const contactInfo = [
    data.personal?.address,
    data.personal?.email ? (
      <a href={`mailto:${data.personal.email}`} style={styles.link}>
        {data.personal.email}
      </a>
    ) : null,
    data.personal?.phone,
    data.personal?.website ? (
      <a href={data.personal.website} target="_blank" rel="noreferrer" style={styles.link}>
        {formatLink(data.personal.website)}
      </a>
    ) : null,
  ].filter(Boolean);

  const socialInfo = [
    data.personal?.linkedin ? (
      <a href={data.personal.linkedin} target="_blank" rel="noreferrer" style={styles.link}>
        linkedin.com/in/{data.personal.linkedin.split("/").pop()}
      </a>
    ) : null,
    data.personal?.github ? (
      <a href={data.personal.github} target="_blank" rel="noreferrer" style={styles.link}>
        github.com/{data.personal.github.split("/").pop()}
      </a>
    ) : null,
  ].filter(Boolean);

  return (
    <div style={styles.page}>
      {/* NAME */}
      <h1 style={styles.h1}>{data.personal?.name || "Your Name"}</h1>

      {/* CONTACT INFO */}
      <div style={styles.headerInfo}>
        <div>
          {contactInfo.map((item, index) => (
            <span key={index}>
              {item}
              {index < contactInfo.length - 1 && " | "}
            </span>
          ))}
        </div>
        <div>
          {socialInfo.map((item, index) => (
            <span key={index}>
              {item}
              {index < socialInfo.length - 1 && " | "}
            </span>
          ))}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {data.summary && (
        <div className="mb-2">
          <h2 style={styles.h2}>Professional Summary</h2>
          <div style={{ textAlign: "justify" }}>{data.summary}</div>
        </div>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <div className="mb-2">
          <h2 style={styles.h2}>Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: "6px" }}>
              <div style={styles.sectionHeader}>
                <span>
                  <span style={styles.bold}>{edu.school}</span>, {edu.degree}
                </span>
                <span>
                  {edu.start} – {edu.end}
                </span>
              </div>
              {edu.grade && (
                <ul style={styles.ul}>
                  <li style={styles.li}>{edu.grade}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <div className="mb-2">
          <h2 style={styles.h2}>Projects</h2>
          {data.projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <div style={styles.sectionHeader}>
                <span style={styles.bold}>
                  {proj.title}
                  {proj.description ? ` - ${proj.description}` : ""}
                </span>
                <span>
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noreferrer" style={styles.link}>
                      Live
                    </a>
                  )}
                  {proj.live && proj.github && " | "}
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" style={styles.link}>
                      GitHub
                    </a>
                  )}
                </span>
              </div>

              <ul style={styles.ul}>
                {proj.tools && (
                  <li style={styles.li}>
                    <span style={styles.bold}>Tools Used:</span> {proj.tools}
                  </li>
                )}
                
                {proj.points?.length > 0 &&
                  proj.points.map((pt, pIdx) => (
                    <li key={pIdx} style={styles.li}>
                      {pt}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <div className="mb-2">
          <h2 style={styles.h2}>Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <div style={styles.sectionHeader}>
                <span>
                  <span style={styles.bold}>{exp.company}</span>, {exp.role}
                </span>
                <span>
                  {exp.start} – {exp.end}
                </span>
              </div>
              {exp.points?.length > 0 && (
                <ul style={styles.ul}>
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} style={styles.li}>
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
        <div className="mb-2">
          <h2 style={styles.h2}>Skills</h2>
          <ul style={styles.ul}>
            {!Array.isArray(data.skills) ? (
              Object.keys(data.skills)
                .filter((key) => Array.isArray(data.skills[key]) && data.skills[key].length > 0)
                .map((key, idx) => {
                  const title = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <li key={idx} style={styles.li}>
                      <span style={styles.bold}>{title}:</span> {data.skills[key].join(", ")}.
                    </li>
                  );
                })
            ) : (
              <li style={styles.li}>
                <span style={styles.bold}>Technical Skills:</span> {data.skills.join(", ")}.
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <div className="mb-2">
          <h2 style={styles.h2}>Achievements & Certifications</h2>
          <ul style={styles.ul}>
            {data.achievements.map((ach, idx) => (
              <li key={idx} style={styles.li}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    <span style={styles.bold}>{ach.title}</span> – {ach.issuer}
                  </span>
                  {ach.link && (
                    <a href={ach.link} target="_blank" rel="noreferrer" style={styles.link}>
                      Link
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;