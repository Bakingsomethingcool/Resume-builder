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
    css: `body {
  font-family: 'Inter', -apple-system, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 32px;
  line-height: 1.6;
  color: #1a1a1a;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #000;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
  color: #000;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 4px 0;
  color: #1a1a1a;
}

p {
  margin: 4px 0;
  font-size: 14px;
  color: #525252;
}

strong {
  font-weight: 500;
  color: #1a1a1a;
}

ul {
  margin: 8px 0;
  padding-left: 20px;
}

li {
  margin: 4px 0;
  font-size: 14px;
  color: #525252;
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
    css: `body {
  font-family: 'Inter', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 32px;
  line-height: 1.7;
  color: #262626;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  color: #000;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 32px 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
}

h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 16px 0 2px 0;
  color: #1a1a1a;
}

p, li {
  font-size: 14px;
  color: #525252;
  margin: 6px 0;
}

em {
  font-style: italic;
  color: #737373;
  font-size: 13px;
}

ul {
  margin: 8px 0 16px 0;
  padding-left: 20px;
}

strong {
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
    css: `body {
  font-family: 'Inter', sans-serif;
  max-width: 750px;
  margin: 0 auto;
  padding: 56px 40px;
  line-height: 1.65;
  color: #171717;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #000;
}

h2 {
  font-size: 14px;
  font-weight: 600;
  margin: 40px 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
}

p {
  margin: 8px 0;
  font-size: 14px;
  color: #404040;
}

strong {
  font-weight: 600;
  color: #000;
}

hr {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 24px 0;
}

em {
  font-style: normal;
  color: #737373;
  font-size: 13px;
}`,
  },
];
