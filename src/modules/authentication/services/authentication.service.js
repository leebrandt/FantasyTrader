(function(){

	var authenticationSvc = function($base64, Site, Logger){

		var login = function(credentials){
					var config = {
						headers:{
							Authorization: 'Basic ' + $base64.encode(credentials.username + ':' + credentials.password)
						}
					};
					return Site.Action('login', null, config);
				},
				logout = function(){
					return Site.Action('logout');
				},
				loadSecurityQuestion = function(userId){
					return Site.Link('challenge', null, {UserId:userId});
				},
				recoverPassword = function(userId, question, answer){
					return Site.Action('forgotpwd', {Answer:answer,Question:question}, null, {UserId:userId});
				};
		return {
			Login: login,
			Logout: logout,
			LoadSecurityQuestion: loadSecurityQuestion,
			RecoverPassword: recoverPassword
		};
	};

	angular.module('authentication')
		.factory('AuthenticationSvc', ['$base64', 'Site', 'Logger', authenticationSvc]);
		
}());