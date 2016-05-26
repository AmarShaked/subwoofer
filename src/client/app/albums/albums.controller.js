(function() {
  'use strict';

  angular
    .module('app.albums')
    .controller('AlbumsController', AlbumsController);

  AlbumsController.$inject = ['AlbumApi', 'albums'];
  /* @ngInject */
  function AlbumsController(AlbumApi, albums) {
    var vm = this;

    vm.albums = albums;

    activate();

    function activate() {
    }
  }
})();
