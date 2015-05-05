describe('Core Module', function(){
	describe('Core Controller', function(){
		'use strict';

		beforeEach(module('core'));

		var controller;
		beforeEach(inject(function($rootScope, $controller){
			var $scope = $rootScope.$new();
			controller = $controller('CoreCtrl', {$scope:$scope});
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

		it('should be able to initialize', function(){
			expect(typeof controller.init).toBe('function');
		});

	});
});