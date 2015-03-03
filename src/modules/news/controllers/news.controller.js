(function(){
	'use strict';

	var newsCtrl = function($http){
		var ctrl = this;

		this.loadNews = function(){
			$http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&q=http://feeds.feedburner.com/benzinga')
				.success(function(results){
					ctrl.news = results.responseData.feed;
				})
				.error(function(err){
					console.log(err);
				});
		};

		this.loadNewsItem = function(){

		};

		return ctrl;
	};

	angular.module('news')
		.controller('NewsCtrl', ['$http', newsCtrl]);
}());