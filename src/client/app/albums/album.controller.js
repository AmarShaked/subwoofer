(function() {
  'use strict';

  angular
    .module('app.albums')
    .controller('AlbumDetailController', AlbumDetailController);

  AlbumDetailController.$inject = ['AlbumApi', 'album', 'GeneralTasks'];
  /* @ngInject */
  function AlbumDetailController(AlbumApi, album, GeneralTasks) {
    var vm = this;
    vm.album = album;
    vm.parentAlbum = {};

    activate();

    function activate() {
      getParentAlbum();
      replaceDurationFormat();
    }

    function getParentAlbum() {
      AlbumApi.getMusicDirectory(album.parent).then(function(parent) {
        vm.parentAlbum = parent;
        getAlbumFromParent();
        return parent;
      });
    }

    function getAlbumFromParent() {
      angular.forEach(vm.parentAlbum.child, function(childAlbum) {
        if (childAlbum.id === album.id) {
          vm.directoryAlbum  = childAlbum;
        }
      });
    }

    function replaceDurationFormat() {
      angular.forEach(album.child, function(song) {
        song.duration = GeneralTasks.durationToTime(song.duration);
      });
    }
  }
})();
