(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('album', album);

  album.$inject = ['config', '$rootScope'];
  /* @ngInject */
  function album(config, $rootScope) {

    var directive = {
      scope: {
        'artist': '@',
        'title': '@',
        'id': '@',
        'size': '@',
        'albumid': '@',
        'parentid': '@'
      },
      restrict: 'EA',
      templateUrl: 'app/widgets/album.html',
    };

    return directive;
  }
})();
