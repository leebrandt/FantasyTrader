(function(){
	'use strict';

	var authenticationCtrl = function($rootScope, $state, $base64, SessionSvc, Logger, Site){
		var ctrl = this;
		ctrl.step = 1;
		ctrl.credentials = {};

		
		ctrl.continue = function(){
			if(ctrl.credentials.username){
				ctrl.step++;
			}else{
				Logger.LogError('You must enter your username');				
			}
		};

		ctrl.login = function(){
			if(ctrl.credentials.password){
				Site.Get().then(function(site){
					var action = _.find(site.actions, {'name':'login'});
					var config = {
						headers:{
							Authorization: 'Basic ' + $base64.encode(ctrl.credentials.username + ':' + ctrl.credentials.password)
						}
					};
					Site.Run(action, null, config).then(
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
			Site.Get().then(function(site){
				var action = _.find(site.actions, {'name':'forgotpwd'});
				action.href = action.href.replace('{UserId}', ctrl.userId);
				action.method = 'GET';
				Site.Run(action).then(
					function(result){
						ctrl.securityQuestion = result.data;
						ctrl.step++;
					},
					function(err){
						Logger.LogError('Unable to find that email in the system.');
					});
			});
		};

		ctrl.recoverPassword = function(){
			Site.Get().then(function(site){
				var action = _.find(site.actions, {'name':'forgotpwd'});
				action.href = action.href.replace('{UserId}', ctrl.userId);
				Site.Run(action, {Answer:ctrl.answer,Question:ctrl.securityQuestion}).then(
					function(result){
						Logger.LogSuccess('Your temporary password has been sent to the email provided.');
						$state.go('login');
					},
					function(err){
						Logger.LogError(err);
					});
			});
		};
		

		var currentUser = SessionSvc.GetCurrentUser();
		if(currentUser){
			$state.go('home');
		}
		

		return ctrl;


	};

	angular.module('authentication')
		.controller('AuthenticationCtrl', ['$rootScope', '$state', '$base64', 'SessionSvc', 'Logger', 'Site', authenticationCtrl]);
}());