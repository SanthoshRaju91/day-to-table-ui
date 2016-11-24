(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(ProfileData, AuthService, $mdToast) {
    var vm = this;

    vm.profile = AuthService.details();

    vm.name = AuthService.name();
    vm.imageUrl = AuthService.profilePicture();
    vm.update = {};

    /**
     * Function to update the password for the user.
     * @method: updatePassword
     */
    vm.updatePassword = function() {
      if (vm.update.newPassword === vm.update.confirmPassword) {
        var payload = {
          old: vm.update.oldPassword,
          new: vm.update.newPassword,
          id: vm.profile.id,
          email: vm.profile.email
        };
        RestService.post('change_password', angular.toJson(payload))
          .then(function(response) {
            if (response.data) {
              $mdToast.show($mdToast.simple().textContent('Password has been updated, and is efective from next login. Please login again.'));
              vm.update.oldPassword = '';
              vm.update.newPassword = '';
            }
          }, function(err) {
            $mdToast.show($mdToast.simple().textContent('Something went wrong. Please try again'));
          });
      } else {
        $mdToast.show($mdToast.simple().textContent('New password and confirmation password do not match'));
      }
    }

    /**
     * Function to update the email address of the user
     * @method: updateEmailAdress
     */
    vm.updateEmailAdress = function() {
      if (vm.update.oldEmailAddress && vm.update.newEmailAddress) {
        var payload = {
          old: vm.update.oldEmailAddress,
          new: vm.update.newEmailAddress,
          id: vm.profile.id,
          email: vm.profile.email
        };

        RestService.post('', angular.toJson(payload))
          .then(function(response) {
            if (response.data) {
              $mdToast.show($mdToast.simple().textContent('New email address has been update, now you will receive mails to your new mailbox'));
              vm.update.oldEmailAddress = '';
              vm.update.newEmailAddress = '';
            }
          }, function(err) {
            $mdToast.show($mdToast.simple().textContent('Something went wrong. Please try again'));
          });
      }
    }
  }
})();
