(function(){
	'use strict';
	
	var registrationCtrl = function(){
		var ctrl = this;

		ctrl.firstName = '';
		ctrl.lastName = '';
		ctrl.emailAddress = '';
		ctrl.captcha = '';

		return ctrl;
	};

	angular.module('registration')
		.controller('RegistrationCtrl', [registrationCtrl]);
}());