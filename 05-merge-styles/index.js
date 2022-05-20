const
  fs = require('fs'),
  path = require('path');

const dir = path.join(__dirname);

fs.open(`${dir}/project-dist/bundle.css`, 'w', errOpen => {
  if (errOpen) throw errOpen;
});

fs.readdir(`${dir}/styles`, (errReaddir, files) => {
  if (errReaddir) throw errReaddir;

  files.forEach(file => {
    fs.stat(`${dir}/styles/${file}`, (errStat, stats) => {
      if (errStat) throw errStat;

      if (stats.isFile() && file.split('.')[1] === 'css') {
        fs.readFile(`${dir}/styles/${file}`, 'utf-8', (errReadFile, data) => {
          if (errReadFile) throw errReadFile;

          fs.appendFile(`${dir}/project-dist/bundle.css`, `${data}\n`, errAppendFile => {
            if (errAppendFile) throw errAppendFile;
          });
        });
      }
    });
  });
});