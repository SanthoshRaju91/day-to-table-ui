/**
 * Activity module page, show the list of activities, single activity and activity booking to confirmation page.
 */

(function() {
  'use strict';

  angular.module('app.activity', ['app.activity-grid', 'app.activities.controller', 'app.activity-confirmation.controller', 'app.activity.controller'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $controllerProvider) {

    $controllerProvider.allowGlobals();

    // States
    $stateProvider
      .state('activities', {
        url: '/activities',
        templateUrl: 'app/activity/activities.html',
        controller: 'ActivitiesController as vm'
      })
      .state('activity', {
        url: '/activity/:activityId',
        templateUrl: 'app/activity/activity.html',
        controller: 'ActivityController as vm'
      })
      .state('activity.confirmation', {
        url: 'activity-confirmation/:reference',
        templateUrl: 'app/activity/activity-confirmation.html',
        controller: 'ActivityConfirmationController as vm'
      });
  }
}());
