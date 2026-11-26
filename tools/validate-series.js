const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');

console.log('--- AI InfraNext Series Validation Suite ---');

if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: index.html not found!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
let errors = 0;
let warnings = 0;

// 1. Forbidden Terms Check
const forbiddenPatterns = [
  { pattern: /by invitation only/i, msg: 'Forbidden phrase: "By invitation only" is strictly prohibited. Use "By invitation" with qualified delegate audience.' },
  { pattern: /\bAI Infranext\b/, msg: 'Forbidden naming: "AI Infranext" has lowercase "n". Must be "AI InfraNext".' },
  { pattern: /\bAI Infra Next\b/, msg: 'Forbidden naming: "AI Infra Next" is separated. Must be closed-up "AI InfraNext".' },
  { pattern: /\bthe AI InfraNext\b/i, msg: 'Forbidden grammar: Do not place "the" before "AI InfraNext".' },
  { pattern: /\bAIN\b/, msg: 'Forbidden abbreviation: "AIN" is prohibited. Always write "AI InfraNext".' },
  { pattern: /\bAIIN\b/, msg: 'Forbidden abbreviation: "AIIN" is prohibited. Always write "AI InfraNext".' },
  { pattern: /\$\s*\d{1,3}(,\d{3})*(\s*k|\s*K)?\b/, msg: 'Commercial violation: Pricing figure detected. Sponsorship prices must never appear on public site.' }
];

forbiddenPatterns.forEach(({ pattern, msg }) => {
  const match = html.match(pattern);
  if (match) {
    console.error(`❌ [Brand Violation] ${msg} Found: "${match[0]}"`);
    errors++;
  }
});

// 2. Mandatory Editorial Phrasings Verification
const mandatoryPhrases = [
  { text: 'The infrastructure beneath enterprise AI', label: 'Series Descriptor' },
  { text: 'Where AI infrastructure meets enterprise demand', label: 'Commercial Proposition' },
  { text: 'From announced to operational', label: 'Series Thesis' },
  { text: 'AI InfraNext', label: 'Brand Name' },
  { text: 'Trescon', label: 'Organiser' }
];

mandatoryPhrases.forEach(({ text, label }) => {
  if (!html.includes(text)) {
    console.warn(`⚠️ [Missing Phrasing] Expected ${label} ("${text}") not found.`);
    warnings++;
  } else {
    console.log(`✅ [Verified] ${label}: "${text}"`);
  }
});

// 3. HTML Tag Balance Check for Critical Containers
const tagsToCheck = ['div', 'section', 'nav', 'header', 'footer', 'main', 'script', 'style'];
tagsToCheck.forEach(tag => {
  const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
  const closeRegex = new RegExp(`</${tag}>`, 'gi');
  const openCount = (html.match(openRegex) || []).length;
  const closeCount = (html.match(closeRegex) || []).length;
  if (openCount !== closeCount) {
    console.error(`❌ [Tag Mismatch] <${tag}> open count (${openCount}) does not match close count (${closeCount})!`);
    errors++;
  } else {
    console.log(`✅ [Balanced] <${tag}>: ${openCount} open, ${closeCount} closed.`);
  }
});

// 4. Asset Reference Check
const assetMatches = html.match(/src="([^"]+)"|href="([^"]+)"/g) || [];
const checkedAssets = new Set();
assetMatches.forEach(match => {
  const urlMatch = match.match(/["']([^"']+)["']/);
  if (urlMatch) {
    const rawUrl = urlMatch[1].split('?')[0].split('#')[0];
    if (rawUrl.startsWith('/assets/') || rawUrl.startsWith('assets/')) {
      const relPath = rawUrl.startsWith('/') ? rawUrl.substring(1) : rawUrl;
      if (!checkedAssets.has(relPath)) {
        checkedAssets.add(relPath);
        const diskPath = path.join(rootDir, relPath);
        if (!fs.existsSync(diskPath)) {
          console.warn(`⚠️ [Missing Asset] Referenced asset does not exist on disk: ${relPath}`);
          warnings++;
        }
      }
    }
  }
});

console.log('--- Summary ---');
console.log(`Errors: ${errors}, Warnings: ${warnings}`);

if (errors > 0) {
  console.error('FAILED: Validation found errors that must be resolved.');
  process.exit(1);
} else {
  console.log('PASSED: All compliance and structural checks succeeded.');
}
