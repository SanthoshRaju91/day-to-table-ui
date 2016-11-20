(function() {
  'use strict';

  angular.module('app.landing', ['app.landing.grid', 'app.landing.upcoming-grid', 'app.landing.carousel', 'app.landing.controller'])
    .config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController as vm'
      });
  }
}());
