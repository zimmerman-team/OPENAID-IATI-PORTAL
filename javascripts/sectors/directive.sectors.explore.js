/**
* sectorPage
* @namespace oipa.sectors.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .directive('sectorExploreBlock', sectorExploreBlock);

  sectorExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace sectorPage
  */
  function sectorExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.directives.Sector
    */
    var directive = {
      controller: 'SectorsExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/sectors/sector-explore-block.html'
    };

    return directive;
  }
})();