#!/usr/bin/env node
const { execFileSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Try playwright's own managed chromium first
let playwrightOk = false;
try {
  execFileSync("npx", ["@playwright/mcp", "install-browser", "chromium"],
    { stdio: "ignore", timeout: 120000 });
  playwrightOk = true;
} catch (e) {}

const args = [
  "@playwright/mcp@latest",
  "--config", path.join(__dirname, "playwright-mcp.config.json"),
  "--headless"
];

// If install failed or browser missing, find an existing Chrome/Chromium
if (!playwrightOk) {
  const home = os.homedir();
  // Puppeteer-managed Chrome (any version sub-dir)
  const puppeteerBase = path.join(home, ".cache", "puppeteer", "chrome");
  let puppeteerExe = null;
  if (fs.existsSync(puppeteerBase)) {
    for (const ver of fs.readdirSync(puppeteerBase)) {
      for (const rel of ["chrome-linux64/chrome", "chrome-win64/chrome.exe"]) {
        const p = path.join(puppeteerBase, ver, rel);
        if (fs.existsSync(p)) { puppeteerExe = p; break; }
      }
      if (puppeteerExe) break;
    }
  }
  const candidates = [
    puppeteerExe,
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/opt/google/chrome/chrome",
    "/snap/bin/chromium",
  ].filter(Boolean);

  const found = candidates.find(p => { try { return fs.statSync(p).isFile(); } catch(e) { return false; } });
  if (found) {
    process.stderr.write("[playwright-mcp] using existing Chrome: " + found + "\n");
    args.push("--executable-path", found);
  }
}

const proc = spawn("npx", args, { stdio: "inherit" });
proc.on("exit", code => process.exit(code || 0));