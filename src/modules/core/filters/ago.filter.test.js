describe('moment filter', function(){
	'use strict';

	beforeEach(module('core'));

	var ago;
	beforeEach(inject(function($filter){
		ago = $filter('ago');
	}))

	it('should return a human-readable date from now', inject(function($filter){
		var today = new Date();
		var twoDaysFromNow = new Date(today);
		twoDaysFromNow.setDate(today.getDate()+2);

		var output = ago(twoDaysFromNow);
		expect(output).toEqual(jasmine.any(String));
		expect(output).toEqual('in 2 days');
	}));

	it('should return a human-readable date ago', inject(function($filter){
		var today = new Date();
		var twoDaysFromNow = new Date(today);
		twoDaysFromNow.setDate(today.getDate()-2);

		var output = ago(twoDaysFromNow);
		expect(output).toEqual(jasmine.any(String));
		expect(output).toEqual('2 days ago');
	}));

	it('should return the value passed in for invalid dates', function(){
		var badDate = "sumpin";
		var output = ago(badDate);
		expect(output).toEqual('sumpin');
	});
});