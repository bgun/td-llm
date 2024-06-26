// Load the HTTP module
const http = require('http');
const url = require('url');

// Define the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL and query string
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Get the message from the query string, or use a default message
  const message = query.message || 'Hello, World!';

  // Set the response HTTP headers with HTTP status and content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // Define the JSON response
  const response = {
    message: message,
    timestamp: new Date().toISOString()
  };

  // Send the JSON response
  res.end(JSON.stringify(response));
});

// Listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
