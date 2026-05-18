## Browser access
- Playwright MCP is availab

## Dev server
When making frontend changes that need visual verification, start the dev server automatically (check package.json for the right command), use browser tools to verify the changes look correct at desktop (1280px) and mobile (375px), and stop the server when done. Don't ask whether to start it — just do it.

## Settings

Allowed tools are pre-approved via `.claude/settings.json` — Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch, Playwright, GitHub, Cloudflare, and Google Drive MCP tools all run without permission prompts.
