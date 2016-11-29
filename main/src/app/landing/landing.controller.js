(function() {
  'use strict';

  angular
    .module('app.landing.controller', [])
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController($log, RestService) {
    var vm = this;

    // Data
    vm.isPopularCoursesAvailable = false;
    vm.isUpcomingActivitiesAvailable = false;

    // methods

    /**
     * GET method call to retrieve the popular courses
     */
    RestService.get('courses/popular')
      .then(function(response) {
        if (response.data && response.data.courses.length > 0) {
          vm.isPopularCoursesAvailable = true;
          vm.popularCourses = response.data.courses;
        } else {
          $log.error('No popular courses found');
        }
      }, function(err) {
        $log.error(err);
      });


    /**
     * GET method call to retrieve the upcoming activities.
     */
    RestService.get('activities/upcoming')
      .then(function(response) {
        if (response.data && response.data.activities.length > 0) {
          vm.isUpcomingActivitiesAvailable = true;
          vm.response.data.activityList = response.data.activities;
        } else {
          $log.error('No upcoming activities found');
        }
      }, function(err) {
        $log.error(err);
      });
  }
})();
