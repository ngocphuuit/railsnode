var http = require('http');
var port = process.env.PORT || 3000;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(new Date() + '\n');
}).listen(port);

console.log('Server running on port %s', port);
