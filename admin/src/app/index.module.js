(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

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
            'app.profile'
        ]);
})();
