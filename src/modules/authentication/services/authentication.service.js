(function(){

	var authenticationSvc = function($http, $base64, SessionSvc, AuthenticationApi){

		var login = function(credentials){
					var config = {
						headers:{
							Authorization: 'Basic ' + $base64.encode(credentials.username + ':' + credentials.password)
						}
					};
					return $http.post(AuthenticationApi + '/token', {}, config);
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
		.factory('AuthenticationSvc', ['$http', '$base64', 'SessionSvc', 'AuthenticationApi', authenticationSvc]);
		
}());