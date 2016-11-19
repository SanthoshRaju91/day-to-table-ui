(function() {

  'use strict';

  angular.module('app.rest')
    .service('RestService', RestService);

    /** @ngInject */
    function RestService() {
      var rest = this;

      rest.getEndPoint = function() {
        return 'http://localhost:3000/api/';
      }

      return rest;
    }
}());
