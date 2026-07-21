const fs = require('fs');

const code = fs.readFileSync('f:/Project Antigravity/TakongWeddingLaos/src/pages/AdminDashboard.tsx', 'utf8');
const lines = code.split('\n');

console.log("=== SEARCHING COVER & PHOTO SAVE FUNCTIONS IN ADMIN DASHBOARD ===");
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('cover') || line.toLowerCase().includes('herobg') || line.toLowerCase().includes('updatesettings') || line.toLowerCase().includes('updatealbum')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
