(function(){
	'use strict';
	
	var registrationCtrl = function($state, $stateParams, RegistrationSvc, Logger){
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

		ctrl.loadRegistration = function(){
			var key = $stateParams.key;
			RegistrationSvc.GetById(key)
				.then(
					//success
					function(user){
						ctrl.user = user;
					},
					function(err){
						$state.go('register');
						Logger.LogError(err);
					}
				);
		};

		ctrl.complete = function(){
			RegistrationSvc.Complete(ctrl.user)
				.then(
					// success
					function(result){
						ctrl.user.token = result;
						$state.go('home');
						Logger.LogSuccess('Successfully registered.');
					},
					// error
					function(err){
						Logger.LogError(err);
					}
				);
		};

		return ctrl;
	};

	angular.module('registration')
		.controller('RegistrationCtrl', ['$state', '$stateParams', 'RegistrationSvc', 'Logger', registrationCtrl]);
}());