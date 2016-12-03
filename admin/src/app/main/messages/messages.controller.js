(function() {
  'use strict';

  angular
    .module('app.messages')
    .controller('MessagesController', MessagesController)
    .controller('ComposeController', ComposeController);

  /** @ngInject */
  function ComposeController($mdDialog, dataToPass, RestService, $scope, $log) {
    var vm = this;

    // setting the from email address
    vm.message = {};
    vm.title = dataToPass.title;
    vm.message.from = dataToPass.from;

    // checking if compose if reply
    if (dataToPass.to && dataToPass.subject) {
      vm.message.to = dataToPass.to;
      vm.disableTo = true;
      vm.message.subject = dataToPass.subject;
      vm.disableSubject = true;
    };

    /**
     * Watch for to mail address value length and call the messages/emails to get the
     * list of email address matching the typed characters
     */
    $scope.$watch(function() {
      return vm.message.to;
    }, function(newValue, oldValue) {
      console.log(newValue);
      if (newValue && newValue.length > 3) {
        RestService.get('messages/emails?prefix=' + newValue)
          .then(function(response) {
            if (response && response.data.success) {
              vm.toUsers = response.data.emails;
            }
          }, function(err) {
            $log.error('Error is fetching the users ' + err);
          })
      }
    });

    /**
     * Function to hide the modal when the user clicks on cancel
     * @method: cancel
     */
    vm.cancel = function() {
      $mdDialog.cancel();
    }

    /**
     * Function to send the message body to parent controller
     * @method: send
     */
    vm.send = function() {      
      if (vm.message.from && vm.message.to && vm.message.subject && vm.message.body) {
        $mdDialog.hide(vm.message);
      }
    }
  }

  /** @ngInject */
  function MessagesController(AuthService, $mdDialog, RestService, $log, $mdToast) {
    var vm = this;

    vm.user = JSON.parse(AuthService.details());
    vm.fullname = AuthService.name();

    loadMessages('inbox');

    /**
     * Function to load the message box
     * @method: loadFolder
     */
    vm.loadFolder = function(type) {
      loadMessages(type);
    };

    /**
     * Function to load the messages based on the type of folder selected
     * @method: loadMessages
     */
    function loadMessages(type) {
      RestService.get('messages/' + type + '/' + vm.user._id)
        .then(function(response) {
          if (response && response.data.success) {
            vm.messages = response.data.messages;
          }
        }, function(err) {
          $log.error('Error in getting user messages: ' + err);
          showToast('Something went wrong in getting your messages. Please contact the admin');
        });
    }


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

    /**
     * Function for checking if the current thread is selected or not.
     * @method: isSelected
     */
    vm.isSelected = function(thread) {
      return thread.selected;
    }

    /**
     * Function to open a dialog box for composing a message.
     * @method: composeDialog
     */
    vm.composeDialog = function(event, email) {
      $mdDialog.show({
          locals: {
            dataToPass: {
              title: 'New Message',
              from: email
            }
          },
          controller: 'ComposeController as vm',
          templateUrl: 'app/main/messages/dialog/compose.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function(message) {
          // Make a rest-service call to send the message
          if (message) {
            RestService.post('messages/send', message)
              .then(function(response) {
                if (response && response.data.success) {
                  showToast('Message sent');
                }
              }, function(err) {
                $log.error('Error in sending the message ' + err);
                showToast('Something went wrong in sending your message. Please contact the admin');
              });
          }
        });
    }

    /**
     * Function to open the selected message. Make a service call to get the messages
     * Also, making a service call to update the message as read.
     * @method: openThread
     */
    vm.openThread = function(thread, index) {
      // deselecting other items
      _.forEach(vm.messages, function(message) {
        message.selected = false;
      });
      // setting the current thread to selected message thread
      vm.currentThread = thread;

      /*
       * For updating the message as read
       */
      RestService.put('update-message/' + thread._id)
        .then(function(response) {
          if (response && response.data.success) {
            vm.messages[index].selected = true;
            vm.messages[index].read = true;
          }
        }, function(err) {
          $log.error('Error in updating the message as read ' + err);
          showToast('Something went wrong in updating the message as read');
        });

      /*
       * To get the message details for the selected message
       */
      RestService.get('message-details/' + thread._id)
        .then(function(response) {
          if (response && response.data.success) {
            vm.messageDetails = response.data.success;
          }
        }, function(err) {
          $log.error('Error in getting the message details ' + err);
          showToast('Something went wrong. Please contact the admin');
        });
    }

    /**
     * Function to open the reply dialog box and send the reply
     * @method: reply
     */
    vm.reply = function(message) {
      $mdDialog.show({
          locals: {
            dataToPass: {
              title: 'Reply to ' + message.from,
              from: message.to,
              to: message.from,
              subject: message.subject
            },
            controller: 'ComposeController as vm',
            templateUrl: 'app/main/messages/dialog/compose.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: false
          }
        })
        .then(function(message) {
          //sending reply to the message
          if (message) {
            RestService.post('messages/send', message)
              .then(function(response) {
                if (response && response.data.success) {
                  showToast('Reply message sent');
                }
              }, function(err) {
                $log.error('Error in sending the reply' + err);
                showToast('Something went wrong in sending the reply. Please contact the admin');
              });
          }
        });
    };

    /**
     * Function to show the toast message
     * @method: showToast
     */
    function showToast(message) {
      $mdToast.show($mdToast.simple().textContent(message));
    }
  }
})();
