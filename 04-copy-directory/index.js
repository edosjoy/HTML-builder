const
  fsProm = require('fs/promises'),
  path = require('path');

const dir = path.join(__dirname);

fsProm.readdir(dir).then(files => {
  if (files.includes('files-copy')) {
    fsProm.readdir(`${dir}/files-copy`).then(async filesFolderCopy => {
      for (const file of filesFolderCopy) {
        await fsProm.unlink(`${dir}/files-copy/${file}`);
      }
      fsProm.readdir(`${dir}/files`).then(async files => {
        for (const file of files) {
          await fsProm.copyFile(`${dir}/files/${file}`, `${dir}/files-copy/${file}`);
        }
        console.log('-= Files copied =-');
      });
    });
  } else {
    fsProm.mkdir(`${dir}/files-copy`).then(() => {
      fsProm.readdir(`${dir}/files`).then(async files => {
        for (const file of files) {
          await fsProm.copyFile(`${dir}/files/${file}`, `${dir}/files-copy/${file}`);
        }
        console.log('-= Files copied =-');
      });
    });
  }
});