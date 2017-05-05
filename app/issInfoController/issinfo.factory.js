(function() {
  'use strict';

  angular
    .module('issApp')
    .factory('issInfoFactory', issInfoFactory);

  issInfoFactory.$inject = ['$http', '$q'];

  /* @ngInject */
  function issInfoFactory($http, $q) {
    var service = {
      getIssLocation: getIssLocation
    };

    return service;

    function getIssLocation() {

      var defer = $q.defer();
      var url = 'http://api.open-notify.org/iss-now.json'

      $http.get(url)
        .then(
          function(response) {
            if (typeof response.data === 'object') {
              defer.resolve(response);
              toastr.success('Got iss location');
              console.log(response);
            } else {
              defer.reject(response);
              toastr.warning('no iss location data' + response.config.url);
            }
          },
          // failure
          function(error) {
            defer.reject(error);
            $log.error(error);
            toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
          });
      return defer.promise;
    }
  }
})();
