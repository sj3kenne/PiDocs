
var Gpio = require('onoff').Gpio;
var LED04 = new Gpio(4, 'out'),
LED17 = new Gpio(17, 'out'),
LED27 = new Gpio(27, 'out'),
LED22 = new Gpio(22, 'out');
var pushButton = new Gpio(23, 'in', 'both');

var leds = [LED04, LED17, LED27, LED22];
var indexCount = 0;
dir = "up";

//Flow Controls
//var flowInterval = setInterval(flowingLeds, 100);
//clearInterval(flowInterval);

function flowingLeds() {
  leds.forEach(function(currentValue) {
    currentValue.writeSync(0);
  });
  if (indexCount == 0) dir = "up";
  if (indexCount >= leds.length) dir = "down";
  if (dir == "down") indexCount--;
  leds[indexCount].writeSync(1);
  if (dir == "up") indexCount++
};

// Push controls
pushButton.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  LED04.readSync()
    LED04.writeSync(value);
    LED04.readSync()
    LED04.writeSync(value);
  /*
  if (value == 1){
    //clearInterval(flowInterval);
  } else {
    //setInterval(flowingLeds, 100);
  }*/
  console.log(value);

});

function unexportOnClose() {
  //clearInterval(flowInterval);
  leds.forEach(function(currentValue) {
    currentValue.writeSync(0);
    currentValue.unexport();
  });
  pushButton.unexport();
};

process.on('SIGINT', unexportOnClose);
