(function() {
  'use strict';

  angular
    .module('app.activity')
    .controller('ActivityController', ActivityController)
    .controller('ActivityConfirmDialogController', ActivityConfirmDialogController);

  /** @ngInject */
  function ActivityConfirmDialogController($mdDialog, dataToPass) {
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
      $mdDialog.hide({
        confirm: true
      });
    }
  }

  /** @ngInject*/
  function ActivityController(ActivityData, RestService, $log, $location, $mdToast, $mdDialog) {
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
          vm.categories = categoriesSerialzers(response.data.categories);
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
      payload.category = vm.activity.category;

      $mdDialog.show({
        locals: {
          dataToPass: payload
        },
        controller: 'ActivityConfirmDialogController as vm',
        templateUrl: 'app/main/activity/dialog/confirm-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function(response) {
        if (response.confirm) {
          RestService.post('activities/new', payload)
            .then(function(response) {
              $mdToast.show($mdToast.simple().textContent('New Activited has been created, your activity is now deployed and available on your dashboard screen'));
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
     * @method addIncludes
     */
    vm.addIncludes = function() {
      if (vm.include) {
        vm.includes.push(vm.include);
        vm.include = '';
      }
    }

    /**
     * Function to serializing categories
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
