const
  fs = require('fs'),
  fsProm = fs.promises,
  path = require('path');

const
  dir = path.join(__dirname),
  dirProjectDist = path.join(dir, '/project-dist'),
  dirAssets = path.join(dir, '/assets'),
  dirComponents = path.join(dir, '/components'),
  dirStyles = path.join(dir, '/styles');

fsProm.readdir(dir).then(async files => {
  if (!files.includes('project-dist')) {
    await fsProm.mkdir(dirProjectDist).then();
  }
  createFileIndexHtml();
  createFileStyleCss();
  copyFolderAssets();
});

function createFileIndexHtml() {
  fs.open(`${dirProjectDist}/index.html`, 'w', errOpen => {
    if (errOpen) throw errOpen;
  });

  fsProm.readdir(dirComponents).then(files => {
    fs.readFile(`${dir}/template.html`, 'utf-8', async (errReadFile, data) => {
      if (errReadFile) throw errReadFile;

      data = data.split('\n');

      for (const item of data) {
        let section = 0;
        for (const file of files) {
          if (item.includes(file.split('.')[0])) {
            await fsProm.readFile(`${dirComponents}/${file.split('.')[0]}.html`, 'utf-8').then(async dataSection => {
              await fsProm.appendFile(`${dirProjectDist}/index.html`, `${dataSection}\n`);
            });
            section = 1;
          }
        }

        if (section === 0) {
          await fsProm.appendFile(`${dirProjectDist}/index.html`, `${item}\n`);
        }
      }

    });
  });
}

function createFileStyleCss() {
  fs.open(`${dirProjectDist}/style.css`, 'w', errOpen => {
    if (errOpen) throw errOpen;
  });

  fs.readdir(dirStyles, 'utf-8', async (errReaddir, files) => {
    if (errReaddir) throw errReaddir;

    for (const file of files) {
      await fsProm.readFile(`${dirStyles}/${file}`, 'utf-8').then(async data => {
        await fsProm.appendFile(`${dirProjectDist}/style.css`, data);
      });
    }
  });
}

function copyFolderAssets() {
  fsProm.readdir(dirProjectDist).then(files => {
    if (!files.includes('assets')) {
      fsProm.mkdir(`${dirProjectDist}/assets`).then(() => {
        fsProm.mkdir(`${dirProjectDist}/assets/fonts`).then(() => {
          fsProm.readdir(`${dirAssets}/fonts`).then(files => {
            for (const file of files) {
              fs.copyFile(`${dirAssets}/fonts/${file}`, `${dirProjectDist}/assets/fonts/${file}`, err => {
                if (err) throw err;
              });
            }
          });
        });
        fsProm.mkdir(`${dirProjectDist}/assets/img`).then(() => {
          fsProm.readdir(`${dirAssets}/img`).then(files => {
            for (const file of files) {
              fs.copyFile(`${dirAssets}/img/${file}`, `${dirProjectDist}/assets/img/${file}`, err => {
                if (err) throw err;
              });
            }
          });
        });
        fsProm.mkdir(`${dirProjectDist}/assets/svg`).then(() => {
          fsProm.readdir(`${dirAssets}/svg`).then(files => {
            for (const file of files) {
              fs.copyFile(`${dirAssets}/svg/${file}`, `${dirProjectDist}/assets/svg/${file}`, err => {
                if (err) throw err;
              });
            }
          });
        });
      });
    } else {
      fsProm.readdir(`${dirAssets}/fonts`).then(files => {
        for (const file of files) {
          fs.copyFile(`${dirAssets}/fonts/${file}`, `${dirProjectDist}/assets/fonts/${file}`, err => {
            if (err) throw err;
          });
        }
      });

      fsProm.readdir(`${dirAssets}/img`).then(files => {
        for (const file of files) {
          fs.copyFile(`${dirAssets}/img/${file}`, `${dirProjectDist}/assets/img/${file}`, err => {
            if (err) throw err;
          });
        }
      });

      fsProm.readdir(`${dirAssets}/svg`).then(files => {
        for (const file of files) {
          fs.copyFile(`${dirAssets}/svg/${file}`, `${dirProjectDist}/assets/svg/${file}`, err => {
            if (err) throw err;
          });
        }
      });
    }
  });
}