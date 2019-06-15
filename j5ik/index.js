var fs = require("fs");
var path = require("path");
var http = require("http");
var os = require("os");
var networkInterfaces = os.networkInterfaces();

var port = 8080;
var host = networkInterfaces.wlan0[0].address;
var publicpath = path.join(__dirname, "public");
var header = { "Content-Type": null };
var contentType = "Content-Type";
var mimeTypes = {
  ".html": "text/html",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".js": "text/javascript",
  ".css": "text/css",
};

var server = http.createServer(function(request, response) {
  var file = path.join(publicpath, request.url === "/" ? "index.html" : request.url);
  var fstream = fs.createReadStream(file);

  fstream.on("open", function() {
    header[contentType] = mimeTypes[path.extname(this.path)];
    response.writeHead(200, header);
    fstream.pipe(response);
  });
});

server.listen(port, host);

console.log("%s:%s", host, port);