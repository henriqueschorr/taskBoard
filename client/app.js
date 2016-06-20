var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'TasksController',
        templateUrl: 'views/tasks.html'
    })
        .when('/developer', {
            controller: 'TasksController',
            templateUrl: 'views/developer.fragment.html'
        })
});