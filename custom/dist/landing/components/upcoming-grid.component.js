'use strict';

/**
 * Upcoming grid component
 */

(function () {
    'use strict';

    angular.module('app.landing', []).component('upcomingGrid', {
        bindings: {
            data: '<'
        },
        templateUrl: 'upcoming-grid.html',
        controller: ["$location", function controller($location) {
            //Icon mapper for category.
            var iconMapper = {
                MUSIC: 'icon-music-4',
                DANCE: 'icon_set_1_icon-30',
                EAT: 'icon_set_1_icon-14'
            };
            this.categoryIconClass = iconMapper[this.data.category.toUpperCase()];

            //formatting date for grid
            var date = new Date(this.data.schedule);
            this.scheduleDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + (date.getHours() + 1) + ':' + date.getMinutes();

            /**
             * Function for redirecting to activity details page.
             * @method: goTo
             */
            this.goTo = function (activityId) {
                $location.path('activity/' + activityId);
            };
        }]
    });
})();