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
      getNowPlaying: getNowPlaying,
      getAlbum: getAlbum
    };

    function getAlbumList(type, size) {
      return ssHttp({method: 'GET', url: '/getAlbumList2.view', params: {type: type, size: size}})
        .then(function(res) {
          return res.albumList2.album;
        });
    }

    function getAlbum(id) {
      return ssHttp({method: 'GET', url: '/getAlbum.view', params: {id: id}})
        .then(function(res) {
          return res.album;
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
