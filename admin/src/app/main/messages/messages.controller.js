(function() {
  'use strict';

  angular
    .module('app.messages')
    .controller('MessagesController', MessagesController);

    /** @ngInject */
    function MessagesController(MessagesData) {
      var vm = this;
    }
})();
