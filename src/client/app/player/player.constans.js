(function() {
  'use strict';


    var PlayerEvents = {
    	albumChanged: 'ALBUM_CHANGED',
    	songChanged: 'SONG_CHANGED'
    }

  angular
    .module('app.player')
    .constant('PlayerEvents', PlayerEvents);


})()