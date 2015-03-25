(function(){
	'use strict';

	var filter = function ($filter) {
	  return function (input, decimals) {
	  	if(isNaN(input)){
	  		return '0%';	  		
	  	}
    	return $filter('number')(input, decimals)+'%';
	  };
	};

	angular.module('core').filter('percentage', ['$filter', filter]);

}());

