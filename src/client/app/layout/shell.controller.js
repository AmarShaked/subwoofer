(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope', '$timeout', 'config', 'ngAudio', 'swPlayer'];
  /* @ngInject */
  function ShellController($scope, $timeout, config, ngAudio, swPlayer) {
    var vm = this;
    vm.handleSkipClick = handleSkipClick;

    vm.player = swPlayer;

    vm.navline = {
      title: config.appTitle,
      text: 'username',
    };


    $scope.$watch(vm.player.currentAlbum,  function(newVal) {
      console.log(newVal);
    })

    //vm.player = ngAudio.load("http://samar.subsonic.org/rest/stream.view?c=subwoofer&id=3959&p=enc:5368616b656433363336&u=shakedamar&v=1.13.0")

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
