/**
 * Course module, containing course details, booking course, course list.
 */

(function() {
    'use strict';

    angular.module('app.course', [])
    .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider
            .state('courses', {
                url: '/courses',
                templateUrl: 'courses.html',
                controller: 'CoursesController as vm'
            })
            .state('course', {
                url: '/course/:courseId',
                templateUrl: 'course.html',
                controller: 'CourseController as vm'
            })
            .state('course-confirmation', {
                url: '/course-confirmation/:reference',
                templateUrl: 'course-confirmation.html',
                controller: 'CourseConfirmationController as vm'
            });
    }
}());
