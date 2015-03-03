(function(){
	'use strict';

	var exchangeSvc = function($q){

		var list = function(){
					var deferred = $q.defer();
					deferred.resolve(fakeData.exchanges);
					return deferred.promise;
				},
				getById = function(id){
					var deferred = $q.defer();
					var found = _.find(fakeData.exchanges, {'id':parseInt(id)});
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