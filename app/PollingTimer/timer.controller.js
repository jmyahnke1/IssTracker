(function() {
  'use strict';

  angular
    .module('issApp')
    .controller('TimerController', TimerController);

  TimerController.$inject = ['timer' ,'$scope'];

  /* @ngInject */
  function TimerController(timer, $scope) {
    var vm = this;
    vm.timerRunning = true;
    vm.timerConsole = '';

    vm.timerType = '';

    vm.startTimer = function() {
      $scope.$broadcast('timer-start');
      vm.timerRunning = true;
    };

    vm.stopTimer = function() {
      $scope.$broadcast('timer-stop');
      vm.timerRunning = false;
    };

    $scope.$on('timer-tick', function(event, args) {
      vm.timerConsole += vm.timerType + ' - event.name = ' + event.name + ', timeoutId = ' + args.timeoutId + ', millis = ' + args.millis + '\n';
    });




    activate();

    function activate() {

    }
  }
})();
