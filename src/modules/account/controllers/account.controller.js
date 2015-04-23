(function(){

	var accountCtrl = function($state, Site, Logger){
		var ctrl = this;

		ctrl.changePassword = function(){
			if(ctrl.oldPassword && ctrl.newPassword){
				var action = {href:'http://msp0lnans001.etdbw.com/security/account/password', method:'PUT'};
				var data = {'NewPassword':ctrl.newPassword, 'OldPassword':ctrl.oldPassword};
				Site.Run(action, data).then(
						function(result){
							Logger.LogSuccess('Password updated successfully.');
							$state.go('home');
						},
						function(err){
							Logger.LogError(err.data);
						});
			}else{
				Logger.LogError('You must enter your old password and a new password');
			}
		};

		return ctrl;
	};

	angular.module('account')
		.controller('AccountCtrl', ['$state', 'Site', 'Logger', accountCtrl]);
}());