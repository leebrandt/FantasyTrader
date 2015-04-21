(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('login',{
				title: 'Login',
				url: '/login',
				templateUrl: '/modules/authentication/views/login.html'
			})
			.state('forgot',{
				title: 'Forgot Password',
				url: '/forgot',
				templateUrl: '/modules/authentication/views/forgot.html'
			});
	};

	angular.module('authentication', ['ui.router', 'base64', 'core'])
		.config(['$stateProvider', config])
		.value('AuthenticationApi', 'http://msp0lnans001.etdbw.com/security/authentication');

}());