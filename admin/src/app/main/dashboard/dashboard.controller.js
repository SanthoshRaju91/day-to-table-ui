(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(DashboardData, RestService) {
    var vm = this;

    vm.list = [{
      value: 1,
      label: 'Soccers School'
    }, {
      value: 2,
      label: 'Karate School'
    }];

    vm.enrolledUserList = [{
      id: 1,
      image: 'assets/images/avatars/profile.jpg',
      name: 'John Doe',
      enrolled: '27/2/2016',
      approved: true
    }, {
      id: 2,
      image: 'assets/images/avatars/profile.jpg',
      name: 'John Doe',
      enrolled: '27/2/2016',
      approved: false
    }, {
      id: 3,
      image: 'assets/images/avatars/profile.jpg',
      name: 'John Doe',
      enrolled: '27/2/2016',
      approved: false
    },{
      id: 4,
      image: 'assets/images/avatars/profile.jpg',
      name: 'John Doe',
      enrolled: '27/2/2016',
      approved: true
    }, {
      id: 5,
      image: 'assets/images/avatars/profile.jpg',
      name: 'John Doe',
      enrolled: '27/2/2016',
      approved: false
    }];

    vm.details = [{
        label: 'Name',
        value: 'Soccer School'
    }, {
      label: 'Created On',
      value: '27/2/2016'
    }, {
      label: 'Type',
      value: 'Course'
    }]
  }
}());
