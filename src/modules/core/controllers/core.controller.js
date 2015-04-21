(function(){
  'use strict';

	var coreCtrl = function($state, AuthenticationSvc, SessionSvc, Site){
		var ctrl = this;

    ctrl.init = function(){
      Site.Get().then(function(result){
        ctrl.site = result;
      });
    };

    ctrl.logout = function(){
      var currentUser = SessionSvc.GetCurrentUser();
      AuthenticationSvc.Logout(currentUser)
        .then(function(){
          $state.go('login');
        });
    };

    ctrl.hasLink = function(relName){
      if(ctrl.site && ctrl.site.links){
        return !!_.find(ctrl.site.links, {'rel':relName});
      }
      return false;
    };

    ctrl.hasAction = function(name){
      if(ctrl.site && ctrl.site.actions){
        return !!_.find(ctrl.site.actions, {'name':name});
      }
      return false;
    };

		return ctrl;
	};

	angular.module('core')
		.controller('CoreCtrl', ['$state', 'AuthenticationSvc', 'SessionSvc', 'Site', coreCtrl]);

}(_));