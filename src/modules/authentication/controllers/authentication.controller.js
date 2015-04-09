(function(){
	'use strict';

	var authenticationCtrl = function($state, AuthenticationSvc, SessionSvc, Logger){
		var ctrl = this;
		ctrl.step = 1;
		ctrl.credentials = {};

		ctrl.continue = function(){
			if(ctrl.credentials.username)
			{
				ctrl.step++;
			}else{
				Logger.LogError('You must enter your username');				
			}
		};

		ctrl.login = function(){
			if(ctrl.credentials.password){
				AuthenticationSvc.Login(ctrl.credentials)
					.then(
						//success
						function(result){
							SessionSvc.CreateSession(result.data);
							$state.go('home');
						},
						//error
						function(err){
							ctrl.step--;
							Logger.LogError(err);
						}
					);
			}else{
				Logger.LogError('You must enter a password');				
			}
		};

		var currentUser = SessionSvc.GetCurrentUser();
		if(currentUser){
			$state.go('home');
		}

		return ctrl;


	};

	angular.module('authentication')
		.controller('AuthenticationCtrl', ['$state', 'AuthenticationSvc', 'SessionSvc', 'Logger', authenticationCtrl]);
}());