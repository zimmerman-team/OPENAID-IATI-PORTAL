/**
* Collection
* @namespace oipa.filters.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .directive('regionPage', regionPage);

  regionPage.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function regionPage(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.directives.Collection
    */
    var directive = {
      controller: 'RegionsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/regions/region-info.html'
    };

    return directive;
  }
})();