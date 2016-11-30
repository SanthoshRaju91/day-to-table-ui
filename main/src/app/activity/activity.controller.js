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
    RestService.get('activity/' + activityId)
      .then(function(response) {
        if (response.data) {
          var activity = response.data.activity;
          vm.activity = activity;
          vm.includedItems = (activity.includes) ? activity.includes.split(',') : [];
          vm.features = [];
          vm.isParking = (activity.parking.length > 0) ? vm.features.push({
            'iconClass': 'icon_set_1_icon-27',
            'name': 'Parking'
          }) : false;
          vm.isAudio = (activity.languages.length > 0) ? vm.features.push({
            'iconClass': 'icon_set_1_icon-13',
            'name': 'Accessibiliy'
          }) : false;
          vm.features.push({
            'iconClass': 'icon_set_1_icon-83',
            name: activity.duration
          });
          vm.isBookingAvailable = (activity.status.toUpperCase() === 'A') ? true : false;
        }
      }, function(err) {
        $log.error(err);
      });



    /**
     * Watch for adult and children count.
     */
    $scope.$watchGroup([function() {
      return vm.adultCount;
    }, function() {
      return vm.childrenCount;
    }], function(newValue, oldValue) {
      if (vm.adultCount || vm.childrenCount) {
        vm.isBookingAvailable = true;
      }
      vm.count = parseInt(newValue[0]) + parseInt(newValue[1]) || 0;
    });

    /**
     * Function to increment the count.
     * @method: increment
     */
    vm.increment = function(type) {
      if (type === 'adult') {
        if (vm.adultCount < 10) {
          vm.adultCount++;
        }
      } else {
        if (vm.childrenCount < 10) {
          vm.childrenCount++;
        }
      }
    }

    /**
     * Function to decrement the count.
     * @method: decrement
     */
    vm.decrement = function(type) {
      if (type === 'adult') {
        if (vm.adultCount > 0) {
          vm.adultCount--;
        }
      } else {
        if (vm.childrenCount > 0) {
          vm.childrenCount--;
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
          activityID: vm.activity._id.$oid,
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
