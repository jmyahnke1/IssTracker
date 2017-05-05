(function() {
    'use strict';

    angular
        .module('issApp')
        .controller('issInfoController', issInfoController);

    issInfoController.$inject = ['issInfoFactory'];

    /* @ngInject */
    function issInfoController(issInfoFactory) {
        var vm = this;
        vm.Latitude;
        vm.Longitude;
        vm.latlon;

        issInfoFactory.getIssLocation().then(
          function(response) {
            var issInfo = response.data.iss_position;
            console.log(issInfo);
            vm.Latitude = issInfo.latitude;
            vm.Longitude = issInfo.longitude;
            vm.latlon = vm.Latitude + ", " + vm.Longitude;
            console.log(vm.Latitude + "   " + vm.Longitude);
          },
          function(error) {
            $log.error('Failure getting iss info!', error);
          });

        // activate();
        //
        // function activate() {
        //   console.log(vm.latlon);
        // }
    }
})();
