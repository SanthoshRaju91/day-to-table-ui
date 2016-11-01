(function() {
  'use strict';

  angular
    .module('app.messages', [])
    .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
      // State
      $stateProvider
        .state('app.messages', {
            url    : '/messages',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/messages/messages.html',
                    controller : 'MessagesController as vm'
                }
            },
            resolve: {
                MessagesData: function (msApi)
                {

                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/messages');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'MESSAGES',
            group : true,
            weight: 4
        });

        msNavigationServiceProvider.saveItem('fuse.messages', {
            title    : 'Message Center',
            icon     : 'icon-tile-four',
            state    : 'app.messages',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'MESSAGES.MESSAGES_NAV',
            weight   : 4
        });
    }
})();
