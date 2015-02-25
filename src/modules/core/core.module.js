(function(){
	'use strict';
	
	var config = function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home',{
				title: 'Home',
				url: '/',
				templateUrl: 'modules/core/views/home.html'
			})
			.state('news', {
				title: 'News',
				url: '/news',
				templateUrl: 'modules/core/views/news.html'
			})
			.state('rules',{
				title: 'Rules',
				url:'/rules',
				templateUrl: 'modules/core/views/rules.html'
			});

			$urlRouterProvider.otherwise('/login');
	};

	angular.module('core', ['ui.router', 'ui.bootstrap'])
		.config(['$stateProvider', '$urlRouterProvider', config]);

}())