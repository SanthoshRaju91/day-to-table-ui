(function() {
  'use strict';

  angular
    .module('app.course', [])
    .config(config);

    /** @ngInject*/
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
        .state('app.course', {
            url    : '/course',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/course/course.html',
                    controller : 'CourseController as vm'
                }
            },
            resolve: {
                CourseData: function (msApi, $q, AuthService)
                {
                  if(!AuthService.authenticatedRoutes().includes('app.course')) {                    
                    return $q.reject('Not Authorized');
                  }
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/course');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'COURSE',
            group : true,
            weight: 3
        });

        msNavigationServiceProvider.saveItem('fuse.course', {
            title    : 'Course',
            icon     : 'icon-tile-four',
            state    : 'app.course',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'COURSE.COURSE_NAV',
            weight   : 3
        });

    }
})();
