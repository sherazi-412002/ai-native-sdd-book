---
id: 3
title: landing-page-implementation-plan
stage: plan
date: 2025-12-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: 1-landing-page
branch: 001-isaac-robot-brain
user: claude
command: /sp.plan
labels: [landing-page, docusaurus, react, planning]
links:
  spec: specs/1-landing-page/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-landing-page/plan.md
  - specs/1-landing-page/research.md
  - specs/1-landing-page/data-model.md
  - specs/1-landing-page/quickstart.md
  - specs/1-landing-page/contracts/internal-navigation.yaml
tests:
  - plan completeness check
  - constitution compliance verification
---

## Prompt

```text
for 1-landing-page spec.md                                                                     # Project: Physical AI & Humanoid Robotics Landing Page (Docusaurus)

## Goal:
Generate the complete source code for a new Docusaurus landing page as a **custom React component** (e.g., `src/pages/index.js`). The component must implement a **single-scroll, fully responsive, dark-themed** design that serves as the entry point for the "Physical AI & Humanoid Robotics" textbook.

## Docusaurus Integration (FR-007):
1.  Use Docusaurus's `<Layout>` component as the root wrapper.
2.  Use Docusaurus's `<Link>` component for all internal navigation (CTA, Module Cards, Setup Guides).

## Aesthetic & Branding (FR-002, P3):
1.  **Dark Theme** foundation with a technical aesthetic.
2.  Use **Deep Purple (#6A0DAD)** and **Bright Sky Blue (#00BFFF)** as accent colors.

## Required Sections (Top-to-Bottom):

### 1. Hero Section (FR-003):
* **Structure**: Headline, Subhead, and a prominent **"Start Learning →" Call-to-Action (CTA)**.
* **Function**: Must clearly communicate the textbook's purpose and value proposition (SC-001).

### 2. Content Grid (FR-004):
* **Structure**: A responsive grid layout for the four core **Module Cards**.
* **Card Content**: Each card must include: **Title**, **Brief Description**, and a list of **Learning Outcomes** (use sensible placeholder content).
* **Function**: Each card must link to its respective module page (SC-002).

### 3. Navigation & Resources (FR-005):
* **Content**: A dedicated section with quick links to **Workstation Setup Guide**, **Edge Kit Setup Guide**, **Cloud Setup Guide**, and the **Glossary**.
* **Function**: Must be prominently displayed and accessible (User Story 3).

## Animation Features (FR-006, User Story 4):
1.  Implement a **header scroll effect** (e.g., subtle shadow/background change on scroll).
2.  Apply **staggered fade-in animations** for the Module Cards and other major content blocks upon page load.
3.  Add **subtle hover effects** to the Module Cards.
4.  **Constraint**: Use a modern animation library (like react-spring) to ensure smooth, non-disruptive transitions.

## Output Format:
Generate a single, complete, and fully styled file: `src/pages/index.js`. Use modern functional React components and either CSS Modules or inline/imported CSS for styling. Ensure placeholders for all content links are used (Assumption 2).
```

## Response snapshot

Created a comprehensive implementation plan for the Physical AI & Humanoid Robotics landing page. The plan includes:

1. Technical context with required technologies (React, Docusaurus, React Spring)
2. Constitution check ensuring compliance with project principles
3. Project structure for documentation and source code
4. Phase 0 research documenting technical decisions (animation library choice, styling approach, etc.)
5. Phase 1 architecture defining component structure and data models
6. Supporting documentation files including research, data models, quickstart guide, and API contracts

The plan addresses all requirements from the specification including the dark theme with specified colors, hero section, module cards grid, navigation resources, and animation features using React Spring.

## Outcome

- ✅ Impact: Created complete implementation plan with all supporting documentation for the landing page feature
- 🧪 Tests: Plan completeness and constitution compliance verified
- 📁 Files: Created 5 documentation files and 1 contract file for the landing page feature
- 🔁 Next prompts: Ready for task breakdown with /sp.tasks and implementation with /sp.implement
- 🧠 Reflection: The plan comprehensively addresses all requirements while maintaining compliance with project constitution

## Evaluation notes (flywheel)

- Failure modes observed: None - all requirements successfully addressed
- Graders run and results (PASS/FAIL): PASS - all constitution checks passed
- Prompt variant (if applicable): Standard planning workflow
- Next experiment (smallest change to try): Proceed to task breakdown with /sp.tasks