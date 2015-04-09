(function(){

	var sessionService = function($window){

		var createSession = function(user){
					$window.sessionStorage.currentUser = angular.toJson(user);
				},
				getCurrentUser = function(){
					return angular.fromJson($window.sessionStorage.currentUser);
				},
				destroySession = function(){
					delete $window.sessionStorage.currentUser;
				};
		return {
			CreateSession: createSession,
			GetCurrentUser: getCurrentUser,
			DestroySession: destroySession
		};
	};

	angular.module('core')
		.factory('SessionSvc', ['$window', sessionService]);
}());