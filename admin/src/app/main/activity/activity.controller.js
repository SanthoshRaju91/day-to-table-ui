(function() {
  'use strict';

  angular
    .module('app.activity')
    .controller('ActivityController', ActivityController);

  /** @ngInject*/
  function ActivityController(ActivityData) {
    var vm = this;
    vm.amenities = [];
    vm.languages = [];
    vm.includes = [];
    vm.minDate = new Date();

    vm.categories = [{
      id: 1,
      label: 'Music'
    }, {
      id: 2,
      label: 'Dance'
    }, {
      id: 3,
      label: 'Teaching'
    }, {
      id: 4,
      label: 'Sport'
    }];

    /**
     * Submitting the form
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
      console.log(JSON.stringify(payload));
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
