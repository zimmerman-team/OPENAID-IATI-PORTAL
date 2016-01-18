/**
* social
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .directive('social', social);

  social.$inject = ['templateBaseUrl'];

  function social(templateBaseUrl) {

    var directive = {
      controller: 'FiltersController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'currentPage': '@',
        'activityId': '=?'
      },
      templateUrl: templateBaseUrl + '/templates/_partials/social/social.html'
    };

    return directive;
  }
})();