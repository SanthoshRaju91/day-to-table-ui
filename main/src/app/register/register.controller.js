/**
 * registration controller
 */

(function() {
  'use strict';

  angular.module('app.register.controller', ['ui.bootstrap'])
    .controller('RegisterController', RegisterController)
    .controller('ModalInstanceController', ModalInstanceController);

  /** @ngInject */
  function ModalInstanceController($uibModalInstance) {
    var vm = this;

    /**
    * Function to dismiss the dialog.
    * @method: ok
    */
    vm.ok = function() {
      $uibModalInstance.close('done');
    }
  }

  /** @ngInject */
  function RegisterController(RestService, AuthService, $log, $location, $uibModal) {

    var vm = this;
    vm.isError = false;
    /**
     * Check if the passwords matched, and register the user.
     * @method: registerUser
     */
    vm.registerUser = function() {
      if (vm.password === vm.confirmPassword) {
        var payload = {
          emailAddress: vm.emailAddress,
          password: vm.password,
          firstName: vm.firstName,
          lastName: vm.lastName,
          contact: vm.contact,
          gender: vm.gender
        };

        RestService.post('register', payload)
          .then(function(response) {
            if (response && response.data.success) {
              $uibModal.open({
                animation: true,
                windowClass: 'custom-top-style',
                ariaLabelledBy: 'Registration',
                ariaDescribedBy: '',
                templateUrl: 'app/register/dialog/modal-content.html',
                controller: 'ModalInstanceController as vm',
                appendTo: angular.element(document.body)
              }).result.then(function() {
                $location.path('/');
              });
            } else {
              $log.error(response.data.message);
              vm.isError = true;
              vm.errorMessage = response.data.message;
            }
          }, function(err) {
            $log.error(err);
            vm.isError = true;
            vm.errorMessage = 'Some error while registering the user.';
          });
      } else {
        $log.error('passwords do not match');
        vm.isError = true;
        vm.errorMessage = 'Passwords do not match';
      }
    };
  }
}());
