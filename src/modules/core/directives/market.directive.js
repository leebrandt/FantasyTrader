(function(){
	'use strict';

	var market = function(){
		return {
			restrict: 'E',
			scope:{
				market: '='
			},
			templateUrl: '/modules/core/directives/templates/market.template.html'
		};
	};

	angular.module('core')
		.directive('market', [market]);
}());