const
  fs = require('fs'),
  path = require('path');
const dir = __dirname + '/secret-folder';

fs.readdir(dir, (err, files) => {
  if (err) {
    throw err.message;
  }

  files.forEach(file => {

    fs.stat(`${__dirname}/secret-folder/${file}`, (error, stats) => {
      if (stats.isFile()) {
        console.log(`${path.parse(file).name} - ${file.split('.')[1]} - ${(stats.size / 1024).toFixed(3)} kb`);
      }
    });
  });
});