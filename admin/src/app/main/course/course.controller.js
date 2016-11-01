(function() {
  'use strict';

  angular
    .module('app.course')
    .controller('CourseController', CourseController);

    /** @ngInject */
    function CourseController(CourseData) {
      var vm = this;
    }

})();
