(function(){
  'use strict';

	var config = function(snapRemoteProvider){
		snapRemoteProvider.globalOptions = {
      disable: 'right'
    }
	};

	var run = function($rootScope, snapRemote){

		$rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $rootScope.title = toState.title;
      if (window.innerWidth < 960) {
        snapRemote.close();
      }
    });

    // Snapper initialization
    $(window).resize(function () {
      adjustSnapper();
    });

    $(window).load(function () {
      adjustSnapper();
    });

    function adjustSnapper() {
      snapRemote.close();

      snapRemote.getSnapper().then(function (snapper) {
        if (window.innerWidth > 960) {
          snapper.disable();
        } else {
          snapper.enable();
        }
      });
      $rootScope.$apply();
    }
	};

	angular.module('fantasyTrader', 
    ['ui.bootstrap', 'ui.router', 'snap', 
    'core', 'registration', 'authentication', 'exchange', 'news'])
		.config(['snapRemoteProvider', config])
		.run(['$rootScope', 'snapRemote', run]);
	
}());