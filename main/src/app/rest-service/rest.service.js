/**
 * Rest custom angular service
 */

(function() {
    'use strict';

    angular.module('app.rest')
    .service('RestService', RestService);

    /** @ngInject */
    function RestService($http, $q, $location) {
        var rest = this;

        rest.url = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + '/';
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
                        if (response && response.success) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }, function(err) {
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
                        if (response && response.success) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }, function(err) {
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
                        if (response && response.success) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }, function(err) {
                        reject(err);
                    });
            });
        }

        return rest;
    }
}());
