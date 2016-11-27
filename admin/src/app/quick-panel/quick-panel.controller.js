(function() {
  'use strict';

  angular
    .module('app.quick-panel')
    .controller('QuickPanelController', QuickPanelController)
    .controller('DialogController', DialogController);

  /** @ngInject */
  function DialogController($mdDialog) {
    var vm = this;
    vm.minDate = new Date();

    vm.todo = {};

    vm.cancel = function() {
      $mdDialog.cancel();
    }

    vm.add = function() {
      if (vm.todo.title && vm.todo.description && vm.todo.target) {
        $mdDialog.hide(vm.todo);
      }
    }
  }

  /** @ngInject */
  function QuickPanelController(msApi, $mdDialog, $http, $log, $mdToast, $location, AuthService) {
    var vm = this;

    // Data
    vm.date = new Date();
    // setting the host url for getting the todo list
    var host = $location.protocol() + '://' + $location.host() + ':8000/api/v1/';
    // getting the user id
    var user = JSON.parse(AuthService.details());

    /**
     * Rest call to get the list of todos for the logged in user
     */
    $http({
        method: 'GET',
        url: host + 'todos/' + user.id
      })
      .then(function(response) {
        if (response && response.data.success) {
          vm.todos = response.data.todos;
        } else {
          $log.error('Response error ' + response);
          showToast('Something went wrong in getting your todo list !!');
        }
      }, function(error) {
        $log.error(error);
        showToast('Something went wrong in getting your todo list !!');
      });


    /**
     * Function to get the refreshed list after update, add & delete actions on the list.
     * @method: refresh
     */
    function refresh() {
      $http({
          method: 'GET',
          url: host + 'todos/' + user.id
        })
        .then(function(response) {
          if (response && response.data.success) {
            vm.todos = response.data.todos;
          } else {
            $log.error('Response error ' + response);
            showToast('Something went wrong in getting your todo list !!');
          }
        }, function(error) {
          $log.error(error);
          showToast('Something went wrong in getting your todo list !!');
        });
    }

    // Methods
    /**
     * Function to adding todo task for the logged in user in the DB
     * @method: addTask
     */
    vm.addTask = function(event) {
      $mdDialog.show({
          controller: 'DialogController as vm',
          templateUrl: 'app/quick-panel/dialog/add.todo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function(todo) {
          todo['user'] = user.id;

          $http({
              method: 'POST',
              url: host + 'add',
              data: todo
            })
            .then(function(response) {
              if (response && response.data.success) {
                showToast('Task added successfully');
                refresh();
              } else {
                $log.error('Response error: ' + response);
                showToast('Something went wrong while creating your task. Please try again later');
              }
            }, function(err) {
              $log.error(err);
              showToast('Something went wrong while creating your task. Please try again later');
            })
        });
    }

    /**
     * Function to update the status of the todo task
     * @method: update
     */
    vm.update = function(id, status) {
      var payload = {};
      payload.id = id;
      payload.status = !status;

      $http({
          method: 'POST',
          url: host + 'update',
          data: payload
        })
        .then(function(response) {
          if (response && response.data.success) {
            showToast('Task updated');
            refresh();
          } else {
            $log.error('Response error: ' + response);
            showToast('Something went wrong in updating your task');
          }
        }, function(err) {
          $log.error(err);
          showToast('Something went wrong in updating your task');
        })
    };

    /**
     * Function to delete a task from the user's todo list
     * @method: delete
     */

    vm.delete = function(id) {
      $http({
          method: 'DELETE',
          url: host + 'delete/' + id,
        })
        .then(function(response) {
          if (response && response.data.success) {
            showToast('Task deleted');
            refresh();
          } else {
            $log.error('Response error: ' + response);
            showToast('Something went wrong while deleting your task. Please try again later');
          }
        }, function(err) {
          $log.error(err);
          showToast('Something went wrong while deleting your task. Please try again later');
        });
    }

    function showToast(message) {
      $mdToast.show($mdToast.simple().textContent(message));
    }
  }
})();
