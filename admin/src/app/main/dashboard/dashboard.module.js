/**
 * Dashboard functionality module.
 */

(function() {
  'use strict';

  angular.module('app.dashboard', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {

    //state
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'content@app': {
            templateUrl: 'app/main/dashboard/dashboard.html',
            controller: 'DashboardController as vm'
          }
        },
        resolve: {
          DashboardData: function(msApi, $q, AuthService) {
            if (!AuthService.authenticatedRoutes().includes('app.dashboard')) {
              return $q.reject('Not Authorized');
            }
          }
        }
      });

      // Translation
      $translatePartialLoaderProvider.addPart('app/main/dashboard');

      // Navigation
      msNavigationServiceProvider.saveItem('fuse', {
          title : 'DASHBOARD',
          group : true,
          weight: 7
      });

      msNavigationServiceProvider.saveItem('fuse.dashboard', {
          title    : 'Dashboard',
          icon     : 'icon-tile-four',
          state    : 'app.dashboard',
          /*stateParams: {
              'param1': 'page'
           },*/
          translate: 'DASHBOARD.DASHBOARD_NAV',
          weight   : 7
      });
  }
}());
