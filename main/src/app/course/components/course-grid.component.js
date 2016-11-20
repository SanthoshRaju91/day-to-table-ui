/**
 * Course grid component
 */

(function() {
    'use strict';

    angular.module('app.course.grid', ['dcbImgFallback'])
        .component('courseGrid', {
            bindings: {
                data: '<'
            },
            templateUrl: 'app/course/components/course-grid.html',
            /** @ngInject */
            controller: function($location) {
                this.imageURL = this.data.imageUrl || '../../img/slides/slide-4.jpg';

                var iconsArray = {
                    MUSIC: 'icon-music-3',
                    DANCE: 'icon-pitch',
                    SOCCER: 'icon-soccer',
                    SPORTS: 'icon-skiing',
                    EDUCATION: 'icon-library',
                    CRICKET: 'icon-cricket'
                };

                this.overlayIcon = iconsArray[this.data.categoryID.categoryName.toUpperCase()];
                this.overlayName = this.data.categoryID.categoryName;
                this.scheduleList = this.data.schedule.split('|');

                this.ratings = [];
                var self = this;
                var i;
                for (i = 0; i < this.data.ratings; i++) {
                    self.ratings.push('icon-smile voted');
                }

                for (i = 0; i < (5 - this.data.ratings); i++) {
                    self.ratings.push('icon-smile');
                }

                this.goToCourse = function(courseId) {
                    $location.path('course/' + courseId);
                }
            }
        })
}());
