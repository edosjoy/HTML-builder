const
  fs = require('fs'),
  path = require('path');

const dir = path.join(__dirname, '/secret-folder');

fs.readdir(dir, (errReaddir, files) => {
  if (errReaddir) throw errReaddir;

  files.forEach(file => {
    fs.stat(`${dir}/${file}`, (errStat, stats) => {
      if (errStat) throw errStat;

      if (stats.isFile()) {
        console.log(`${path.parse(file).name} - ${file.split('.')[1]} - ${(stats.size / 1024).toFixed(3)} kb`);
      }
    });
  });
});