(function(){
	'use strict';

	var registrationService = function($http){
		var initiate = function(user){
				return $http.post('http://localhost/fakeRegistrationSvc');
			},
			getById = function(key){
				return $http.get('http://localhost/fakeRegistrationSvc/' + key);
			},
			complete = function(user){
				return $http.post('http://localhost/fakeRegistrationSvc/' + user.key);
			};

		return {
			Initiate: initiate,
			GetById: getById,
			Complete: complete
		};
	};

	angular.module('registration')
		.service('RegistrationSvc', ['$http', registrationService]);
}());