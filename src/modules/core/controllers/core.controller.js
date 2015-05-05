(function(){
  'use strict';

	var coreCtrl = function($scope, $state, Logger, AuthenticationSvc, SessionSvc, Site, StockSvc){
		var ctrl = this;

    ctrl.init = function(){
      Site.Get().then(function(result){
        ctrl.site = result;
      });

      StockSvc.GetPrice(['AAPL', 'MSFT', 'GOLD','CORN','GLNG']).then(
        //success
        function(result){
          ctrl.markets = result.data.map(function(stock){
            return {
              name: stock.Symbol,
              value: stock.Price,
              change: stock.Change,
              changePct: ((parseFloat(stock.Change)) / parseFloat(stock.Open)) * 100 
            };
          });
        },
        // error
        function(err){
          Logger.LogError(err.data || err.statusText);
        });
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
		.controller('CoreCtrl', ['$scope', '$state', 'Logger', 'AuthenticationSvc', 'SessionSvc', 'Site', 'StockSvc', coreCtrl]);

}());