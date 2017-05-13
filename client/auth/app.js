module = angular.module('angRegister', ['ngRoute', 'ngResource', 'ngCookies', 'ngMessages']);

module.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: './register.html',
		controller: 'registerCtrl'
	})
	.when('/success/:email', {
		templateUrl: './success.html',
		controller: 'successCtrl'
	})
	.when('/confirmed/:email', {
		templateUrl: './confirmed.html',
		controller: 'successCtrl'
	});
});