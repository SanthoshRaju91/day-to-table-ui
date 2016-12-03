(function() {
  'use strict';

  angular
    .module('app.authenticate')
    .service('AuthService', AuthService)
    .service('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthService($window) {
    var user = this;

    var authenticateRoutes = {
      //'app.messages'
      'A': ['app.manage', 'app.activity', 'app.course', 'app.access', 'app.dashboard', 'app.profile'],
      'SU': ['app.messages', 'app.manage', 'app.activity', 'app.course', 'app.dashboard', 'app.profile'],
      'U': ['app.manage', 'app.profile']
    };

    user.name = function() {
      // return $window.localStorage.getItem('fullname'); // for live
      // for testing
      return ($window.localStorage.getItem('fullname')) ? $window.localStorage.getItem('fullname') : '';
    }

    user.getToken = function() {
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

    user.name = function() {
      return ($window.localStorage.getItem('fullname')) ? ($window.localStorage.getItem('fullname')) : '';
    }

    user.profilePicture = function() {
      return ($window.localStorage.getItem('profilePicture')) ? $window.localStorage.getItem('profilePicture') : 'http://www.exaholics.com/wp-content/uploads/avatars/1404/avatar1404-bpthumb.jpg'
    }

    return user;
  };

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
})();
