(function(){
	'use strict';

	var stockDirective = function($http){
		return {
			restrict: 'E',
			scope:{
				symbol:'='
			},
			templateUrl: '/modules/exchange/directives/templates/stock.template.html',
			link: function(scope, element, attrs){
				$http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+attrs.symbol+'&callback=JSON_CALLBACK')
					.success(function(result){
						console.log(result);
						scope.stock = result;
					})
					.error(function(err){
						console.log(err);
					});
			}
		};
	};

	angular.module('exchange')
		.directive('stock', ['$http', stockDirective]);
}());