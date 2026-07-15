const fs = require('fs');

const path1 = 'f:/Project Antigravity/TakongWeddingLaos/public/albums/wedding-days-lb-paklai/2.jpg';
const path2 = 'f:/Project Antigravity/TakongWeddingLaos/public/albums/wedding-days-lb-paklai/2.JPG';

console.log(`Checking path1: ${path1} => ${fs.existsSync(path1)}`);
console.log(`Checking path2: ${path2} => ${fs.existsSync(path2)}`);

// Let's also check what files are in that directory if it exists
const dir = 'f:/Project Antigravity/TakongWeddingLaos/public/albums/wedding-days-lb-paklai';
if (fs.existsSync(dir)) {
  console.log(`Files in ${dir}:`, fs.readdirSync(dir));
} else {
  console.log(`Directory does not exist: ${dir}`);
}
