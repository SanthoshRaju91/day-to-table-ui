(function() {
  'use strict';

  angular
    .module('app.activity')
    .controller('ActivityController', ActivityController);

  /** @ngInject*/
  function ActivityController(ActivityData, RestService, $log, $location, $mdToast) {
    var vm = this;
    vm.amenities = [];
    vm.languages = [];
    vm.includes = [];
    vm.minDate = new Date();

    /**
     * Rest API call for getting all the categories
     * @API: categories
     */
    RestService.get('categories')
      .then(function(response) {
        if (response.data) {
          vm.categories = response.data.categories;
        }
      }, function(err) {
        $log.error(err);
      });

    /**
     * Function to create a new activity.
     * @method: submitActivity
     */
    vm.submitActivity = function() {
      var payload = {};
      payload.activityName = vm.activity.activityName;
      payload.description = vm.activity.description;
      payload.eventDate = vm.activity.date;
      payload.address = vm.activity.address;
      payload.price = vm.activity.price;
      payload.amenities = vm.amenities;

      payload.parking = [];
      (vm.activity.twoWheeler) ? payload.parking.push('Two Wheeler'): payload.parking.push();
      (vm.activity.fourWheeler) ? payload.parking.push('Four Wheeler'): payload.parking.push();

      payload.languages = vm.languages;
      payload.imageURL = vm.activity.image;
      payload.includes = vm.includes;
      payload.categories = vm.activity.category;

      RestService.post('activities/new', payload)
        .then(function(response) {
          $mdToast.show($mdToast.simple().textContent('New Activited has been created, your activity is now deployed and available on your dashboard screen'));
          $location.path('/dashboard');
        }, function(err) {
          $log.error(err);
          $mdToast.show($mdToast.simple().textContent('Something went wrong, please try again'));
        });
    }


    /**
     * Adding includes to the includes array
     */
    vm.addIncludes = function() {
      if (vm.include) {
        vm.includes.push(vm.include);
        vm.include = '';
      }
    }
  }
})();
