describe('Exchange module', function(){

	beforeEach(module('exchange'));

	describe('routing', function(){

		it('should be able to load the exchange listing page', inject(function($state){
			expect($state.href('exchange.list')).toEqual('#/exchange/list');
		}));

		it('should be able to load the exchange detail page', inject(function($state){
			expect($state.href('exchange.detail',{id:1234})).toEqual('#/exchange/detail/1234');
		}));
	});

});