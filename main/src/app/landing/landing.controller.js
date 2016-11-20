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
    RestService.get('getPopularCourses')
      .then(function(response) {
        if (response.data.courseList.length > 0) {
          vm.isPopularCoursesAvailable = true;
          vm.popularCourses = response.data.courseList;
        }
      }, function(err) {
        $log.error(err);
      });


    /**
     * GET method call to retrieve the upcoming activities.
     */
    RestService.get('getUpcomingActivites')
      .then(function(response) {
        if (response.data.activityList) {
          vm.isUpcomingActivitiesAvailable = true;
          vm.response.data.activityList = response.data.activityList
        }
      }, function(err) {
        $log.error(err);
      });
  }
})();
