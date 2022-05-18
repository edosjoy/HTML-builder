const fs = require('fs');
const dir = __dirname;

fs.open(`${dir}/project-dist/bundle.css`, 'w', errOpen => {
  if (errOpen) throw errOpen.message;
});

fs.readdir(`${dir}/styles`, (errReaddir, files) => {
  if (errReaddir) throw errReaddir.message;

  files.forEach(file => {
    fs.stat(`${dir}/styles/${file}`, (errStat, stats) => {
      if (errStat) throw errStat.message;

      if (stats.isFile() && file.split('.')[1] === 'css') {
        fs.readFile(`${dir}/styles/${file}`, 'utf-8', (errReadFile, data) => {
          if (errReadFile) throw errReadFile.message;

          fs.appendFile(`${dir}/project-dist/bundle.css`, `${data}\n`, errAppendFile => {
            if (errAppendFile) throw errAppendFile.message;
          });
        });
      }
    });
  });
});