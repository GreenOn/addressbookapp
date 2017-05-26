module
.controller('loginCtrl', function($scope, $http, $resource, $window, $location, Login, Session){

	var session_obj = Session.getCookie();
	if (!(session_obj == null || session_obj == undefined)){
		if (session_obj.user.admin)
			$window.location.href = "admin.html";
		else
			$window.location.href = "#/";
	}

	$scope.validation_activity = {invalid:false, msg:""};
	$scope.submission_activity = {submitting: false};
	$scope.info_obj = {};

	$scope.initSearchComponent = function(){
		_globalSearch();
	}
	$scope.initTopNav = function(){
		console.log("I am in initTopNav <= login controller.")
		_topNav();
	}
	
	$scope.onLogin = function(valid){
		console.log(valid);
		if (!valid){
			$scope.validation_activity.invalid = true;
			$scope.validation_activity.msg = "Invalid input. Please try again.";
			return;
		}

		$scope.submission_activity.submitting = true;
		var login_params = {};

		login_params.username = $scope.info_obj.username;
		login_params.password = $scope.info_obj.password;
		Login.save(login_params, function(success_obj){
			Session.setInitialInfo(success_obj);
			if (success_obj.user.admin)
				$window.location.href = "admin.html";
			else
				$window.location.href = "#/";
		}, function(fail_obj){
			$scope.submission_activity.submitting = false;
			$scope.validation_activity.invalid = true;
			$scope.validation_activity.msg = fail_obj.data.msg;
		});
	}
});