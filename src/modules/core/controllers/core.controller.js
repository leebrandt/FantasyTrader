(function(){

	var coreCtrl = function($http){
		var ctrl = this;

		return ctrl;
	};

	angular.module('core')
		.controller('CoreCtrl', ['$http', coreCtrl]);

}());