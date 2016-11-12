(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(ProfileData, AuthService) {
      var vm = this;

      vm.profile = [{
        label: 'Gender',
        value: 'Male'
      }, {
        label: 'Birthday',
        value: '11th April 1991'
      }, {
        label: 'Address',
        value: 'Some addres, where you can find me'
      }, {
        label: 'Phone',
        value: '9999999999'
      }, {
        label: 'Email Address',
        value: 'santhoshraju.ai@gmail.com'
      }];

      vm.name = AuthService.name();
      vm.imageUrl = AuthService.profilePicture();
      vm.update = {};

      vm.updatePassword = function() {

      }

      vm.updateEmailAdress = function() {

      }
    }
})();
