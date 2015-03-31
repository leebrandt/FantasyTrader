describe('Registration module', function(){
	describe('Registration Controller', function(){
		'use strict';

		beforeEach(module('registration'));

		var controller;
		beforeEach(inject(function($controller){
			controller = $controller('RegistrationCtrl');
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

	});
});