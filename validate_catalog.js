const fs = require('fs');
const path = require('path');

const catalog = require('./assets/js/data/catalog.js');
if (!catalog) {
  console.error("FAIL: catalog not loaded");
  process.exit(1);
}

console.log("Validating GAMETELIER_CATALOG...");
let errors = 0;
let checkedFiles = 0;

function checkFile(filePath, context) {
  if (!filePath) return;
  checkedFiles++;
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[ERROR] File missing: "${filePath}" in ${context}`);
    errors++;
  } else {
    // Check file size > 0
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      console.error(`[ERROR] File is empty: "${filePath}" in ${context}`);
      errors++;
    }
  }
}

// 1. Studio Info
if (catalog.studioInfo) {
  checkFile(catalog.studioInfo.logo, 'studioInfo.logo');
  checkFile(catalog.studioInfo.favicon, 'studioInfo.favicon');
}

// 2. Categories
for (const [catKey, cat] of Object.entries(catalog.categories || {})) {
  for (const item of cat.items || []) {
    checkFile(item.image, `${catKey} item "${item.id}" (image)`);
    if (Array.isArray(item.screenshots)) {
      for (const s of item.screenshots) {
        checkFile(s, `${catKey} item "${item.id}" (screenshot)`);
      }
    }
    if (Array.isArray(item.implementations)) {
      for (const impl of item.implementations) {
        checkFile(impl.image, `${catKey} item "${item.id}" impl "${impl.id}" (image)`);
      }
    }
  }
}

console.log(`Checked ${checkedFiles} referenced files.`);
if (errors === 0) {
  console.log(">>> ALL CATALOG ASSETS VALIDATED AND EXIST ON DISK! <<<");
  process.exit(0);
} else {
  console.error(`>>> FAILED WITH ${errors} ERRORS <<<`);
  process.exit(1);
}
