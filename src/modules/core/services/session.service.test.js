describe('Core Module', function(){
	describe('Session service', function(){
		'use strict';

		beforeEach(module('core'));

		var SessionSvc;
		var testUser = {token:'98FJ84J2O8WJEFTOKEN98JEWD', username:'me@mail.com'};
		beforeEach(inject(function(_SessionSvc_) {
			SessionSvc = _SessionSvc_;
		}));

		it('should exist', function(){
			expect(SessionSvc).toBeDefined();
		});

		describe('Creating a session', function(){
			it('should be able to create a user session', function(){
				expect(SessionSvc.CreateSession).toBeDefined();
			});

			it('should add user information to session storage', inject(function($window){
				SessionSvc.CreateSession(testUser);
				expect($window.sessionStorage.currentUser).toBeDefined();
			}));

			it('should store user information as a json string', inject(function($window){
				SessionSvc.CreateSession(testUser);
				expect($window.sessionStorage.currentUser).toEqual(angular.toJson(testUser));
			}));
		});

		describe('Retrieving session information', function(){

			beforeEach(function() {
				SessionSvc.CreateSession(testUser);
			});

			it('should be able to retrieve the current user\'s information', function(){
				expect(SessionSvc.GetCurrentUser).toBeDefined();
			});

			it('should get the user as a json object', function(){
				var currentUser = SessionSvc.GetCurrentUser();
				expect(currentUser).toEqual(testUser);
			});

		});

		describe('Destroying a session', function(){
			

			it('should be able to destroy a session', function(){
				expect(SessionSvc.DestroySession).toBeDefined();
			});

			it('should remove the user information from session storage', inject(function($window){
				$window.sessionStorage.currentUser = angular.toJson(testUser);
				SessionSvc.DestroySession();
				expect($window.sessionStorage.currentUser).not.toBeDefined();
			}));

		});


	});
});