export interface Template {
  id: string;
  name: string;
  markdown: string;
  css: string;
}

export const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    markdown: `# John Doe
**Software Engineer** | john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

## Experience

### Senior Software Engineer
**Tech Company** | Jan 2020 - Present
- Led development of core platform features
- Mentored junior developers
- Improved system performance by 40%

### Software Engineer
**Startup Inc** | Jun 2017 - Dec 2019
- Built scalable web applications
- Collaborated with cross-functional teams

## Education

### Bachelor of Science in Computer Science
**University Name** | 2013 - 2017

## Skills
JavaScript, TypeScript, React, Node.js, Python, SQL`,
    css: `#resume-preview {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
}
#resume-preview h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #000;
}
#resume-preview h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 24px 0 10px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--theme-color);
  color: #000;
}
#resume-preview h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0 4px 0;
  color: #1a1a1a;
}
#resume-preview p {
  margin: 6px 0;
  font-size: 14px;
  color: #525252;
}
#resume-preview strong {
  font-weight: 600;
  color: #1a1a1a;
}
#resume-preview ul {
  margin: 8px 0;
  padding-left: 20px;
}
#resume-preview li {
  margin: 4px 0;
  font-size: 14px;
  color: #525252;
}
#resume-preview hr {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 16px 0;
}`,
  },
  {
    id: "professional",
    name: "Professional",
    markdown: `# Jane Smith
john.doe@email.com | (555) 987-6543 | New York, NY

## Professional Summary
Results-driven professional with 8+ years of experience in project management and team leadership.

## Work Experience

### Project Manager | ABC Corporation
*March 2019 - Present*

- Managed cross-functional teams of 10+ members
- Delivered projects 20% under budget
- Implemented agile methodologies

### Associate Project Manager | XYZ Inc
*June 2015 - February 2019*

- Coordinated project timelines and deliverables
- Facilitated stakeholder communications

## Education

**MBA, Business Administration**
Business School | 2015

**BS, Management**
State University | 2013

## Certifications
- PMP Certified
- Scrum Master Certified`,
    css: `#resume-preview {
  font-family: 'Inter', sans-serif;
  color: #262626;
  line-height: 1.7;
}
#resume-preview h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  color: #000;
}
#resume-preview h2 {
  font-size: 14px;
  font-weight: 700;
  margin: 28px 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  border-bottom: 2px solid var(--theme-color);
  padding-bottom: 6px;
}
#resume-preview h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 12px 0 2px 0;
  color: #1a1a1a;
}
#resume-preview p,
#resume-preview li {
  font-size: 14px;
  color: #525252;
  margin: 6px 0;
}
#resume-preview em {
  font-style: italic;
  color: #737373;
  font-size: 13px;
}
#resume-preview ul {
  margin: 8px 0 12px 0;
  padding-left: 20px;
}
#resume-preview strong {
  font-weight: 600;
  color: #1a1a1a;
}`,
  },
  {
    id: "modern",
    name: "Modern",
    markdown: `# Alex Johnson
**Product Designer**

contact@alexjohnson.com | Portfolio: alexjohnson.design

---

## About
Creative product designer with a passion for user-centered design and 5 years of experience crafting digital experiences.

## Experience

**Lead Product Designer** — Design Studio
2021 - Present

Designed end-to-end product experiences for B2B SaaS platforms. Led design system initiatives.

**Product Designer** — Tech Startup
2019 - 2021

Created user interfaces and conducted user research for mobile applications.

## Education

**BFA, Graphic Design** — Art Institute, 2019

## Skills

Design: Figma, Sketch, Adobe Creative Suite
Prototyping: Framer, Principle
Research: User interviews, A/B testing`,
    css: `#resume-preview {
  font-family: 'Inter', sans-serif;
  color: #171717;
  line-height: 1.65;
}
#resume-preview h1 {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #000;
}
#resume-preview h2 {
  font-size: 14px;
  font-weight: 600;
  margin: 32px 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  border-bottom: 2px solid var(--theme-color);
  padding-bottom: 6px;
}
#resume-preview p {
  margin: 8px 0;
  font-size: 14px;
  color: #404040;
}
#resume-preview strong {
  font-weight: 600;
  color: #000;
}
#resume-preview hr {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 20px 0;
}
#resume-preview em {
  font-style: normal;
  color: #737373;
  font-size: 13px;
}`,
  },
];