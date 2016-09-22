(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .service('SystemApi', SystemApi);

  SystemApi.$inject = ['ssHttp', '$rootScope', 'config', 'logger'];
  /* @ngInject */
  function SystemApi(ssHttp, $rootScope, config, logger) {
    var service = {
      ping: ping
    };

    function ping() {

      return ssHttp.fetch({method: 'GET', url: '/ping.view'})
        .then(success);

      function success(response) {
        return response.status;
      }
    }

    return service;
  }
})();
