var http = require('http');
var url = require('url');
var fs = require('fs');
console.log("Starting Server");
http.createServer(function (req, res) {
  console.log(req.rawHeaders[13]);
  console.log(req.url);
  
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (req.rawHeaders[13] === "1") {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<script>document.location.href='/index.html'</script>");
      console.log(req.rawHeaders[13]);
    }
    if (req.url === '/app') {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<script>document.location.href='/app/index.html'</script>");
      console.log(req.rawHeaders[13]);
    }
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    
    console.log(req.rawHeaders[13]);
    
    res.writeHead(200);
    res.write(data);
    return res.end();
  });
}).listen(80,'0.0.0.0');
console.log("Dev Server Initialised");
console.log({'Content-Type': 'text/html'});
