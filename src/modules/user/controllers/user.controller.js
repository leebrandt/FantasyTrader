(function(){ 
	'use strict';
	var userController = function($state){
		var ctrl = this;

		this.loadUsers = function(){
			ctrl.users = fakeData.users;
		};

		this.loadUser = function(){
			var id = parseInt($state.params.id);
			angular.forEach(fakeData.users, function(user){
				if(user.id === id){
					ctrl.user = user;
					return;
				}
			});
		};

		this.activateUser = function(user){
			console.log('Activating:', user);
		};

		this.deactivateUser = function(user){
			console.log('Deactivating:', user);
		};

		this.lockUser = function(user){
			console.log('Locking:', user);
		};

		this.unlockUser = function(user){
			console.log('Unlocking:', user);
		};

		this.saveUser = function(){
			console.log('saving', ctrl.user);
		};

		return ctrl;
	};

	angular.module('user')
		.controller('UserCtrl', ['$state', userController]);
}());

