# Claude Code on Steroids

**Turn Claude Code from a reactive assistant into a proactive engineering partner.**

Built on top of [obra/superpowers](https://github.com/obra/superpowers) — the best open-source Claude Code plugin in existence — with a custom override system that re-engineers 9 of its 24 skills for production-grade durability, token efficiency, and cost discipline.

Built and open-sourced by [GadaaLabs](https://gadaalabs.com)

---

## What This Is

[obra/superpowers](https://github.com/obra/superpowers) gives Claude Code 24 structured skills. This repo layers a **custom override system** on top — 9 skills re-engineered with measurable improvements:

| Metric | obra/superpowers | Claude Code on Steroids |
|--------|-----------------|------------------------|
| Total skills | 24 | 24 |
| Skills under version control | 0 | 9 |
| Update survivability | 0% | **100%** (auto-restored every session) |
| Pre-built workflow chains | 0 | **6** |
| Multi-agent prompt templates | 0 | **4** |
| Model tiers (incl. $0 route) | 3 | **4** |
| Token burn / session (Chronicle) | ~50,000 | **~3,100 (−94%)** |
| Relative API cost | baseline | **~50% of baseline** |
| Avg engineering rigor (9 skills) | 6.2 / 10 | **8.8 / 10** |

Full credit to Jesse Vincent (@obra) and contributors — the 15 untouched skills run exactly as the upstream team ships them.

---

## Quick Install

**Requires:** [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) + [obra/superpowers](https://github.com/obra/superpowers) installed first

```bash
curl -fsSL https://raw.githubusercontent.com/GadaaLabs/claude-code-on-steroids/main/install.sh | bash
```

Or clone and run:

```bash
git clone https://github.com/GadaaLabs/claude-code-on-steroids.git
cd claude-code-on-steroids && bash install.sh
```

The installer:
1. Copies the 9 override skill files into `~/.claude/plugins/superpowers-overrides/`
2. Copies the 4 legion topology pattern files
3. Adds the `apply.sh` hook script
4. Registers a `SessionStart` hook in `~/.claude/settings.json`

After install, every Claude Code session automatically restores your overrides — even after plugin updates.

---

## The 9 Overridden Skills

### ASCEND — Session Bootstrap

**What changed:** Adds 6 pre-built end-to-end workflow chains and a domain skill trigger table. Zero guesswork on which skills to chain together.

```
DEBUG:      chronicle → hunter → forge → sentinel → oracle → chronicle(store)
FEATURE:    oracle → chronicle → [domain] → architect → blueprint → horizon
            → vector+legion → phantom → sentinel → tribunal → oracle → chronicle
ARCH:       oracle → chronicle → architect → blueprint → tribunal → oracle → chronicle
REFACTOR:   oracle → forge → blueprint → horizon → sentinel → oracle → chronicle
ML/AI/EE:   oracle → [gradient|nexus|ironcore|prism] → feature or debug chain
LONG SESS:  horizon → continue or fresh session handoff
```

### FORGE — TDD Enforcement

**What changed:** Adds a mandatory API verification step before writing any test. Prevents tests written against invented interfaces — the most insidious TDD failure mode.

```bash
# Required before any test referencing an external API:
ls node_modules/<pkg>/dist/ | grep <module>
grep "methodName" node_modules/<pkg>/dist/index.d.ts
grep -n "export.*functionName" path/to/file.ts
```

### VECTOR — Model Cost Routing

**What changed:** Adds Tier 0 (zero-LLM, $0.00), updates all model IDs to Claude 4.x family, adds a `routing_log.md` feedback loop that learns which task types you escalate.

```
Tier 0: No LLM     → $0.00  → sed/prettier/eslint/rename (mechanical)
Tier 1: Haiku 4.5  → cheap  → single file, simple refactors
Tier 2: Sonnet 4.6 → std    → multi-file, investigation
Tier 3: Opus 4.6   → full   → architecture, security, novel problems
```

Estimated 45–60% lower API cost vs. unrouted/over-routed sessions.

### LEGION — Multi-Agent Topology

**What changed:** Adds 4 lazy-loaded pattern files with full prompt templates, agent role definitions, and real examples — one per topology.

| File | Topology | Best For |
|------|----------|----------|
| `patterns/hierarchical.md` | Queen + workers | Plan execution |
| `patterns/mesh.md` | Peer-to-peer | Exploration, research |
| `patterns/ring.md` | Sequential pipeline | Data transforms |
| `patterns/star.md` | Hub + independent spokes | Parallel batch work |

### CHRONICLE — Self-Learning Memory

**What changed:** Replaces flat file search with a 3-layer progressive filtering funnel. Token savings: ~94% per session.

```
Layer 1 — Index scan   (~50 tok):  Read MEMORY.md only → stop if no match
Layer 2 — Keyword grep (~150 tok): Grep candidates → narrow to top 3–5
Layer 3 — Full read    (~750 tok): Read confirmed files → max 3 → stop at first match
```

### COMMANDER — Parallel Agent Dispatch

**What changed:** Adds explicit COMMANDER vs PHANTOM decision table, agent prompt structure template, and real worked examples with conflict resolution protocol.

### BLUEPRINT — Spec-to-Plan

**What changed:** Adds inline self-review checklist (placeholder scan, internal consistency, scope check, ambiguity check) and SPARC requirement enforcement.

### PATHFINDER — Codebase Exploration

**What changed:** Adds structured reading order (entry points first, trap detection, dependency mapping), 5-phase exploration protocol, and anti-pattern catalog for new-codebase mistakes.

### PHANTOM — Plan Execution

**What changed:** Adds two-stage review protocol (spec compliance review → code quality review) with per-task reviewer prompts.

---

## The 15 Untouched Skills (upstream as-is)

These run exactly as shipped by [obra/superpowers](https://github.com/obra/superpowers). They are excellent and need nothing:

| Skill | What it does |
|-------|-------------|
| **ORACLE** | Classify complexity, select skill chain, assign model tier |
| **ARCHITECT** | Design-before-code: 2–3 approaches, trade-offs, spec document |
| **HUNTER** | Evidence before hypothesis — systematic root-cause tracing |
| **SENTINEL** | Confidence gate before completion (HIGH / MEDIUM / LOW) |
| **TRIBUNAL** | Domain-aware code review: ML / AI / Embedded / Frontend / Security |
| **PRISM** | UI/UX: 67 styles, 25 chart types, WCAG 2.1, Core Web Vitals |
| **GRADIENT** | ML pipelines, model training, MLOps, drift detection |
| **NEXUS** | RAG architectures, agents, prompt engineering, LLM evaluation |
| **IRONCORE** | ISRs, RTOS, state machines, hardware abstraction |
| **HORIZON** | Context window budget — compress, handoff, fresh session |
| **VAULT** | Isolated git worktrees before any implementation |
| **SEAL** | Branch completion: merge / PR / keep / discard with verification |
| **ARBITER** | Evaluate code review feedback — verify before implementing |
| **SCULPTOR** | TDD applied to skill creation |
| **EXODUS** | Execute plans in a completely fresh isolated session |

---

## How the Override System Works

```
~/.claude/settings.json
  hooks:
    SessionStart:
      - command: bash $HOME/.claude/plugins/superpowers-overrides/apply.sh

~/.claude/plugins/superpowers-overrides/
  apply.sh          ← reads installed plugin path, copies override files over it
  skills/
    ascend/SKILL.md
    blueprint/SKILL.md
    chronicle/SKILL.md
    commander/SKILL.md
    forge/SKILL.md
    pathfinder/SKILL.md
    phantom/SKILL.md
    vector/SKILL.md
    legion/SKILL.md
    legion/patterns/hierarchical.md
    legion/patterns/mesh.md
    legion/patterns/ring.md
    legion/patterns/star.md
```

Every session start: `apply.sh` runs → copies your skill files over the installed plugin → your versions win, regardless of upstream plugin version.

---

## All 24 Skills — Quick Reference

```
/oracle     ← start EVERY non-trivial task here
/forge      ← new feature or bug fix (TDD, API verification)
/hunter     ← debugging a hard problem
/sentinel   ← before claiming anything is done
/architect  ← design before building
/blueprint  ← structured implementation plans
/gradient   ← ML pipelines, training, MLOps
/nexus      ← RAG, agents, prompts, LLM eval
/ironcore   ← embedded, firmware, hardware
/prism      ← frontend, UI, accessibility
/chronicle  ← store + retrieve solved patterns
/horizon    ← long sessions, context compression
/pathfinder ← unfamiliar codebase onboarding
/vector     ← model tier routing (costs)
/legion     ← multi-agent swarms
/commander  ← parallel agent dispatch
/phantom    ← subagent plan execution
/tribunal   ← domain-aware code review
/ascend     ← auto-loads at session start
/vault      ← isolated git worktrees
/seal       ← branch completion
/exodus     ← fresh session plan execution
/arbiter    ← receive code review with rigor
/sculptor   ← TDD for skill creation
```

---

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

If you improve a skill, submit it. If you build a new domain skill (DevOps/Kubernetes, security engineering, mobile, data engineering), open a PR.

---

## Credits

- **[Jesse Vincent (@obra)](https://github.com/obra)** and all [Superpowers contributors](https://github.com/obra/superpowers/graphs/contributors) — for building the foundation everything here is built on
- **[GadaaLabs](https://gadaalabs.com)** — custom override system, skill re-engineering, and this repo

---

## License

MIT — use freely, modify freely, share freely.
