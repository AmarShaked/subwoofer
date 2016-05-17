(function() {
  'use strict';

  angular
    .module('app.login')
    .service('LoginHelper', LoginHelper);

  LoginHelper.$inject = ['ssHttp', 'config', '$rootScope',
                        'SystemApi', 'logger', '$state',
                        '$localStorage'];
  /* @ngInject */
  function LoginHelper(ssHttp, config, $rootScope,
                       SystemApi, logger, $state,
                       $localStorage) {

    var service = {
      login: login,
      isAuthenticated: isAuthenticated,
      destroySession: destroySession
    };

    function login(username, password, site) {

      $rootScope.site = site;
      $rootScope.subsonicParams = {u: username,
                                   p:'enc:' + hexEncode(password),
                                   c: config.appTitle,
                                   v: config.apiVersion,
                                   f: 'json' };

      return SystemApi.ping().then(function(res) {
        $localStorage.subsonicParams = $rootScope.subsonicParams;
        $localStorage.subsonicSite = $rootScope.site;
        $state.go('home');
      });
    }

    function hexEncode(str) {
      var hex, i;

      var result = '';
      for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += (hex).slice(-4);
      }

      return result;
    }

    function isAuthenticated() {
      if (!$localStorage.subsonicParams) {
        return false;
      }

      $rootScope.isConnected = true;
      $rootScope.subsonicParams = $localStorage.subsonicParams;

      return true;

    }

    function destroySession() {
      delete $localStorage.subsonicParams;
      delete $rootScope.isConnected;
      delete $rootScope.subsonicParams;
    }

    return service;
  }
})();
