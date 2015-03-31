describe('Authentication module', function(){

	beforeEach(function(){
		module('authentication');	
	});
	
	describe('routing', function(){

		it('should be able to go to the login page', inject(function($state){
			expect($state.href('login')).toEqual('#/login');
		}));

	});

});