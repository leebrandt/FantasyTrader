(function(){
	'use strict';

	var aboutCtrl = function(){
		var self = this;

		self.message = "This is the about us content from the controller";

		return self;
	};

	angular.module('core').controller('AboutCtrl', aboutCtrl);

}())