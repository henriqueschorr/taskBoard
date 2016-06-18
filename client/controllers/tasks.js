/**
 * Created by Henrique on 18/06/2016.
 */
var myApp = angular.module('myApp');

myApp.controller('TasksController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    console.log('TasksController loaded');

    $scope.loadTasks = function () {
        $http.get('/api/tasks/todo').success(function (response) {
            $scope.tasksTodo = response;
        })

        $http.get('/api/tasks/doing').success(function (response) {
            $scope.tasksDoing = response;
        })

        $http.get('/api/tasks/done').success(function (response) {
            $scope.tasksDone = response;
        })
    };

    $scope.addTask = function () {
        var task = $scope.task;
        task.status = "ToDo";
        task.createdOn = Date.now();

        $http.post('/api/tasks', task).success(function (response) {
            $scope.loadTasks();
        })
    };

    $scope.removeTask = function (id) {
        $http.delete('/api/tasks/' + id).success(function (response) {
            $scope.loadTasks();
        })
    };

    $scope.doingTask = function () {
        var id = $routeParams.id;

        $http.get('/api/tasks/' + id).success(function (response) {
            var task = response;

            task.status = "Doing";
            task.developer = "Henrique Schorr";

            $http.put('/api/tasks/' + task._id, task).success(function (response) {
                $scope.loadTasks();
            })
        });
    };

    $scope.doneTask = function (task) {
        task.status = "Done";
        task.finishedOn = Date.now();

        $http.put('/api/tasks/' + task._id, task).success(function (response) {
            $scope.loadTasks();
        })
    };

}]);