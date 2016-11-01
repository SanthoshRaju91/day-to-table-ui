(function() {
  'use strict';

  angular
    .module('app.profile', [])
    .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
        .state('app.profile', {
            url    : '/profile',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve: {
                ProfileData: function (msApi, $q, AuthService)
                {
                  if(!AuthService.authenticatedRoutes().includes('app.profile')) {                    
                    return $q.reject('Not Authorized');
                  }
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/profile');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'PROFILE',
            group : true,
            weight: 6
        });

        msNavigationServiceProvider.saveItem('fuse.profile', {
            title    : 'Profile Settings',
            icon     : 'icon-tile-four',
            state    : 'app.profile',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'PROFILE.PROFILE_NAV',
            weight   : 6
        });
    }
})();
