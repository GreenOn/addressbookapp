// script.js
    // create the module and name it addBookApp
        // also include ngRoute for all our routing needs
    var addBookApp = angular.module('addBookApp', ['ngRoute']);

    // configure our routes
    addBookApp.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'about.html',
                controller  : 'aboutController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'loginController'
            })
            // route for the register page
            .when('/register', {
                templateUrl : 'register.html',
                controller  : 'angRegister'
            });
    });

    // create the controller and inject Angular's $scope
    addBookApp.controller('mainController', function($scope) {
        // create a message to display in our view
        //$scope.message = 'Main controller.';
    });

    addBookApp.controller('aboutController', function($scope) {
        //$scope.message = 'Look! I am an about page.';
    });

    addBookApp.controller('loginController', function($scope) {
       // $scope.message = 'login page';
    });
        addBookApp.controller('angRegister', function($scope) {
       // $scope.message = 'login page';
    });