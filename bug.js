const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate a long-running operation
  let count = 0;
  const interval = setInterval(() => {
    count++;
    if (count === 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!');
    }
  }, 1000);

  //If the client closes the connection before the response is ready, this will cause an error
  req.on('close', () => {
    console.error('Client closed connection prematurely');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});