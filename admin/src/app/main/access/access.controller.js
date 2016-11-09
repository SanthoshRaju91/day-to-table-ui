(function() {
    'use strict';

    angular
      .module('app.access')
      .controller('AccessController', AccessController);

      /** @ngInject */
      function AccessController(AccessData) {
        var vm = this;

        vm.superUserRequest = {
          'count': 2,
          'list': [{
            'face': '',
            'name': 'John Doe',
            'userID': 1
          }, {
            'face': '',
            'name': 'John Doe',
            'userID': 2
          }]
        };

        vm.adminRequest = {
          'count': 3,
          'list': [{
            'face': '',
            'name': 'John Doe',
            'userID': 1
          }, {
            'face': '',
            'name': 'John Doe',
            'userID': 2
          }, {
            'face': '',
            'name': 'John Doe',
            'userID': 3
          }]
        };

        vm.registered = {
          title: 'Registered Users',
          count: 30
        };

        vm.superusers = {
          title: 'Super Users',
          count: 20
        };

        vm.admins = {
          title: 'Admins',
          count: 3
        }
        vm.approveRequest = function(user) {

        };
      }
})();
