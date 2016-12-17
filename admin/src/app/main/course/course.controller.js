(function() {
  'use strict';

  angular
    .module('app.course')
    .controller('CourseController', CourseController)
    .controller('ConfirmDialogController', ConfirmDialogController);

  /** @ngInject */
  function ConfirmDialogController($mdDialog, dataToPass) {
    var vm = this;
    vm.details = dataToPass;

    /**
     * Function to hide the modal when the user clicks on cancel
     * @method: cancel
     */
    vm.cancel = function() {
      $mdDialog.cancel(false);
    }

    /**
    * Function to handle confirm click from the user
    * @method confirm
    */
    vm.confirm = function() {
      $mdDialog.hide({confirm: true});
    }
  }

  /** @ngInject */
  function CourseController(CourseData, $mdDialog, RestService, $log, $mdToast) {
    var vm = this;
    vm.course = {};
    vm.minDate = new Date();
    vm.amenities = [];
    vm.languages = [];
    vm.schedules = [];
    vm.includes = [];

    /**
     * Rest API call for getting all the categories
     * @API: categories
     */
    RestService.get('categories')
      .then(function(response) {
        if (response.data) {
          vm.categories = categoriesSerialzers(response.data.categories);
        }
      }, function(err) {
        $log.error(err);
      });

    /**
     * Submitting the course.
     */
    vm.submitCourse = function(ev) {
      var payload = {};

      payload.courseName = vm.course.courseName;
      payload.description = vm.course.description;
      payload.category = vm.course.category;
      payload.commenceDate = vm.course.commenceDate;
      payload.address = vm.course.address;
      payload.price = vm.course.price;
      payload.amenities = vm.amenities;

      payload.parking = [];
      (vm.course.twoWheeler) ? payload.parking.push('Two Wheeler'): payload.parking.push();
      (vm.course.fourWheeler) ? payload.parking.push('Four Wheeler'): payload.parking.push();

      payload.languages = vm.languages;
      payload.image = vm.course.image;
      payload.schedules = vm.schedules;
      payload.includes = vm.includes;


      $mdDialog.show({
        locals: {
          dataToPass: payload
        },
        controller: 'ConfirmDialogController as vm',
        templateUrl: 'app/main/course/dialog/confirm-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function(response) {
        if (response.confirm) {
          RestService.post('courses/new', payload)
            .then(function(response) {
              $mdToast.show($mdToast.simple().textContent('New Course has been created, your activity is now deployed and available on your dashboard screen'));
              $location.path('/dashboard');
            }, function(err) {
              $log.error(err);
              $mdToast.show($mdToast.simple().textContent('Something went wrong, please try again'));
            });
        }
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

    /**
     * Function for serializing categories
     * @method categoriesSerialzers
     */
    function categoriesSerialzers(catgeories) {
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
})();
