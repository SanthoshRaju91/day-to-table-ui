(function() {
    'use strict';

    angular
      .module('app.access')
      .controller('AccessController', AccessController);

      /** @ngInject */
      function AccessController(AccessData) {
        var vm = this;
      }
})();
