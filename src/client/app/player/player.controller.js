(function() {
  'use strict';

  angular
    .module('app.player')
    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['$sce', '$scope', 'swPlayer', 'PlayerEvents', 'ssHttp', 'AlbumApi'];
  /* @ngInject */
  function PlayerController($sce, $scope, swPlayer, PlayerEvents, ssHttp, AlbumApi) {
    var vm = this;

    vm.API = null;
    console.log("koko")
    vm.active = 0;

    vm.onPlayerReady = onPlayerReady;
    vm.onComplete - onComplete;
    vm.toggleShuffle = toggleShuffle;
    vm.play = play;
    vm.getRandom = getRandom;
    vm.setActive = setActive;
    vm.toggleRepeat = toggleRepeat;

    swPlayer.subscribe($scope, handleAlbumChangedEvent, PlayerEvents.albumChanged);


    vm.audios = [];
    vm.config = {
      sources: [],
      repeat: false,
      shuffle: false,
      autoPlay: true,
      theme: {
        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
      }
    };

    function handleAlbumChangedEvent() {
      vm.audios = swPlayer.getSerializeAlbum();
      vm.API.stop();
      vm.config.sources = vm.audios[0].sources;
      vm.config.title = vm.audios[0].title;      
    }

    function onPlayerReady(API) {
      vm.API = swPlayer.playerAPI(API)
      console.log(vm.API)
      if (vm.API.currentState == 'play' || vm.isCompleted) vm.API.play();
      vm.isCompleted = false;
    };

    function onComplete() {
      vm.isCompleted = true;
      // shuffle
      if(vm.config.shuffle){
        vm.active = vm.getRandom(vm.active);
      // next item
      }else{
        vm.active++;
      }
      
      // last item
      if (vm.active >= vm.audios.length) {
        vm.active = 0;
        // repeat
        if(vm.config.repeat){
          vm.setActive(vm.active);
        }
      }else{
        vm.setActive(vm.active);
      }
    };

    function getRandom(index) {
      var i = Math.floor( Math.random() * vm.audios.length );
      if ( !(i-index) ){
        i = vm.getRandom( index );
      }
      return i;
    }

    function play(index){
      vm.isCompleted = true;
      // get prev or next item
      index == "next" ? vm.active++ : vm.active--;
      if (vm.active >= vm.audios.length) vm.active = 0;
      if (vm.active == -1) vm.active = vm.audios.length - 1;
      // play it
      vm.setActive(vm.active);
    };

    function setActive(index) {
      vm.API.stop();
      vm.config.sources = vm.audios[index].sources;
      vm.config.title = vm.audios[index].title;
    };

    function toggleRepeat() {
      console.log("repaet")
      vm.config.repeat = !vm.config.repeat;
      if (vm.isCompleted) vm.API.play();
    };

    function toggleShuffle(){
      vm.config.shuffle = !vm.config.shuffle;
      console.log(vm.API.currentState);
      if (vm.isCompleted) vm.API.play();
    };
  }
})();
