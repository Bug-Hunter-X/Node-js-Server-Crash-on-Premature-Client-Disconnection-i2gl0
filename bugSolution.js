const http = require('http');

const server = http.createServer((req, res) => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    if (count === 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!');
    }
  }, 1000);

  req.on('close', () => {
    console.error('Client closed connection prematurely');
    clearInterval(interval); // Ensure cleanup even if client disconnects
    res.destroy(); // Destroy the response object to prevent errors
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});