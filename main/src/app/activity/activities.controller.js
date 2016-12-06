/**
 * Activities controller  for displaying the list of activities.
 */

(function() {
  'use strict';

  angular.module('app.activities.controller', [])
    .controller('ActivitiesController', ActivitiesController);

  /** @ngInject */
  function ActivitiesController($log, RestService) {

    var vm = this;

    // Data
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
      id: 'asc',
      name: 'Lowest price'
    }, {
      id: 'desc',
      name: 'Highest price'
    }];
    vm.ratingsList = [{
      id: 'lowest,ratings',
      name: 'Lowest ranking'
    }, {
      id: 'highest,ratings',
      name: 'Highest ranking'
    }];

    // method
    /**
     * Rest service to get all the categories.
     */
    RestService.get('categories')
      .then(function(response) {
        if (response.data.success) {
          let categories = categoriesSerializer(response.data.categories);
          vm.categories = categories;
          getActivities(vm.pageNo);
        }
      }, function(err) {
        $log.error(err);
      });

    /**
     * Function to handle show more to load more activities.
     * @method: showMore
     */
    vm.showMore = function() {
      getActivities(vm.pageNo + 1);
    }

    /**
     * Function to handle sort to load sorted activites
     * @method: applySort
     */

    vm.applySort = function(type, order) {
      vm.pageNo = 1;
      var sort = {};
      sort.type = type;
      sort.order = order;
      getActivities(vm.pageNo, sort);
    };

    /**
     * Function to handle filter to load filtered activities.
     * @method: applyFilter
     */
    vm.applyFilter = function(type, value) {
      vm.pageNo = 1;
      var filter = {};
      filter.type = type;
      if (value) {
        filter.value = value;
      }
      getActivities(vm.pageNo, filter);
    }

    /**
     * Function to reset to original list.
     * @method: reset
     */
    vm.reset = function() {
      vm.pageNo = 1;
      getActivities(vm.pageNo);
    }

    /**
     * Function to make a rest service call for getting the list activities
     * @method: getActivities
     */

    function getActivities(page, sort, filter) {
      var payload = {};
      payload.pageNo = page;

      // checking if sort is applied
      if (sort) {
        payload.sort = sort;
      }
      //checking if filter is checked
      if (filter) {
        payload.filter = filter;
      }

      RestService.get('activities', payload)
        .then(function(response) {
          if (response.data) {
            if (response.data.isMore) {
              vm.showMoreAvaiable = true;
            }
            vm.count = response.data.activities.length || 0;
            vm.activities = response.data.activities;
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
