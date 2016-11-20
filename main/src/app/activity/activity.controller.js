/**
 * Activity controller to show the activity details.
 */

(function() {
  'use strict';

  angular.module('app.activity.controller', [])
    .controller('ActivityController', ActivityController);

  /** @ngInject */
  function ActivityController(RestService, $state, $stateParams, $location, $log, $scope) {
    var vm = this;

    // Data
    var activityId = $stateParams.activityId;
    vm.adultCount = 0;
    vm.childrenCount = 0;
    vm.errorSubmit = false;
    vm.isBookingAvailable = false;
    //method

    /**
     * Function to get the activity details
     */
    RestService.get('getActivityById/' + activityId)
      .then(function(response) {
        var activity = response.data.activity;
        vm.activity = activity;
        vm.includedItems = (activity.includes) ? activity.includes.split(',') : [];
        vm.features = [];
        vm.isParking = (activity.parking.length > 0) ? features.push({
          'iconClass': 'icon_set_1_icon-27',
          'name': 'Parking'
        }) : false;
        vm.isAudio = (activity.languages.length > 0) ? features.push({
          'iconClass': 'icon_set_1_icon-13',
          'name': 'Accessibiliy'
        }) : false;
        vm.features.push({
          'iconClass': 'icon_set_1_icon-83',
          name: activity.duration
        });
        vm.isBookingAvailable = (response.data.activityStatus.toUpperCase() == 'OPEN') ? true : false;
      }, function(err) {
        $log.error(err);
      });

    $scope.$watchGroup(['adultCount', 'childrenCount'], function(newValues, oldValues) {
      if (vm.adultCount || vm.childrenCount) {
        vm.isBookingAvailable = true;
      }
      vm.count = parseInt(newValues[0]) + parseInt(newValues[1]) || 0;
    });

    /**
     * Function to increment the count.
     * @method: increment
     */
    vm.increment = function(type) {
      if (type === 'adult') {
        if ($scope.adultCount < 10) {
          $scope.adultCount++;
        }
      } else {
        if ($scope.childrenCount < 10) {
          $scope.childrenCount++;
        }
      }
    }

    /**
     * Function to decrement the count.
     * @method: decrement
     */
    vm.decrement = function(type) {
      if (type === 'adult') {
        if ($scope.adultCount > 0) {
          $scope.adultCount--;
        }
      } else {
        if ($scope.childrenCount > 0) {
          $scope.childrenCount--;
        }
      }
    }

    /**
     * Function to book for activity.
     * @method: bookActivity
     */
    vm.bookActivity = function() {
      if (vm.adultCount == 0 && vm.childrenCount == 0) {
        vm.errorSubmit = true;
      } else {
        var payload = {
          emailAddress: vm.emailAddress,
          firstName: vm.firstName,
          lastName: vm.lastName,
          telephone: vm.telephone,
          activityID: vm.activity.activityID,
          adultCount: vm.adultCount,
          childrenCount: vm.childrenCount
        };

        RestService.post('/addBookingActivityFromUser', payload)
          .then(function(response) {
            if (response.data.status === 200 || response.data.success) {
              $location.path('confirmation/' + response.data.booking);
            }
          }, function(err) {
            $log.error(err);
          });
      }
    }
  }
}());
