const https = require('https');
https.get('https://takongwd.github.io/index.html', { headers: { 'User-Agent': 'Node.js' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (data.includes('v1.2.8')) console.log('Found v1.2.8!');
    else if (data.includes('v1.2.7')) console.log('Found v1.2.7!');
    else console.log('Version string not found directly in index.html (it might be in JS chunks)');
  });
});
