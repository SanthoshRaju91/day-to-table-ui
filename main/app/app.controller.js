/**
 * Main controller for the application, login and logout included
 */

(function() {
    'use strict';

    angular.module('app.main', [])
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($location, $log, AuthService, RestService) {
        var vm = this;

        // Data
        vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
        vm.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';

        // methods
        /**
         * Function to login the make a login service call and login the user
         * @method: login
         */
        vm.login = function() {
            RestService.post('/login', {
                    email: vm.email,
                    password: vm.password
                })
                .then(function(response) {
                    AuthService.logIn(response.data.token, response.data.role, JSON.stringify(response.data.user));
                    vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
                    vm.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';
                }, function(err) {
                    $log.error(err);
                });
        };

        /**
         * Function to logout & call the logout service
         * @method: logout
         */
        vm.logout = function() {
            AuthService.logOut();
            vm.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
            vm.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';

            // navigating to landing page
            $location.path('/');
        };

        /**
         * Function to navigate the user to register page
         * @method: register
         */
        vm.register = function() {
            $location.path('register');
        };

    }
}());
