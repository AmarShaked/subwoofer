(function() {
  'use strict';

  angular
    .module('app.albums')
    .controller('AlbumDetailController', AlbumDetailController);

  AlbumDetailController.$inject = ['AlbumApi', 'album'];
  /* @ngInject */
  function AlbumDetailController(AlbumApi, album) {
    var vm = this;
    vm.album = album
    activate();

    function activate() {
    }
  }
})();
