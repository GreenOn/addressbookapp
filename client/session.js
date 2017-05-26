module
.service('Session', ['$http', '$cookies', '$window','$rootScope', function($http, $cookies, $window, $rootScope){
	$rootScope.isActiveSession = false;
	this.setInitialInfo = function(info_obj){
		$cookies.putObject('addBook_session', info_obj, {'expires': this.createExpTime()});
		$http.defaults.headers.common['x-access-token'] = info_obj.token;
		$rootScope.isActiveSession = true;
		console.log("i am in setInitialInfo");
	};
	this.createExpTime = function(){
		var expireDate = new Date();
	    var now = expireDate.getTime();
	    var future = now + 24*60*60*1000*1;
	    expireDate.setTime(future);
	    return expireDate;
	};
	this.setHTTPToken = function(){
		var obj_cookie = $cookies.getObject('addBook_session');
		$http.defaults.headers.common['x-access-token'] = obj_cookie.token;
				console.log("i am in setHTTPToken");
	};
	this.getUserObj = function(){
		var obj_cookie = this.getCookie();
		if (obj_cookie){
			console.log("obj_cookie:" , obj_cookie);
			return obj_cookie.user;
		}
		return null;
	};
	this.updateCookie = function(userObj){
		var obj_cookie = this.getCookie();
		obj_cookie.user = userObj;
		$cookies.remove('addBook_session');
		$cookies.putObject('addBook_session', obj_cookie, {'expires': this.createExpTime()});
	};	
	this.getCookie = function(){
		return $cookies.getObject('addBook_session');
	};
	this.checkTokenAdmin = function(is_admin){
		var obj_cookie = $cookies.getObject('addBook_session');
		if (obj_cookie == null || obj_cookie == undefined)
			this.logOut();
		else if (obj_cookie.user.admin != is_admin)
			this.logOut();
	};
	this.logOut = function(){
		$cookies.remove('addBook_session');
		$http.defaults.headers.common['x-access-token'] = "";
		$window.location.href = "/";
	}
}]);