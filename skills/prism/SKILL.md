---
name: prism
description: UI/UX design intelligence, accessibility, performance, SEO, and data visualization — domain expertise for web and app developers. Includes 67 UI styles, 25 chart types, font pairing, and UX guidelines.
type: domain
---

# Frontend Excellence

## Overview

**PRISM** — *A prism refracts white light into its full visible spectrum.*
When invoked: refracts your UI problem into its full spectrum — visual style selection (67 styles), chart type selection (25 types), WCAG 2.1 AA accessibility, Core Web Vitals targets, bundle budgets, and font pairing.

**Core principle:** Great UIs are not accidents — they are the result of deliberate design decisions grounded in visual language, accessibility, performance, and data communication.

**Announce at start:** "Running PRISM for UI/UX design patterns."

---

## Entry Point — First 5 Minutes

```
FRONTEND CONTEXT ASSESSMENT:

"What are you building or fixing?"
A) New UI / design system from scratch
B) Existing UI — adding a feature
C) Dashboard / data visualization
D) Landing page / marketing site
E) Mobile app (React Native / Flutter)
F) Accessibility audit / fix
G) Performance problem (slow LCP, CLS, INP)
H) Debugging a visual bug

→ Load the relevant pattern file.
```

**Type → Pattern file mapping:**

| Type | Load |
|------|------|
| A — New UI / design system | `patterns/styles-catalog.md` |
| B — Adding to existing UI | `patterns/styles-catalog.md` (match existing style) |
| C — Dashboard / data viz | `patterns/visualization.md` |
| D — Landing page | `patterns/styles-catalog.md` (Landing Page Styles section) |
| E — Mobile app | `patterns/accessibility.md` (Responsive + Touch) |
| F — Accessibility audit | `patterns/accessibility.md` |
| G — Performance problem | `patterns/accessibility.md` (Performance Budget section) |
| H — Visual bug | run `hunter`, then `patterns/visualization.md` Anti-Patterns |

**After identifying type, confirm:**
1. "Who is the primary user — general public, internal team, or technical users?"
2. "What is the primary metric — conversion, engagement, readability, or real-time data?"

These two answers determine style choice and chart selection throughout.

---

## Pattern Files (lazy-load — only what the task needs)

```
patterns/
  styles-catalog.md    ← 67 UI styles, font pairing, design system tokens
  visualization.md     ← 25 chart types, UX guidelines, anti-patterns, responsive
  accessibility.md     ← WCAG 2.1 AA checklist, Core Web Vitals, SEO, performance
```

**Load instructions:**
- Only load the pattern file(s) relevant to the current work type
- Do not load all three by default — each is ~150–200 lines

---

## Key Rules

**Never:**
- Choose a chart type based on aesthetics — choose based on what the data communicates
- Use color as the only way to convey information (fails colorblind users)
- Claim frontend work complete without running the performance + accessibility checklist
- Use px for font sizes (breaks user font preferences — use rem)
- Add hover-only interactions (fails touch devices)

**Always:**
- Load `patterns/styles-catalog.md` when making style decisions
- Load `patterns/visualization.md` when building charts or dashboards
- Load `patterns/accessibility.md` before marking any UI task done
- Match the existing codebase style when adding to an existing UI (not your preference)
- Test at 320px minimum width — if it breaks there, it breaks for real users

---

## Integration with Superpowers

| Skill | Integration |
|-------|-------------|
| `forge` | Write Playwright/Cypress a11y tests before component code |
| `hunter` | Debug CLS, LCP, INP regressions with performance profiler |
| `sentinel` | Run Lighthouse + axe before claiming UI work done |
| `chronicle` | Store successful design patterns per domain/industry |
| `architect` | Use style catalogue for visual direction questions |

---

## Final Checklist

Before claiming frontend work complete:

- [ ] UI style chosen from `patterns/styles-catalog.md`
- [ ] Charts match data type from `patterns/visualization.md`
- [ ] Font pairing applied from domain defaults
- [ ] Accessibility checklist passed (`patterns/accessibility.md`)
- [ ] Core Web Vitals targets met: LCP < 2.5s, CLS < 0.1
- [ ] Bundle within budget: JS < 300KB gzipped
- [ ] Responsive tested at 320px, 768px, 1440px
- [ ] Anti-pattern review passed
