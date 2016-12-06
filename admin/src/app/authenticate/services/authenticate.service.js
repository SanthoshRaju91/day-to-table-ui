(function() {
  'use strict';

  angular
    .module('app.authenticate')
    .service('AuthService', AuthService)
    .service('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthService($window) {
    var user = this;

    // list of authenicated routes for each role
    var authenticateRoutes = {
      //'app.messages'
      'A': ['app.messages', 'app.manage', 'app.activity', 'app.course', 'app.access', 'app.dashboard', 'app.profile'],
      'SU': ['app.messages', 'app.manage', 'app.activity', 'app.course', 'app.dashboard', 'app.profile'],
      'U': ['app.messages', 'app.manage', 'app.profile']
    };

    /**
    * function for returning is authenicated status of the logged in user
    * @method: isAuthenticated
    */
    user.isAuthenticated = function() {
      return ($window.localStorage.getItem('isAuthenticated')) ? true : false;
    }

    /**
    * function for returning the logged user full name
    * @method: name
    */
    user.name = function() {
      return ($window.localStorage.getItem('fullname')) ? $window.localStorage.getItem('fullname') : '';
    }

    /**
    * function for returning token
    * @method: getToken
    */
    user.getToken = function() {
      return $window.localStorage.getItem('token');
    }

    /**
    * funntion for returning logged in user role
    * @method: role
    */
    user.role = function() {
      return ($window.localStorage.getItem('role')) ? $window.localStorage.getItem('role') : 'A';
    }

    /**
    * function for returning list of authenticated routes for the logged in user
    * @method: authenticatedRoutes
    */
    user.authenticatedRoutes = function() {
      return authenticateRoutes[user.role()];
    }

    /**
    * function for returning user details.
    * @method: details
    */
    user.details = function() {
      return ($window.localStorage.getItem('userDetails')) ? ($window.localStorage.getItem('userDetails')) : [];
    }

    /**
    * function for returning logged in user profile picture
    * @method: profilePicture
    */
    user.profilePicture = function() {
      return ($window.localStorage.getItem('profilePicture')) ? $window.localStorage.getItem('profilePicture') : 'http://www.exaholics.com/wp-content/uploads/avatars/1404/avatar1404-bpthumb.jpg'
    }

    /**
    * function for deleting the user details, full name, token, role from localStorage
    * @method: logout
    */
    user.logout = function() {
      $window.localStorage.removeItem('fullname');
      $window.localStorage.removeItem('role');
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('profilePicture');
      $window.localStorage.removeItem('userDetails');
      $window.localStorage.removeItem('isAuthenticated');
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
