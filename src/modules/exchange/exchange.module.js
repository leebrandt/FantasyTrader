(function(){
	'use strict';

	var config = function($stateProvider){
		$stateProvider
			.state('exchange', {
				abstract:true,
				url:'/exchange',
				templateUrl: '/modules/exchange/views/exchange.html',
				controller: 'ExchangeCtrl as vm'
			})
			.state('exchange.list', {
				title: 'Exchanges',
				parent: 'exchange',
				url: '/list',
				templateUrl: '/modules/exchange/views/exchange.list.html'
			})
			.state('exchange.detail', {
				title: 'Exchange',
				parent: 'exchange',
				url: '/detail/:id',
				templateUrl:'/modules/exchange/views/exchange.detail.html'
			});
	};

	angular.module('exchange', [])
		.config(['$stateProvider', config]);
}());