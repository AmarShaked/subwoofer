(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .factory('ssHttp', ssHttp);

  ssHttp.$inject = ['$http', 'config', '$rootScope', 'logger', '$q', '$localStorage', '$httpParamSerializer'];
  /* @ngInject */
  function ssHttp($http, config, $rootScope, logger, $q, $localStorage, $httpParamSerializer) {

    var service = {
      buildSSUrl: buildSSUrl, 
      objectAsUrl: objectAsUrl,
      fetch: fetch
    }

    function buildSSUrl(httpObject) {
      $rootScope.site = ($rootScope.site ? $rootScope.site : $localStorage.subsonicSite);
      $rootScope.subsonicParams = ($rootScope.subsonicParams ?
                                   $rootScope.subsonicParams : $localStorage.subsonicParams);
      var ssurl = $rootScope.site + '/rest' + httpObject.url;
      var preConfiguredObject = {url: ssurl,
                                 params: $rootScope.subsonicParams};

      return angular.merge(httpObject, preConfiguredObject);
    }

    function objectAsUrl(httpObject) {
      var ssObject = buildSSUrl(httpObject);
      return ssObject.url + '?' + $httpParamSerializer(ssObject.params)
    }

    function fetch(httpObject) {
      return $http(buildSSUrl(httpObject))
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
        var error = (typeof(e) === 'string' ? e : 'Failed to communicate with the server..');
        logger.error(error);
        return $q.reject(error);
      }
    };

    return service;
  }
})();
