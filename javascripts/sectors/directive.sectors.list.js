/**
* Sectors
* @namespace oipa.sectors
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .directive('sectorsList', sectorsList);

  sectorsList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Sectors
  */
  function sectorsList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.sectorsList
    */
    var directive = {
      controller: 'SectorsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/sectors/sectors-list.html'
    };

    return directive;
  }
})();