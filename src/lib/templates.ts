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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

#resume-preview h1 {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  line-height: 1.2;
}

#resume-preview h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid var(--theme-color);
}

#resume-preview h3 {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.3em;
}

#resume-preview p {
  margin: 0.5em 0;
}

#resume-preview strong {
  font-weight: 600;
}

#resume-preview ul {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

#resume-preview li {
  margin: 0.3em 0;
}

@media print {
  #resume-preview {
    background-color: white !important;
    color: black !important;
  }
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
  font-family: Georgia, 'Times New Roman', serif;
  line-height: 1.7;
}

#resume-preview h1 {
  font-size: 2.8em;
  font-weight: bold;
  margin-bottom: 0.3em;
  text-align: center;
}

#resume-preview h2 {
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  padding-bottom: 0.2em;
  border-bottom: 2px solid var(--theme-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

#resume-preview h3 {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.2em;
}

#resume-preview p {
  margin: 0.5em 0;
  text-align: justify;
}

#resume-preview em {
  color: #666;
  font-style: italic;
}

.dark #resume-preview em {
  color: #aaa;
}

#resume-preview ul {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

#resume-preview li {
  margin: 0.3em 0;
}

@media print {
  #resume-preview {
    background-color: white !important;
    color: black !important;
  }
  #resume-preview em {
    color: #666 !important;
  }
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

#resume-preview h1 {
  font-size: 3em;
  font-weight: 800;
  margin-bottom: 0.2em;
  letter-spacing: -0.02em;
}

#resume-preview h2 {
  font-size: 1.3em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.8em;
  color: var(--theme-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

#resume-preview h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.3em;
}

#resume-preview p {
  margin: 0.8em 0;
}

#resume-preview strong {
  font-weight: 600;
}

#resume-preview hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 1.5em 0;
}

.dark #resume-preview hr {
  border-top-color: #444;
}

#resume-preview ul {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

#resume-preview li {
  margin: 0.3em 0;
}

@media print {
  #resume-preview {
    background-color: white !important;
    color: black !important;
  }
  #resume-preview h2 {
    color: #377BB5 !important;
  }
  #resume-preview hr {
    border-top-color: #ddd !important;
  }
}`,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    markdown: `# RICHARD SANCHEZ
**MARKETING MANAGER**

---

## CONTACT
📞 +123-456-7890
✉️ hello@reallygreatsite.com
📍 123 Anywhere St., Any City
🌐 www.reallygreatsite.com

## EDUCATION

### 2029 - 2030
**WARDIERE UNIVERSITY**
- Master of Business Management

### 2025 - 2029
**WARDIERE UNIVERSITY**
- Bachelor of Business
- GPA: 3.8 / 4.0

## SKILLS
- Project Management
- Public Relations
- Teamwork
- Time Management
- Leadership
- Effective Communication
- Critical Thinking

## LANGUAGES
- English (Fluent)
- French (Fluent)
- German (Basics)
- Spanish (Intermediate)

---

## PROFILE
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Ut enim ad minim veniam quis nostrud exercitation.

## WORK EXPERIENCE

### Borcelle Studio
**Marketing Manager & Specialist** | 2030 - PRESENT

- Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives.
- Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.
- Monitor brand consistency across marketing channels and materials.

### Fauget Studio
**Marketing Manager & Specialist** | 2025 - 2029

- Create and manage the marketing budget, ensuring efficient allocation of resources and maximizing ROI.
- Oversee market research to identify emerging trends, customer needs, and competitive strategies.
- Monitor brand consistency across marketing channels and materials.

### Studio Shodwe
**Marketing Manager & Specialist** | 2024 - 2025

- Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.
- Monitor and maintain brand consistency across all marketing channels and materials.

## REFERENCE

**Estelle Darcy**
Wardiere Inc. / CTO
Phone: 123-456-7890
Email: hello@reallygreatsite.com

**Harper Richard**
Wardiere Inc. / CEO
Phone: 123-456-7890
Email: hello@reallygreatsite.com`,
    css: `#resume-preview {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 0;
  min-height: 100%;
}

/* Sidebar styling */
#resume-preview > *:nth-child(-n+4),
#resume-preview > hr:first-of-type {
  background-color: #1e3a5f;
  color: white;
  padding: 1.5rem;
  margin: 0;
}

.dark #resume-preview > *:nth-child(-n+4),
.dark #resume-preview > hr:first-of-type {
  background-color: #152840;
}

/* Main content area */
#resume-preview > *:nth-child(n+5) {
  padding: 1.5rem 2rem;
  margin: 0;
}

/* Header in sidebar */
#resume-preview h1 {
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 0.2em 0;
  color: white;
  grid-column: 1;
}

#resume-preview h1 + p strong {
  font-size: 1.1em;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #b8c5d6;
}

/* Section headers in sidebar */
#resume-preview > *:nth-child(-n+4) h2 {
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 1.5em 0 0.8em 0;
  padding-bottom: 0.3em;
  border-bottom: 2px solid white;
  color: white;
}

/* Section headers in main content */
#resume-preview > *:nth-child(n+5) h2 {
  font-size: 1.3em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 1.5em 0 0.8em 0;
  padding-bottom: 0.3em;
  border-bottom: 2px solid var(--theme-color);
  color: var(--theme-color);
}

/* Subsection headers */
#resume-preview h3 {
  font-size: 1.1em;
  font-weight: 700;
  margin: 1em 0 0.3em 0;
  color: inherit;
}

/* Sidebar content */
#resume-preview > *:nth-child(-n+4) p,
#resume-preview > *:nth-child(-n+4) ul {
  color: #e8eef5;
  font-size: 0.95em;
}

/* Main content */
#resume-preview p {
  margin: 0.5em 0;
  text-align: justify;
}

#resume-preview strong {
  font-weight: 600;
}

/* Lists */
#resume-preview ul {
  margin: 0.5em 0;
  padding-left: 1.5em;
  list-style: none;
}

#resume-preview li {
  margin: 0.4em 0;
  position: relative;
  padding-left: 0.5em;
}

#resume-preview > *:nth-child(n+5) li:before {
  content: "▪";
  position: absolute;
  left: -1em;
  color: var(--theme-color);
}

/* Horizontal rules */
#resume-preview hr {
  border: none;
  margin: 0;
  grid-column: 1 / -1;
}

/* Reference section styling */
#resume-preview > *:last-child p {
  display: inline-block;
  width: 48%;
  vertical-align: top;
  margin-right: 2%;
}

@media print {
  #resume-preview {
    background-color: white !important;
  }
  
  #resume-preview > *:nth-child(-n+4),
  #resume-preview > hr:first-of-type {
    background-color: #1e3a5f !important;
    color: white !important;
  }
  
  #resume-preview > *:nth-child(n+5) {
    color: black !important;
  }
  
  #resume-preview > *:nth-child(n+5) h2 {
    color: #1e3a5f !important;
    border-bottom-color: #1e3a5f !important;
  }
}`,
  },
];