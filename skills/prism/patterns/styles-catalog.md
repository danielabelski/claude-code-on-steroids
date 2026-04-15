# PRISM Pattern: UI Styles Catalog

## Style Decision Framework

Before writing any UI code, identify:

1. **Industry** — Finance, Healthcare, Tech/SaaS, E-commerce, Creative, Lifestyle, Government
2. **Audience** — Age, tech literacy, accessibility needs
3. **Mood** — Professional/trustworthy, playful/energetic, premium/luxury, technical
4. **Platform** — Web app, landing page, dashboard, mobile, AR/VR

## General Styles (34 styles)

| Style | Primary Colors | Key Characteristics | Best For |
|-------|---------------|---------------------|----------|
| **Minimalism / Swiss** | Monochrome, Black, White | Clean, spacious, functional, high contrast | Documentation, SaaS, portfolios |
| **Neumorphism** | Soft pastels, grey | Soft 3D embossed, rounded corners 12-16px | iOS apps, personal dashboards |
| **Glassmorphism** | Translucent white, vibrant accents | Frosted glass, blurred background, layered | Hero sections, cards, sidebars |
| **Brutalism** | Primary colors (Red, Blue, Yellow) | Raw, stark, high contrast, sharp corners | Bold agencies, art platforms |
| **3D & Hyperrealism** | Navy, Forest Green, Gold | WebGL/Three.js, realistic textures | Product showcases, marketing |
| **Vibrant & Block-based** | Neon Green, Electric Purple | Bold, geometric shapes, energetic | Entertainment, gaming, Gen Z |
| **Dark Mode (OLED)** | Deep Black, Midnight Blue | Eye-friendly, power-efficient | Developer tools, media apps |
| **Accessible & Ethical** | High contrast primaries | WCAG AAA, large text, keyboard nav | Healthcare, government, enterprise |
| **Claymorphism** | Pastel (Peach, Baby Blue, Mint) | Soft 3D, chunky, toy-like, bubbly | Kids apps, playful onboarding |
| **Aurora UI** | Blue-Orange, Purple-Yellow gradients | Northern Lights mesh gradient, vibrant | AI products, creative tools |
| **Retro-Futurism** | Neon Blue, Hot Pink, Cyan | 80s aesthetic, CRT scanlines, synthwave | Music apps, nostalgia brands |
| **Flat Design** | Bright solids (Red, Orange, Blue) | 2D, no shadows, clean lines | Material design, Google-style apps |
| **Skeuomorphism** | Realistic wood, leather, metal | Texture, depth, real-world metaphors | Audio tools, creative software |
| **Liquid Glass** | Iridescent, translucent | Flowing glass, morphing, fluid effects | Premium product sites, Apple-style |
| **Motion-Driven** | Bold colors emphasizing movement | Animation-heavy, micro-interactions | Storytelling, marketing sites |
| **Micro-interactions** | Subtle color shifts | Small animations, gesture-based, tactile | Form UX, banking apps |
| **Inclusive Design** | WCAG AAA contrast, symbol-based | Color-blind friendly, haptic | Universal apps, public services |
| **Zero Interface** | Neutral, subtle feedback | Voice-first, gesture-based, AI-driven | Smart home, conversational UI |
| **Neubrutalism** | Yellow, Red, Blue, Black borders | Bold borders, hard shadows, Gen Z | Startups, Figma-style tools |
| **Bento Box Grid** | Neutral + brand accent | Modular cards, Apple-style | Feature showcases, portfolios |
| **Y2K Aesthetic** | Hot Pink, Cyan, Silver | Chrome, metallic, iridescent | Fashion, nostalgia, gen-Z brands |
| **Cyberpunk UI** | Matrix Green, Magenta, Cyan | Neon on dark, HUD, glitch, dystopian | Gaming, sci-fi, crypto |
| **Organic Biophilic** | Forest Green, Earth Brown | Nature shapes, sustainable, flowing | Wellness, eco brands |
| **AI-Native UI** | AI Purple, Success Green | Chatbot, conversational, minimal chrome | AI assistants, LLM products |
| **Memphis Design** | Hot Pink, Yellow, Teal | 80s, postmodern, geometric shapes | Creative agencies, lifestyle |
| **Vaporwave** | Pink, Cyan, Mint, Purple | Synthwave, nostalgic, glitch | Music, art, aesthetic brands |
| **Exaggerated Minimalism** | Black, White, single accent | Oversized type, high contrast, statement | Luxury fashion, editorial |
| **Kinetic Typography** | Flexible, high contrast | Motion text, animated type, typing effect | Intro screens, marketing |
| **Swiss Modernism 2.0** | Black, White, single accent | Grid system, modular, international style | Architecture, editorial |
| **HUD / Sci-Fi FUI** | Neon Cyan, Holographic Blue | Futuristic, wireframe, neon, transparency | Data platforms, defense UI |
| **Pixel Art** | NES Palette, brights | Retro, 8-bit, gaming, blocky | Games, indie tools |
| **Spatial UI (VisionOS)** | Frosted Glass, vibrant accents | Depth, immersion, translucent, gaze | AR/VR, Apple Vision Pro |
| **E-Ink / Paper** | Off-White, Ink Black | Paper-like, high contrast, calm | Reading apps, e-readers |
| **Bauhaus** | Red, Blue, Yellow, Black | Geometric, constructivist, hard shadows | Architecture, education |

## Landing Page Styles (8 styles)

| Style | When to Use |
|-------|-------------|
| **Hero-Centric** | Brand awareness, large visual impact needed |
| **Conversion-Optimized** | Lead gen, single CTA, form-focused |
| **Feature-Rich Showcase** | SaaS product with many features |
| **Minimal & Direct** | Visual-centric products, white space heavy |
| **Social Proof-Focused** | Testimonials prominent, B2B trust-building |
| **Interactive Product Demo** | Embedded mockup, step-by-step guide |
| **Trust & Authority** | Certificates, credentials, case studies |
| **Storytelling-Driven** | Narrative flow, emotional messaging |

## Dashboard Styles (9 styles)

| Style | When to Use |
|-------|-------------|
| **Data-Dense** | Multiple charts, KPI cards, minimal padding |
| **Executive** | High-level KPIs, at-a-glance summary |
| **Real-Time Monitoring** | Live updates, status indicators, alerts |
| **Heat Map** | Intensity visualization, time patterns |
| **Drill-Down Analytics** | Hierarchical exploration, expandable |
| **Comparative Analysis** | Side-by-side metrics, period comparisons |
| **Predictive Analytics** | Forecast lines, confidence intervals |
| **Financial** | Revenue metrics, P&L, budget tracking |
| **Sales Intelligence** | Deal pipeline, territory performance |

## Typography — Font Pairing

### Pairing Strategies

**Serif + Sans (Luxury / Editorial)**
- `Playfair Display` + `Inter` — Premium, fashion, high-end e-commerce
- `EB Garamond` + `Lato` — Legal, academic, formal
- `Cormorant` + `Nunito Sans` — Ultra-luxury, editorial

**Sans + Sans (Modern / Professional)**
- `Poppins` + `Open Sans` — SaaS, corporate, balanced
- `Space Grotesk` + `DM Sans` — Tech startups, developer tools
- `Inter` alone — Universal system font, maximum compatibility

**Display + Body (Impact)**
- `Bebas Neue` + `Source Sans 3` — Sports, action, marketing
- `Clash Display` + `Cabinet Grotesk` — Bold agencies

**Developer / Technical**
- `JetBrains Mono` + `IBM Plex Sans` — Developer tools, terminals
- `Fira Code` + `Source Sans 3` — Code editors, technical docs

**Domain Defaults**

| Domain | Heading | Body |
|--------|---------|------|
| Tech / SaaS | Space Grotesk | DM Sans |
| Finance / Banking | IBM Plex Sans | IBM Plex Sans |
| Healthcare | Figtree | Noto Sans |
| Legal | EB Garamond | Lato |
| E-commerce | Poppins | Open Sans |
| Creative Agency | Clash Display | Cabinet Grotesk |
| Education | Nunito | Open Sans |
| Accessibility-first | Atkinson Hyperlegible | Atkinson Hyperlegible |
| Multilingual | Noto (family) | Noto (family) |

```css
/* Typography rules */
body { line-height: 1.5; }
p { max-width: 65ch; }
h1 { font-size: clamp(2rem, 5vw, 4rem); }
* { font-display: swap; }
```

## Design System Quick-Start

```markdown
## Design Tokens (establish first)
1. Color palette: primary, secondary, neutral, semantic (error/warning/success/info)
2. Typography scale: base (16px), sm, md, lg, xl, 2xl, 3xl, 4xl
3. Spacing scale: 4px base unit → 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
4. Border radius: none, sm(4px), md(8px), lg(12px), xl(16px), full
5. Shadow scale: none, sm, md, lg, xl
6. Breakpoints: 640, 768, 1024, 1280, 1536

## Component Priority Order
1. Button (variants: primary, secondary, ghost, danger)
2. Input + Label + Error
3. Card
4. Modal/Dialog
5. Navigation (header + sidebar or top nav)
6. Table
7. Form
```
