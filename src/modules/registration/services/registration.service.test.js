describe('Registration Service', function(){
	'use strict';

	beforeEach(module('registration'));

	var $httpBackend, svc, testUser;
	beforeEach(inject(function($injector, _RegistrationSvc_) {
		$httpBackend = $injector.get('$httpBackend');
		svc = _RegistrationSvc_;
		testUser = {firstName: 'Jim', lastName: 'Bo', email:'jim@bo.com'};
	}));

	describe('Registration initialiation', function() {
		
		var initiationPromise;
		beforeEach(function() {
			initiationPromise = svc.Initiate(testUser);
		});

		describe('Successful initialization', function() {

			it('should get a registration token', function(){
				$httpBackend.whenPOST('http://localhost/fakeRegistrationSvc').respond(200, testUser);
				initiationPromise.then(function(result){
					expect(result.data).toEqual(testUser);
				});
				$httpBackend.flush();
			});
			
		});

		describe('Unsuccessful initialization', function() {

			it('should get a failure reason/description', function(){
				var errorMessage = 'An error occurred. Here\'s why:';
				$httpBackend.whenPOST('http://localhost/fakeRegistrationSvc').respond(500, {Message:errorMessage});
				initiationPromise.then(
					function(result){
						fail('Testing failure, but called success condition function');
					},
					function(err){
						expect(err.data.Message).toEqual(errorMessage);
					}
				);
				$httpBackend.flush();
			});
		});

		afterEach (function () {
      $httpBackend.verifyNoOutstandingExpectation ();
      $httpBackend.verifyNoOutstandingRequest ();
    });

	});

});