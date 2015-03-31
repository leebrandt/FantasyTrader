(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('news', {
				url: '/news',
				templateUrl: '/modules/news/views/news.list.html'
			});
	};

	angular.module('news', ['ui.router'])
		.config(['$stateProvider', config]);
}());