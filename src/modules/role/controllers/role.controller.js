(function(){ 
	'use strict';

	var roleController = function(){
		var ctrl = this;

		ctrl.loadRoles = function(){
			ctrl.roles = [{
				name:'super-admin'
			},{
				name:'admin'
			},{
				name:'broker'
			},{
				name:'user'
			},{
				name:'something'
			}];
		};

		return ctrl;
	};

	angular.module('role')
		.controller('RoleCtrl', [roleController]);
}());