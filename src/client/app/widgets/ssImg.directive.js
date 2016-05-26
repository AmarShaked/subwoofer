(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('ssimg', ssimg);

  ssimg.$inject = ['config', '$rootScope'];
  /* @ngInject */
  function ssimg(config, $rootScope) {
    //Usage:
    //<img ht-img-person="{{person.imageSource}}"/>

    var params = $rootScope.subsonicParams;

    var directive = {
      scope: {
        'size': '@',
        'id': '@',
        'u': '@',
        'p': '@',
        'c': '@',
        'v': '@',
        'site': '@'
      },
      restrict: 'EA',
      template: '<img ng-src="{{site}}/rest/getCoverArt.view?id={{id}}' +
                '&u={{u}}&p={{p}}&c={{c}}&v={{v}}&size={{size}}">',
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
