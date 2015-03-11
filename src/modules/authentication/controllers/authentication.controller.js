(function(){
	'use strict';

	var authenticationCtrl = function($state){
		var ctrl = this;
		ctrl.step = 1;
		ctrl.credentials = {};

		ctrl.continue = function(){
			if(ctrl.credentials.username)
			{
				ctrl.step++;
			}
		};

		ctrl.signIn = function(){
			$state.go('exchange.list');
		};

		return ctrl;
	};

	angular.module('authentication')
		.controller('AuthenticationCtrl', ['$state', authenticationCtrl]);
}());