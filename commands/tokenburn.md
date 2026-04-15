---
description: "Show a full token & cost analytics dashboard — by day, project, model, activity, tools, and shell commands"
---

Run the appropriate command below based on the user's argument. This opens the full colorful interactive TokenBurn dashboard in a native terminal window (required because Claude Code's output panel strips all ANSI colors).

Replace PERIOD in the command based on the user's argument:
- No args or `week`  → `week`
- `today`            → `today`
- `30d` or `30days`  → `30days`
- `month`            → `month`

Default when no argument given: `week`

**Step 1 — Open the dashboard in a native terminal window:**

```bash
osascript -e 'tell app "Terminal" to do script "COLUMNS=120 tokenburn report --period PERIOD"'
```

**Step 2 — Tell the user:**

> TokenBurn opened in a new terminal window with full colors and interactive controls.
> Use `1` today · `2` week · `3` 30 days · `4` month · `p` switch provider · `q` quit

If `osascript` fails (non-macOS), fall back to this and tell the user to run it directly in their terminal:
```
COLUMNS=120 FORCE_COLOR=1 tokenburn report --period PERIOD 2>&1 | cat
```

If `tokenburn` is not found, tell the user:
"tokenburn is not installed. Re-run the installer: `bash ~/.claude/plugins/superpowers-overrides/install.sh`"
