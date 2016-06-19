(function() {
  'use strict';

  angular
    .module('app.utils')
    .service('GeneralTasks', GeneralTasks);

  GeneralTasks.$inject = [];
  /* @ngInject */
  function GeneralTasks() {
    var service = {
      durationToTime: durationToTime
    };

    function durationToTime(duration) {
      var time = new Date(duration * 1000);
      var seconds = time.getSeconds()  < 10 ? "0" + time.getSeconds() : time.getSeconds();
      var minutes = time.getMinutes();
      return minutes + ":" + seconds;
    }

    return service;
  }
})();
