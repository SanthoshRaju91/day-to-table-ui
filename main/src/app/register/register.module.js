/**
App registration module
*/

(function() {
  'use strict';

  angular.module('app.register', ['app.register.controller'])
    .config(config);

    /** @ngInject */
    function config($stateProvider) {

      // State
      $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'app/register/register.html',
          controller: 'RegisterController as vm'
        });
    }
}());
