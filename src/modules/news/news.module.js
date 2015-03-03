(function(){
	'use strict';
	
	var config = function($stateProvider){
		$stateProvider
			.state('news', {
				url: '/news',
				templateUrl: '/modules/news/views/news.list.html'
			})
			.state('news-detail',{
				url: '/news/:id',
				templateUrl: '/modules/news/views/news.detail.html'
			});
	};

	angular.module('news', [])
		.config(['$stateProvider', config]);
}());