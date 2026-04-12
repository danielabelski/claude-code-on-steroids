# PRISM Pattern: Accessibility & Performance

## Accessibility (WCAG 2.1 AA Minimum)

### Contrast Requirements

| Text Type | Minimum Ratio | Target |
|-----------|--------------|--------|
| Normal text (<18px) | 4.5:1 | 7:1 (AAA) |
| Large text (≥18px bold, ≥24px) | 3:1 | 4.5:1 |
| UI components / graphics | 3:1 | 4.5:1 |
| Decorative / disabled | No requirement | — |

### Accessibility Checklist

```markdown
### Vision
- [ ] Color contrast ≥ 4.5:1 for all text (use axe or Colour Contrast Analyser)
- [ ] Color NOT the only means of conveying info (add icon/label)
- [ ] Descriptive alt text on all images (empty alt="" for decorative)

### Keyboard & Screen Reader
- [ ] All interactive elements reachable by Tab
- [ ] Focus ring visible on all interactive elements
- [ ] Logical tab order matches visual order
- [ ] ARIA labels on icon-only buttons
- [ ] aria-live regions for dynamic content updates
- [ ] Errors announced via aria-live="polite"

### Semantic Structure
- [ ] Single <h1> per page, heading hierarchy (no skips)
- [ ] Landmark regions: <header>, <nav>, <main>, <footer>
- [ ] Form inputs have <label> (for= or aria-labelledby)
- [ ] Error messages below relevant fields

### Touch & Motor
- [ ] Touch targets ≥ 44×44px
- [ ] ≥ 8px gap between adjacent touch targets
- [ ] No hover-only interactions
- [ ] Confirmation dialog for destructive actions

### Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] No infinite animations except loaders
- [ ] Animation duration: 150–300ms
```

## Performance Budget

### Core Web Vitals Targets

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5–4s | > 4s |
| INP (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |

### Bundle Size Targets

| Asset | Budget | Technique |
|-------|--------|-----------|
| JS (initial) | < 300KB gzipped | Code splitting, tree shaking |
| CSS | < 50KB gzipped | Purge unused, critical CSS inline |
| Images | WebP/AVIF, lazy loaded | `loading="lazy"`, `srcset` |
| Fonts | ≤ 2 font files | `font-display: swap`, preload |
| Total page weight | < 1MB | Audit with Lighthouse |

### Performance Checklist

```markdown
- [ ] Images: WebP/AVIF, correct srcset, loading="lazy" below fold
- [ ] LCP image: preloaded with <link rel="preload">
- [ ] JS: route-based code splitting (dynamic import)
- [ ] JS: tree-shaking verified
- [ ] CSS: critical CSS inlined, rest deferred
- [ ] Fonts: font-display: swap, preconnect to fonts.googleapis.com
- [ ] Bundle analyzed with bundle-analyzer
- [ ] Lighthouse Performance ≥ 90
```

## SEO Checklist

```markdown
### Meta Tags
- [ ] <title>: 50-60 characters, includes primary keyword
- [ ] <meta name="description">: 120-158 characters
- [ ] Open Graph: og:title, og:description, og:image (1200×630px), og:url
- [ ] Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image

### Structured Data
- [ ] JSON-LD: Organization, WebPage, BreadcrumbList
- [ ] Product pages: Product schema with price, availability
- [ ] Blog posts: Article schema with author, publishDate

### Technical SEO
- [ ] Canonical URL on every page
- [ ] robots.txt present
- [ ] XML sitemap generated and submitted
- [ ] All internal links use crawlable <a href>
- [ ] 404 page returns HTTP 404 status
- [ ] Lighthouse SEO score ≥ 90
```
