/**
 * Main app controller
 */

(function() {
  'use strict';

  angular.module('app.main', [])
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(AuthService, RestService, $log, $location, toastr, toastrConfig) {
    var vm = this;
    // Data
    vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
    vm.fullName = AuthService.getFullName();

    // methods
    /**
     * Function to login the make a login service call and login the user
     * @method: login
     */
    vm.login = function() {
      RestService.post('login', {
          email: vm.email,
          password: vm.password
        })
        .then(function(response) {
          if(response && response.data.success) {
            AuthService.logIn(response.data.token, response.data.user.role, angular.toJson(response.data.user));
            vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
            vm.fullName = AuthService.getFullName();
            showToast('Logged in', 'success');
          } else {
            showToast('Login not succesfull. Please try again', 'error');
          }
        }, function(err) {
          showToast(err.data.errors, 'error');
          $log.error(err);
        });
    };

    /**
     * Function to logout & call the logout service
     * @method: logout
     */
    vm.logout = function() {
      var payload = {};
      RestService.delete('logoff', payload)
        .then(function(response) {
          if(response.data.success) {
            AuthService.logOut();
            vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
            vm.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().first_name + " " + AuthService.getUserDetails().last_name : '';
            // navigating to landing page
            $location.path('/');
            showToast('Logged out succefully', 'success');
          }
        }, function(err) {
          showToast('Logoff was not successful. Please try again', 'error');
          $log.error(err);
        });
    };

    /**
     * Function to navigate the user to register page
     * @method: register
     */
    vm.register = function() {
      $location.path('register');
    };

    function showToast(message, type) {
      toastrConfig.positionClass = 'toast-top-left';      
      toastr[type](message);
    }
  }
}());
