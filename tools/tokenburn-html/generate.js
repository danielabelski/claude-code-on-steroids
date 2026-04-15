#!/usr/bin/env node
/**
 * tokenburn-html: generates a browser dashboard from tokenburn JSON data
 * Usage: node generate.js [period]   (period: today|week|30days|month)
 */

import { execSync, spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

const period = process.argv[2] || 'week'

// Export data from tokenburn
let raw
try {
  const result = spawnSync('tokenburn', ['export', '--format', 'json', '--output', '/dev/stdout'], {
    encoding: 'utf8',
    env: { ...process.env, FORCE_COLOR: '0' }
  })
  if (result.status !== 0 || !result.stdout) throw new Error(result.stderr || 'no output')
  raw = JSON.parse(result.stdout)
} catch (e) {
  console.error('Failed to get tokenburn data:', e.message)
  process.exit(1)
}

// Pick the right period
const PERIOD_MAP = { today: 'Today', week: '7 Days', '30days': '30 Days', month: 'Month' }
const periodLabel = PERIOD_MAP[period] || '7 Days'
const data = raw.periods[periodLabel] || raw.periods['7 Days']
const tools = raw.tools || []
const shellCommands = raw.shellCommands || []
const allProjects = raw.projects || []

// Summary stats
const { summary, daily = [], activity = [], models = [] } = data
const totalCost = summary['Cost (USD)'] || 0
const totalCalls = summary['API Calls'] || 0
const totalSessions = summary['Sessions'] || 0

// Calc cache hit rate from daily
const totalCacheRead = daily.reduce((s, d) => s + (d['Cache Read Tokens'] || 0), 0)
const totalCacheWrite = daily.reduce((s, d) => s + (d['Cache Write Tokens'] || 0), 0)
const totalInput = daily.reduce((s, d) => s + (d['Input Tokens'] || 0), 0)
const totalOutput = daily.reduce((s, d) => s + (d['Output Tokens'] || 0), 0)
const cacheHit = totalCacheRead > 0 ? Math.round((totalCacheRead / (totalCacheRead + totalInput)) * 100) : 0

function fmtCost(v) {
  if (v >= 100) return `$${v.toFixed(2)}`
  if (v >= 10) return `$${v.toFixed(2)}`
  if (v >= 1) return `$${v.toFixed(2)}`
  if (v >= 0.01) return `$${v.toFixed(3)}`
  return `$${v.toFixed(4)}`
}
function fmtK(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B'
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M'
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K'
  return String(n)
}

// Bar generator: orange→yellow gradient
function barHtml(value, max, width = 120) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0
  const filled = Math.round(pct * width)
  return `<div class="bar-outer"><div class="bar-filled" style="width:${Math.max(1,filled)}px"></div></div>`
}

const maxDailyCost = Math.max(...daily.map(d => d['Cost (USD)'] || 0), 0.01)
const maxActivity = Math.max(...activity.map(a => a['Cost (USD)'] || 0), 0.01)
const maxModel = Math.max(...models.map(m => m['Cost (USD)'] || 0), 0.01)
const maxTool = Math.max(...tools.map(t => t['Calls'] || 0), 1)
const maxShell = Math.max(...shellCommands.map(s => s['Calls'] || 0), 1)
const maxProject = Math.max(...allProjects.map(p => p['Cost (USD)'] || 0), 0.01)

// Activity colors matching the screenshot
const ACTIVITY_COLORS = {
  'Coding':        '#5b9cf5',
  'Debugging':     '#f59b5b',
  'Feature Dev':   '#91f55b',
  'Delegation':    '#f55bb5',
  'Exploration':   '#5bf5e4',
  'Conversation':  '#888',
  'Testing':       '#c85bf5',
  'Brainstorming': '#f5d15b',
  'Build/Deploy':  '#5bf59b',
  'Refactoring':   '#5b9cf5',
  'Planning':      '#f5a05b',
  'General':       '#888',
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TokenBurn — ${periodLabel}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0d0d14;
    color: #ccc;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 13px;
    min-height: 100vh;
    padding: 0;
  }

  /* ── Top nav ── */
  .topnav {
    background: #111118;
    border-bottom: 1px solid #2a2a40;
    padding: 8px 20px;
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .nav-tab {
    padding: 4px 14px;
    border-radius: 4px;
    color: #555;
    cursor: pointer;
    font-size: 13px;
  }
  .nav-tab.active {
    background: #1e1e2e;
    color: #ff8c42;
    border: 1px solid #ff8c42;
    font-weight: bold;
  }

  /* ── Header card ── */
  .header-card {
    border: 1px solid #ff8c42;
    border-radius: 6px;
    margin: 14px 16px 10px;
    padding: 12px 18px;
    background: #111118;
  }
  .header-title { color: #ff8c42; font-weight: bold; font-size: 15px; }
  .header-title span { color: #888; font-weight: normal; font-size: 13px; margin-left: 10px; }
  .header-stats {
    margin-top: 6px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .stat-cost { color: #ffd700; font-weight: bold; font-size: 22px; }
  .stat-label { color: #555; font-size: 12px; margin-left: 4px; }
  .stat-val { color: #fff; font-weight: bold; }
  .header-tokens { margin-top: 6px; color: #555; font-size: 12px; }

  /* ── Grid ── */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 0 16px;
  }
  .panel {
    border-radius: 6px;
    padding: 14px 16px;
    background: #111118;
  }
  .panel-cyan   { border: 1px solid #3d8fb5; }
  .panel-green  { border: 1px solid #3db57a; }
  .panel-yellow { border: 1px solid #b5963d; }
  .panel-purple { border: 1px solid #9b3db5; }
  .panel-teal   { border: 1px solid #3db5a0; }
  .panel-shell  { border: 1px solid #3d6eb5; }
  .panel-mcp    { border: 1px solid #7a3db5; }

  .panel-title {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 10px;
    letter-spacing: 0.3px;
  }
  .panel-cyan   .panel-title { color: #5bc8f5; }
  .panel-green  .panel-title { color: #5bf5a0; }
  .panel-yellow .panel-title { color: #f5c85b; }
  .panel-purple .panel-title { color: #d05bf5; }
  .panel-teal   .panel-title { color: #5bf5e4; }
  .panel-shell  .panel-title { color: #5b8af5; }
  .panel-mcp    .panel-title { color: #a05bf5; }

  /* ── Column headers ── */
  .col-headers {
    display: flex;
    justify-content: flex-end;
    color: #444;
    font-size: 11px;
    margin-bottom: 4px;
    gap: 10px;
  }
  .col-h { width: 56px; text-align: right; }
  .col-h2 { width: 40px; text-align: right; }

  /* ── Rows ── */
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
    min-height: 22px;
  }
  .row-label { color: #888; font-size: 12px; width: 52px; flex-shrink: 0; }
  .bar-outer {
    background: #1e1e2e;
    border-radius: 2px;
    height: 10px;
    flex: 1;
    min-width: 40px;
    overflow: hidden;
  }
  .bar-filled {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(to right, #5b9cf5, #f5c85b, #ff8c42);
    min-width: 3px;
  }
  .row-cost { color: #ffd700; width: 56px; text-align: right; flex-shrink: 0; font-size: 12px; }
  .row-count { color: #777; width: 40px; text-align: right; flex-shrink: 0; font-size: 12px; }
  .row-name { color: #ccc; flex: 1; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row-pct { width: 40px; text-align: right; flex-shrink: 0; font-size: 12px; }

  /* Activity row name colors */
  .act-Coding        { color: #5b9cf5; }
  .act-Debugging     { color: #f59b5b; }
  .act-FeatureDev    { color: #91f55b; }
  .act-Delegation    { color: #f55bb5; }
  .act-Exploration   { color: #5bf5e4; }
  .act-Conversation  { color: #888; }
  .act-Testing       { color: #c85bf5; }
  .act-Brainstorming { color: #f5d15b; }
  .act-BuildDeploy   { color: #5bf59b; }
  .act-Refactoring   { color: #5b9cf5; }
  .act-Planning      { color: #f5a05b; }
  .act-General       { color: #888; }

  /* ── Full-width panels ── */
  .full-width { grid-column: 1 / -1; }

  /* ── MCP panel ── */
  .mcp-empty { color: #555; font-size: 12px; padding: 4px 0; }

  /* ── Bottom bar ── */
  .bottom-bar {
    margin: 12px 16px 16px;
    border-top: 1px solid #2a2a40;
    padding-top: 10px;
    display: flex;
    gap: 20px;
    color: #555;
    font-size: 12px;
    justify-content: center;
  }
  .bottom-bar span { color: #ff8c42; }
  .kbd {
    background: #1e1e2e;
    border: 1px solid #333;
    border-radius: 3px;
    padding: 1px 5px;
    color: #888;
    font-size: 11px;
  }
</style>
</head>
<body>

<!-- Nav tabs -->
<div class="topnav">
  <div class="nav-tab ${period==='today'?'active':''}">Today</div>
  <div class="nav-tab ${period==='week'?'active':''}">[ 7 Days ]</div>
  <div class="nav-tab ${period==='30days'?'active':''}">30 Days</div>
  <div class="nav-tab ${period==='month'?'active':''}">This Month</div>
  <div style="flex:1"></div>
  <div style="color:#ff8c42;font-size:12px">[p] All</div>
</div>

<!-- Header -->
<div class="header-card">
  <div class="header-title">TokenBurn <span>${periodLabel}</span></div>
  <div class="header-stats">
    <div><span class="stat-cost">${fmtCost(totalCost)}</span><span class="stat-label"> cost</span></div>
    <div><span class="stat-val">${totalCalls.toLocaleString()}</span><span class="stat-label"> calls</span></div>
    <div><span class="stat-val">${totalSessions}</span><span class="stat-label"> sessions</span></div>
    <div><span class="stat-val">${cacheHit}%</span><span class="stat-label"> cache hit</span></div>
  </div>
  <div class="header-tokens">
    ${fmtK(totalInput)} in &nbsp; ${fmtK(totalOutput)} out &nbsp; ${fmtK(totalCacheRead)} cached &nbsp; ${fmtK(totalCacheWrite)} written
  </div>
</div>

<div class="grid">

  <!-- Daily Activity -->
  <div class="panel panel-cyan">
    <div class="panel-title">Daily Activity</div>
    <div class="col-headers">
      <div class="col-h">cost</div>
      <div class="col-h2">calls</div>
    </div>
    ${daily.map(d => `
    <div class="row">
      <div class="row-label">${d['Date'].slice(5)}</div>
      ${barHtml(d['Cost (USD)'], maxDailyCost)}
      <div class="row-cost">${fmtCost(d['Cost (USD)'])}</div>
      <div class="row-count">${d['API Calls']}</div>
    </div>`).join('')}
  </div>

  <!-- By Project -->
  <div class="panel panel-green">
    <div class="panel-title">By Project</div>
    <div class="col-headers">
      <div class="col-h">cost</div>
      <div class="col-h2">sess</div>
    </div>
    ${allProjects.slice(0,8).map(p => {
      const name = p['Project'].replace(/^\/Users\/[^/]+\//, '').replace(/^\/home\/[^/]+\//, '')
      return `
    <div class="row">
      ${barHtml(p['Cost (USD)'], maxProject)}
      <div class="row-name" title="${p['Project']}">${name}</div>
      <div class="row-cost">${fmtCost(p['Cost (USD)'])}</div>
      <div class="row-count">${p['Sessions']}</div>
    </div>`}).join('')}
  </div>

  <!-- By Activity -->
  <div class="panel panel-yellow">
    <div class="panel-title">By Activity</div>
    <div class="col-headers">
      <div class="col-h">cost</div>
      <div class="col-h2">turns</div>
      <div class="col-h2">1-shot</div>
    </div>
    ${activity.map(a => {
      const key = a['Activity'].replace(/[^a-zA-Z]/g,'')
      const oneShotPct = a['One-Shot %'] != null ? `<div class="row-pct" style="color:#5bf5a0">${a['One-Shot %']}%</div>`
                       : `<div class="row-pct" style="color:#444">  –</div>`
      return `
    <div class="row">
      ${barHtml(a['Cost (USD)'], maxActivity)}
      <div class="row-name act-${key}">${a['Activity']}</div>
      <div class="row-cost">${fmtCost(a['Cost (USD)'])}</div>
      <div class="row-count">${a['Turns']}</div>
      ${oneShotPct}
    </div>`}).join('')}
  </div>

  <!-- By Model -->
  <div class="panel panel-purple">
    <div class="panel-title">By Model</div>
    <div class="col-headers">
      <div class="col-h">cost</div>
      <div class="col-h2">calls</div>
    </div>
    ${models.map(m => `
    <div class="row">
      ${barHtml(m['Cost (USD)'], maxModel)}
      <div class="row-name">${m['Model']}</div>
      <div class="row-cost">${fmtCost(m['Cost (USD)'])}</div>
      <div class="row-count">${m['API Calls']}</div>
    </div>`).join('')}
  </div>

  <!-- Core Tools -->
  <div class="panel panel-teal">
    <div class="panel-title">Core Tools</div>
    <div class="col-headers"><div class="col-h">calls</div></div>
    ${tools.slice(0,10).map(t => `
    <div class="row">
      ${barHtml(t['Calls'], maxTool)}
      <div class="row-name">${t['Tool']}</div>
      <div class="row-cost" style="color:#ccc">${t['Calls']}</div>
    </div>`).join('')}
  </div>

  <!-- Shell Commands -->
  <div class="panel panel-shell">
    <div class="panel-title">Shell Commands</div>
    <div class="col-headers"><div class="col-h">calls</div></div>
    ${shellCommands.slice(0,10).map(s => `
    <div class="row">
      ${barHtml(s['Calls'], maxShell)}
      <div class="row-name">${s['Command']}</div>
      <div class="row-cost" style="color:#ccc">${s['Calls']}</div>
    </div>`).join('')}
  </div>

  <!-- MCP Servers -->
  <div class="panel panel-mcp full-width">
    <div class="panel-title">MCP Servers</div>
    <div class="mcp-empty">No MCP usage</div>
  </div>

</div>

<!-- Bottom bar -->
<div class="bottom-bar">
  <span>⟵ switch</span>
  <span>q quit</span>
  <span><span class="kbd">1</span> today</span>
  <span><span class="kbd">2</span> week</span>
  <span><span class="kbd">3</span> 30 days</span>
  <span><span class="kbd">4</span> month</span>
  <span><span class="kbd">p</span> provider</span>
</div>

</body>
</html>`

const outFile = join(tmpdir(), `tokenburn-${period}-${Date.now()}.html`)
writeFileSync(outFile, html)
console.log(`Opening dashboard: ${outFile}`)

// Open in browser
const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
spawnSync(opener, [outFile], { stdio: 'ignore' })
