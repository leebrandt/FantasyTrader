(function(){
  'use strict';

	var coreCtrl = function($scope, $state, Logger, AuthenticationSvc, SessionSvc, Site){
		var ctrl = this;

    ctrl.init = function(){
      Site.Get().then(function(result){
        ctrl.site = result;
      });
      ctrl.markets = [
        {name:'DJIA', value:17265.83, change:-52.02, changePct:-0.87},
        {name:'NASDAQ', value:4662.83, change:-20.81, changePct:-0.44},
        {name:'GOLD', value:17265.83, change:26.45, changePct:2.11},
        {name:'SILVER', value:17265.83, change:0.48, changePct:2.88}, 
        {name:'BITCOIN', value:17265.83, change:-5.75, changePct:-2.48}];
    };

    ctrl.logout = function(){
      Site.Get().then(function(site){
        var action = _.find(site.actions, {'name':'logout'});
        Site.Run(action).then(function(){
          $scope.$broadcast('auth-logout-success');
        });
      })
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

    $scope.$on('auth-logout-success', function(event){
      SessionSvc.DestroySession();
      ctrl.init();
      Logger.LogSuccess('Successfully logged out.');
      $state.go('home');
    });

    $scope.$on('auth-login-success', function(event, user){
      SessionSvc.CreateSession(user);
      ctrl.init();
      Logger.LogSuccess('Welcome ' + user.username+'!');
      $state.go('home');
    });

		return ctrl;
	};

	angular.module('core')
		.controller('CoreCtrl', ['$scope', '$state', 'Logger', 'AuthenticationSvc', 'SessionSvc', 'Site', coreCtrl]);

}());