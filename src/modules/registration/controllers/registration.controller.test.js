describe('Registration module', function(){
	describe('Registration Controller', function(){
		'use strict';

		beforeEach(module('registration'));

		var controller, regService, $state, $stateParams, deferred;
		beforeEach(inject(function($controller, $q, $rootScope, _$state_, _$stateParams_, _RegistrationSvc_, _Logger_){
			$scope = $rootScope.$new();
			$state = _$state_;
			$stateParams = _$stateParams_;
			deferred = $q.defer();
			regService = _RegistrationSvc_;
			logService = _Logger_;

			controller = $controller('RegistrationCtrl', {
				$scope:$scope, 
				$stateParams: $stateParams,
				RegistrationSvc:regService, 
				Logger:logService
			});

			testUser = {key:'MYREGISTRATIONKEY', firstName:'Jim', lastName:'Bo', email:'jim@bo.com'};
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});


		describe('Initiating registration', function(){

			it('should have a register method', function(){
				expect(controller.register).toBeDefined();
			});

			beforeEach(function(){
				spyOn($state, 'go');
      	spyOn(regService, 'Initiate').and.returnValue(deferred.promise);
      	spyOn(logService, 'LogError');

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

		describe('Loading registration', function(){

			it('should have a \'Load Registration\' method', function(){
				expect(controller.loadRegistration).toBeDefined();
			});

			beforeEach(function(){
				$stateParams.key = testUser.key;
				spyOn($state, 'go');
				spyOn(regService, 'GetById').and.returnValue(deferred.promise);
				spyOn(logService, 'LogError');
				controller.loadRegistration();
			});

			it('should load the registration for a specified key', function(){
				expect(regService.GetById).toHaveBeenCalledWith(testUser.key);
			});

			describe('registration retrieval success', function(){

				beforeEach(function(){
					deferred.resolve(testUser);
					$scope.$apply();
				});

				it('should load the registration', function(){
					expect(controller.user).toEqual(testUser);
				});
			});

			describe('registration retrieval failure', function(){

				beforeEach(function(){
					deferred.reject('failed');
					$scope.$apply();
				});

				it('should take the user to the registration initiation page', function(){
					expect($state.go).toHaveBeenCalledWith('register');
				});

				it('should log the error', function(){
					expect(logService.LogError).toHaveBeenCalledWith('failed');
				});
			});

		});

		describe('Completing registration', function(){

			it('should have a \'Complete Registration\' method', function(){
				expect(controller.complete).toBeDefined();
			});

			beforeEach(function () {
				controller.user = testUser;
				spyOn($state, 'go');
				spyOn(regService, 'Complete').and.returnValue(deferred.promise);
				spyOn(logService, 'LogSuccess');	
				spyOn(logService, 'LogError');
				controller.complete();	
			});

			it('should save the registration information', function(){
				expect(regService.Complete).toHaveBeenCalledWith(testUser);
			});

			describe('registration completion success', function(){

				beforeEach(function(){
					deferred.resolve('NEWTOKENVALUE');
					$scope.$apply();
				});

				it('should get a new user token', function(){
					expect(controller.user.token).toEqual('NEWTOKENVALUE');
				});

				it('should take the user to the home page', function(){
					expect($state.go).toHaveBeenCalledWith('home');
				});

				it('should log the success', function(){
					expect(logService.LogSuccess).toHaveBeenCalledWith('Successfully registered.');
				});

			});

			describe('registration completion failure', function(){

				beforeEach(function(){
					deferred.reject('failed');
					$scope.$apply();
				});

				it('should log the error', function(){
					expect(logService.LogError).toHaveBeenCalledWith('failed');
				});
			});

		});

	});
});