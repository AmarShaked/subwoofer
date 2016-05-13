(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '',
    appTitle: 'subwoofer',
    apiVersion: '1.13.0'
  };

  core.value('config', config);

  core.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

  core.run(function($rootScope, LoginHelper, $state) {


    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) {

        var isLogin = toState.name === "login";

        if(isLogin){
           return; // no need to redirect 
        }

        var isConnected = LoginHelper.isAuthenticated();

        if(!isConnected) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    });
});

})();
