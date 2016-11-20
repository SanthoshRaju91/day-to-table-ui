/**
 * Activity grid component
 */

(function() {
    'use strict';

    angular.module('app.activity-grid', ['dcbImgFallback'])
        .component('activityGrid', {
            bindings: {
                data: '<'
            },
            templateUrl: 'app/activity/components/activity-grid.html',
            controller: function($location) {
                this.activity = this.data._doc;
                this.imageURL = this.activity.imageUrl || '../../img/slides/slide-4.jpg';

                var iconsArray = {
                    MUSIC: 'icon-music-3',
                    DANCE: 'icon-pitch',
                    SOCCER: 'icon-soccer',
                    SPORTS: 'icon-skiing',
                    EDUCATION: 'icon-library',
                    CRICKET: 'icon-cricket'
                };
                this.overlayIcon = iconsArray[this.activity.categoryID.categoryName.toUpperCase()];
                this.overlayName = this.activity.categoryID.categoryName;

                //checking for activity currently open / closed.
                this.isActive = (this.data.activityStatus.toUpperCase() == 'CLOSED') ? true : false;

                this.goToActivity = function(activityId) {
                    $location.path('activity/' + activityId);
                }
            }
        })
}());
