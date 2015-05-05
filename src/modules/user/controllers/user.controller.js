(function(){ 
	'use strict';
	var userController = function(){
		var ctrl = this;

		this.loadUsers = function(){
			ctrl.users = fakeData.users;
		};

		return ctrl;
	};

	angular.module('user')
		.controller('UserCtrl', [userController]);
}());

