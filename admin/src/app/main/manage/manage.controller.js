(function() {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  /** @ngInject */
  function ManageController(ManageData, RestService, $log) {
    var vm = this;

    // Data
    RestService.get('courses/enrolled_courses')
      .then(function(response) {
        if(response.data) {
          vm.enrolled = response.data.enrolled;
        }
      }, function(err) {
        $log.error(err);
      });

    // Methods

    vm.add = function(id) {
      alert(id);
    }
  }
})();
