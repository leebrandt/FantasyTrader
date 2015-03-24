(function(){
	'use strict';

	var logger = function(){
		var logError = function(message){
			console.error(message);
			toastr.error(message, 'Error');
		},
		logWarning = function(message){
			console.warn(message);
			toastr.warning(message, 'Warning');
		},
		logSuccess = function(message){
			toastr.success(message, 'Success');
		},
		logInfo = function(message){
			console.info(message);
			toastr.info(message, 'Information');
		},
		logDebug = function(message){
			console.debug(message);
		};

		return {
			LogError: logError,
			LogSuccess: logSuccess,
			LogInfo: logInfo,
			LogWarning: logWarning,
			LogDebug: logDebug
		}
	};

	angular.module('core')
		.service('Logger', [logger]);
}());