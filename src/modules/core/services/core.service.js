(function(){

	var siteService = function(HyperResource){
		return HyperResource('/');
	};

	angular.module('core')
		.factory('Site', ['HyperResource', siteService]);
}());