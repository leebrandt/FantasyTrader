(function(){
	'use strict';
	
	var registrationCtrl = function($state, RegistrationSvc, Logger){
		var ctrl = this;

		ctrl.register = function(){
			RegistrationSvc.Initiate(ctrl.user)
				.then(
					//success
					function(user){
						$state.go('thanks');
					}, 
					//error
					function(err){
						Logger.LogError(err);
					}
				);
		};

		return ctrl;
	};

	angular.module('registration')
		.controller('RegistrationCtrl', ['$state', 'RegistrationSvc', 'Logger', registrationCtrl]);
}());