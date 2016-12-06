(function() {
  'use strict';

  angular
    .module('app.toolbar', [])
    .config(config);

  /** @ngInject */
  function config($translatePartialLoaderProvider, $httpProvider) {
    $translatePartialLoaderProvider.addPart('app/toolbar');
    $httpProvider.interceptors.push('AuthInterceptor');
  }
})();
