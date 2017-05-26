// script.js
    // create the module and name it addBookApp
        // also include ngRoute for all our routing needs
    var module = angular.module('addBookApp', ['ngRoute','ngResource','ui.bootstrap','ngCookies', 'ngMessages']);

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
            .when('/profile', {
                templateUrl: 'profile.html',
                controller: 'profileCtrl'
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
    })
    .run(function($rootScope, $location, Session){
    // var session_obj = Session.getCookie();
    var postLogInRoute = null;
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var session_obj = Session.getCookie();
        // keep user logged in after page refresh
        if (session_obj){
            $rootScope.isActiveSession = true;
            Session.setHTTPToken();
        }
        var restrictedPage = $.inArray($location.path(), ['/login', '/','']) === -1;
        if ($location.path().indexOf('/about') > -1) {
            restrictedPage = false;
        }
        if (restrictedPage && !session_obj) {
            postLogInRoute = $location.path();
            $location.path('/login').replace();
        } else if (postLogInRoute && session_obj){
            $location.path(postLogInRoute).replace();
            postLogInRoute = null;
        }
    });
});

    
    module.controller('aboutController', function($scope) {
        //$scope.message = 'Look! I am an about page.';
    });
    module.controller('angRegister', function($scope) {
       // $scope.message = 'login page';
    });