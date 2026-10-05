import type { Award, Certificate, Experience, Project } from "./types";
export const projects: Project[] = [
  { title: "PSRUGreenVibe", role: "QA & Penetration Tester", description: "Conducted Web & API penetration testing (OWASP Top 10) using Burp Suite, alongside functional QA and automated E2E regression testing with Playwright and Postman.", image: "/events/psru-greenvibe.png", href: "#", action: "VISIT SITE", technologies: ["Burp Suite", "OWASP", "Playwright", "Postman", "SonarQube", "Postgres", "Docker", "Git", "Next.js"] },
  { title: "Offensive Security Home Lab", role: "Security Researcher", description: "Designed and deployed a local lab featuring vulnerable Linux services and web applications. Conducted hands-on network scanning, exploitation, and log analysis safely.", image: "/events/security-training-lab.jpg", href: "#", action: "VISIT SITE", technologies: ["HTML", "CSS", "JavaScript", "Linux"], status: "IN PROGRESS" },
  { title: "OWASP Top 10 Vulnerability Assessment", role: "Penetration Tester", description: "Executed penetration tests on intentionally vulnerable web applications. Documented exploitation steps and provided actionable remediation strategies for developers.", image: "/events/static-code-analysis-lab.png", href: "#", action: "VISIT SITE", technologies: ["OWASP", "Burp Suite", "React"], status: "IN PROGRESS" },
  { title: "TCTT 2026 Write-ups", role: "Capture The Flag (CTF) Player", description: "Authored detailed write-ups for Thailand Cyber Top Talent 2026 challenges.", image: "/events/tctt-2026-writeup.jpg", href: "https://write-up-chi-ashy.vercel.app/posts/tctt2026/tctt2026-write-up/", action: "VISIT SITE", technologies: ["Astro", "Tailwind CSS", "Markdown", "Vercel"] }
];
export const experiences: Experience[] = [
  { date: "Dec 2025 – Present", title: "Activity Point & Carbon Platform", company: "Project Blockchain", location: "Pibulsongkram Rajabhat University", bullets: ["Managed dual roles in software and security testing within a single platform to ensure robust system performance and security.", "Planned and executed functional, API, and end-to-end testing alongside comprehensive positive, negative, and boundary test cases.", "Assessed web and API security using Burp Suite following OWASP guidelines.", "Identified critical vulnerabilities including authentication flaws, IDOR, XSS, SQL injection, CSRF, RBAC, JWT sessions, and rate limiting."] },
  { date: "Jun 2026 – Present", title: "Personal Cybersecurity Lab", company: "Home Lab", location: "Phitsanulok City, TH", bullets: ["Built and configured a personal lab with vulnerable web applications and Linux services to practice offensive and defensive security workflows.", "Used network scanning tools in a controlled setting for reconnaissance, vulnerability discovery, exploitation, log reviews, and remediation planning."] }
];
export const certificates: Certificate[] = [
  // 2026
  {
    date: "Sep 2026",
    title: "Student Innovation Awards 2026 — Honorable Mention",
    issuer: "Pibulsongkram Rajabhat University",
    image: "/certificates/student-innovation-awards-2026.jpg",
    description: "Won Honorable Mention in Science & Technology for 'Carbon Point recorded on Blockchain for traceability, security, integrity, transparency' at the 1st Undergraduate Student Innovation Awards, PSRU."
  },
  {
    date: "Aug 2026",
    title: "Thailand Cyber Top Talent 2026",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2026.png",
    description: "Competed in Thailand Cyber Top Talent 2026 as a member of Whereistheflag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Aug 2026",
    title: "AI Tech Startup — Honorable Mention",
    issuer: "Digital Innovation Hub & PSRU",
    image: "/certificates/ai-tech-startup.jpg",
    description: "Received an honorable mention in the AI Tech Startup competition with team BLOCKSPHERE under the Digital Innovation Hub initiative."
  },
  {
    date: "Jul 2026",
    title: "Course Introduction to the Threat Fortinet",
    issuer: "Fortinet Training Institute",
    image: "/certificates/course-introduction-to-the-threat-fortinet.png",
    description: "Successfully completed Fortinet Training Institute's Introduction to the Threat Landscape 3.0 course."
  },
  {
    date: "Jun 2026",
    title: "CTF Boot Camp 2026",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2026.jpg",
    description: "Completed the second NCSA CTF Boot Camp hands-on training on 6–7 June 2026 in Chiang Mai."
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

  // 2025
  {
    date: "Aug 2025",
    title: "Thailand Cyber Top Talent 2025",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2025.jpg",
    description: "Competed in Thailand Cyber Top Talent 2025 as a member of WhereIsTheFlag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Jun 2025",
    title: "CTF Boot Camp 2025",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2025.jpg",
    description: "Completed the first NCSA CTF Boot Camp hands-on training on 28–29 June 2025 in Phitsanulok."
  },

  // 2024
  {
    date: "Dec 2024",
    title: "PSRU Hackathon #2",
    issuer: "PSRU & NCSA",
    image: "/certificates/psru-hackathon-2.jpg",
    description: "Completed hands-on training and competed in the cybersecurity skills competition at PSRU Cyber Hackathon #2."
  },
  {
    date: "Oct 2024",
    title: "Thailand Cyber Top Talent 2024",
    issuer: "National Cyber Security Agency",
    image: "/certificates/thailand-cyber-top-talent-2024.jpg",
    description: "Competed in Thailand Cyber Top Talent 2024 as a member of Whereistheflag from Pibulsongkram Rajabhat University."
  },
  {
    date: "Sep 2024",
    title: "CTF Boot Camp 2024",
    issuer: "National Cyber Security Agency",
    image: "/certificates/ctf-bootcamp-2024.jpg",
    description: "Participated in the NCSA CTF Boot Camp 2024, organized by Thailand's National Cyber Security Agency."
  },
  {
    date: "Aug 2024",
    title: "Basic Cyber MOOC by NCSA",
    issuer: "National Cyber Security Agency",
    image: "/certificates/basic-cyber-mooc-ncsa.jpg",
    description: "Completed the Basic Cybersecurity course on the NCSA MOOC cybersecurity learning platform on 25 August 2024."
  },
  {
    date: "Jul 2024",
    title: "Business Brotherhood — 200,000 THB Grant",
    issuer: "MHESI & Northern Science Park",
    image: "/certificates/business-brotherhood.jpg",
    description: "Robo Tech received 200,000 THB in funding for Biosite, a sitting-posture detection camera, in the 2024 Business Brotherhood program (Phase 1), Digital Technology category."
  },
  {
    date: "Feb 2024",
    title: "SOLIDWORKS 3D Design — Second Runner-up",
    issuer: "Rajabhat University Network",
    image: "/certificates/solidworks-award.jpg",
    description: "Won second runner-up in the SOLIDWORKS engineering 3D design competition at the 2024 nationwide Rajabhat student professional skills contest."
  },

  // 2023
  {
    date: "Nov 2023",
    title: "Research to Market (R2M) 2023",
    issuer: "PSRU Science Park",
    image: "/certificates/r2m-2023.jpg",
    description: "Team Robocom won first runner-up at university level in R2M 2023 and was selected to represent the university at the regional competition."
  }
];

export const awards: Award[] = [
  {
    title: "Student Innovation Awards 2026",
    category: "Honorable Mention — Science & Technology Category",
    description: "Won an honorable mention in the 1st Undergraduate Student Innovation Awards for the project 'Carbon Point recorded on Blockchain for traceability, security, integrity, and transparency', organized by the Division of Educational Services, Pibulsongkram Rajabhat University.",
    certificateUrl: "/certificates/student-innovation-awards-2026.jpg",
  },
  {
    title: "Business Brotherhood 2024",
    category: "Selected for 200,000 THB Funding",
    description: "Robo Tech received Phase 1 funding in the Digital Technology category for Biosite, a sitting-posture detection camera, through the innovation entrepreneur development program supported by the Ministry of Higher Education, Science, Research and Innovation.",
    certificateUrl: "/certificates/business-brotherhood.jpg",
  },
  {
    title: "Research to Market (R2M) 2023",
    category: "First Runner-up — University Level",
    description: "Team Robocom won first runner-up at university level and was selected to represent Pibulsongkram Rajabhat University in the regional R2M competition.",
    certificateUrl: "/certificates/r2m-2023.jpg",
  },
  {
    title: "AI Tech Startup",
    category: "Honorable Mention — Team BLOCKSPHERE",
    description: "Received an honorable mention in the AI Tech Startup competition under the Digital Innovation Hub initiative, organized by the Digital Technology Institute and the Faculty of Engineering and Industrial Technology at Pibulsongkram Rajabhat University.",
    certificateUrl: "/certificates/ai-tech-startup.jpg",
  },
  {
    title: "SOLIDWORKS Engineering 3D Design",
    category: "Second Runner-up — National Rajabhat Network",
    description: "Won second runner-up in the engineering 3D design category using SOLIDWORKS at the 2024 Student Professional Skills Competition for the nationwide Rajabhat industrial technology network.",
    certificateUrl: "/certificates/solidworks-award.jpg",
  },
  {
    title: "Thailand Cyber Top Talent",
    category: "Participant",
    description: "Applied cybersecurity fundamentals in national-level CTF-style security challenges.",
    writeupLabel: "Read TCTT 2026 Write-up",
    writeupUrl: "https://write-up-chi-ashy.vercel.app/posts/tctt2026/tctt2026-write-up/",
    certificateUrl: "/certificates/thailand-cyber-top-talent-2026.png",
  },
  {
    title: "PSRU Hackathon",
    category: "Participant",
    description: "Participated in cybersecurity challenges involving practical problem solving and teamwork in a fast-paced competition.",
    certificateUrl: "/certificates/psru-hackathon-3.jpg",
  },
];

export const eventImages = ["static-code-analysis-lab.png", "security-training-lab.jpg", "r2m-regional-stage.jpg", "r2m-pitching.jpg", "r2m-award-team.jpg", "psru-cyber-hackathon-score.png", "new-regional-startups.jpg", "ctf-teamwork.jpg", "ctf-bootcamp-team.jpg"];
