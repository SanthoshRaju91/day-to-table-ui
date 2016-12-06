'use strict';

/**
 * Main landing page module here
 */

(function () {

    'use strict';

    config.$inject = ["$stateProvider"];
    angular.module('app.landing', []).config(config);

    /** @ngInject */
    function config($stateProvider) {
        console.log('here');
        //state
        $stateProvider.state('landing', {
            url: '/landing',
            templateUrl: 'landing.html',
            controller: 'LandingController as vm'
        });
    }
})();
