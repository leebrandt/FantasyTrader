(function(){
	'use strict';

	var exchangeSvc = function($q){

		/* Faked Up Data. Replace with API calls */
		var data = [{
					id: 1,
					name: 'Exchange One',
					value: 100252.20,
					change: -41.20,
					changePct: 0.04,
					currentWeek: 6,
					totalWeeks: 10,
					currentPlace: '3rd',
					endDate: new Date('2/21/2015'),
					logo: '/path/to/image/logo.png'
				},{
					id: 2,
					name: 'Exchange Two',
					value: 81494.90,
					change: 23,
					changePct: 0.02,
					currentWeek: 2,
					totalWeeks: 6,
					currentPlace: '4th',
					endDate: new Date('3/12/2015'),
					logo: '/path/to/image/logo.png'
				}],
				list = function(){
					var deferred = $q.defer();
					deferred.resolve(data);
					return deferred.promise;
				},
				getById = function(id){
					var deferred = $q.defer();
					var found = _.find(data, {'id':parseInt(id)});
					if(found){
						deferred.resolve(found);
					}else{
						deferred.reject('Unable to find exchange with id of', id);
					}
					return deferred.promise;
				};

		return {
			List: list,
			GetById: getById
		}
	}

	angular.module('exchange')
		.service('ExchangeSvc', ['$q', exchangeSvc])
}());