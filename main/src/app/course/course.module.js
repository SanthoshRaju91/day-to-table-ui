/**
 * Course module, containing course details, booking course, course list.
 */

(function() {
  'use strict';

  angular.module('app.course', ['app.course.grid', 'app.course-confirmation.controller', 'app.course.controller', 'app.courses.controller'])
    .config(config);

  /** @ngInject */
  function config($stateProvider) {

    $stateProvider
      .state('courses', {
        url: '/courses',
        templateUrl: 'app/course/courses.html',
        controller: 'CoursesController as vm'
      })
      .state('course', {
        url: '/course/:courseId',
        templateUrl: 'app/course/course.html',
        controller: 'CourseController as vm'
      })
      .state('course-confirmation', {
        url: '/course-confirmation/:reference',
        templateUrl: 'app/course/course-confirmation.html',
        controller: 'CourseConfirmationController as vm'
      });
  }
}());
