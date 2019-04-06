var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Starting Server");
http.createServer(function (req, res) {
  console.log(req.rawHeaders[13]);
  console.log(req.url);
  var id = req.url;
  var lastFive = id.substr(id.length - 5); // => "Tabs1"
  console.log(lastFive);
  if (lastFive !== ".html") {
    console.log('Not .html')
    if (lastFive.indexOf('.') > -1) {
      console.log("Addon file, not html");
      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;
      urlext = req.url.split('.').pop();
      console.log(urlext);
      let extension = "text/";
      if (urlext == "css") {
        extension = "text/css";
      }
      else if (urlext == "js") {
        extension="text/js";
      }
      else if (urlext == "jpg") {
        extension="image/jpeg";
      }
      else if (urlext == "png") {
        extension="image/png";
      }
      else {
        extension = ""
      }
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': "text/html"});
          return res.end("404 Not Found");
        }
        
        console.log("!!!Extension: "+{'Content-Type': extension});
        
        res.writeHead(200, {'Content-Type': extension});
        res.write(data);
        return res.end();
      });
    }
    else {
      var lastChar = lastFive[lastFive.length -1];
      if (lastChar == "/") {
        req.url = req.url + 'index.html';
        console.log("Debug: '"+ req.url + "' should now contain index.html");
        //Return the webpage as a html document
        var q = url.parse(req.url, true);
        var filename = "." + q.pathname;
        fs.readFile(filename, function(err, data) {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
          }
          
          console.log(req.rawHeaders[13]);
          
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          return res.end();
        });
      }
      else {
        req.url = req.url + '/index.html';
        console.log("Debug: '"+ req.url + "' should now contain /index.html");
        //Return the webpage as a html document
        var q = url.parse(req.url, true);
        var filename = "." + q.pathname;
        fs.readFile(filename, function(err, data) {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
          }
          
          console.log(req.rawHeaders[13]);
          
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          return res.end();
        });
      }
      
    }
  }
  else {
    console.log('already html');
    //Return the webpage as a html document
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      
      console.log(req.rawHeaders[13]);
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
  
}).listen(10089,'0.0.0.0');
console.log("Dev Server Initialised");
