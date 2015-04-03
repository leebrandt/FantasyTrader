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
			})
			.state('complete',{
				title: 'Complete Registration',
				url:'/register/complete/:key'
			});
	};

	angular.module('registration', ['ui.router', 'vcRecaptcha', 'core'])
		.config(['$stateProvider', config]);

}());