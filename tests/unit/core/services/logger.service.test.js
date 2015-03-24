describe('Logger service', function(){
	'use strict';

	beforeEach(module('core', function($provide){
		toastr = {};
		toastr.info = jasmine.createSpy();
		toastr.error = jasmine.createSpy();
		toastr.success = jasmine.createSpy();
		toastr.warning = jasmine.createSpy();
		$provide.constant('toastr', toastr);
	}));

	var service;
	beforeEach(inject(function(Logger){
		service = Logger;
	}));

	describe('Error logging', function(){
		beforeEach(function(){
			spyOn(console, 'error');
			service.LogError('message');
		});

		it('should log errors to console', function(){
			expect(console.error).toHaveBeenCalledWith('message');
		});

		it('should show a toast for errors', function(){
			expect(toastr.error).toHaveBeenCalledWith('message', 'Error');
		});
	});

	describe('Success logging', function(){
		it('should show a toast for success messages', function(){
			service.LogSuccess('success message');
			expect(toastr.success).toHaveBeenCalledWith('success message', 'Success');
		});
	});

	describe('Warning logging', function(){
		beforeEach(function(){
			spyOn(console, 'warn');
			service.LogWarning('message');
		});

		it('should log warnings to the console', function(){
			expect(console.warn).toHaveBeenCalledWith('message');
		})

		it('should show a toast with the warning message', function(){
			expect(toastr.warning).toHaveBeenCalledWith('message', 'Warning');
		})
	});

	describe('Information logging', function(){
		beforeEach(function(){
			spyOn(console, 'info');
			service.LogInfo('Info message');
		});

		it('should log information to the console', function(){
			expect(console.info).toHaveBeenCalledWith('Info message');
		});

		it('should show a toast with information messages', function(){
			expect(toastr.info).toHaveBeenCalledWith('Info message', 'Information');
		})
	});


	describe('Debug logging', function(){
		it('should log debug info to the console', function(){
			spyOn(console, 'debug');
			service.LogDebug('debug message');
			expect(console.debug).toHaveBeenCalledWith('debug message');
		})
	});


});