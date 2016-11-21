(function() {
  'use strict';

  angular
    .module('app.course')
    .controller('CourseController', CourseController);

    /** @ngInject */
    function CourseController(CourseData) {
      var vm = this;
      vm.minDate = new Date();
      vm.amenities = [];
      vm.languages = [];
      vm.schedules = [];
      vm.includes = [];

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
      * Submitting the course.
      */
      vm.submitCourse = function() {
        var payload = {};

        payload.courseName = vm.course.courseName;
        payload.description = vm.course.description;
        payload.category = vm.course.category;
        payload.commenceDate = vm.course.commenceDate;
        payload.address = vm.course.address;
        payload.price = vm.course.price;
        payload.amenities = vm.amenities;

        payload.parking = [];
        (vm.course.twoWheeler) ? payload.parking.push('Two Wheeler') : payload.parking.push();
        (vm.course.fourWheeler) ? payload.parking.push('Four Wheeler') : payload.parking.push();

        payload.languages = vm.languages;
        payload.image = vm.course.image;
        payload.schedules = vm.schedules;
        payload.includes = vm.includes;
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
