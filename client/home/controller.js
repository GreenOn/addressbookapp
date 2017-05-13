module
.controller('homeCtrl', function($scope, $http, $resource, $window, $location, Login, Session){

	$scope.isActiveSession = false;
	var session_obj = Session.getCookie();
	if ((session_obj == null || session_obj == undefined)){
		$scope.isActiveSession = false;
	} else if (!(session_obj == null || session_obj == undefined)){
		Session.checkTokenAdmin(false);
		Session.setHTTPToken();
		$scope.isActiveSession = true;
	}
});