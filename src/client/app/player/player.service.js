(function() {
  'use strict';

  angular
    .module('app.player')
    .service('swPlayer', swPlayer);

  swPlayer.$inject = ['AlbumApi'];
  /* @ngInject */
  function swPlayer(AlbumApi) {
    var service = {
      getAlbum: getAlbum,
      setAlbum: setAlbum,
      currentAlbum: currentAlbum
    };

    var currentAlbum;

    function setAlbum(album) {
      currentAlbum = album
      AlbumApi.getMusicDirectory(album.id)
        .then(function(album) {
          currentAlbum = album;
        })
    }

    function getAlbum() {
      return currentAlbum;
    }

    return service;
  }
})();
