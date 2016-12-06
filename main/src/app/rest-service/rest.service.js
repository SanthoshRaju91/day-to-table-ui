/**
 * Rest custom angular service
 */

(function() {
  'use strict';

  angular.module('app.rest')
    .service('RestService', RestService);

  /** @ngInject */
  function RestService($http, $q, $location, toastrConfig, toastr) {
    var rest = this;

    rest.url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/v1/';
    // rest.url = 'http://127.0.0.1:8080/api/v1/';

    /**
     * Function returing the end point url
     * @method: endPoint
     */
    rest.endPoint = function() {
      return rest.url || 'http://localhost:3000';
    }

    /**
     * Function to make the rest call only for GET method
     * @method: get
     */
    rest.get = function(url, data) {
      return $q(function(resolve, reject) {
        $http({
            method: 'GET',
            url: rest.url + url,
            data: (data) ? data : ''
          })
          .then(function(response) {
            if (response && response.data.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }, function(err) {
            showToastr('Something went wrong while fetching data from database. Please contactg your admin');
            reject(err);
          });
      });
    }

    /**
     * Function to make the rest call only for POST method
     * @method: post
     */
    rest.post = function(url, data) {
      return $q(function(resolve, reject) {
        $http({
            method: 'POST',
            url: rest.url + url,
            data: data
          })
          .then(function(response) {
            if (response && response.data.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }, function(err) {
            showToastr('Something went wrong while processing data in backend. Please contactg your admin');
            reject(err);
          });
      });
    }

    /**
     * Function to make a rest call for only put method
     * @method: put
     */
    rest.put = function(url, data) {
      return $q(function(resolve, reject) {
        $http({
            method: 'PUT',
            url: rest.url + url,
            data: data
          })
          .then(function(response) {
            if (response && response.data.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }, function(err) {
            showToastr('Something went wrong while processing data in backend. Please contactg your admin');
            reject(err);
          });
      });
    }

    /**
     * Function to make a rest call for only delete mainly for logout
     * @method: delete
     */
    rest.delete = function(url, data) {
      return $q(function(resolve, reject) {
        // intercepting http service request.
        // $httpProvider.interceptors.push('AuthInterceptor');

        $http({
            method: 'DELETE',
            url: rest.url + url,
            data: data
          })
          .then(function(response) {
            if (response && response.data.success) {
              resolve(response);
            } else {
              reject(response);
            }
          }, function(err) {
            showToastr('Something went wrong while processing data in backend. Please contactg your admin');
            reject(err);
          })
      });
    }

    function showToastr(message) {
      toastrConfig.positionClass = 'toast-bottom-left';
      toastrConfig.maxOpened = 10;
      toastrConfig.containerId = 'toast-container';
      toastrConfig.newestOnTop = true;
      toastrConfig.preventDuplicates = false;
      toastrConfig.preventOpenDuplicates = false;
      toastrConfig.timeOut = 10000;
      toastrConfig.target = 'body';
      toastr.error(message, 'error')
    }
    return rest;
  }
}());
