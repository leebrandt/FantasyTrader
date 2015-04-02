describe('Registration module', function(){
	describe('Registration Controller', function(){
		'use strict';

		beforeEach(module('registration'));

		var controller, regService, $state, deferred;
		beforeEach(inject(function($controller, $q, $rootScope, _$state_, _RegistrationSvc_, _Logger_){
			$scope = $rootScope.$new();
			$state = _$state_;
			deferred = $q.defer();
			regService = _RegistrationSvc_;
			logService = _Logger_;
			controller = $controller('RegistrationCtrl', {
				$scope:$scope, 
				RegistrationSvc:regService, 
				Logger:logService
			});
			
			spyOn($state, 'go');
      spyOn(regService, 'Initiate').and.returnValue(deferred.promise);
      spyOn(logService, 'LogError');
			testUser = {firstName:'Jim', lastName:'Bo', email:'jim@bo.com'};
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

		it('should have a register method', function(){
			expect(controller.register).toBeDefined();
		});

		describe('Initiating registration', function(){

			beforeEach(function(){
				controller.user = testUser;
				controller.register();
			});

			it('should begin a registration for a user', function(){
				expect(regService.Initiate).toHaveBeenCalledWith(testUser);
			});

			describe('registration initiation success', function(){

				beforeEach(function(){
					deferred.resolve(testUser);
					$scope.$apply();
				});

				it('should take the user to the \'Thank You\' page', function(){
					expect($state.go).toHaveBeenCalledWith('thanks');
				});

			});

			describe('registration initiation failure', function(){

				beforeEach(function(){
					deferred.reject('failed');
					$scope.$apply();
				});

				it('should log the failure', function(){
					expect(logService.LogError).toHaveBeenCalledWith('failed');
				});
			});
			
		});
	});
});