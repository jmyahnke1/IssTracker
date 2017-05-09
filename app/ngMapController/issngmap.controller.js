(function() {
  //This factory calls the goolge maps and makes the ngmap directive.
  //Remember where ever you go, there you are!!!
  'use strict';

  angular
    .module('issApp')
    .controller('issNgMapController', issNgMapController);

  issNgMapController.$inject = ['$rootScope', 'NgMap'];

  /* @ngInject */
  function issNgMapController($rootScope, NgMap) {
    var vm = this;

    //Initializes the Google Map
    vm.getMap = function() {
      NgMap.getMap({
        id: 'map'
      }).then(function(map) {
        $rootScope.map = map;
        //$rootScope.map.setZoom(12);
      });
    }
    vm.getMap();
  }
})();
