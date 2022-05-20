const
  fs = require('fs'),
  path = require('path'),
  readline = require('readline');

const dir = path.join(__dirname, '/text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(dir, 'w', errOpen => {
  if (errOpen) throw errOpen;
});

function writeFile() {
  rl.question('Input text here: ', answer => {

    if (answer === 'exit') {
      console.log('The process is closed');
      return rl.close();
    }

    fs.appendFile(dir, `${answer}\n`, errAppendFile => {
      if (errAppendFile) throw errAppendFile;
    });

    writeFile();
  });
}

writeFile();