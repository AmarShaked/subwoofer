(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .factory('ssHttp', ssHttp);

  ssHttp.$inject = ['$http', 'config', '$rootScope', 'logger', '$q', '$localStorage'];
  /* @ngInject */
  function ssHttp($http, config, $rootScope, logger, $q, $localStorage) {
    return function(httpObject)
    {
      console.log(httpObject)
      $rootScope.site = ($rootScope.site ? $rootScope.site : $localStorage.subsonicSite);
      $rootScope.subsonicParams = ($rootScope.subsonicParams ? $rootScope.subsonicParams : $localStorage.subsonicParams);

      var ssurl = $rootScope.site + '/rest' + httpObject.url;

      var preConfiguredObject = {url: ssurl,
                                 params: $rootScope.subsonicParams};

      var finalHttpObject = angular.merge( httpObject, preConfiguredObject );

      return $http(finalHttpObject)
        .then(success)
        .catch(failed);

      function success(res) {
        if (res && res.data['subsonic-response'].status === 'ok') {
          return res.data['subsonic-response'];
        }

        else if (res && res.data['subsonic-response'].status === 'failed') {
          throw res.data['subsonic-response'].error.message;
        }
      }

      function failed(e) {
        var error = (typeof(e) === 'string' ? e : "Failed to communicate with the server..")
        logger.error(error);
        return $q.reject(error);
      };


    };
  }
})();