/**
 * Courses controller function, rendering the list of courses for the user and navigating the user on select of course
 */

(function() {
  'use strict';

  angular.module('app.courses.controller', [])
    .controller('CoursesController', CoursesController);

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
      CRICKET: 'icon-cricket',
      SAMPLE: 'icon-music-3'
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
    RestService.get('categories')
      .then(function(response) {
        if (response && response.data.success) {
          var categories = categoriesSerializer(response.data.categories);
          vm.categories = categories;
          getCourses(vm.pageNo);
        }
      }, function(err) {
        $log.error(err);
      });


    /**
     * Function to handle show more to load more activities.
     * @method: showMore
     */
    vm.showMore = function() {
      getCourses(vm.pageNo + 1);
    }

    /**
     * Function to handle sort to load sorted courses
     * @method: applySort
     */

    vm.applySort = function(type, order) {
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
    vm.applyFilter = function(type, value) {
      vm.pageNo = 1;
      var filter = {};
      filter.type = type;
      if (value) {
        filter.value = value;
      }
      getCourses(vm.pageNo, filter);
    }

    /**
     * Function to reset to original list.
     * @method: reset
     */
    vm.reset = function() {
      vm.pageNo = 1;
      getCourses(vm.pageNo);
    }

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

      RestService.get('courses', payload)
        .then(function(response) {
          if (response.data) {
            if (response.data.isMore) {
              vm.showMoreAvaiable = true;
            }
            vm.count = response.data.count;
            vm.courses = response.data.courseList;
          }
        }, function(err) {
          $log.error(err);
        });
    }

    /**
     * Function for serializing the categories response for rendering ion UI
     * @method: categoriesSerializer
     */
    function categoriesSerializer(categories) {
      var keys = [];
      _.forEach(categories, function(current) {
        var obj = {};
        var id = Object.keys(current)[0];
        if (current[id]) {
          obj['id'] = id;
          obj['name'] = current[id];
          obj['icon'] = iconsArray[current[id].toUpperCase()];
          keys.push(obj);
        }
      });
      return keys;
    }
  }
}());
