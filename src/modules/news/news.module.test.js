describe('News module', function(){

	beforeEach(module('news'));

	describe('routing', function(){
		it('should be able to get to the news listing page', inject(function($state){
			expect($state.href('news')).toEqual('#/news');
		}));
	});

});