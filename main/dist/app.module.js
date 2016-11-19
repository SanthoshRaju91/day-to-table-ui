'use strict';

/**
* Root module, includes all of the application modules.
*/

(function () {

    'use strict';

    angular.module('app', [

    // ui.router
    'ui.router',

    // app.authenticate
    'app.authenticate', 'app.main',

    // app.rest
    'app.rest',

    // app.route
    'app.route',

    // app.landing
    'app.landing',

    //app.contact
    'app.contact',

    //app.course
    'app.course',

    //app.activity
    'app.activity']);
})();