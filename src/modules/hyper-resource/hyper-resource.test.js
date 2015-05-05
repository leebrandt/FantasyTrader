describe('Hyper Resource Provider', function(){
	var hyperResource, Test, hyperResourceProvider;

	beforeEach(function(){

		angular.module('test.app.config', function(){})
				.config(function(HyperResourceProvider){
					hyperResourceProvider = HyperResourceProvider;
				});

		module('hyper-resource', 'test.app.config');

		inject(function(){});

	});

	beforeEach(inject(function($injector){
		hyperResource = $injector.get('HyperResource');
		hyperResourceProvider.SetApiRoot('http://my.fakeapi.com');
	}));

	it('should be able to get the provider', function(){
		expect(hyperResourceProvider).toBeDefined();
	});		

	it('should be able to get to the resource', function(){
		Test = hyperResource();
		expect(Test).toBeDefined();
	});

	describe('Hyper Resource', function(){

		it('should have a path fo the hypermedia calls', function(){
			Test = hyperResource('/path/to/nowhere');
			expect(Test.Path).toBe('/path/to/nowhere');
		});

		it('should have steps for the path', function(){
			Test = hyperResource('/path/to/nowhere');
			expect(Test.Steps).toBeDefined();
			expect(Test.Steps.length).toBe(3);
			expect(Test.Steps[0]).toBe('path');
			expect(Test.Steps[1]).toBe('to');
			expect(Test.Steps[2]).toBe('nowhere');
		});

		it('should have a way to GET a resource', function(){
			Test = hyperResource('/path/to/nowhere');
			expect(Test.Get).toBeDefined();
			expect(typeof Test.Get).toBe('function');
		});

		it('should replace any parameters in the steps with params passed in', function(){
			Test = hyperResource('/path/to/:item1');
			Test.Get({item1:'paramValue'});
			expect(Test.Steps[2]).toBe('item1:paramValue');
		});

		it('should be able to replace multiple parameters in the steps', function(){
			Test = hyperResource('/path/:resource/:id');
			Test.Get({resource:'Person', id:1});
			expect(Test.Steps[1]).toBe('resource:Person');
			expect(Test.Steps[2]).toBe('id:1');
		});
	});
});

fdescribe('Replacing URL parameters', function(){

	it('should replace parameters passed', function(){
		var paramUrl = 'http://{sub}.{domain}.{tld}/?{query}';
		var replacedUrl = replaceUrlParams(paramUrl, {sub:'set', domain:'mycompany', tld:'com', query:'hello'});
		expect(replacedUrl).toEqual('http://set.mycompany.com/?hello');
	});

	it('should drop any parameters not passed from the url', function(){
		var paramUrl = 'http://www.{domain}.com/?query={query}';
		var replacedUrl = replaceUrlParams(paramUrl, {domain:'mycompany'});
		expect(replacedUrl).toEqual('http://www.mycompany.com/?query=');
	});

});