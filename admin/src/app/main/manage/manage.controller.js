(function() {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController)
    .controller('ManageDialogController', ManageDialogController);


  /** @ngInject */
  function ManageDialogController($mdDialog, dataToPass, $scope) {
    var vm = this;
    vm.minDate = new Date();
    vm.minStartDate = vm.startDate;
    vm.schedule = {}
    vm.item = dataToPass;

    vm.schedule.startDate = '';
    vm.schedule.endDate = '';

    /*
     * Checking for start & end date are in sync
     */
    $scope.$watch(function() {
      return vm.schedule.startDate;
    }, function(newValue, oldValue) {
      if (newValue > vm.schedule.endDate) {
        vm.schedule.endDate = '';
      }
    });


    /**
     * Function to hide the modal when the user clicks on cancel
     * @method: cancel
     */
    vm.cancel = function() {
      $mdDialog.cancel();
    }


    /**
     * Function to send the schedule to the parent controller.
     * @method: add
     */
    vm.add = function() {
      if (vm.schedule.startDate && vm.schedule.endDate) {
        $mdDialog.hide(vm.schedule);
      }
    }
  };


  /** @ngInject */
  function ManageController(ManageData, RestService, $log, $mdDialog, $mdToast, AuthService, $q, $timeout) {
    var vm = this;

    // Data
    vm.selectedDate = [];
    vm.dayFormat = 'd';
    vm.firstDayOfWeek = 0;
    var user = JSON.parse(AuthService.details());
    var loadContentAsync = true;

    // Methods

    /**
     * Rest call service to ge the enrolled courses for the user
     */
    RestService.get('courses/enrolled_courses/' + user._id)
      .then(function(response) {
        if (response.data) {
          vm.enrolled = response.data.enrolled;
        }
        fetchSchedule();
      }, function(err) {
        $log.error(err);
        showToast('Something went wrong while fetching your enrolled courses and activities');
      });


    /**
     * Function to fetch user schedule
     * @method: fetchSchedule
     */

    function fetchSchedule() {
      var id = user._id;

      RestService.get('user-schedule/' + id)
        .then(function(response) {

        }, function(err) {
          $log.error(err);
          showToast('Something went wrong while fetching your schedule. Please contact the admin');
        });
    }

    vm.add = function(event, item) {
      $mdDialog.show({
          locals: {
            dataToPass: item
          },
          controller: 'ManageDialogController as vm',
          templateUrl: 'app/main/manage/dialog/manage-schedule.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function(schedule) {
          var payload = {};
          payload.id = item.id;
          payload.type = 'course';
          payload.startDate = schedule.startDate;
          payload.endDate = schedule.endDate;

          RestService.post('manage-schedule', payload)
            .then(function(response) {
              if (response.data.success) {
                deserializeSchedule(response.data.schedule);
              }
            }, function(err) {
              $log.error(err);
              showToast('Something went wrong while adding the course to schedule. Please try again later');
            })
        });
    }


    /**
     * Function for deserializing schedule response data to match the response.
     * @method: deserializeSchedule
     */
    function deserializeSchedule(schedule) {
      var deserialized = {};
      _.forEach(schedule, function(current, index) {
        if (!deserialized[current.date]) {
          deserialized[current.date] = [];
          deserialized[current.date].push(current);
        } else {
          deserialized[current.date].push(current);
        }
      });
      vm.schedule = deserialized;
    }

    /**
     * Function to determining the day content.
     * @method: setDayContent
     */
    vm.setDayContent = function(date) {
      if (vm.schedule) {
        var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
        var data = '';
        if (vm.schedule[key]) {
          if (vm.schedule[key].constructor === Array) {
            _.forEach(vm.schedule[key], function(current, index) {
              if (current) {
                data += current.name + '<br/><br/>';
              }
            });
          } else {
            data = (vm.schedule[key] || [{
              name: ""
            }])[0].name;
          }
        }


        if (loadContentAsync) {
          var deferred = $q.defer();
          $timeout(function() {
            deferred.resolve(data);
          });
          return deferred.promise;
        }
        return data;
      }
    };

    /**
     * Function for formatting number.
     * @method: numFmt
     */
    var numFmt = function(num) {
      num = num.toString();
      if (num.length < 2) {
        num = "0" + num;
      }
      return num;
    };

    /**
     * Function to show the toast message
     * @method: showToast
     */
    function showToast(message) {
      $mdToast.show($mdToast.simple().textContent(message));
    }
  }
})();
