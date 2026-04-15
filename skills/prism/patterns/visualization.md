# PRISM Pattern: Data Visualization & UX

## Chart Selection (25 types)

**Rule: Choose chart based on what the data needs to communicate, not aesthetics.**

| Data Type | Chart | When to Use |
|-----------|-------|-------------|
| Trend over time | **Line** | Time axis; observe rise/fall/rate of change |
| Compare categories | **Bar** | Rank discrete values, ≤15 categories |
| Part-to-whole | **Pie / Donut** | ≤5 categories; dominant segment vs rest |
| Correlation / clusters | **Scatter** | Two continuous variables, find relationships |
| Intensity across 2D grid | **Heat Map** | Activity by hour×day, density patterns |
| Geographic distribution | **Choropleth Map** | Regional data, spatial insight |
| Sequential funnel / drop-off | **Funnel** | Conversion stages, multi-step process |
| KPI vs target | **Gauge** | Single metric against threshold |
| Forecast with uncertainty | **Line + Confidence Band** | Historical + predicted with ranges |
| Anomaly detection | **Line + Highlights** | Monitor for outliers, spikes, dips |
| Hierarchical proportions | **Treemap** | Size relationships within hierarchy |
| Flow between nodes | **Sankey** | Multi-source, multi-target distribution |
| Cumulative changes | **Waterfall** | P&L, how components add to final total |
| Multi-variable comparison | **Radar / Spider** | 5–8 attributes, compare entities |
| Financial OHLC | **Candlestick** | Trading context, Open/High/Low/Close |
| Network topology | **Network Graph** | Social graphs, system dependencies |
| Statistical distribution | **Box Plot** | Spread, median, outliers across groups |
| Multiple KPIs compact | **Bullet** | Space-constrained dashboards |
| Percentage progress | **Waffle** | What fraction of whole is filled |
| Nested proportions | **Sunburst** | Hierarchy + relative size together |
| Root cause decomposition | **Decomposition Tree** | Drill into metric contributors |
| Real-time streaming | **Streaming Area** | IoT/ops data ≥1Hz, live monitoring |
| Text sentiment | **Word Cloud** | NLP output, text corpus exploration |
| Process flow analysis | **Process Map** | Event logs, bottleneck visualization |
| 3D spatial / scientific | **3D Scatter / Surface** | Z-axis carries essential information |

## UX Guidelines

### Animation
- Max 1–2 animated elements per view
- Duration: 150–300ms
- Always honor `prefers-reduced-motion: reduce`
- Reserve infinite animation for loading states only

### Forms
- Every input paired with visible `<label>`
- Error messages below the relevant field
- Validate on blur, not on every keystroke
- Required fields marked with text (not just `*`)
- Support browser autofill (`autocomplete` attributes)
- Show password toggle on password inputs

### Feedback
- Operations >300ms: show spinner or skeleton
- Toast messages auto-dismiss after 3–5 seconds
- Multi-step flows: show progress indicator
- Empty states: helpful message + action button
- Errors: explain what went wrong + recovery path

### Navigation
- Sticky headers: account for fixed element overlap
- Active state clearly visible on current page/section
- Back button always works (URL reflects state)
- Breadcrumbs for hierarchies >2 levels deep

### Responsive Design

```css
/* Mobile first */
/* sm: */ @media (min-width: 640px)  { }
/* md: */ @media (min-width: 768px)  { }
/* lg: */ @media (min-width: 1024px) { }
/* xl: */ @media (min-width: 1280px) { }
/* 2xl:*/ @media (min-width: 1536px) { }
```

```
- [ ] Tested at 320px, 375px, 414px, 768px, 1024px, 1440px
- [ ] No horizontal scroll at any breakpoint
- [ ] Body font ≥ 16px (prevents iOS zoom)
- [ ] Touch targets ≥ 44px, ≥ 8px gap between them
- [ ] Fixed elements don't obscure content (use dvh)
- [ ] Text: 65-75ch desktop, 45-55ch mobile
```

## Anti-Pattern Database

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Color-only error indication | Fails color-blind users | Add icon + text label |
| Hover-only interactions | Fails touch devices | Add tap equivalent |
| Missing focus ring | Fails keyboard users | `outline: 2px solid currentColor; outline-offset: 2px` |
| Auto-playing video/audio | Disruptive | Default to muted, user-triggered |
| Fixed font size in px | Breaks user font preferences | Use rem units |
| Layout shift on load | High CLS, jarring | Reserve space for async content |
| Infinite scroll without position restore | Can't navigate back | Add URL pagination anchor |
| Disabled button with no tooltip | User doesn't know why | Explain why it's disabled |
| Form submits on Enter in multi-field form | Accidental submission | Only submit on explicit click |
| Modal without focus trap | Focus escapes to background | Trap focus within modal |
| Aggressive redirect (no 404) | Hides broken links | Return proper 404 status |
| Low contrast placeholder text | Invisible on mobile | Min 3:1 contrast for placeholders |
