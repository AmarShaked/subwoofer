(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['ssHttp', 'config', 'LoginHelper'];
  /* @ngInject */
  function ShellController(ssHttp, config, LoginHelper) {
    var vm = this;

    vm.navline = {
      title: config.appTitle,
      avatar: ssHttp.objectAsUrl({url: '/getUser.view'})
    };

    activate();

    function activate() {
    }

  }
})();
