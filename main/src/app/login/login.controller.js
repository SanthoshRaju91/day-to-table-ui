(function() {
  'use strict';

  angular.module('app.login.controller', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(RestService, AuthService, $location, $log) {
    var vm = this;

    vm.isError = false;

    vm.login = function() {
      if (vm.email && vm.password) {
        RestService.post('login', {
            email: vm.email,
            password: vm.password
          })
          .then(function(response) {
            if (response.data.status === 200 && response.data.success) {
              AuthService.logIn(response.data.token, response.data.role, angular.toJson(response.data.user));
              $location.path('/');
            } else {
              vm.isError = true;
              vm.errorMessage = response.data.message;
            }
          }, function(err) {
            vm.isError = true;
            vm.errorMessage = 'Error while logging in.';
            $log.error(err);
          });
      }
    }
  }
}());
