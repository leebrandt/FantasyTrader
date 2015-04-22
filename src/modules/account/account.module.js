(function(){

	var config = function($stateProvider){
		$stateProvider
			.state('passwordReset',{
				url: '/password/reset',
				templateUrl: 'modules/account/views/reset.html'
			});
	};

	angular.module('account', ['core'])
		.config(['$stateProvider', config]);
}());