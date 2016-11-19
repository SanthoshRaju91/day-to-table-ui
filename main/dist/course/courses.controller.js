'use strict';

/**
 * Courses controller function, rendering the list of courses for the user and navigating the user on select of course
 */

(function () {
    'use strict';

    CoursesController.$inject = ["RestService", "$log"];
    angular.module('app.course', []).controller('CoursesController', CoursesController);

    /** @ngInject */
    function CoursesController(RestService, $log) {
        var vm = this;

        //Data
        vm.page = 1;
        vm.showMoreAvaiable = false;
        var iconsArray = {
            MUSIC: 'icon-music-3',
            DANCE: 'icon-pitch',
            SOCCER: 'icon-soccer',
            SPORTS: 'icon-skiing',
            EDUCATION: 'icon-library',
            CRICKET: 'icon-cricket'
        };
        vm.priceList = [{
            id: 'lowest,price',
            name: 'Lowest price'
        }, {
            id: 'highest,price',
            name: 'Highest price'
        }];
        vm.ratingsList = [{
            id: 'lowest,ratings',
            name: 'Lowest ranking'
        }, {
            id: 'highest,ratings',
            name: 'Highest ranking'
        }];

        /**
         * Rest service call to get the list of category for courses
         */
        RestService.get('getCategoryList').then(function (response) {
            var categories = [];
            for (var i = 0; i < response.data.categoryList.length; i++) {
                var obj = {};
                obj.categoryID = response.data.categoryList[i].categoryID;
                obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
                obj.categoryName = response.data.categoryList[i].categoryName;
                categories.push(obj);
            }
            vm.categories = categories;
        }, function (err) {
            $log.error(err);
        });

        /**
         * Function to handle show more to load more activities.
         * @method: showMore
         */
        vm.showMore = function () {
            getCourses(vm.pageNo + 1);
        };

        /**
         * Function to handle sort to load sorted courses
         * @method: applySort
         */

        vm.applySort = function (type, order) {
            vm.pageNo = 1;
            var sort = {};
            sort.type = type;
            sort.order = order;
            getCourses(vm.pageNo, sort);
        };

        /**
         * Function to handle filter to load filtered courses
         * @method: applyFilter
         */
        vm.applyFilter = function (type, value) {
            vm.pageNo = 1;
            var filter = {};
            filter.type = type;
            if (value) {
                filter.value = value;
            }
            getCourses(vm.pageNo, filter);
        };

        /**
         * Function to reset to original list.
         * @method: reset
         */
        vm.reset = function () {
            vm.pageNo = 1;
            getCourses(vm.pageNo);
        };

        /**
         * Function to get the list courses for user and this is will called based on sort, filter and even on the intial page load.
         * @method: getCourses
         */
        function getCourses(page, sort, filter) {
            var payload = {};
            payload.pageNo = page;

            //checking if sort is applied
            if (sort) {
                payload.sort = sort;
            }

            //checking if filter is applied
            if (filter) {
                payload.filter = filter;
            }

            RestService.get('getAllCoursesForUser', payload).then(function (response) {
                if (response.data.isMore) {
                    vm.showMoreAvaiable = true;
                }
                vm.count = response.data.count;
                vm.courses = response.data.courseList;
            }, function (err) {
                $log.error(err);
            });
        }
    }
})();