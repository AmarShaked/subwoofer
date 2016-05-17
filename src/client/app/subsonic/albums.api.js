(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .service('AlbumApi', AlbumApi);

  AlbumApi.$inject = ['ssHttp'];
  /* @ngInject */
  function AlbumApi(ssHttp) {
    var service = {
      getAlbumList: getAlbumList,
      getNowPlaying: getNowPlaying
    };

    function getAlbumList(type) {
      return ssHttp({method: 'GET', url: '/getAlbumList.view', params: {type: type}})
        .then(function(res) {
          return res.albumList.album;
        });
    }

    function getNowPlaying() {
      return ssHttp({method: 'GET', url: '/getNowPlaying.view'}).then(function(res) {
        return res.nowPlaying.entry;
      });
    }

    return service;
  }
})();
