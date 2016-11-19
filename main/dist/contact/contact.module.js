'use strict';

/**
 * Contact us module for the app
 */

(function () {
    'use strict';

    config.$inject = ["$stateProvider"];
    angular.module('app.contact', []).config(config);

    /** @ngInject */
    function config($stateProvider) {

        //state
        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'ContactController as vm'
        }).state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });
    }
})();