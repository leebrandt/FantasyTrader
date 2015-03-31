describe('Exchange module', function(){
	describe('Exchange Service', function(){

		beforeEach(module('exchange'));

		var service;
		beforeEach(inject(function(ExchangeSvc){
			service = ExchangeSvc;
		}));

		it('should exist', function(){
			expect(service).toBeDefined();
		});

		it('should be able to get a list of exchanges', inject(function($rootScope){
			service.List().then(function(exchanges){
				expect(exchanges.length).toEqual(4);
			});
			$rootScope.$apply(); // digest and force $q promises to resolve.
		}));

		it('should be able to get a specific exchange from the list of exchanges', inject(function($rootScope){
			service.GetById(1).then(function(exchange){
				expect(exchange).toBeDefined();
				expect(exchange.id).toEqual(1);
			});
			$rootScope.$apply();
		}));

		it('should fail tring to retrieve an exchange that doesn\'t exist in the list of exchanges', inject(function($rootScope){
			service.GetById(5150).then(function(exchange){
				this.fail('Testing failure, but called success condition function');
			}, function(err){
				expect(err).toBeDefined();
				expect(err).toEqual('Unable to find exchange with id of 5150');
			});

			$rootScope.$apply();
		}));
	});
});