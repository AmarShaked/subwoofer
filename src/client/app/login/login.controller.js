(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginHelper'];
  /* @ngInject */
  function LoginController(LoginHelper) {
    var vm = this;

    activate();

    vm.username = '';
    vm.password = '';
    vm.subsonicSite = 'http://demo.subsonic.org';

    vm.login = login;

    function activate() {
      LoginHelper.destroySession();
    }

    function login() {
      LoginHelper.login(vm.username, vm.password, vm.subsonicSite);     
    }

  }
})();