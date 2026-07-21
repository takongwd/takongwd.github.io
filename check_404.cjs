const fs = require('fs');

console.log("=== Checking root & public files ===");
if (fs.existsSync('public')) {
  console.log("public/ contents:", fs.readdirSync('public'));
}
if (fs.existsSync('404.html')) {
  console.log("root 404.html exists");
}
