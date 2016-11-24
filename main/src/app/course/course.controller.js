/**
 * Single course controller
 */

(function() {
  'use strict';

  angular.module('app.course.controller', [])
    .controller('CourseController', CourseController);

  /** @ngInject */
  function CourseController($scope, $state, $stateParams, $location, $log, RestService) {
    var vm = this;

    // Data
    var courseId = $stateParams.courseId;

    // method
    /**
     * Service call to the course details by ID.
     */
    RestService.get('course/' + courseId)
      .then(function(response) {
        if (response.data) {
          vm.course = response.data.course;
          vm.ratings = [];
          var i;
          for (i = 0; i < vm.course.ratings; i++) {
            vm.ratings.push('icon-smile voted');
          }

          for (i = 0; i < (5 - vm.course.ratings); i++) {
            vm.ratings.push('icon-smile');
          }
          vm.includedItems = (vm.course.includes) ? vm.course.includes.split(',') : [];
          vm.schedules = vm.course.schedule.split('|');
          vm.features = [];
          vm.isParking = (vm.course.parking.length > 0) ? vm.features.push({
            'iconClass': 'icon_set_1_icon-27',
            'name': 'Parking'
          }) : false;
          vm.isAudio = (vm.course.languages.length > 0) ? vm.features.push({
            'iconClass': 'icon_set_1_icon-13',
            'name': 'Accessibiliy'
          }) : false;
          vm.features.push({
            'iconClass': 'icon_set_1_icon-83',
            name: vm.course.duration
          });
        }
      }, function(err) {
        $log.error(err);
      });

    vm.adultCount = 0;
    vm.childrenCount = 0;

    $scope.$watchGroup(['adultCount', 'childrenCount'], function(newValues) {
      vm.count = parseInt(newValues[0]) + parseInt(newValues[1]) || 0;
    });

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

    vm.minDate = new Date().toISOString().split('T')[0];

    /**
     * Function to submit the form for compvare the booking
     */
    vm.errorSubmit = false;
    vm.submitBooking = function() {
      if (vm.adultCount == 0 && vm.childrenCount == 0) {
        vm.errorSubmit = true;
      } else {
        var payload = {
          emailAddress: vm.emailAddress,
          firstName: vm.firstName,
          lastName: vm.lastName,
          telephone: vm.telephone,
          courseId: vm.course.courseID,
          adultCount: vm.adultCount,
          childrenCount: vm.childrenCount,
          date: vm.selectedDate
        };

        RestService.post('addCourseBookingFromUser', payload)
          .then(function(response) {
            $location.path('course-confirmation/' + response.data.booking);
          }, function(err) {
            $log.error(err);
          });
      }
    }
  }
}());
