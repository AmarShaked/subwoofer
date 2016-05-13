(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)

      function success(response) {
        return response.data;
      }
    }
  }
})();
