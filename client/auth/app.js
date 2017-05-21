module = angular.module('angRegister', ['ngRoute', 'ngResource', 'ngCookies', 'ngMessages']);

module.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/', {
		templateUrl: './registrationViews/register.html',
		controller: 'registerCtrl'
	})
	.when('/success/:email', {
		templateUrl: './registrationViews/success.html',
		controller: 'successCtrl'
	})
	.when('/confirmed/:email', {
		templateUrl: './registrationViews/confirmed.html',
		controller: 'successCtrl'
	});
});