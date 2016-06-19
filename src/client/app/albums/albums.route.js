(function() {
  'use strict';

  angular
    .module('app.albums')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'albums',
        config: {
          url: '/albums',
          template: '<ui-view/>',
          title: 'Albums',
          abstract: true
        }
      },
      {
        state: 'albums.all',
        config: {
          url: '/all',
          templateUrl: 'app/albums/albums.html',
          controller: 'AlbumsController',
          controllerAs: 'vm',
          title: 'Albums',
          resolve: {
            albums: ['AlbumApi', function(AlbumApi) {
              return AlbumApi.getAlbumList('alphabeticalByName', 500);
            }]
          }
        }
      },
      {
        state: 'albums.detail',
        config: {
          url: '/{albumId}',
          templateUrl: 'app/albums/album.detail.html',
          controller: 'AlbumDetailController',
          controllerAs: 'vm',
          title: 'Albums',
          params: {
            parentId: 'parentId'
          },
          resolve: {
            album: ['AlbumApi', '$stateParams', function(AlbumApi, $stateParams) {
              return AlbumApi.getMusicDirectory($stateParams.albumId);
            }]
          }
        }
      }
    ];
  }
})();
