(function(){
	'use strict';

	var authenticationCtrl = function($rootScope, $state, AuthenticationSvc, SessionSvc, Logger){
		var ctrl = this;
		ctrl.step = 1;
		ctrl.credentials = {};

		var currentUser = SessionSvc.GetCurrentUser();
		if(currentUser){
			$state.go('home');
		}

		ctrl.continue = function(){
			if(ctrl.credentials.username){
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
						var user = result.data;
						$rootScope.$broadcast('auth-login-success', user);
					},
					//error
					function(err){
						ctrl.step--;
						Logger.LogError(err.data);
					});
			}else{
				Logger.LogError('You must enter a password');				
			}
		};

		ctrl.loadSecurityQuestion = function(){
			if(!ctrl.userId){
				Logger.LogError('You must enter your email address.');
				return;
			}
			AuthenticationSvc.LoadSecurityQuestion(ctrl.userId)
			.then(
				function(result){
					ctrl.securityQuestion = result.data;
					ctrl.step++;
				},
				function(err){
					Logger.LogError(err.data);
				});
		};

		ctrl.recoverPassword = function(){
			AuthenticationSvc.RecoverPassword(ctrl.userId, ctrl.securityQuestion, ctrl.answer)
			.then(
				function(result){
					Logger.LogSuccess('Your temporary password has been sent to the email provided.');
					$state.go('login');
				},
				function(err){
					Logger.LogError(err);
				});
		};
		

		return ctrl;


	};

	angular.module('authentication')
		.controller('AuthenticationCtrl', ['$rootScope', '$state', 'AuthenticationSvc', 'SessionSvc', 'Logger', authenticationCtrl]);
}());