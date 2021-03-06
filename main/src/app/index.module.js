(function() {
  'use strict';

  angular
    .module('main', [
      // ngAnimate
      'ngAnimate',

      // ngCookies
      'ngCookies',

      // ngTouch
      'ngTouch',

      // ngSanitize
      'ngSanitize',

      // ngMessages
      'ngMessages',

      // ngAria
      'ngAria',

      // ui.bootstrap
      'ui.bootstrap',

      // ui.router
      'ui.router',

      // toastr
      'toastr',

      // app.main
      'app.main',

      // app.authenticate
      'app.authenticate',

      // app.rest
      'app.rest',

      // app.landing
      'app.landing',

      // app.activity
      'app.activity',

      // app.course
      'app.course',

      // app.contact
      'app.contact',

      // app.login
      'app.login',

      // app.register
      'app.register',

      // app.modal-component
      'app.modal-component'
    ])
    .config(config);

  /** @ngInject */
  function config($httpProvider, toastrConfig) {
    // configuration for http auth interceptors
    $httpProvider.interceptors.push('AuthInterceptor');

    //configuration for angular toastr
    toastrConfig.maxOpened = 10;
    toastrConfig.newestOnTop = true;
    toastrConfig.preventDuplicates = false;
    toastrConfig.preventOpenDuplicates = false;
    toastrConfig.target = 'body';
    toastrConfig.containerId = 'toast-container';
  }
})();
