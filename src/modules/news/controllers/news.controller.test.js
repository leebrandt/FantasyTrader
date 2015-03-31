describe('News module', function(){

	describe('News Controller', function(){
		'use strict';

		beforeEach(module('news'));

		var controller, httpBackend;
		beforeEach(inject(function($controller, $httpBackend){
			httpBackend = $httpBackend;
			httpBackend
				.whenJSONP('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&q=http://feeds.feedburner.com/benzinga')
				.respond({responseData:{feed:[{item:1}]}});
			controller = $controller('NewsCtrl');
		}));

		it('should be defined', function(){
			expect(controller).toBeDefined();
		});

		it('should be able to get a list of news items', function(){
			controller.loadNews();
			httpBackend.flush();
			expect(controller.news).toBeDefined();
			expect(controller.news.length).toEqual(1);
		});
	});
	
});