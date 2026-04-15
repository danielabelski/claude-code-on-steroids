---
description: "Show a full token & cost analytics dashboard — by day, project, model, activity, tools, and shell commands"
---

Run this exact command in your Bash tool and display the output verbatim:

```
COLUMNS=120 FORCE_COLOR=1 tokenburn report --period PERIOD 2>&1 | cat
```

Replace PERIOD based on the user's argument:
- No args or `today`     → `today`
- `week` or `7d`         → `week`
- `30d` or `30days`      → `30days`
- `month`                → `month`

Default when no argument given: `week`

Show the full output exactly as returned — do not summarize, trim, reformat, or add commentary.

If `tokenburn` is not found in PATH, tell the user:
"tokenburn is not installed. Re-run the installer: bash ~/.claude/plugins/superpowers-overrides/install.sh"
