(function(){
	'use strict';

	var filter = function ($filter) {
	  return function (input) {
	  	if(moment(input).isValid()){
	  		return moment(input).fromNow();
	  	}else{
	  		return input;
	  	}
	  };
	};

	angular.module('core').filter('ago', ['$filter', filter]);

}());