#!/usr/bin/env node
// Ensures Playwright chromium is installed, then starts the MCP server.
const { execFileSync, spawn } = require("child_process");
const path = require("path");

try {
  execFileSync(
    "npx", ["@playwright/mcp", "install-browser", "chromium"],
    { stdio: "ignore", timeout: 120000 }
  );
} catch (e) {}

const proc = spawn(
  "npx",
  ["@playwright/mcp@latest",
   "--config", path.join(__dirname, "playwright-mcp.config.json"),
   "--headless"],
  { stdio: "inherit" }
);
proc.on("exit", code => process.exit(code || 0));