describe('Authentication module', function(){
	describe('Authentication Controller', function(){
		'use strict';

		beforeEach(module('authentication'));

		var controller, $state, AuthenticationSvc, SessionSvc, Logger;
		beforeEach(inject(function($controller, $rootScope, _$state_, _AuthenticationSvc_, _SessionSvc_, _Logger_){
				$scope = $rootScope.$new();
				$state = _$state_;
				AuthenticationSvc = _AuthenticationSvc_;
				SessionSvc = _SessionSvc_;
				Logger = _Logger_;
				controller = $controller('AuthenticationCtrl',{
					$scope:$scope, 
					$state:$state,
					AuthenticationSvc:AuthenticationSvc, 
					SessionSvc:SessionSvc,
					Logger:Logger
				});
				spyOn($state, 'go').and.callFake(function(state, params){/* do nothing on purpose. */});
				spyOn(Logger, 'LogError').and.callFake(function(message){/* do nothing on purpose. */});
			})
		);

		var deferred;
		beforeEach(inject(function($q, $httpBackend){
			$httpBackend.when('GET', '/modules/authentication/views/login.html').respond(200);
			deferred = $q.defer();
			spyOn(AuthenticationSvc, 'Login').and.returnValue(deferred.promise);
			spyOn(SessionSvc, 'CreateSession');
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

		it('should start with the first step of authentication', function(){
			expect(controller.step).toEqual(1);
		});

		it('should start with empty credentials', function(){
			controller.credentials = {};
			expect(controller.credentials).toBeDefined();
		});

		describe('Username input step', function(){

			it('should accept the username first', function(){
				controller.credentials.username = 'e@mail.com';
				controller.continue();
				expect(controller.step).toEqual(2);
			});

			it('should not continue without _something_ in the username', function(){
				controller.credentials.username = '';
				controller.continue();
				expect(controller.step).toEqual(1);
			});

			it('should tell the user why it is not continuing', function(){
				controller.credentials.username = '';
				controller.continue();
				expect(Logger.LogError).toHaveBeenCalled();
			});

		});

		describe('password input step', function(){
			beforeEach(function(){
				controller.credentials.username = 'e@mail.com';
			});

			it('should not continue without _something_ in the password field', function(){
				controller.credentials.password = '';
				controller.login();
				expect(AuthenticationSvc.Login).not.toHaveBeenCalled();
			});

			it('should tell the user why it is not continuing', function(){
				controller.credentials.password = '';
				controller.login();
				expect(Logger.LogError).toHaveBeenCalled();
			});
		});

		describe('logging in', function(){

			beforeEach(inject(function($httpBackend){
				$httpBackend.when('GET', 'modules/core/views/home.html').respond(200);
				controller.credentials.username = 'e@mail.com';
				controller.credentials.password = 'myPassw0rd';
				controller.login();
			}));

			it('should call the login service once the email and password are provided', function(){
				expect(AuthenticationSvc.Login).toHaveBeenCalledWith(controller.credentials);
			});

			it('should create a session on successful login', function(){
				deferred.resolve({data:controller.credentials});
				$scope.$apply();
				expect(SessionSvc.CreateSession).toHaveBeenCalledWith(controller.credentials);					
			});

			it('should not create a session on unsuccessful login', function(){
				deferred.reject({data:'Authentication Error'});
				$scope.$apply();
				expect(SessionSvc.CreateSession).not.toHaveBeenCalled();
			});

			it('should let the user know that the login attempt was unsuccessful', function(){
				deferred.reject({data:'Authentication Error'});
				$scope.$apply();
				expect(Logger.LogError).toHaveBeenCalledWith({data:'Authentication Error'});
			});

			it('should take the user back to step 1', function(){
				controller.step = 2;
				deferred.reject({data:'Authentication Error'});
				$scope.$apply();
				expect(controller.step).toEqual(1);
			});

		});

	});
});