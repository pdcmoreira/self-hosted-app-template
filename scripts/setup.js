#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultValues = {
  name: 'my-app',
  displayName: 'My App',
  description: 'Self-hosted application',
  author: 'my-user',
};

// All files that contain template name references
const FILES_TO_UPDATE = [
  'package.json',
  'backend/package.json',
  'frontend/package.json',
  'shared/package.json',
  'ecosystem.config.js',
  'backend/src/api/routes/health.ts',
  'README.md',
  '.devcontainer/devcontainer.json',
  'frontend/index.html',
  'frontend/public/site.webmanifest',
  'frontend/src/App.vue',
  'frontend/src/views/HomeView.vue',
];

// Current values to search for (order matters - more specific first to avoid partial matches)
const TEMPLATE_SLUG = 'self-hosted-app-template';
const TEMPLATE_DISPLAY_PASCAL = 'SelfHosted'; // Used in App.vue header
const TEMPLATE_DISPLAY_TITLE = 'Self-Hosted App Template'; // Used in HomeView
const TEMPLATE_DISPLAY_SIMPLE = 'Self Hosted App Template'; // Used in README
const TEMPLATE_AUTHOR = 'pdcmoreira';

function askQuestion(query, defaultVal) {
  return new Promise((resolve) => {
    rl.question(`${query} (${defaultVal}): `, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

/**
 * Convert a slug like "my-cool-app" to a display name like "My Cool App"
 */
function slugToDisplayName(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert a slug like "my-cool-app" to PascalCase like "MyCoolApp"
 */
function slugToPascalCase(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function updateFile(filePath, replacements) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let updated = content;

  for (const [search, replace] of Object.entries(replacements)) {
    // Create a global regex for the search term
    // Escape special characters in the search term just in case
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'g');
    updated = updated.replace(regex, replace);
  }

  if (filePath.endsWith('package.json')) {
    // Also reset version to 0.0.1 for package.json files
    try {
      const json = JSON.parse(updated);
      json.version = '0.0.1';
      updated = JSON.stringify(json, null, 2) + '\n'; // Preserve formatting
    } catch (e) {
      console.warn(`⚠️  Failed to parse JSON for version reset in ${filePath}`);
    }
  }

  if (content !== updated) {
    fs.writeFileSync(fullPath, updated, 'utf-8');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

async function main() {
  console.log('🚀  Self-Hosted App Template Setup');
  console.log('-----------------------------------');
  console.log('This script will configure the template for your new project.');
  console.log('');

  const name = await askQuestion('Project Name (slug, e.g. my-cool-app)', defaultValues.name);

  // Derive display name from slug
  const derivedDisplayName = slugToDisplayName(name);
  const displayName = await askQuestion('Display Name', derivedDisplayName);

  const description = await askQuestion('Project Description', defaultValues.description);
  const author = await askQuestion('Author / GitHub Owner', defaultValues.author);

  const pascalName = slugToPascalCase(name);

  console.log('');
  console.log('Configuration:');
  console.log(`- Slug:         ${name}`);
  console.log(`- Display Name: ${displayName}`);
  console.log(`- Pascal Name:  ${pascalName}`);
  console.log(`- Description:  ${description}`);
  console.log(`- Author:       ${author}`);
  console.log('');

  const confirm = await askQuestion('Proceed with changes?', 'y');
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌  Aborted.');
    rl.close();
    return;
  }

  console.log('');
  console.log('Applying changes...');

  // Order matters: replace more specific/longer strings first to avoid partial matches
  const replacements = {
    // Display name variants (longer/more specific first)
    [TEMPLATE_DISPLAY_SIMPLE]: displayName,
    [TEMPLATE_DISPLAY_TITLE]: displayName,
    [TEMPLATE_DISPLAY_PASCAL]: pascalName,
    // Scoped package names
    [`@${TEMPLATE_SLUG}`]: `@${name}`,
    // Slug (must come after scoped to avoid double-replacing the @ prefix part)
    [TEMPLATE_SLUG]: name,
    // Author
    [TEMPLATE_AUTHOR]: author,
  };

  for (const file of FILES_TO_UPDATE) {
    await updateFile(file, replacements);
  }

  // Handle CHANGELOG.md removal
  if (fs.existsSync('CHANGELOG.md')) {
    fs.unlinkSync('CHANGELOG.md');
    console.log('🗑️  Deleted CHANGELOG.md');
  }

  console.log('');
  console.log('🎉 Setup complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review the changes');
  console.log('2. Run `pnpm install` to refresh lockfiles if needed');
  console.log('3. Start developing!');

  rl.close();
}

main();
