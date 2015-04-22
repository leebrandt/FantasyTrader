describe('Authentication module', function(){
	describe('Authentication Service', function() {
		'use strict';

		beforeEach(module('authentication'));

		var AuthenticationSvc, Site, Logger, actionPromise, sitePromise, testCredentials;
		beforeEach(inject(function($q, _Site_, _Logger_){
			//$httpBackend.when('GET', '/modules/authentication/views/login.html').respond(200);
			Site = _Site_;
			Logger = _Logger_;
			actionPromise = $q.defer();
			sitePromise = $q.defer();
			spyOn(Site, 'Get').and.returnValue(sitePromise.promise);
			spyOn(Site, 'Run').and.returnValue(actionPromise.promise);
			spyOn(Logger, 'LogError').and.callThrough();
			testCredentials = {username:'me@mail.com', password:'myP@ssw0rd'};
			
		}));

		beforeEach(inject(function(_AuthenticationSvc_) {
			AuthenticationSvc = _AuthenticationSvc_;
		}));

		describe('Logging in', function(){
			
			beforeEach(function() {
				AuthenticationSvc.Login(testCredentials);
			});

			describe('successful login', function(){
				var loginAction = {name:'login', href:'http://myfakeapi.com'};
				beforeEach(inject(function($rootScope) {
					sitePromise.resolve({actions:[loginAction]});
					$rootScope.$apply();
				}));

				it('should call the Site resource Get to get the main payload', function(){
					expect(Site.Get).toHaveBeenCalled();
				});

				it('should call the Site action Run to get the login payload', function(){
					expect(Site.Run).toHaveBeenCalledWith(loginAction, null, jasmine.any(Object));
				});
			});

			describe('failed login', function(){

				beforeEach(inject(function($rootScope) {
					sitePromise.reject('Error message');
					$rootScope.$apply();
				}));

				it('should log the faulure reason', function(){
					expect(Logger.LogError).toHaveBeenCalledWith('Error message');
				});
			});
		});
	});
});