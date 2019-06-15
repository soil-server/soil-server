var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
  io: new Tessel(),
 
});

board.on("ready", () => {
 atmosphere();
 
});

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
      console.log("Soil moisture level: " + soil.value);
      console.log("--------------------------------------");
      
    } else {
      if (dry.isOn && soil.value > 300) {
        both.toggle();
        console.log("Soil moisture level: " + soil.value);
        console.log("--------------------------------------");
      }
    }

  });

}


  var pump = new five.Relay("b7");
// pump.on();
  // function on () {
  //   console.log('turning on')
  //   pump.write(1)
  //   res.end('turned on\n')
  // }
  
  // function off () {
  //   console.log('turning off')
  //   pump.write(0)
 
  // }

var atmosphere = function() {
  var monitor = new five.Multi({
    controller: "BME280",
    freq: 60000
  });

  monitor.on("data", function() {

    console.log("thermometer");
    console.log("  celsius      : ", this.thermometer.celsius);
    console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
    console.log("  kelvin       : ", this.thermometer.kelvin);
    console.log("--------------------------------------");

    console.log("barometer");
    console.log("  pressure     : ", this.barometer.pressure);
    console.log("--------------------------------------");

    console.log("Hygrometer");
    console.log("  relative humidity : ", this.hygrometer.relativeHumidity+ " %");
    console.log("--------------------------------------");

soilSensor();
  });
  
}