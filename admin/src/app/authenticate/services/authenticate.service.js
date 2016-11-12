(function() {
  'use strict';

    angular
      .module('app.authenticate')
      .service('AuthService', AuthService);

      /** @ngInject */
      function AuthService($window) {
        var user = this;

        var authenticateRoutes = {
          'A': ['app.manage', 'app.activity', 'app.course', 'app.messages', 'app.access', 'app.dashboard', 'app.profile'],
          'SU': ['app.manage', 'app.activity', 'app.course', 'app.messages', 'app.dashboard', 'app.profile'],
          'U': ['app.manage', 'app.messages', 'app.profile']
        };

        user.name = function() {
          // return $window.localStorage.getItem('fullname'); // for live
          // for testing
          return ($window.localStorage.getItem('fullname')) ? $window.localStorage.getItem('fullname') : 'Santhosh Raju';
        }

        user.token = function() {
          return $window.localStorage.getItem('token');
        }

        user.role = function() {
          // return $window.localStorage.getItem('role'); // for live
          // for testing
          return ($window.localStorage.getItem('role')) ? $window.localStorage.getItem('role') : 'A';
        }

        user.authenticatedRoutes = function() {
          return authenticateRoutes[user.role()];
        }

        user.details = function() {
          return ($window.localStorage.getItem('userDetails')) ? ($window.localStorage.getItem('userDetails')) : [];
        }

        user.profilePicture = function() {
          return ($window.localStorage.getItem('profilePicture')) ? $window.localStorage.getItem('profilePicture') : 'http://www.exaholics.com/wp-content/uploads/avatars/1404/avatar1404-bpthumb.jpg'
        }

        return user;
      };
})();
