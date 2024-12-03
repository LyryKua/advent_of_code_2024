const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = __dirname;

fs.readdirSync(baseDir).forEach(folder => {
  const folderPath = path.join(baseDir, folder);
  if (fs.statSync(folderPath).isDirectory() && folder.startsWith('d')) {
    const indexPath = path.join(folderPath, 'index.js');
    if (fs.existsSync(indexPath)) {
      execSync(`node ${indexPath}`, { stdio: 'inherit' });
    }
  }
});
