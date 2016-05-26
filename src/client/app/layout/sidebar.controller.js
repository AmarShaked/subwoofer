(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper'];
  /* @ngInject */
  function SidebarController($state, routerHelper) {
    var vm = this;

    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    function activate() { }

    function isCurrent(menuName) {
      if ($state.current.title) {
        return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
      }
    }
  }
})();
