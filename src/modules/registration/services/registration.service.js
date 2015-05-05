(function(){
	'use strict';

	var registrationService = function($http, $stateParams, Site, Registration){
		//HACK: Need to remove this and get it out of HyperMedia
		var baseUrl = 'http://msp0lnans001.etdbw.com/security/registration/';
		var initiate = function(user){
				return Site.Action('register', user);
			},
			getById = function(key){
				return Site.Link('Registration', null, {RegistrantId:$stateParams.key}).then(
					//success
					function(result){
						return result;
					},
					// error
					function(err){
						console.log(err);
					}
					);
			},
			complete = function(user){
				return $http.post(baseUrl + 'user/' + user.key, user);
			},
			getSecurityQuestions = function(){
        return $http.get(baseUrl + 'challenge/');
      };

		return {
			Initiate: initiate,
			GetById: getById,
			Complete: complete,
			GetSecurityQuestions: getSecurityQuestions
		};
	};

	angular.module('registration')
		.service('RegistrationSvc', ['$http', '$stateParams', 'Site', 'Registration', registrationService]);
}());