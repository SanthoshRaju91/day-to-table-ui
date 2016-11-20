/**
 * Popular grid component.
 */

(function() {
    'use strict';

    angular.module('app.landing.grid', [])
        .component('popularGrid', {
            bindings: {
                data: '<'
            },
            replace: true,
            templateUrl: 'app/landing/components/popular-grid.html',
            controller: function($location) {
                //Icon mapper for category.
                var iconMapper = {
                    MUSIC: 'icon-music-4',
                    DANCE: 'icon_set_1_icon-30',
                    EAT: 'icon_set_1_icon-14'
                };
                this.categoryIconClass = iconMapper[this.data.category.toUpperCase()];

                //computing ratings
                this.ratings = [];
                var self = this;
                var i;
                for (i = 0; i < this.data.ratings; i++) {
                    self.ratings.push('icon-smile voted');
                }
                for (i = 0; i < (5 - this.data.ratings); i++) {
                    self.ratings.push('icon-smile');
                }

                /**
                 * Function for redirecting to course details page
                 * @method: goTo
                 */
                this.goTo = function(courseId) {
                    $location.path('course/' + courseId);
                }
            }
        })
}());
