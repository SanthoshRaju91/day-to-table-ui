'use strict';

/**
* Main application route module
*/

(function () {

  'use strict';

  routeConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
  angular.module('app.route', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/landing');
  }
})();