(function() {
  'use strict';

  angular
    .module('app.player')
    .service('swPlayer', swPlayer);

  swPlayer.$inject = ['AlbumApi', '$rootScope', 'PlayerEvents'];
  /* @ngInject */
  function swPlayer(AlbumApi, $rootScope, PlayerEvents) {
    var service = {
      getAlbum: getAlbum,
      setAlbum: setAlbum,
      subscribe: subscribe
    };

    var currentAlbum;

    function setAlbum(album) {
      currentAlbum = album
      AlbumApi.getMusicDirectory(album.id)
        .then(function(album) {
          currentAlbum = album;
          $rootScope.$emit(PlayerEvents.albumChanged);
        })
    }

    function getAlbum() {
      return currentAlbum;
    }

    function subscribe(scope, cb, event) {
      var handler = $rootScope.$on(event, cb);
      scope.$on('$destroy', handler);
    }

    return service;
  }
})();
