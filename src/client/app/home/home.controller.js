(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$q', 'dataservice', 'logger', 'AlbumApi'];
  /* @ngInject */
  function HomeController($q, dataservice, logger, AlbumApi) {
    var vm = this;

    activate();

    vm.recent = [];
    vm.nowPlaying = [];
    vm.newest = [];

    function activate() {
      getRecentAlbums();
      getNewAlbums();
      getNowPlaying();
    }

    function getRecentAlbums() {
      AlbumApi.getAlbumList('recent').then(function(albums) {
        vm.recent = albums;
        return vm.recent;
      });
    }

    function getNewAlbums() {
      AlbumApi.getAlbumList('newest').then(function(albums) {
        vm.newest = albums;
        return vm.newest;
      });
    }

    function getNowPlaying() {
      AlbumApi.getNowPlaying().then(function(nowPlaying) {
        vm.nowPlaying = nowPlaying;
        return vm.nowPlaying;
      });
    }
  }
})();
