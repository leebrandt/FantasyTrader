(function(){
	'use strict';

	var interceptor = function($q, $rootScope, $window){
		var numLoadings = 0;

    return {
      request: function (config) {
        var currentUser = angular.fromJson($window.sessionStorage.currentUser);

        config.headers = config.headers || {};
        if (currentUser) {
          config.headers.Authorization = 'Bearer ' + currentUser.token;
        }

        if(config.method === 'GET') {
          config.headers.Accept = 'application/vnd.siren+json';
        }else{
        	config.headers['Content-Type'] = 'application/json';
        }

        numLoadings++;

        // Show loader
        $rootScope.$broadcast('loader_show');

        return config || $q.when(config);

      },
      response: function (response) {

        if ((--numLoadings) === 0) {
          // Hide loader
          $rootScope.$broadcast('loader_hide');
        }

        return response || $q.when(response);

      },
      responseError: function (response) {
        if (!(--numLoadings)) {
          // Hide loader
          $rootScope.$broadcast('loader_hide');
        }

        return $q.reject(response);
      }
    };

	};

	angular.module('core')
		.factory('httpInterceptor', ['$q', '$rootScope', '$window', interceptor])

}());