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

    vm.albums = [];

    function activate() {
      getAlbums();
    }

    function getAlbums() {
      AlbumApi.getAlbumList('recent').then(function(albums) {
        vm.albums = albums;
        return vm.albums;
      })
    }
  }
})();
