(function(){ 
	'use strict';

	var config = function($stateProvider, $urlRouterProvider){

		// $urlRouterProvider.otherwise('/admin');
		
		$stateProvider
			.state('user-list',{
				url: '/admin/user/list',
				templateUrl: 'modules/user/views/user.list.view.html'
			})
			.state('user-edit',{
				url: '/admin/user/edit/:id',
				templateUrl: 'modules/user/views/user.edit.view.html'
			});

	};

	angular.module('user', ['ui.router'])
		.config(['$stateProvider', '$urlRouterProvider', config]);
}());