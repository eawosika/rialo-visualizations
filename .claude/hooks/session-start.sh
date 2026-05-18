#!/bin/bash
set -euo pipefail
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi
cd "$CLAUDE_PROJECT_DIR"
npm install 2>/dev/null || true
npx @playwright/mcp install-browser chromium 2>/dev/null || true
claude mcp remove playwright 2>/dev/null || true
claude mcp add playwright npx @playwright/mcp@latest -- \
  --config "$CLAUDE_PROJECT_DIR/.claude/playwright-mcp.config.json" \
  --headless