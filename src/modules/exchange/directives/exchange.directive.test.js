describe('Exchange module', function(){
	describe('Exchange directive', function(){
		'use strict';

		var $compile, $rootScope, element;
		var fakeExchange = {
				name: 'Exchange Name',
				currentWeek: 3,
				durationWeeks: 10,
				currentPlace: 3,
				endDate: '3/15',
				portfolio:{
					value: 234.56,
					change: -20.3,
					changePct: -2.3,
				}
			};

		beforeEach(module('exchange'));

		beforeEach(module('templates'));

		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		}));

		beforeEach(function(){
			$rootScope.exchange = fakeExchange;
			var ngElement = angular.element('<exchange exchange="exchange"></exhange>');
			element = $compile(ngElement)($rootScope);
			$rootScope.$digest();
		});

		it('displays the exchange Name', function(){
			expect(element.html()).toContain(fakeExchange.name);
		});

		it('displays the portfolio value for the exchange', function(){
			expect(element.html()).toContain(fakeExchange.portfolio.value);
		});

		it('displays the change in the potfolio value of the exchange', function(){
			expect(element.html()).toContain(fakeExchange.portfolio.change);
		});

		it('displays the change percentage in the potfolio value of the exchange', function(){
			expect(element.html()).toContain(fakeExchange.portfolio.changePct + '%');
		});

		it('displays the current trade week of the exchange', function(){
			expect(element.html()).toContain(fakeExchange.currentWeek);
		});

		it('displays the trade duration of the exchange', function(){
			expect(element.html()).toContain(fakeExchange.durationWeeks);
		});

		it('displays the user\'s current place in the exchange', function(){
			expect(element.html()).toContain(fakeExchange.currentPlace);
		});

		it('displays the end date of trading for the exchange', function(){
			expect(element.html()).toContain(fakeExchange.endDate);
		});

	});
});