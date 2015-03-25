describe('fantasy trader home page', function(){
  'use strict';

  beforeEach(function(){
  	browser.get('/');
  });
  
  it('should have a title', function(){
    expect(browser.getTitle()).toEqual('Fantasy Trader');
  });

  it('should end up on the login page for unauthenticated users', function(){
    expect(browser.getCurrentUrl()).toEndWith('#/login');
  });

});

describe('login page', function(){

  var usernameInput = element(by.model('vm.credentials.username'));
  var passwordInput = element(by.model('vm.credentials.password'));
  var stepButton = element(by.css('a.next'));
  var loginButton = element(by.css('a.login'));
  
  beforeEach(function(){
    browser.get('#/login');
  });

  describe('step one', function(){

    it('should show the username input', function(){
      expect(usernameInput.isPresent()).toBeTruthy();
    });

    it('should show the continue button', function(){
      expect(stepButton.isPresent()).toBeTruthy();
    });

    it('should not show the password input', function(){
      expect(passwordInput.isPresent()).toBeFalsy();
    });

    it('should not show the log in button', function(){
      expect(loginButton.isPresent()).toBeFalsy();
    });
  });

  describe('step two', function(){
    beforeEach(function(){
      // once a username is entered and the continue button is clicked
      usernameInput.sendKeys('e@mail.com');
      stepButton.click();
    });  
    it('should not show the username input', function(){
      expect(usernameInput.isPresent()).toBeFalsy();
    });

    it('should not show the continue button', function(){
      expect(stepButton.isPresent()).toBeFalsy();
    });

    it('should show the password input', function(){
      expect(passwordInput.isPresent()).toBeTruthy();
    });

    it('should show the log in button', function(){
      expect(loginButton.isPresent()).toBeTruthy();
    });
  });

});