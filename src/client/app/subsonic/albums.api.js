(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .service('AlbumApi', AlbumApi);

  AlbumApi.$inject = ['ssHttp', '$rootScope'];
  /* @ngInject */
  function AlbumApi(ssHttp, $rootScope) {
    var service = {
      getAlbumList: getAlbumList,
      getNowPlaying: getNowPlaying,
      getMusicDirectory: getMusicDirectory,
      getAlbumList2: getAlbumList2,
      getAlbum: getAlbum,
      getAlbumCoverUrl: getAlbumCoverUrl
    };

    function getAlbumList(type, size) {
      return ssHttp({method: 'GET', url: '/getAlbumList.view', params: {type: type, size: size}})
        .then(function(res) {
          return res.albumList.album;
        });
    }

    function getAlbumList2(type, size) {
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

    function getMusicDirectory(id) {
      return ssHttp({method: 'GET', url: '/getMusicDirectory.view', params: {id: id}})
        .then(function(res) {
          res.directory.coverArt = getAlbumCoverUrl(id)
          return res.directory;
        });
    }

    function getNowPlaying() {
      return ssHttp({method: 'GET', url: '/getNowPlaying.view'}).then(function(res) {
        return res.nowPlaying.entry;
      });
    }

    function getAlbumCoverUrl(id, size) {
      var params = $rootScope.subsonicParams;
      var albumUrl  = $rootScope.site + '/rest/getCoverArt.view?id=' + id +
                                                                '&u=' + params.u +
                                                                '&p=' + params.p +
                                                                '&c=' + params.c +
                                                                '&v=' + params.v +
                                                                '&size=' + (size || 150);
      return albumUrl;
    }

    return service;
  }
})();
