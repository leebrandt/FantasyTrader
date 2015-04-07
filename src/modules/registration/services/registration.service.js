(function(){
	'use strict';

	var registrationService = function($http, RegistrationApi){
		var initiate = function(user){
				return $http.post(RegistrationApi + 'user', user);
			},
			getById = function(key){
				return $http.get(RegistrationApi + 'user/' + key);
			},
			complete = function(user){
				return $http.post(RegistrationApi + 'user/' + user.key, user);
			},
			getSecurityQuestions = function(){
        return $http.get(RegistrationApi + '/challenge');
      };

		return {
			Initiate: initiate,
			GetById: getById,
			Complete: complete,
			GetSecurityQuestions: getSecurityQuestions
		};
	};

	angular.module('registration')
		.service('RegistrationSvc', ['$http', 'RegistrationApi', registrationService]);
}());