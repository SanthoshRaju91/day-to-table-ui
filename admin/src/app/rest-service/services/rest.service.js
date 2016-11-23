(function() {

  'use strict';

  angular.module('app.rest')
    .service('RestService', RestService);

    /** @ngInject */
    function RestService() {
      var rest = this;

      rest.url = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + '/api/v1/';

      rest.getEndPoint = function() {
        return rest.url ||  'http://localhost:3000/api/';
      }

      return rest;
    }
}());
