(function() {
  'use strict';

  angular
    .module('app.subsonic')
    .service('AlbumApi', AlbumApi);

  AlbumApi.$inject = ['ssHttp'];
  /* @ngInject */
  function AlbumApi(ssHttp) {
    var service = {
      getAlbumList: getAlbumList
    };

    function getAlbumList(type) {
      return ssHttp({method: 'GET', url: '/getAlbumList.view', params: {type: type}}).then(function(res) {
        return res.albumList.album;
      })
    }

    return service;
  }
})();