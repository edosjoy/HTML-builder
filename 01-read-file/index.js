const fs = require('fs');
const path = `${__dirname}/text.txt`;
const stream = new fs.ReadStream(path, {encoding: 'utf-8'});

stream.on('readable', () => {
  const data = stream.read();
  if (data !== null) {
    console.log(data);
  }
});