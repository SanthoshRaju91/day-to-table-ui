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

      vm.submitActivity = function() {
        console.log(vm.activity);
      }
    }
})();
