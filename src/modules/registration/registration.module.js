(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('registration', {
				title: 'Registration',
				url: '/register',
				templateUrl: '/modules/registration/views/register.html'
			});
	};

	angular.module('registration', ['ui.router', 'vcRecaptcha'])
		.config(['$stateProvider', config]);

}());