const https = require('https');
https.get('https://api.github.com/repos/takongwd/takongwd.github.io/actions/runs?per_page=100', { headers: { 'User-Agent': 'Node.js' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const runs = JSON.parse(data).workflow_runs;
    const deployRuns = runs.filter(r => r.name.includes('Deploy'));
    deployRuns.slice(0, 3).forEach(r => {
      console.log(`${r.name} - ${r.status} - ${r.conclusion} - ${r.created_at} - ${r.head_branch}`);
    });
  });
});
