(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['AlbumApi', 'recent', 'newest', 'cfpLoadingBar', 'ngAudio'];
  /* @ngInject */
  function HomeController(AlbumApi, recent, newest, cfpLoadingBar, ngAudio) {
    var vm = this;

    activate();

    vm.recent = recent;
    vm.nowPlaying = [];
    vm.newest = newest;

    vm.sound = ngAudio.load("http://10.0.0.8:5310/rest/stream.view?c=subwoofer&id=3959&p=enc:5368616b656433363336&u=shakedamar&v=1.13.0")

    function activate() {
      getNowPlaying();
    }

    function getNowPlaying() {
      AlbumApi.getNowPlaying().then(function(nowPlaying) {
        vm.nowPlaying = nowPlaying;
        return vm.nowPlaying;
      });
    }
  }
})();
