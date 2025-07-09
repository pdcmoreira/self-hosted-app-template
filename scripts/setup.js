#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultValues = {
  name: "my-app",
  description: "Self-hosted application",
  author: "my-user",
};

const FILES_TO_UPDATE = [
  "package.json",
  "backend/package.json",
  "frontend/package.json",
  "shared/package.json",
  "ecosystem.config.js",
  "backend/src/server.ts",
  "README.md",
  "scripts/update-readme-version.js",
];

// Current values to search for
const CURRENT = {
  name: "self-hosted-app-template",
  author: "pdcmoreira",
};

function askQuestion(query, defaultVal) {
  return new Promise((resolve) => {
    rl.question(`${query} (${defaultVal}): `, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

async function updateFile(filePath, replacements) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf-8");
  let updated = content;

  for (const [search, replace] of Object.entries(replacements)) {
    // Create a global regex for the search term
    // Escape special characters in the search term just in case
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearch, "g");
    updated = updated.replace(regex, replace);
  }

  if (filePath.endsWith("package.json")) {
    // Also reset version to 0.0.1 for package.json files
    try {
      const json = JSON.parse(updated);
      json.version = "0.0.1";
      updated = JSON.stringify(json, null, 2) + "\n"; // Preserve formatting
    } catch (e) {
      console.warn(`⚠️  Failed to parse JSON for version reset in ${filePath}`);
    }
  }

  if (content !== updated) {
    fs.writeFileSync(fullPath, updated, "utf-8");
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

async function main() {
  console.log("🚀  Self-Hosted App Template Setup");
  console.log("-----------------------------------");
  console.log("This script will configure the template for your new project.");
  console.log("");

  const name = await askQuestion("Project Name (slug)", defaultValues.name);
  const description = await askQuestion(
    "Project Description",
    defaultValues.description
  );
  const author = await askQuestion(
    "Author / GitHub Owner",
    defaultValues.author
  );

  console.log("");
  console.log("Configuration:");
  console.log(`- Name: ${name}`);
  console.log(`- Description: ${description}`);
  console.log(`- Author: ${author}`);
  console.log("");

  const confirm = await askQuestion("Proceed with changes?", "y");
  if (confirm.toLowerCase() !== "y") {
    console.log("❌  Aborted.");
    rl.close();
    return;
  }

  console.log("");
  console.log("Applying changes...");

  const replacements = {
    [CURRENT.name]: name,
    [CURRENT.author]: author,
    // Special handling for package names if they use scoped packages
    [`@${CURRENT.name}`]: `@${name}`,
    // Specific description replacement only if it matches exactly?
    // It's safer to just let the user edit descriptions manually in package.json later,
    // or we can try to find the specific description string.
    // For now, let's keep it simple and focusing on IDs.
  };

  for (const file of FILES_TO_UPDATE) {
    await updateFile(file, replacements);
  }

  // Handle CHANGELOG.md removal
  if (fs.existsSync("CHANGELOG.md")) {
    fs.unlinkSync("CHANGELOG.md");
    console.log("🗑️  Deleted CHANGELOG.md");
  }

  console.log("");
  console.log("🎉 Setup complete!");
  console.log("");
  console.log("Next steps:");
  console.log("1. Review the changes");
  console.log("2. Run `pnpm install` to refresh lockfiles if needed");
  console.log("3. Start developing!");

  rl.close();
}

main();
