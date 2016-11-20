(function() {
  'use strict';

  angular
    .module('main')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    //state
    // $stateProvider
      // .state('activities', {
      //   url: '/activities',
      //   templateUrl: 'app/activity/activities.html',
      //   controller: 'ActivitiesController as vm'
      // })
      // .state('activity', {
      //   url: '/activity/:activityId',
      //   templateUrl: 'app/activity/activity.html',
      //   controller: 'ActivityController as vm'
      // })
      // .state('activity.confirmation', {
      //   url: 'activity-confirmation/:reference',
      //   templateUrl: 'app/activity/activity-confirmation.html',
      //   controller: 'ActivityConfirmationController as vm'
      // })
      // .state('contact', {
      //   url: '/contact',
      //   templateUrl: 'app/contact/contact.html',
      //   controller: 'ContactController as vm'
      // })
      // .state('about', {
      //   url: '/about',
      //   templateUrl: 'app/contact/about.html'
      // })
      // .state('courses', {
      //   url: '/courses',
      //   templateUrl: 'app/course/courses.html',
      //   controller: 'CoursesController as vm'
      // })
      // .state('course', {
      //   url: '/course/:courseId',
      //   templateUrl: 'app/course/course.html',
      //   controller: 'CourseController as vm'
      // })
      // .state('course-confirmation', {
      //   url: '/course-confirmation/:reference',
      //   templateUrl: 'app/course/course-confirmation.html',
      //   controller: 'CourseConfirmationController as vm'
      // })
      // .state('landing', {
      //   url: '/landing',
      //   templateUrl: 'app/landing/landing.html',
      //   controller: 'LandingController as vm'
      // });
    $urlRouterProvider.otherwise('/landing');
  }

})();
