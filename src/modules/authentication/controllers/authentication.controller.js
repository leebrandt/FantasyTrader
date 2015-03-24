(function(){
	'use strict';

	var authenticationCtrl = function($state, Logger){
		var ctrl = this;
		ctrl.step = 1;
		ctrl.credentials = {};

		ctrl.continue = function(){
			if(ctrl.credentials.username)
			{
				ctrl.step++;
				return;
			}
			Logger.LogError('You must enter your username');
		};

		ctrl.signIn = function(){
			$state.go('exchange.list');
		};

		return ctrl;
	};

	angular.module('authentication')
		.controller('AuthenticationCtrl', ['$state', 'Logger', authenticationCtrl]);
}());