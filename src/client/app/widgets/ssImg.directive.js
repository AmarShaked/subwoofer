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
      },
      restrict: 'A',
      link: function (scope, element, attrs) {
        var albumUrl  = $rootScope.site + '/rest/getCoverArt.view?id=' + scope.id +
                        '&u=' + params.u +
                        '&p=' + params.p +
                        '&c=' + params.c +
                        '&v=' + params.v +
                        '&size=' + scope.size;

        element.on('load', function() {
          element.attr('src', albumUrl);
        });
      }
    };

    return directive;
  }
})();
