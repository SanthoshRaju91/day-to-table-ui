(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(ProfileData) {
      var vm = this;
    }
})();
