(function(){
	'use strict';

	var registrationService = function($http){
		var initiate = function(user){};

		return {
			Initiate: initiate
		};
	};

	angular.module('registration')
		.service('RegistrationSvc', ['$http', registrationService]);
}());