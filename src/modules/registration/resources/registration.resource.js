(function(){

	var registration = function(HyperResource){
		return HyperResource('/security/registration/user/:registrantId');
	};

	angular.module('registration')
		.factory('Registration', ['HyperResource', registration]);
}());