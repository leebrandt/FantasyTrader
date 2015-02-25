(function(){
	'use strict';

	var filter = function ($filter) {
	  return function (input, decimals) {
	    return $filter('number')(input, decimals)+'%';
	  };
	};

	angular.module('core').filter('percentage', ['$filter', filter]);

}());

