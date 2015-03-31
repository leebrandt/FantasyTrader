(function(){
	'use strict';

	var filter = function ($filter) {
	  return function (input) {
	  	if(moment(new Date(input)).isValid()){
	  		return moment(new Date(input)).fromNow();
	  	}else{
	  		return input;
	  	}
	  };
	};

	angular.module('core').filter('ago', ['$filter', filter]);

}());