(function() {
  'use strict';

  angular
    .module('app.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
          title: 'Home',
          resolve: {
            recent: ['AlbumApi', function(AlbumApi) {
              return AlbumApi.getAlbumList2('recent', 12);
            }],
            newest: ['AlbumApi', function(AlbumApi) {
              return AlbumApi.getAlbumList2('newest', 5);
            }]
          },
          settings: {
            nav: 1,
            content: '<i class="fa fa-home"></i> Home'
          }
        }
      }
    ];
  }
})();
