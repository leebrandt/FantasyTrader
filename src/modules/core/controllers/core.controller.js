(function(){

	var coreCtrl = function($state, AuthenticationSvc, SessionSvc){
		var ctrl = this;
    ctrl.logout = function(){
      var currentUser = SessionSvc.GetCurrentUser();
      AuthenticationSvc.Logout(currentUser)
        .then(function(){
          console.log('gotcha');
          $state.go('login');
        });
    };
		return ctrl;
	};

	angular.module('core')
		.controller('CoreCtrl', ['$state', 'AuthenticationSvc', 'SessionSvc', coreCtrl]);

}());