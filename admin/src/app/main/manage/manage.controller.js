(function() {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  /** @ngInject */
  function ManageController(ManageData) {
    var vm = this;

    // Data
    vm.enrolled = {
      activitesCount: 3,
      coursesCount: 4,
      enrolledList: [{
        name: 'Schooling',
        enrolled: '25-04-2016',
        id: 1
      }, {
        name: 'Schooling',
        enrolled: '25-05-2016',
        id: 2
      }, {
        name: 'Schooling',
        enrolled: '14-05-2016',
        id: 3
      }, {
        name: 'Schooling',
        enrolled: '10-10-2016',
        id: 4
      }]
    };


    // Methods

    vm.add = function(id) {
      alert(id);
    }
  }
})();
