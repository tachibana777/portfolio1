export type Project = {
  title: string;
  role: string;
  description: string;
  image: string;
  href: string;
  action: "VISIT SITE" | "READ REPORT";
  technologies: string[];
  status?: string;
};

export type Experience = {
  date: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
};

export type Certificate = {
  date: string;
  title: string;
  issuer: string;
  image: string;
};
