const
  fs = require('fs'),
  path = require('path');

const dir = path.join(__dirname);

fs.readdir(dir, (errReaddir, files) => {
  if (errReaddir) throw errReaddir;

  if (!files.includes('files-copy')) {
    fs.mkdir(`${dir}/files-copy`, errMkdir => {
      if (errMkdir) throw errMkdir;
    });
  }
});

fs.readdir(`${dir}/files`, (errReaddir, files) => {
  if (errReaddir) throw errReaddir;

  files.forEach(file => {
    fs.copyFile(`${dir}/files/${file}`, `${dir}/files-copy/${file}`, errCopyFile => {
      if (errCopyFile) throw errCopyFile;
    });
  });

  console.log('-= Files copied =-');
});