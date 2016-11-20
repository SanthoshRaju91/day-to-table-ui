/**
 * Modal component js
 */

(function() {
  'use strict';

  angular.module('app.modal-component', []).component('modalComponent', {
    templateUrl: 'app/components/modal/modal.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: modalController
  });

  function modalController() {
    var $ctrl = this;

    $ctrl.$onInit = function() {
      var instance = $ctrl.parent.modalInstance;
      $ctrl.items = ['item1', 'item2', 'item3'];

      $ctrl.selected = {
        item: $ctrl.items[0]
      };

      $ctrl.ok = function() {
        instance.close($ctrl.selected);
      };

      $ctrl.cancel = function() {
        instance.dismiss('cancel');
      };

      instance.result.then(function(selectedItem) {
        $ctrl.selected = selectedItem;
      }, function() {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }
}());
