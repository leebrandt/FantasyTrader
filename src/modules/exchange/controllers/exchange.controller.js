(function(){
	'use strict';

	var exchangeCtrl = function($rootScope, $state, ExchangeSvc){
		var ctrl = this;

		ctrl.loadExchangeList = function(){
			ExchangeSvc.List().then(function(result){
				ctrl.exchangeList = result;
			},
			function(err){
				console.log(err);
			});
		};

		ctrl.loadExchange = function(){
			var id = $state.params.id;
			ExchangeSvc.GetById(id).then(function(result){
				ctrl.exchange = result;
				$rootScope.title = result.name;
			},
			function(err){
				console.log(err);
			});
		};

		return ctrl;
	};

	angular.module('exchange')
		.controller('ExchangeCtrl', ['$rootScope', '$state', 'ExchangeSvc', exchangeCtrl]);
}());