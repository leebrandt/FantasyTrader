describe('Exchange controller', function(){
	'use strict';

	var fakeExchangeSvc = {
		List: function(){
			return{
				then: function(callback){ return callback([{name:'Exchange One'}, {name:'Exchange Two'}]); }
			}
		},
		GetById: function(id){
			return{
				then: function(callback){ return callback({id:1, name: 'Exchange Found', portfolio: {stocks: []}}); }
			}
		}
	};

	beforeEach(function(){
		module('exchange');
		module(function($provide){
			$provide.value('ExchangeSvc', fakeExchangeSvc);
			$provide.value('$state', { params: { id: 1 } });
		});
	});

	var controller, exchangeSvc, rootScope;
	beforeEach(inject(function($controller, $rootScope, $state, ExchangeSvc) {
		exchangeSvc = ExchangeSvc;	
		rootScope = $rootScope;
		controller = $controller('ExchangeCtrl');
		spyOn(exchangeSvc, 'List').and.callThrough();
		spyOn(exchangeSvc, 'GetById').and.callThrough();
	}));

	it('should be able to create the exchange controller', function(){
		expect(controller).toBeDefined();
	})

	it('should be able to load a list of exchanges', function(){
		controller.loadExchangeList();
		expect(exchangeSvc.List).toHaveBeenCalled();
		expect(controller.exchangeList.length).toEqual(2);
	});

	it('should be able to get a specific exchange', function(){
		controller.loadExchange();
		expect(exchangeSvc.GetById).toHaveBeenCalledWith(1);
		expect(controller.exchange.id).toEqual(1);
	});

	it('should set the page title to the tile of the exchange', function(){
		controller.loadExchange();
		expect(rootScope.title).toEqual('Exchange Found');
	})

});