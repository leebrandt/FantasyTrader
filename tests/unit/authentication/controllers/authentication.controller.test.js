describe('Authentication Controller', function(){
	'use strict';

	beforeEach(module('authentication'));

	var controller;
	beforeEach(inject(function($controller, $state){
		controller = $controller('AuthenticationCtrl');
		spyOn($state, 'go').and.callFake(function(state, params){
			// do nothing on purpose.
		});
	}));

	it('should be defined', function(){
		expect(controller).toBeDefined();
	});

	it('should start with the first step of authentication', function(){
		expect(controller.step).toEqual(1);
	});

	it('should start with empty credentials', function(){
		expect(controller.credentials).toBeDefined();
		expect(controller.credentials).toEqual({});
	});

	it('should accept the username first', function(){
		controller.credentials.username = 'e@mail.com';
		controller.continue();
		expect(controller.step).toEqual(2);
	});

	it('should not continue without _something_ in the username', function(){
		controller.continue();
		expect(controller.step).toEqual(1);
	});

	it('should take the password second and sign in', inject(function($state){
		controller.credentials.username = 'e@mail.com';
		controller.credentials.password = 'p@ssw0rd';
		controller.signIn();
		expect($state.go).toHaveBeenCalled();
	}));

});