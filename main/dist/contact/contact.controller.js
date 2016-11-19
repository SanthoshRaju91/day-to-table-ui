'use strict';

/**
* Contact controller, where the user submits as issue.
*/

(function () {
  'use strict';

  ContactController.$inject = ["$log", "RestService"];
  angular.module('app.contact', []).controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($log, RestService) {

    var vm = this;

    vm.notification = false;

    vm.submitQuery = function () {
      if (vm.verfication === 4) {
        RestService.post('/queryMessage', { firstName: vm.firstName, lastName: vm.lastName, emailAddress: vm.emailAddress, phone: vm.phone, message: vm.message }).then(function (response) {
          vm.alertType = 'alert-success';
          vm.notification = true;
          vm.notificationMessage = 'Thank you, your requested has been submitted, our team will get back to you at the earliest.';
          vm.firstName = vm.lastName = vm.emailAddress = vm.phone = vm.message = vm.verfication = '';
        }, function (err) {
          $log.error(err);
          vm.alertType = 'alert-danger';
          vm.notification = true;
          vm.message = 'Something went wrong, please contact the admin.';
        });
      }
    };
  }
})();