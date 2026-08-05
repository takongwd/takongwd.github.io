const https = require('https');
https.get('https://takongwd.github.io/index.html', { headers: { 'User-Agent': 'Node.js', 'Cache-Control': 'no-cache' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="(\.?\/assets\/index-[^"]+\.js)"/);
    if (match) {
      const jsUrl = 'https://takongwd.github.io' + match[1];
      console.log('Fetching JS chunk:', jsUrl);
      https.get(jsUrl, { headers: { 'User-Agent': 'Node.js', 'Cache-Control': 'no-cache' } }, jsRes => {
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          if (jsData.includes('1.2.8')) console.log('Live site has v1.2.8 JS chunk!');
          else if (jsData.includes('1.2.7')) console.log('Live site STILL HAS v1.2.7 JS chunk!');
          else console.log('Version not found in JS chunk either');
        });
      });
    } else {
      console.log('No JS chunk found in index.html');
    }
  });
});
