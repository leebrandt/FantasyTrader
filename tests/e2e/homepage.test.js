describe('fantasy trader home page', function(){
  'use strict';

  beforeEach(function(){
  	browser.get('/')
  });
  
  it('should have a title', function(){
    expect(browser.getTitle()).toEqual('Fantasy Trader');
  });

  it('should end up on the login page for unauthenticated users', function(){
    expect(browser.getCurrentUrl()).toEndWith('#/login');
  })

});