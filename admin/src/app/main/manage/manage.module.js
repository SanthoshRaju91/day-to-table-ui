(function ()
{
    'use strict';

    angular
        .module('app.manage', ['materialCalendar'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.manage', {
                url    : '/manage',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/manage/manage.html',
                        controller : 'ManageController as vm'
                    }
                },
                resolve: {
                    ManageData: function (msApi, $q, AuthService)
                    {
                      if(!AuthService.authenticatedRoutes().includes('app.manage')) {                    
                        return $q.reject('Not Authorized');
                      }
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/manage');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'MANAGE',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.manage', {
            title    : 'Manage',
            icon     : 'icon-tile-four',
            state    : 'app.manage',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'MANAGE.MANAGE_NAV',
            weight   : 1
        });
    }
})();
