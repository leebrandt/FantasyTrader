describe('Registration module', function(){
	'use strict';
	
	describe('Registration Service', function(){

		var regServiceUrl = 'http://localhost/fakeRegistrationSvc', 
				key = 'MYKEYVALUEISHERE',
				errorMessage = 'An error occurred. Here\'s why:';

		beforeEach(module('registration'));

		var $httpBackend, svc, testUser;		
		beforeEach(inject(function($injector, _RegistrationSvc_) {
			$httpBackend = $injector.get('$httpBackend');
			svc = _RegistrationSvc_;
			testUser = {firstName: 'Jim', lastName: 'Bo', email:'jim@bo.com'};
		}));

		describe('Registration initialiation', function() {

			it('should have a way to initialize the registration', function(){
				$httpBackend.expectPOST(regServiceUrl).respond(200, testUser);
				expect(svc.Initiate).toBeDefined();
				$httpBackend.flush();
			});
			
			var initiationPromise;
			beforeEach(function() {
				initiationPromise = svc.Initiate(testUser);
			});

			describe('Successful initialization', function() {

				it('should get a registration token', function(){
					$httpBackend.whenPOST(regServiceUrl).respond(200, testUser);
					initiationPromise.then(
						function(result){
							expect(result.data).toEqual(testUser);
						},
						function(err){
							fail('Failed when it should have been successful');
						}
					);
					$httpBackend.flush();
				});
				
			});

			describe('Unsuccessful initialization', function() {

				it('should get a failure reason/description', function(){
					var errorMessage = 'An error occurred. Here\'s why:';
					$httpBackend.whenPOST(regServiceUrl).respond(500, {Message:errorMessage});
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

		describe('Registration retrieval', function(){

			it('should retrieve an initialized registration by its key', function(){
				$httpBackend.expectGET(regServiceUrl+'/'+key).respond(200, {});
				expect(svc.GetById(key)).toBeDefined();
				$httpBackend.flush();
			});

			describe('successful retrieval of initialized registration', function(){
				it('should retrieve the initialized registration', function(){
					$httpBackend.whenGET(regServiceUrl + '/' + key).respond(200, testUser);
					svc.GetById(key).then(
						function(result){
							expect(result.data).toEqual(testUser);
						},
						function(err){
							fail('Failed when it should have been successful');
						}
					);
					$httpBackend.flush();
				});
			});

			describe('failed retrieval of initialized registration', function(){
				it('should send a failure reason/description', function(){
					$httpBackend.whenGET(regServiceUrl+'/'+key).respond(500, {Message:errorMessage});
					svc.GetById(key).then(
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

		describe('Registration completion', function(){
			
			beforeEach(function () {
				testUser.key = key;
			});

			it('should have a way to complete the registration', function(){
				$httpBackend.expectPOST(regServiceUrl+'/'+key).respond(200,{});
				expect(svc.Complete(testUser)).toBeDefined();
				$httpBackend.flush();
			});

			describe('successful completion of registration', function(){
				it('should get the completed registration', function(){
					$httpBackend.whenPOST(regServiceUrl+'/'+key).respond(200,testUser);
					svc.Complete(testUser).then(
						function(result){
							expect(result.data).toEqual(testUser);
						},
						function(err){
							fail('failed testing the success condition');
						}
					);
					$httpBackend.flush();
				});
			});

			describe('failed completion of registration', function(){
				it('should get a failure reson/description', function(){
					$httpBackend.whenPOST(regServiceUrl+'/'+key).respond(500,{Message:errorMessage});
					svc.Complete(testUser).then(
						function(result){
							fail('succeeded testing the failure condition');
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

});