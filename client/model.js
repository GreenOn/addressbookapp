module
	.service('URL', function(){
		this.rootURL = 'http://localhost:8080/api';
		this.generateURL = function(uri){
			console.log("uri ", uri);
			return this.rootURL + uri;
		}
	})
	.factory('User', function($resource, URL){
		return $resource(URL.generateURL('/user/:user_id'), {user_id: '@_id'},{
			update: {
				method: 'PUT'
			}
		});
	})
	.factory('Login', function($resource, URL){
		return $resource(URL.generateURL('/user/login'));
	})