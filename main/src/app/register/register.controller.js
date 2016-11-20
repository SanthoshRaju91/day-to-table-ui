/**
* registration controller
*/

(function() {
  'use strict';

  angular.module('app.register.controller', ['ui.bootstrap'])
    .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(RestService, AuthService, $log, $location, $uibModal) {

      var vm = this;
      vm.isError = false;
      /**
      * Check if the passwords matched, and register the user.
      * @method: registerUser
      */
      vm.registerUser = function() {
        if(vm.password === vm.confirmPassword) {
          var payload = {
            emailAddress: vm.emailAddress,
            password: vm.password,
            firstName: vm.firstName,
            lastName: vm.lastName,
            contact: vm.contact,
            gender: vm.gender
          };

          RestService.post('registerUser', payload)
            .then(function(response) {
              if(response.data.status === 200 && response.data.success) {

                $location.path('/');
              } else {
                $log.error(response.data.message);
                vm.isError = true;
                vm.errorMessage = response.data.message;
              }
            }, function(errorResponse) {
              $log.error(response.data.message);
              vm.isError = true;
              vm.errorMessage = response.data.message;
            });
        } else {
          $log.error('passwords do not match');
          vm.isError = true;
          vm.errorMessage = 'Passwords do not match';
        }
      };
    }
}());
