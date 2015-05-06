(function(){
	
	var config = function($stateProvider){
		$stateProvider
			.state('role-list', {
				url: '/admin/role/list',
				templateUrl: 'modules/role/views/role.list.view.html'
			});
	};

	angular.module('role', [])
	.config(['$stateProvider', config]);
}());