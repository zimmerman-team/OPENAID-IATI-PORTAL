/**
* Sectors
* @namespace oipa.sectors
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .directive('sectorList', sectorList);

  sectorList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Sectors
  */
  function sectorList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.sectorsList
    */
    var directive = {
      controller: 'SectorListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
        count: '=?',
        searchValue: '=?',
        shown: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/sectors/sectors-list.html'
    };

    return directive;
  }
})();