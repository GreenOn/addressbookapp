module
.controller('mainCtrl', function($scope, $http, $resource, $rootScope, $location, $window, Session, _topNav){
	// Session.checkTokenAdmin(false);
	// Session.setHTTPToken();
	// $scope.isActiveSession = $rootScope.isActiveSession;
	var session_obj = Session.getCookie();
	if ((session_obj == null || session_obj == undefined)){
		// $scope.isActiveSession = false;
	} else if (!(session_obj == null || session_obj == undefined)){
		Session.checkTokenAdmin(false);
		Session.setHTTPToken();
		// $scope.isActiveSession = true;
	}
	$rootScope.showTopNav = true;


	$scope.onLogout = function(){
		Session.logOut();
	}

	$scope.getUserObj = function(){
		$scope.env_variables = {
			obj_user: Session.getUserObj()		};		
	}
	$scope.env_variables = {
		obj_user: Session.getUserObj()
	};	
	$scope.showProfile = function (){
		$window.location.href = "#/profile";
	}
	$scope.initTopNav = function(){
		_topNav();
	}	
});