describe('Core Module', function(){
	describe('Percent Filter', function(){
		'use strict';

		beforeEach(module('core'));

		var percent;
		beforeEach(inject(function($filter){
			percent = $filter('percentage');
		}));

		it('should return a string value precentage representation of the number', function(){
			var value = percent(12);
			expect(value).toEqual(jasmine.any(String));
			expect(value).toEqual('12%');
		});

		it('should return the proper number of decimal places', function(){
			var value = percent(10,2);
			expect(value).toEqual('10.00%');
		});

		it('should round excess decimal places', function(){
			var value = percent(10.1289, 2);
			expect(value).toEqual('10.13%');
		});

		it('should return \'0%\' for invalid input values', function(){
			var value = percent('badValue');
			expect(value).toEqual('0%');
		});
	});
});