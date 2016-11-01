(function() {
  'use strict';

  angular
    .module('app.access', [])
    .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
        .state('app.access', {
            url    : '/access',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/access/access.html',
                    controller : 'AccessController as vm'
                }
            },
            resolve: {
                AccessData: function (msApi)
                {

                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/access');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ACCESS',
            group : true,
            weight: 5
        });

        msNavigationServiceProvider.saveItem('fuse.access', {
            title    : 'Access Settings',
            icon     : 'icon-tile-four',
            state    : 'app.access',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ACCESS.ACCESS_NAV',
            weight   : 5
        });
    }

})();
