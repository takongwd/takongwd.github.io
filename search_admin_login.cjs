const fs = require('fs');
const filepath = 'f:/Project Antigravity/TakongWeddingLaos/src/context/AppDataContext.tsx';
const content = fs.readFileSync(filepath, 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('adminLogin') || line.includes('signInWithPassword') || line.includes('takong.nov25')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
