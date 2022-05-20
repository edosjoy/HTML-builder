const
  fs = require('fs'),
  path = require('path'),
  dir = path.join(__dirname, '/text.txt');

const stream = new fs.ReadStream(dir, 'utf-8');

stream.on('readable', () => {
  const data = stream.read();
  if (data !== null) {
    console.log(data);
  }
});