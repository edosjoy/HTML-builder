const fs = require('fs');
const dir = __dirname;

fs.readdir(dir, (err, files) => {
  if (err) throw err.message;

  if (!files.includes('files-copy')) {
    fs.mkdir(`${dir}/files-copy`, error => {
      if (error) throw error.message;
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