(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'ngAudio', '$sce'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, ngAudio, $sce) {
    var vm = this;
    vm.handleSkipClick = handleSkipClick;

    vm.navline = {
      title: config.appTitle,
      text: 'username',
    };


    vm.player = ngAudio.load("http://samar.subsonic.org/rest/stream.view?c=subwoofer&id=3959&p=enc:5368616b656433363336&u=shakedamar&v=1.13.0")

    activate();

    function activate() {
    }

    function handleSkipClick(e) {
      var fullWidth = $(e.currentTarget).width();
      var position = e.offsetX / fullWidth;

      console.log(position)
      console.log(vm.player.progress)

      vm.player.progress = position;
    }

    vm.sources = [];
  }
})();
