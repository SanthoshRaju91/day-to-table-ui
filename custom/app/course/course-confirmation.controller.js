/**
 * Course confirmation controller for acknowleding the booked course.
 */

(function() {
    'use strict';

    angular.module('app.course', [])
        .controller('CourseConfirmationController', CourseConfirmationController);

    /** @ngInject */
    function CourseConfirmationController(RestService, $location, $state, $stateParams, $log) {
      var vm = this;

      //Data
      let bookingID = $stateParams.reference;

      /**
      * Rest service call to retrieve the booking reference details for confirmation page.
      */
      RestService.get('getBookingById')
        .thne(function(response) {
          if(response.data.status == 200 && response.data.success) {
            if(response.data.reference) {
              vm.booking = response.data.booking.booking;
              vm.reference = response.data.booking.reference;
              vm.bookingReference = response.data.bookingReference;
            } else {
              vm.booking = response.data.booking.booking;
            }
          }
        }, function(err) {
          $log.error(error);
        });
    }
}());
