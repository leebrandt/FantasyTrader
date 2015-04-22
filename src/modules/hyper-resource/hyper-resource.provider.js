(function(){

	'use strict';

	// turn the path into hypermedia steps
	var ApiRoot = '',
			AppName = '',
			HypermediaType = 'Siren';
			
	var hyperResourceProvider = function(){

		this.SetApiRoot = function(apiRoot){
			ApiRoot = apiRoot;
		};

		this.SetAppName = function(appName){
			AppName = appName;
		};

		this.SetHypermediaType = function(hypermediaType){
			HypermediaType = hypermediaType;
		};

		this.$get = ['$window', '$http', '$q', hyperResource];

	};

	// the final resource from the provider
	function hyperResource($window, $http, $q){
		function resourceFactory(path){
       var currentUser = angular.fromJson($window.sessionStorage.currentUser);

			// define a resource type with the path
			var Resource = function(path){
				this.Path = path;
			};

			Resource.prototype.Steps = buildHypermediaSteps(path);
			Resource.prototype.Get = function(params){
				replaceStepParams(this.Steps, params);
				
				function getLink(steps, link, deferred){
					if(!deferred){
						deferred = $q.defer();
					}
					var step = steps.shift();
					var nextLink;

					/* Check Cache First */
					var cached = angular.fromJson($window.sessionStorage[link.href]);
					if(cached){ /* if we got it from cache */
						if(step){
							nextLink = pullLinkFromResult(step, cached);
							if(nextLink){
								return getLink(steps, nextLink, deferred);
							}else{
								return deferred.reject('Unable to find link to `' + step + '` in available payloads');
							}
						}
						// we found our data!
						deferred.resolve(cached.data);
					}else{ /* if we HAVE to go to server */
						$http.get(link.href).then(
							// success
							function(result){
								$window.sessionStorage[link.href] = angular.toJson(result);
								if(step){
									nextLink = pullLinkFromResult(step, result);
									if(nextLink){
										//recurse
										return getLink(steps, nextLink, deferred);
									}else{
										deferred.reject('unable to find link for `' + step + '` in available payloads');
									}	
								}else{
									// we found our data
									deferred.resolve(result.data);
								}
							},
							//error
							function(err){
								deferred.reject(err);
							});
					}
					// return the promise to be fulfilled once we've walked the walk
					return deferred.promise;
				}

				// kick this thing off
				return getLink(this.Steps.slice(0), {href:ApiRoot + (currentUser ? '/private/' : '/public/') + '?app=' + AppName});
			};
			Resource.prototype.Run = function(action, data, cfg){
				var headers = cfg && cfg.headers ? cfg.headers : {};
				return $http({
					url:action.href,
					method:action.method,
					headers:headers,
					data:data
				});					
			
			};

		
			// return a new instance of this thing
			return new Resource(path);
		}

		// return the factory that will create this thing
		return resourceFactory;
	}

	angular.module('hyper-resource', [])
		.provider('HyperResource', hyperResourceProvider);

}());

function buildHypermediaSteps(path){
	var steps = [];
	if(path && path.indexOf('/') > -1){
		// break the path into steps
		steps = path.split('/');

		// remove the root call step (it will always happen)
		for (var i = 0, len = steps.length; i < len; i++) {
			if(steps[i] === '' || steps[i] === '/'){
				steps.splice(i,1);
			}
		}
	}
	return steps;
}

function replaceStepParams(steps, params){
	// get id params and put them in the step definition
	for (var i = 0, len = steps.length; i < len; i++) {
		if(steps[i].indexOf(':') > -1){
			var strippedStep = steps[i].replace(':','');
			if(params && params[strippedStep]){
				steps[i] = strippedStep+':'+params[strippedStep];
			}else{
				steps.splice(i, 1);
			}
		}
	}
}

function pullLinkFromResult(step, result){
	var link;
	if(step.indexOf(':') > -1){ /* we're looking for an item in an array */
		var pieces = step.split(':');
		var idName = pieces[0];
		var idValue = parseInt(pieces[1]);
		// find the entity by it's id
		var entity = result.data.entities.find(function(item){
			return item.properties[idName] === idValue;
		});
		// then get a link to it
		link = entity.links.find(function(item){
			return item.rel && item.rel === 'self';
		});
	}else{ /* we're just looking for a regular link by rel */
		link = result.data.links.find(function(item){
			return item.rel && item.rel === step;
		});
	}
	return link;
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}