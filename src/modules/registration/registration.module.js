(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('registration', {
				title: 'Registration',
				url: '/register',
				templateUrl: '/modules/registration/views/register.html'
			})
			.state('thanks', {
				title: 'Thanks',
				url: '/register/thanks',
				templateUrl: '/modules/registration/views/thanks.html'
			});
	};

	angular.module('registration', ['ui.router', 'vcRecaptcha', 'core'])
		.config(['$stateProvider', config]);

}());