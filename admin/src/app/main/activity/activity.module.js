(function() {
  'use strict';

  angular
    .module('app.activity', [])
    .config(config);

    /** @ngInject*/

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
        .state('app.activity', {
            url    : '/activity',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/activity/activity.html',
                    controller : 'ActivityController as vm'
                }
            },
            resolve: {
                ActivityData: function (msApi, $q, AuthService)
                {
                  if(!AuthService.authenticatedRoutes().includes('app.activity')) {                    
                    return $q.reject('Not Authorized');
                  }
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/activity');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ACTIVITY',
            group : true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('fuse.activity', {
            title    : 'Activity',
            icon     : 'icon-tile-four',
            state    : 'app.activity',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ACTIVITY.ACTIVITY_NAV',
            weight   : 2
        });


    }
})();
