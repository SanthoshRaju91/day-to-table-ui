/**
* Login controller and module
*/

(function() {
  'use strict';

  angular.module('app.login', ['app.login.controller'])
    .config(config);

    /** @ngInject */
    function config($stateProvider) {

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html',
          controller: 'LoginController as vm'
        });
    }
}());
