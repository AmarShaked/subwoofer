(function() {
  'use strict';


    var PlayerEvents = {
    	albumChanged: 'ALBUM_CHANGED'
    }

  angular
    .module('app.player')
    .constant('PlayerEvents', PlayerEvents);


})()