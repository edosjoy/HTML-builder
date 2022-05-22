const
  fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  process = require('process');

const dir = path.join(__dirname, '/text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let message = '\nThe process is closed';

process.on('exit', () => {
  console.log(message);
});

fs.open(dir, 'w', errOpen => {
  if (errOpen) throw errOpen;
});

function writeFile() {
  rl.question('Input text here: ', answer => {

    if (answer === 'exit') {
      message = 'The process is closed';
      return rl.close();
    }

    fs.appendFile(dir, `${answer}\n`, errAppendFile => {
      if (errAppendFile) throw errAppendFile;
    });

    writeFile();
  });
}

writeFile();