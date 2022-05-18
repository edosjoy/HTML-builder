const fs = require('fs');
const readline = require('readline');

const path = `${__dirname}/text.txt`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(path, 'w', (err) => {
  if (err) {
    throw err.message;
  }
});

function writeFile() {
  rl.question('Input text here: ', (answer) => {

    if (answer === 'exit') {
      console.log('The process is closed');
      return rl.close();
    }

    fs.appendFile(path, `${answer}\n`, (err) => {
      if (err) {
        throw err.message;
      }
    });

    writeFile();
  });
}

writeFile();