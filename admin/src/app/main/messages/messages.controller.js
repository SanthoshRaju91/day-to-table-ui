(function() {
  'use strict';

  angular
    .module('app.messages')
    .controller('MessagesController', MessagesController);

    /** @ngInject */
    function MessagesController(MessagesData, AuthService, $mdDialog) {
      var vm = this;

      vm.user = JSON.parse(AuthService.details());
      vm.fullname = AuthService.name();

      vm.messages = [{
        from: 'Alice Freeman',
        subject: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '29/11/2016',
        read: false,
        selected: false
      }, {
        from: 'Alice Freeman',
        subject: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '29/11/2016',
        read: false,
        selected: false
      }, {
        from: 'Alice Freeman',
        subject: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '29/11/2016',
        read: false,
        selected: false
      }, {
        from: 'Alice Freeman',
        subject: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '29/11/2016',
        read: false,
        selected: false
      }, {
        from: 'Alice Freeman',
        subject: 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '29/11/2016',
        read: false,
        selected: false
      }];

      vm.isSelected = function(thread, index) {
        return thread.selected;
      }

      vm.openThread = function(thread, index) {
        _.forEach(vm.messages, function(message) {
          message.selected = false;
        });
        vm.currentThread = thread;
        vm.messages[index].selected = true;
        vm.messages[index].read = true;
      }

    }
})();
