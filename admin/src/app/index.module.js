(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            //authenticate
            'app.authenticate',

            // rest service
            'app.rest',

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Manage
            'app.manage',

            // Access
            'app.access',

            //activity
            'app.activity',

            // course
            'app.course',

            // Messages
            'app.messages',

            // Profile
            'app.profile',

            //Dashboard
            'app.dashboard'
        ])
        .config(config);

        /** @ngInject */
        function config($httpProvider) {
          $httpProvider.interceptors.push('AuthInterceptor');
        }
})();
