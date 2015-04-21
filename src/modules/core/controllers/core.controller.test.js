describe('Core Module', function(){
	describe('Core Controller', function(){
		'use strict';

		beforeEach(module('core'));

		var controller;
		beforeEach(inject(function($controller){
			controller = $controller('CoreCtrl');
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

		it('should be able to initialize', function(){
			expect(typeof controller.init).toBe('function');
		});

		

	});
});