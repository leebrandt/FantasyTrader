(function(){
	'use strict';

	var exchange = function(){

		return {
			restrict: 'E',
			scope:{
				exchange: '='
			},
			templateUrl: '/modules/exchange/directives/templates/exchange.template.html'
		};
	};

	angular.module('exchange')
		.directive('exchange', [exchange]);
}());