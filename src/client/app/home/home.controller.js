(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['AlbumApi', 'recent', 'newest', 'cfpLoadingBar'];
  /* @ngInject */
  function HomeController(AlbumApi, recent, newest, cfpLoadingBar) {
    var vm = this;

    activate();

    vm.recent = recent;
    vm.nowPlaying = [];
    vm.newest = newest;

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
