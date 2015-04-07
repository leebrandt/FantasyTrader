(function(){
	'use strict';
	
	var registrationCtrl = function($state, $stateParams, RegistrationSvc, Logger){
		var ctrl = this;
		ctrl.passwordVisible = false;
		ctrl.passwordFieldType = 'password';
		ctrl.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/;
		ctrl.user = {
			Recaptcha: {
				Secret: '6LcJO8ESAAAAAFca2-gBw4azCGEG4HFxNFzNPp1K'
			}
		};

		ctrl.register = function(){
			RegistrationSvc.Initiate(ctrl.user)
				.then(
					//success
					function(user){
						$state.go('thanks');
					}, 
					//error
					function(err){
						Logger.LogError(err);
					}
				);
		};

		ctrl.loadRegistration = function(){
			var key = $stateParams.key;
			RegistrationSvc.GetById(key)
				.then(
					//success
					function(user){
						ctrl.user = user.data;
					},
					//error
					function(err){
						$state.go('register');
						Logger.LogError(err);
					}
				);
		};

		ctrl.complete = function(){
			if(ctrl.regIsValid()){
				var completion = {
					key: ctrl.user.RegistrantId,
					Challenge: ctrl.user.Challenge,
					Password: ctrl.user.Password
				};
				RegistrationSvc.Complete(completion)
					.then(
						//success
						function(result){
							ctrl.user.token = result;
							$state.go('home');
							Logger.LogSuccess('Successfully registered.');
						},
						//error
						function(err){
							Logger.LogError(err);
						}
					);
				}else{
					Logger.LogError('You fucked up.');
				}
		};

		ctrl.togglePasswordType = function(){
      ctrl.passwordVisible = !ctrl.passwordVisible;
      ctrl.passwordFieldType = ctrl.passwordVisible ? 'text' : 'password';
		};

		ctrl.loadSecurityQuestions = function(){
			RegistrationSvc.GetSecurityQuestions()
        .success(function(questions){
          ctrl.securityQuestions = questions;
        })
        .error(function(data){
          Logger.LogError(data.statusText || 'There was a problem retrieving the security questions list.');
        });
		};

		ctrl.AddSecurityQuestion = function(){
      if(!ctrl.user.Challenge){
        ctrl.user.Challenge = [];
      }
      ctrl.user.Challenge.push({question:ctrl.currentQuestion, answer: ctrl.currentAnswer});
      ctrl.securityQuestions.splice(ctrl.securityQuestions.indexOf(ctrl.currentQuestion), 1);
      ctrl.currentQuestion = {};
      ctrl.currentAnswer = '';
    };

    ctrl.regIsValid = function(){
    	return ctrl.user.Password &&
        		 ctrl.passwordRegex.test(ctrl.user.Password) &&
        		 ctrl.user.Challenge &&
        		 ctrl.user.Challenge.length > 2;
    };

		return ctrl;
	};

	angular.module('registration')
		.controller('RegistrationCtrl', ['$state', '$stateParams', 'RegistrationSvc', 'Logger', registrationCtrl]);
}());