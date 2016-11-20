/**
 * Contact us module for the app
 */

(function() {
  'use strict';

  angular.module('app.contact', ['app.contact.controller'])
    .config(config);

  /** @ngInject */
  function config($stateProvider) {

    //state
    $stateProvider
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController as vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/contact/about.html'
      });
  }
}());
