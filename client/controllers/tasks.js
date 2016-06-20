/**
 * Created by Henrique on 18/06/2016.
 */
var myApp = angular.module('myApp');

myApp.controller('TasksController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    console.log('TasksController loaded');

    $(document).ready(function () {
        $('#createTask').on('shown.bs.modal', function () {
                $('#titleCreate').focus();
            })
            .on('hide.bs.modal', function () {
                $scope.task = null;
            });

        $('#editTask').on('shown.bs.modal', function (event) {
            var taskId = $(event.relatedTarget).context.firstElementChild.textContent;
            $http.get('/api/tasks/' + taskId).success(function (response) {
                $scope.task = response;
                $('#descriptionToDo').focus();
                $('#createdToDo').val(moment().format('D, MM, YYYY'));
            });
        });

        $('#editDoingTask').on('shown.bs.modal', function (event) {
            var taskId = $(event.relatedTarget).context.firstElementChild.textContent;

            $http.get('/api/tasks/' + taskId).success(function (response) {
                $scope.task = response;
                $('#effortDoing').focus();
            });
        });

        $('#displayTaskDone').on('shown.bs.modal', function (event) {
            var taskId = $(event.relatedTarget).context.firstElementChild.textContent;

            $http.get('/api/tasks/' + taskId).success(function (response) {
                $scope.task = response;
            });
        });
    });

    $scope.loadTasks = function () {
        $http.get('/api/tasks/todo').success(function (response) {
            $scope.tasksTodo = response;
        });

        $http.get('/api/tasks/doing').success(function (response) {
            $scope.tasksDoing = response;
        });

        $http.get('/api/tasks/done').success(function (response) {
            $scope.tasksDone = response;
        });
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

    $scope.updateTask = function () {
        $http.put('/api/tasks/' + $scope.task._id, $scope.task).success(function (response) {
            $scope.loadTasks();
        })
    };

    $scope.doingTask = function () {
        $scope.task.status = "Doing";

        $http.put('/api/tasks/' + $scope.task._id, $scope.task).success(function (response) {
            $scope.loadTasks();
        })
    };

    $scope.taskDone = function () {
        $scope.task.status = "Done";
        $scope.task.finishedOn = Date.now();

        $http.put('/api/tasks/' + $scope.task._id, $scope.task).success(function (response) {
            $scope.loadTasks();
        })
    };

}]);