var Tessel = require("tessel-io");
var five = require("johnny-five");
var http = require('http');

var board = new five.Board({
  io: new Tessel(),
 
});
var pin = new five.Relay("b7");

var server = http.createServer(function (req, res) {
  console.log(req.url)
  if (req.url === '/on') return on(req, res)
  if (req.url === '/off') return off(req, res)
  return res.end('<a href="/on">/on</a> or <a href="/off">/off</a>\n')
})

server.listen(80, function(err) {
  if (err) console.log('error!' + err)
  console.log('http listening')
})

function on (req, res) {
  console.log('turning on')
  pin.write(1)
  res.end('turned on\n')
}

function off (req, res) {
  console.log('turning off')
  pin.write(0)
  res.end('turned off\n')
}