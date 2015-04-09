describe('Authentication module', function(){
	describe('Authentication Service', function() {
		'use strict';

		var authServiceUrl = 'http://localhost/fakeAuthenticationSvc';
		beforeEach(function(){
			module('authentication');
			module(function ($provide) {
            $provide.value('AuthenticationApi', authServiceUrl);
        });
		});

		var AuthenticationSvc, SessionSvc, $httpBackend;
		beforeEach(inject(function($injector, _AuthenticationSvc_, _SessionSvc_){
			$httpBackend = $injector.get('$httpBackend');
			AuthenticationSvc = _AuthenticationSvc_;
			SessionSvc = _SessionSvc_;
			testUser = {token:'98FJ84J2O8WJEFTOKEN98JEWD', username:'me@mail.com', password:'P@ssw0rd'};
		}));

		describe('authentication success', function(){
			beforeEach(function(){
				$httpBackend.whenPOST(authServiceUrl + '/token').respond(200,testUser);
			});

			it('should return the user information', function(){
				AuthenticationSvc.Login(testUser).then(
					function(result){
						expect(result.data).toEqual(testUser);
					},
					function(err){
						fail('Testing for success but failed');
					}
				);
				$httpBackend.flush();
			});
		});

		describe('authentication failure', function(){
			beforeEach(function(){
				$httpBackend.whenPOST(authServiceUrl + '/token').respond(500, {message:'Server error'});
			});

			it('should return the user information', function(){
				AuthenticationSvc.Login(testUser).then(
					function(result){
						fail('Testing for failure but succeeded');						
					},
					function(err){
						expect(err.data.message).toEqual('Server error');
					}
				);
				$httpBackend.flush();
			});
		});

		describe('logout', function(){

			beforeEach(function() {
				$httpBackend.whenDELETE(authServiceUrl + '/token').respond(200);
			});

			it('should be able to log the user out', function(){
				expect(AuthenticationSvc.Logout).toBeDefined();
			});

			it('should destroy the user\'s session', function(){
				spyOn(SessionSvc, 'DestroySession');
				AuthenticationSvc.Logout(testUser).then(
					function(result){
						expect(SessionSvc.DestroySession).toHaveBeenCalled();
					},
					function(err){
						fail('Testing success condition, but failed.');
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