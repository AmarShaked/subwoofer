(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('album', album);

  album.$inject = ['config', '$rootScope'];
  /* @ngInject */
  function album(config, $rootScope) {    
    //Usage:
    //<img ht-img-person="{{person.imageSource}}"/>

    var params = $rootScope.subsonicParams;

    var directive = {
      scope: {
        'artist': '@',
        'title': '@',
        'id': '@',
        'u': '@',
        'p': '@',
        'c': '@',
        'v': '@',
        'site': '@'
      },
      restrict: 'EA',
      templateUrl: 'app/widgets/album.html',
      link: function (scope, element, attrs) {
           scope.u = params.u;
           scope.p = params.p;
           scope.c = params.c;
           scope.v = params.v;
           scope.site = $rootScope.site;
        }
    };

    return directive;
  }
})();
