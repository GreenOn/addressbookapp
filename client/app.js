// script.js
    // create the module and name it addBookApp
        // also include ngRoute for all our routing needs
    var module = angular.module('addBookApp', ['ngRoute','ngResource','ngCookies', 'ngMessages']);

    // configure our routes
    module.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'homeCtrl'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'about.html',
                controller  : 'aboutController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'loginCtrl'
            })
            // route for the register page
            .when('/register', {
                templateUrl : 'registrationViews/register.html',
                controller  : 'angRegister'
            });
    });

    
    module.controller('aboutController', function($scope) {
        //$scope.message = 'Look! I am an about page.';
    });
    module.controller('angRegister', function($scope) {
       // $scope.message = 'login page';
    });