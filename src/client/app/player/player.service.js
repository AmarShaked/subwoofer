(function() {
  'use strict';

  angular
    .module('app.player')
    .service('swPlayer', swPlayer);

  swPlayer.$inject = ['AlbumApi', '$rootScope', 'PlayerEvents', 'ngAudio', 'ssHttp', '$sce'];
  /* @ngInject */
  function swPlayer(AlbumApi, $rootScope, PlayerEvents, ngAudio, ssHttp, $sce) {

    var currentAlbum;
    var currentSong;
    var currentAPI = null

    var service = {
      getAlbum: getAlbum,
      setAlbum: setAlbum,
      getSerializeAlbum: getSerializeAlbum,
      getSources: getSources,
      subscribe: subscribe,
      playerAPI: playerAPI
    };

    function playerAPI(API) {
      if (!currentAPI && API) {
        currentAPI = API
      }

      return currentAPI;
    }

    function setAlbum(album) {
      currentAlbum = album
      AlbumApi.getMusicDirectory(album.id)
        .then(function(album) {
          currentAlbum = album;
          $rootScope.$emit(PlayerEvents.albumChanged);
        })
    }

    function getSerializeAlbum() {
      var serializeAlbum = []
      angular.forEach(currentAlbum.child, function(child) {
        var song = {
          title: child.title,
          artist: child.artist,
          coverArt: AlbumApi.getAlbumCoverUrl(child.id, 50),
          sources: [
            {src: $sce.trustAsResourceUrl(ssHttp.objectAsUrl({url: '/stream.view', 
                                                              params: {id: child.id}})), 
             type: "audio/mpeg"}
          ] 
        }

        serializeAlbum.push(song)
      })

      return serializeAlbum
    }

    function getCurrentSong() {
      return currentSong;
    }

    function getSources() {
      return albumSources;
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
