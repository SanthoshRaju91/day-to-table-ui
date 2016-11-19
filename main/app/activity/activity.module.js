/**
 * Activity module page, show the list of activities, single activity and activity booking to confirmation page.
 */

(function() {
    'use strict';

    angular.module('app.activity', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        //state
        $stateProvider
            .state('activities', {
                url: '/activities',
                templateUrl: 'activities.html',
                controller: 'ActivitiesController as vm'
            })
            .state('activity', {
                url: '/activity/:activityId',
                templateUrl: 'activity.html',
                controller: 'ActivityController as vm'
            })
            .state('activity.confirmation', {
                url: 'activity-confirmation/:reference',
                templateUrl: 'activity-confirmation.html',
                controller: 'ActivityConfirmationController as vm'
            });
    }
}());
