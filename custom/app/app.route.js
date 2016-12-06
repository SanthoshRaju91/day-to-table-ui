/**
* Main application route module
*/

(function() {

  'use strict';

  angular.module('app.route', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      // $urlRouterProvider.otherwise('/landing');
    }
}());
