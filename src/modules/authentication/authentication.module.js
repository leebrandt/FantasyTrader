(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('login',{
				title: 'Login',
				url: '/login',
				templateUrl: '/modules/authentication/views/login.html'
			});
	};

	angular.module('authentication', ['ui.router', 'exchange'])
		.config(['$stateProvider', config]);

}());