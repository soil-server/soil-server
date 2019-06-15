var http = require('http');
 var five = require("johnny-five");
 var Tessel = require("tessel-io");

var board = new five.Board({
    io: new Tessel(),
   
  });

  
 var atmosRead;
 var fs = require('fs');
 var url = require('url');
 var PORT = process.env.PORT || 8080;

 var soilLevel = "";


 var pump = new five.Relay("b7");

 var soilSensor = function(){
  var dry = new five.Led("b0");
  var wet = new five.Led("b1");
  var both = new five.Leds([dry, wet]);
  var soil = new five.Sensor({
    pin: "a7",
    
  });

  dry.on();


  soil.on("data", () => {
    
    if (wet.isOn && soil.value < 300) {
      both.toggle();
   
      
    } else {
      if (dry.isOn && soil.value > 300) {
        both.toggle();
       
      }
    }
   soilLevel = soil.value
    return soilLevel;
  });
  console.log("Soil moisture level: " + soilLevel);
  console.log("--------------------------------------");
}

var atmosphere = function() {
  var monitor = new five.Multi({
    controller: "BME280",
    freq: 60000
  });

  monitor.on("data", function() {

    console.log("thermometer");
   
    console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
 
    console.log("--------------------------------------");

    

    console.log("Hygrometer");
    console.log("  relative humidity : ", this.hygrometer.relativeHumidity+ " %");
    console.log("--------------------------------------");

   
soilSensor();
return atmosRead = [this.thermometer.fahrenheit, this.hygrometer.relativeHumidity]
  });
}
exports.atmosRead = atmosRead;

 board.on("ready", () => {


 var server = http.createServer(function (request, response) {
   // Break up the url into easier-to-use parts
   var urlParts = url.parse(request.url, true);

   // Create a regular expression to match requests to toggle pumps
   var pumpRegex = /pumps/;

   if (urlParts.pathname.match(pumpRegex)) {
     // If there is a request containing the string 'leds' call a function, toggleLED
     togglePump(urlParts.pathname, request, response);
   } else {
     // All other request will call a function, showIndex
     showIndex(urlParts.pathname, request, response);
   }
   http.get({
    hostname: 'https://soil-server-main.herokuapp.com',
   
    path: '/api/t2',
    agent: false  // Create a new agent just for this one request
  }, (res) => {
    console.log(res);
  });
 });

 http.get({
  hostname: 'https://soil-server-main.herokuapp.com',
  path: '/api/t2',
  agent: false  // Create a new agent just for this one request
}, (res) => {
  console.log(res);
});

 // Stays the same
 server.listen(PORT);

 // Stays the same


 // Respond to the request with our index.html page
 function showIndex (url, request, response) {
   // Create a response header telling the browser to expect html
   response.writeHead(200, {"Content-Type": "text/html"});

   // Use fs to read in index.html
   fs.readFile(__dirname + '/index.html', function (err, content) {
     // If there was an error, throw to stop code execution
     if (err) {
       throw err;
     }

     // Serve the content of index.html read in by fs.readFile
     response.end(content);
     atmosphere();
   });
 }

 // Toggle the led specified in the url and respond with its state
 function togglePump (url, request, response) {
   // Create a regular expression to find the number at the end of the url
   var indexRegex = /(\d)$/;

   // Capture the number, returns an array
   var result = indexRegex.exec(url);

   // Grab the captured result from the array
   var index = result[1];

 

   // Toggle the state of the pump and call the callback after that's done
   pump.toggle(function (err) {
     if (err) {
       // Log the error, send back a 500 (internal server error) response to the client
       console.log(err);
       response.writeHead(500, {"Content-Type": "application/json"});
       response.end(JSON.stringify({error: err}));
     } else {
       // The pump was successfully toggled, respond with the state of the toggled led using pump.isOn
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify({on: pump.isOn}));
     }
   });
 }

 });
