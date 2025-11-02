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
    css: `/* Backbone CSS for Resume Template */
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
#resume-preview p,
#resume-preview li,
#resume-preview dl {
  margin: 0;
}
#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: bold;
}
#resume-preview h1 {
  font-size: 2.13em;
}
#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 5px;
  font-size: 1.2em;
}
#resume-preview h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: var(--theme-color);
}
#resume-preview ul,
#resume-preview ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}
#resume-preview ul {
  list-style-type: circle;
}
#resume-preview ol {
  list-style-type: decimal;
}
#resume-preview dl {
  display: flex;
}
#resume-preview dl dt,
#resume-preview dl dd:not(:last-child) {
  flex: 1;
}
#resume-preview :not(span.katex-display) > span.katex {
  font-size: 1em !important;
}
#resume-preview svg.iconify {
  vertical-align: -0.2em;
}
#resume-preview img {
  max-width: 100%;
}
#resume-preview .resume-header {
  text-align: center;
}
#resume-preview .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}
#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " | ";
}
#resume-preview [data-scope="cross-ref"][data-part="definitions"] {
  padding-left: 1.2em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"] p {
  margin-left: 0.5em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"]::marker {
  content: attr(data-label);
}
#resume-preview [data-scope="cross-ref"][data-part="reference"] {
  font-size: 100%;
  top: 0;
}
.dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}
@media print {
  .dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
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
    css: `/* Backbone CSS for Resume Template */
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
#resume-preview p,
#resume-preview li,
#resume-preview dl {
  margin: 0;
}
#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: bold;
}
#resume-preview h1 {
  font-size: 2.13em;
}
#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 5px;
  font-size: 1.2em;
}
#resume-preview h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: var(--theme-color);
}
#resume-preview ul,
#resume-preview ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}
#resume-preview ul {
  list-style-type: circle;
}
#resume-preview ol {
  list-style-type: decimal;
}
#resume-preview dl {
  display: flex;
}
#resume-preview dl dt,
#resume-preview dl dd:not(:last-child) {
  flex: 1;
}
#resume-preview :not(span.katex-display) > span.katex {
  font-size: 1em !important;
}
#resume-preview svg.iconify {
  vertical-align: -0.2em;
}
#resume-preview img {
  max-width: 100%;
}
#resume-preview .resume-header {
  text-align: center;
}
#resume-preview .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}
#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " | ";
}
#resume-preview [data-scope="cross-ref"][data-part="definitions"] {
  padding-left: 1.2em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"] p {
  margin-left: 0.5em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"]::marker {
  content: attr(data-label);
}
#resume-preview [data-scope="cross-ref"][data-part="reference"] {
  font-size: 100%;
  top: 0;
}
.dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}
@media print {
  .dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
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
    css: `/* Backbone CSS for Resume Template */
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
#resume-preview p,
#resume-preview li,
#resume-preview dl {
  margin: 0;
}
#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: bold;
}
#resume-preview h1 {
  font-size: 2.13em;
}
#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 5px;
  font-size: 1.2em;
}
#resume-preview h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: var(--theme-color);
}
#resume-preview ul,
#resume-preview ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}
#resume-preview ul {
  list-style-type: circle;
}
#resume-preview ol {
  list-style-type: decimal;
}
#resume-preview dl {
  display: flex;
}
#resume-preview dl dt,
#resume-preview dl dd:not(:last-child) {
  flex: 1;
}
#resume-preview :not(span.katex-display) > span.katex {
  font-size: 1em !important;
}
#resume-preview svg.iconify {
  vertical-align: -0.2em;
}
#resume-preview img {
  max-width: 100%;
}
#resume-preview .resume-header {
  text-align: center;
}
#resume-preview .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}
#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " | ";
}
#resume-preview [data-scope="cross-ref"][data-part="definitions"] {
  padding-left: 1.2em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"] p {
  margin-left: 0.5em;
}
#resume-preview [data-scope="cross-ref"][data-part="definition"]::marker {
  content: attr(data-label);
}
#resume-preview [data-scope="cross-ref"][data-part="reference"] {
  font-size: 100%;
  top: 0;
}
.dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}
@media print {
  .dark #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}`,
  },
];