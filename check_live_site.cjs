const url = "https://takongwd.github.io/";

fetch(url)
  .then(async res => {
    const html = await res.text();
    console.log("Live HTML fetched successfully.");
    
    // Look for script imports to see what bundle is loaded
    const scriptRegex = /src="[^"]*assets\/index-([^"]+)\.js"/g;
    let match;
    console.log("Live script bundles found:");
    while ((match = scriptRegex.exec(html)) !== null) {
      console.log(`- Bundle hash: ${match[1]}`);
    }
  })
  .catch(err => {
    console.error("Failed to fetch live site:", err);
  });
