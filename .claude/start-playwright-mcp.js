#!/usr/bin/env node
const { execFileSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Derive absolute paths from the running node binary — never rely on PATH
const nodeBin = path.dirname(process.execPath);
const npx = path.join(nodeBin, process.platform === "win32" ? "npx.cmd" : "npx");
const globalPwMcp = path.join(nodeBin, process.platform === "win32" ? "playwright-mcp.cmd" : "playwright-mcp");

function findPlaywrightChromium() {
  const cacheDir = process.env.PLAYWRIGHT_BROWSERS_PATH ||
    path.join(os.homedir(), ".cache", "ms-playwright");
  if (!fs.existsSync(cacheDir)) return null;
  for (const dir of fs.readdirSync(cacheDir)) {
    if (!dir.startsWith("chromium")) continue;
    for (const rel of [
      "chrome-linux/chrome",
      "chrome-win/chrome.exe",
      "chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    ]) {
      const p = path.join(cacheDir, dir, rel);
      if (fs.existsSync(p)) return p;
    }
  }
  return null;
}

function findFallbackChrome() {
  const puppeteerBase = path.join(os.homedir(), ".cache", "puppeteer", "chrome");
  if (fs.existsSync(puppeteerBase)) {
    for (const ver of fs.readdirSync(puppeteerBase)) {
      for (const rel of ["chrome-linux64/chrome", "chrome-win64/chrome.exe"]) {
        const p = path.join(puppeteerBase, ver, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  for (const p of [
    "/usr/bin/google-chrome-stable", "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser", "/usr/bin/chromium",
    "/opt/google/chrome/chrome", "/snap/bin/chromium",
  ]) {
    try { if (fs.statSync(p).isFile()) return p; } catch (e) {}
  }
  return null;
}

const configPath = path.join(__dirname, "playwright-mcp.config.json");
const extraArgs = [];

if (!findPlaywrightChromium()) {
  let installed = false;
  try {
    execFileSync(npx, ["@playwright/mcp", "install-browser", "chromium"],
      { stdio: "ignore", timeout: 120000 });
    installed = true;
  } catch (e) {}
  if (!installed) {
    const fallback = findFallbackChrome();
    if (fallback) {
      process.stderr.write("[playwright-mcp] fallback Chrome: " + fallback + "\n");
      extraArgs.push("--executable-path", fallback);
    }
  }
}

// Use globally installed playwright-mcp if present (faster); otherwise npx
const [cmd, cmdArgs] = fs.existsSync(globalPwMcp)
  ? [globalPwMcp, ["--config", configPath, "--headless", ...extraArgs]]
  : [npx, ["@playwright/mcp@latest", "--config", configPath, "--headless", ...extraArgs]];

const proc = spawn(cmd, cmdArgs, { stdio: "inherit" });
proc.on("exit", code => process.exit(code || 0));