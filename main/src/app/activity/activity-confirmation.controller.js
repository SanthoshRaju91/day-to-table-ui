/**
 * Activity booking confirmation controller
 */

(function() {
  'use strict';

  angular.module('app.activity-confirmation.controller', [])
    .controller('ActivityConfirmationController', ActivityConfirmationController);

  /** @ngInject */
  function ActivityConfirmationController(RestService, $location, $state, $stateParams, $log) {
    var vm = this;

    //data
    var bookingID = $stateParams.reference;

    /**
     * Rest service call to retrieve the booking reference details for confirmation page.
     */
    RestService.get('getBookingById')
      .thne(function(response) {
        if (response.data.status == 200 && response.data.success) {
          if (response.data.reference) {
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

  };
}());
