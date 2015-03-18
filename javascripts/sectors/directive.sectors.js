/**
* sectorPage
* @namespace oipa.sectors.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors.directives')
    .directive('sectorPage', sectorPage);

  sectorPage.$inject = ['templateBaseUrl'];

  /**
  * @namespace sectorPage
  */
  function sectorPage(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.directives.Sector
    */
    var directive = {
      controller: 'SectorsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/sectors/sector-info.html'
    };

    return directive;
  }
})();