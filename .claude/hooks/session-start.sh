#!/bin/bash
set -euo pipefail
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi
cd "$CLAUDE_PROJECT_DIR"
npm install 2>/dev/null || true
npm install -g @playwright/mcp@latest 2>/dev/null || true
npx playwright install chromium 2>/dev/null || true
claude mcp remove playwright 2>/dev/null || true
claude mcp add --scope user playwright playwright-mcp -- \
  --config "$CLAUDE_PROJECT_DIR/.claude/playwright-mcp.config.json" \
  --headless