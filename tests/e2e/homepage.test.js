describe('fantasy trader home page', function(){
  'use strict';

  beforeEach(function(){
  	browser().navigateTo('/');  	
  })
  it('should have a title', function(){
    expect(element('title').text()).toEqual('Fantasy Trader');
  });

  it('should display the title at the top of the page', function(){
  	var el = element('body');
  	console.log(el.text());
  	expect(element('span').text()).toEqual('Something');
  })
});