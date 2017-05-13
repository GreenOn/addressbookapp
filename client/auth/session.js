module
.service('Session', ['$http', '$cookies', '$window', function($http, $cookies, $window){
	this.setInitialInfo = function(info_obj){
		var expireDate = new Date();
    var now = expireDate.getTime();
    var future = now + 24*60*60*1000*1;
    expireDate.setTime(future);

		$cookies.putObject('addBook_session', info_obj, {'expires': expireDate});
		$http.defaults.headers.common['x-access-token'] = info_obj.token;
	};
	this.setHTTPToken = function(){
		var obj_cookie = $cookies.getObject('addBook_session');
		$http.defaults.headers.common['x-access-token'] = obj_cookie.token;
	};
	this.getUserObj = function(){
		var obj_cookie = this.getCookie();
		return obj_cookie.user;
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