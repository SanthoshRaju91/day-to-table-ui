'use strict';

/**
* Root module, includes all of the application modules.
*/

(function () {

    'use strict';

    angular.module('app', [

    // ui.router
    'ui.router',

    // app.route
    'app.route',

    // app.authenticate
    'app.authenticate',

    // main
    'app.main',

    // app.rest
    'app.rest',

    // app.landing
    'app.landing',

    //app.contact
    'app.contact',

    //app.course
    'app.course',

    //app.activity
    'app.activity']);
})();
