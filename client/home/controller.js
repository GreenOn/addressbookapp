module
.controller('homeCtrl', function($scope, $http, $rootScope, $resource, $window, $location, Login, Session, _topNav){


	$scope.isActiveSession = false;
	var session_obj = Session.getCookie();
	console.log("i am in homeCtrl.");
	if ((session_obj == null || session_obj == undefined)){
		console.log("isActiveSession is false.");
		$scope.isActiveSession = false;
	} else if (!(session_obj == null || session_obj == undefined)){
		Session.checkTokenAdmin(false);
		Session.setHTTPToken();
		$scope.isActiveSession = true;
		console.log("isActiveSession is true.");
	}
	$scope.initTopNav = function(){
		_topNav();
	}
});