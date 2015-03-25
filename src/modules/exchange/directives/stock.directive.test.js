describe('Stock directive', function(){
	'use strict';

	var $compile, $rootScope, element;
	var fakeStock = {
		Symbol: 'AAPL',
		LastPrice: 524.23,
		Change: -1.23,
		ChangePercent: -0.012
	};

	beforeEach(module('exchange'));

	beforeEach(module('templates'));

	beforeEach(inject(function($httpBackend, _$compile_, _$rootScope_){
		
		$httpBackend
			.whenJSONP('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=AAPL&callback=JSON_CALLBACK')
			.respond(fakeStock);

		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(inject(function($httpBackend){
		var ngElement = angular.element('<stock symbol="AAPL"></exhange>');
		element = $compile(ngElement)($rootScope);
		$rootScope.$digest();
		$httpBackend.flush();
	}));

	it('should display the stock symbol', function(){
		expect(element.html()).toContain(fakeStock.Symbol);
	});

	it('should display the last price for the stock', function(){
		expect(element.html()).toContain(fakeStock.LastPrice);
	});

	it('should display the change in price for the stock', function(){
		expect(element.html()).toContain(fakeStock.Change);
	});

	it('should display the change percentage for the stock', function(){
		expect(element.html()).toContain(fakeStock.ChangePercent);
	});
	
});