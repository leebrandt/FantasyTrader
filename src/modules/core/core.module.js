(function(){
	'use strict';
	
	var config = function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home',{
				title: 'Home',
				url: '/',
				templateUrl: 'modules/core/views/home.html'
			})
			.state('rules',{
				title: 'Rules',
				url:'/rules',
				templateUrl: 'modules/core/views/rules.html'
			});

			$urlRouterProvider.otherwise('/');
	};

	var run = function($rootScope){
		toastr.options = {
			closeButton: true,
			positionClass: 'toast-top-right',
			timeout: 3000
		};
	};

	angular.module('core', ['ui.router', 'ui.bootstrap', 'authentication', 'hyper-resource'])
	.constant('toastr', window.toastr)
		.config(['$stateProvider', '$urlRouterProvider', config])
		.run(['$rootScope', run]);

}());