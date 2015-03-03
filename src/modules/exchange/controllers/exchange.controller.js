(function(){
	'use strict';

	var exchangeCtrl = function($rootScope, $state, ExchangeSvc){
		var ctrl = this;

		ctrl.loadExchangeList = function(){
			ExchangeSvc.List().then(function(result){
				ctrl.exchangeList = result.map(function(exchange){
					exchange.currentWeek = moment(exchange.startDate).twix(moment()).count('weeks');
					exchange.endDate = moment(exchange.startDate).add(exchange.durationWeeks, 'weeks').format('M/D');
					return exchange;
				})
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
				var totalStocks = result.portfolio.stocks.reduce(
						function(total, stock){ 
							return total + (stock.price * stock.shares); 
						},0);
				ctrl.exchange.portfolio.cash = result.portfolio.value - totalStocks;
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