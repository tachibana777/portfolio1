import type { Certificate, Experience, Project } from "./types";
export const projects: Project[] = [
  { title: "PSRU Blockchain Security Testing", role: "QA & Penetration Tester", description: "Performed comprehensive functional and security testing for the Activity Point & Carbon Platform. Assessed API endpoints using Burp Suite to mitigate OWASP vulnerabilities and ensure robust performance.", image: "/events/psru-cyber-hackathon-score.png", href: "#", action: "READ REPORT", technologies: ["Next.js", "CSS", "React", "Node"], status: "IN PROGRESS" },
  { title: "Offensive Security Home Lab", role: "Security Researcher", description: "Designed and deployed a local lab featuring vulnerable Linux services and web applications. Conducted hands-on network scanning, exploitation, and log analysis safely.", image: "/events/security-training-lab.jpg", href: "#", action: "READ REPORT", technologies: ["HTML", "CSS", "JavaScript", "Linux"], status: "IN PROGRESS" },
  { title: "OWASP Top 10 Vulnerability Assessment", role: "Penetration Tester", description: "Executed penetration tests on intentionally vulnerable web applications. Documented exploitation steps and provided actionable remediation strategies for developers.", image: "/events/static-code-analysis-lab.png", href: "#", action: "READ REPORT", technologies: ["OWASP", "Burp Suite", "React"], status: "IN PROGRESS" },
  { title: "TCTT 2026 Write-ups", role: "Capture The Flag (CTF) Player", description: "Authored detailed write-ups for Thailand Cyber Top Talent challenges, covering web exploitation, reverse engineering, and network forensics.", image: "/events/new-regional-startups.jpg", href: "#", action: "READ REPORT", technologies: ["React", "Python", "Postgres"], status: "IN PROGRESS" }
];
export const experiences: Experience[] = [
  { date: "Dec 2025 – Present", title: "Activity Point & Carbon Platform", company: "Project Blockchain", location: "Pibulsongkram Rajabhat University", bullets: ["Managed dual roles in software and security testing within a single platform to ensure robust system performance and security.", "Planned and executed functional, API, and end-to-end testing alongside comprehensive positive, negative, and boundary test cases.", "Assessed web and API security using Burp Suite following OWASP guidelines.", "Identified critical vulnerabilities including authentication flaws, IDOR, XSS, SQL injection, CSRF, RBAC, JWT sessions, and rate limiting."] },
  { date: "Jun 2026 – Present", title: "Personal Cybersecurity Lab", company: "Home Lab", location: "Phitsanulok City, TH", bullets: ["Built and configured a personal lab with vulnerable web applications and Linux services to practice offensive and defensive security workflows.", "Used network scanning tools in a controlled setting for reconnaissance, vulnerability discovery, exploitation, log reviews, and remediation planning."] }
];
export const certificates: Certificate[] = [
  {
    date: "Jun 2026",
    title: "CTF Boot Camp 2026",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2026.jpg",
    description: "Completed the second NCSA CTF Boot Camp hands-on training on 6–7 June 2026 in Chiang Mai."
  },
  {
    date: "Jun 2025",
    title: "CTF Boot Camp 2025",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2025.jpg",
    description: "Completed the first NCSA CTF Boot Camp hands-on training on 28–29 June 2025 in Phitsanulok."
  },
  {
    date: "Sep 2024",
    title: "CTF Boot Camp 2024",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2024.jpg",
    description: "Participated in the NCSA CTF Boot Camp 2024, organized by Thailand's National Cyber Security Agency."
  },
  {
    date: "Aug 2026",
    title: "Thailand Cyber Top Talent 2026",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2026.png",
    description: "Competed in Thailand Cyber Top Talent 2026 as a member of Whereistheflag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Aug 2025",
    title: "Thailand Cyber Top Talent 2025",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2025.jpg",
    description: "Competed in Thailand Cyber Top Talent 2025 as a member of WhereIsTheFlag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Oct 2024",
    title: "Thailand Cyber Top Talent 2024",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2024.jpg",
    description: "Competed in Thailand Cyber Top Talent 2024 as a member of Whereistheflag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Apr 2026",
    title: "DropCTF: Wanlai CTF",
    issuer: "DropCTF",
    image: "/certificates/wanlai-ctf.png",
    description: "Successfully participated in the online Wan Lai CTF Challenge by DropCTF, presented on 30 April 2026."
  },
  {
    date: "Mar 2026",
    title: "PSRU Hackathon #3",
    issuer: "PSRU & NCSA",
    image: "/certificates/psru-hackathon-3.jpg",
    description: "Completed hands-on training and competed in the cybersecurity skills competition at PSRU Cyber Hackathon #3."
  },
  {
    date: "Dec 2024",
    title: "PSRU Hackathon #2",
    issuer: "PSRU & NCSA",
    image: "/certificates/psru-hackathon-2.jpg",
    description: "Completed hands-on training and competed in the cybersecurity skills competition at PSRU Cyber Hackathon #2."
  },
  {
    date: "Aug 2024",
    title: "Basic Cyber MOOC by NCSA",
    issuer: "National Cyber Security Agency",
    image: "/certificates/basic-cyber-mooc-ncsa.jpg",
    description: "Completed the Basic Cybersecurity course on the NCSA MOOC cybersecurity learning platform on 25 August 2024."
  },
  {
    date: "Jun 2026",
    title: "Secure Software Development & Application Security",
    issuer: "Pibulsongkram Rajabhat University",
    image: "/certificates/softwareappsecurity.jpg",
    description: "Completed the Secure Software Development & Application Security hands-on training course held on 27–28 June 2026."
  },
  {
    date: "Jun 2026",
    title: "Course Getting Started in Cybersecurity Fortinet",
    issuer: "Fortinet Training Institute",
    image: "/certificates/course-getting-started-in-cybersecurity-fortinet.png",
    description: "Successfully completed Fortinet Training Institute's Getting Started in Cybersecurity 3.0 course."
  },
  {
    date: "Jul 2026",
    title: "Course Introduction to the Threat Fortinet",
    issuer: "Fortinet Training Institute",
    image: "/certificates/course-introduction-to-the-threat-fortinet.png",
    description: "Successfully completed Fortinet Training Institute's Introduction to the Threat Landscape 3.0 course."
  },
  {
    date: "Feb 2026",
    title: "Student Innovation Awards 2026 — Honorable Mention",
    issuer: "Pibulsongkram Rajabhat University",
    image: "/certificates/student-innovation-awards-2026.jpg",
    description: "Won Honorable Mention in Science & Technology for 'Carbon Point recorded on Blockchain for traceability, security, integrity, transparency' at the 1st Undergraduate Student Innovation Awards, PSRU."
  },
  {
    date: "Jan 2025",
    title: "AI Tech Startup — Honorable Mention",
    issuer: "Digital Innovation Hub & PSRU",
    image: "/certificates/ai-tech-startup.jpg",
    description: "Received an honorable mention in the AI Tech Startup competition with team BLOCKSPHERE under the Digital Innovation Hub initiative."
  },
  {
    date: "Jul 2024",
    title: "Business Brotherhood — 200,000 THB Grant",
    issuer: "MHESI & Northern Science Park",
    image: "/certificates/business-brotherhood.jpg",
    description: "Robo Tech received 200,000 THB in funding for Biosite, a sitting-posture detection camera, in the 2024 Business Brotherhood program (Phase 1), Digital Technology category."
  },
  {
    date: "Nov 2023",
    title: "Research to Market (R2M) 2023",
    issuer: "PSRU Science Park",
    image: "/certificates/r2m-2023.jpg",
    description: "Team Robocom won first runner-up at university level in R2M 2023 and was selected to represent the university at the regional competition."
  },
  {
    date: "Feb 2024",
    title: "SOLIDWORKS 3D Design — Second Runner-up",
    issuer: "Rajabhat University Network",
    image: "/certificates/solidworks-award.jpg",
    description: "Won second runner-up in the SOLIDWORKS engineering 3D design competition at the 2024 nationwide Rajabhat student professional skills contest."
  }
];
export const eventImages = ["static-code-analysis-lab.png", "security-training-lab.jpg", "r2m-regional-stage.jpg", "r2m-pitching.jpg", "r2m-award-team.jpg", "psru-cyber-hackathon-score.png", "new-regional-startups.jpg", "ctf-teamwork.jpg", "ctf-bootcamp-team.jpg"];
