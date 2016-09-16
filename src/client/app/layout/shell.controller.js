(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'ngAudio', '$sce'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, ngAudio, $sce) {
    var vm = this;

    vm.navline = {
      title: config.appTitle,
      text: 'username',
    };

    vm.player = ngAudio.load("http://10.0.0.8:5310/rest/stream.view?c=subwoofer&id=3959&p=enc:5368616b656433363336&u=shakedamar&v=1.13.0")

    activate();

    function activate() {
    }

    vm.sources = [];
  }
})();
