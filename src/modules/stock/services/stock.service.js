(function(){
	'use strict';

	var stockService = function($http){
		var baseUrl = 'http://msp0lnans001.etdbw.com/fantasytrader/stock';

		var getStockPrice = function(symbols){
			return $http.get(baseUrl + '/price?symbol=' + symbols.join(','));
		};

		return {
			GetPrice: getStockPrice
		};

	};

	angular.module('stock')
		.factory('StockSvc', ['$http', stockService]);
}());