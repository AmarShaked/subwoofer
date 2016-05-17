(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$sce'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger, $sce) {
    var vm = this;

    vm.navline = {
      title: config.appTitle,
      text: 'username',
    };

    activate();

    function activate() {
    }

    vm.sources = [];
  }
})();
