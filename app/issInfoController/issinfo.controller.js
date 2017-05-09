(function() {
  'use strict';

  angular
    .module('issApp')
    .controller('issInfoController', issInfoController);

  issInfoController.$inject = ['issInfoFactory'];

  /* @ngInject */
  function issInfoController(issInfoFactory, toastr) {
    //Properties
    var vm = this;
    vm.latitude;
    vm.longitude;
    vm.latlon;
    vm.points = [];

    //Local vars
    var timerInterval;
    var idCount = 0;

    //Function declarations
    vm.startTimer = startTimer;
    vm.stopTimer = stopTimer;

    //Custom icon that displays in the map
    vm.customIcon = {
      "scaledSize": [16, 16],
      "url": "http://www.cliparthut.com/clip-arts/823/arrowhead-clip-art-823528.png"
    };

    //This starts the interval
    function startTimer() {
      timerInterval = setInterval(function() {
        getIssLocation()
      }, 5000);
    }

    //Yep, and this shuts the interval down!
    function stopTimer() {
      clearInterval(timerInterval);
    }

    //I wrapped the factory call into a local function to ease the
    //calling of it in the controller's activate function.
    function getIssLocation() {
      //Here is the factory call to retrieve the ISS location
      issInfoFactory.getIssLocation().then(
        function(response) {
          //If we land in here, we got a good call.
          var issInfo = response.data.iss_position;
          console.log(issInfo);

          //We save the lat and long to our properties.
          vm.latitude = issInfo.latitude;
          vm.longitude = issInfo.longitude;

          //We store the lat and long to use in the polyline draw.
          //Lat and long must be converted to Numbers for the polyline
          //fill

          var newIssLoc = {
            id: ++idCount,
            lat: Number(vm.latitude),
            lng: Number(vm.longitude)
          };
          //We add the new locaction to the array!
          vm.points.push(newIssLoc);
          //console.log(vm.points);

          //Just some general cleanup. Once we have 25 entries in the
          //array I can getting rid of the oldest point in the
          //array. This will keep the line from growing excedding
          //long.  If you want a long line, increase the count to 50,etc..
          if (vm.points.length > 25) {
            vm.points.shift();
          }
          //Make a string that will be mapped to the ngMap cneter.
          vm.latlon = vm.latitude + ", " + vm.longitude;
          console.log(vm.latitude + "   " + vm.longitude);
        }, //Error handler.
        function(error) {
          $log.error('Failure getting iss info!', error);
          toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
        });
    };

    //Place the initial map on the screen, during statup!
    activate();

    function activate() {
      getIssLocation();
    }
  }
})();
