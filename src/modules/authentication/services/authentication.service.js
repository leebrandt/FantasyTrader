(function(){

	var authenticationSvc = function($rootScope, $base64, Site, Logger){

		var login = function(credentials){
					Site.Get().then(
						// success
						function(site){
							var action = _.find(site.actions, {'name':'login'});
							var config = {
								headers:{
									Authorization: 'Basic ' + $base64.encode(credentials.username + ':' + credentials.password)
								}
							};
							return Site.Run(action, null, config);
						}, 
						function(err){
							Logger.LogError(err);
						});
				},
				logout = function(currentUser){
					var config = {
			      headers: {
			        Authorization: currentUser.token_type + ' ' + currentUser.access_token
			      }
			    };
					return $http.delete(AuthenticationApi + '/token', config)
						.then(function(){
							SessionSvc.DestroySession();
						});
				};
		return {
			Login: login,
			Logout: logout
		};
	};

	angular.module('authentication')
		.factory('AuthenticationSvc', ['$rootScope', '$base64', 'Site', 'Logger', authenticationSvc]);
		
}());