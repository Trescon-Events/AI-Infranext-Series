/**
 * AI InfraNext Series Build Tool
 * Compiles and builds the production distribution for Cloudflare Pages.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('=== AI InfraNext Series Build Process ===');

// 1. Run validation
console.log('Running compliance and structure validation...');
try {
  execSync('node tools/validate-series.js', { stdio: 'inherit', cwd: rootDir });
} catch (err) {
  console.error('Build aborted: Validation failed.');
  process.exit(1);
}

// 2. Prepare dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 3. Helper to copy recursive
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

// 4. Copy files to dist
const itemsToCopy = ['index.html', '_redirects', 'assets', 'insights'];
itemsToCopy.forEach(item => {
  const src = path.join(rootDir, item);
  const dest = path.join(distDir, item);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log(`Copied ${item} -> dist/${item}`);
  }
});

console.log('Build completed successfully. Output ready in /dist');
