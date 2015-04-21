(function(){

	var sirenService = function($http, $window, $q, Siren){
		var rootData,
			pageData,
			config = {},
			getData = function(hyperLink, data, cfg){
				var headers = cfg && cfg.headers ? cfg.headers : {};	
				return $http({
						url: hyperLink.href,
						headers: headers,
						method: hyperLink.method || 'GET',
						data: data})
					.then(function(result){
						pageData = result.data;
						Siren.AddHistory(result.data);
						return result.data;
					});
			},
			getLink = function(links, relName, cfg){
				link = _.find(links, {'rel': relName});
				if(link){
					return getData(link, null, cfg);
				}else{
					throw 'No link named `' + relName + '` was found.';				
				}
			},
			callAction = function(actions, name, data, cfg){
				action = _.find(actions, {'name': name});
				if(action){
					return getData(action, data, cfg);
				}else{
					throw 'No action named `'+name+'` was found.';
				}
			},
			call = function(action, data){
				return getData(action, data);
			};

			return {
				GetLink: getLink,
				CallAction: callAction,
				Call:call
			};
	};

	angular.module('core')
		.factory('SirenSvc', ['$http', '$window', '$q', sirenService]);

}());