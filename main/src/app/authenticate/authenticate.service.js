/**
 * Authenticate service
 */

(function() {
    'use strict';

    angular.module('app.authenticate', [])
        .service('AuthService', AuthService)
        .service('AuthInterceptor', AuthInterceptor);

    /** @ngInject */
    function AuthService($window) {
        var user = this;

        /**
         * post login function to store the token, user details in localStorage
         * @method logIn
         */
        user.logIn = function(token, role, userDetails) {
            $window.localStorage.setItem('isAuthenticated', true);
            $window.localStorage.setItem('token', token);
            $window.localStorage.setItem('role', role);
            $window.localStorage.setItem('userDetails', userDetails);
            $window.localStorage.setItem('fullname', userDetails.first_name + ' ' + userDetails.last_name);
        }


        /**
         * Function to clear the localStorage items for the app
         * @method: logOut
         */
        user.logOut = function() {
            $window.localStorage.removeItem('isAuthenticated');
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('role');
            $window.localStorage.removeItem('userDetails');
        }

        /**
         * Function to check if the user is authenticated checking the localStorage isAuthenticated items
         * @method: isAuthenticated
         */
        user.isAuthenticated = function() {
            return $window.localStorage.getItem('isAuthenticated') || false;
        }

        /**
         * Function to get the stored web token from localStorage
         * @method: getToken
         */
        user.getToken = function() {
            return $window.localStorage.getItem('token') || '';
        }

        /**
         * Function to get the user role from localStorage items
         * @method: getRole
         */
        user.getRole = function() {
            return $window.localStorage.getItem('role');
        }

        /**
         * Function to get user details from localStorage items
         * @method: getUserDetails
         */
        user.getUserDetails = function() {
            return angular.toJson($window.localStorage.getItem('userDetails'));
        }

        return user;
    }

    /** @ngInject */
    function AuthInterceptor(AuthService) {
        var interceptorFactory = {};

        /**
         * Function for intercepting the request and appending the token to request header
         * @method: request
         */
        interceptorFactory.request = function(config) {
            var token = AuthService.getToken();

            if (token) {
                config.headers['authorization'] = 'Bearer ' + token;
            }
            return config;
        }

        return interceptorFactory;
    }
}());
