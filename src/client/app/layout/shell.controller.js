(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope','$timeout', 'config', 'ngAudio', 'swPlayer', 'PlayerEvents'];
  /* @ngInject */
  function ShellController($scope, $timeout, config, ngAudio, swPlayer, PlayerEvents) {
    var vm = this;
    vm.handleSkipClick = handleSkipClick;
    vm.album = swPlayer.getAlbum();


    swPlayer.subscribe($scope, handleAlbumChangedEvent, PlayerEvents.albumChanged);


    vm.navline = {
      title: config.appTitle,
      text: 'username',
    };

    //vm.player = ngAudio.load("http://samar.subsonic.org/rest/stream.view?c=subwoofer&id=3959&p=enc:5368616b656433363336&u=shakedamar&v=1.13.0")

    activate();

    function activate() {
    }

    function handleAlbumChangedEvent() {
      vm.album = swPlayer.getAlbum();
      console.log(vm.album)
      console.log("AlbumChanged")
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
