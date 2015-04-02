describe('Registration module', function(){

	beforeEach(module('registration'));

	describe('routing', function(){
		it('should be able to get to the registration page', inject(function($state){
			expect($state.href('registration')).toEqual('#/register');
		}));

		it('should be able to get to the regitration thank you page', inject(function($state){
			expect($state.href('thanks')).toEqual('#/register/thanks');
		}));
	});

});