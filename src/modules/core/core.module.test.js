describe('Core Module', function(){

	beforeEach(module('core'));

	describe('routing', function(){

		it('should be able to go to home page', inject(function($state){
			expect($state.href('home')).toEqual('#/');
		}));

		it('should be able to go to rules page', inject(function($state){
			expect($state.href('rules')).toEqual('#/rules');
		}));

	});

});