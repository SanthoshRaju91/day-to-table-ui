/**
 * Modal component js
 */

(function() {
  'use strict';

  angular.module('app.modal-component', ['ui.bootstrap']).component('modalComponent', {
    templateUrl: 'app/components/modal/modal.html',
    controller: modalController
  });

  /** @ngInject */
  function modalController($uibModalInstance) {
    this.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
