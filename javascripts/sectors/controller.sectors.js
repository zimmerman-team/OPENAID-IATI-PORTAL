/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsController', SectorsController);

  SectorsController.$inject = ['Sectors', 'templateBaseUrl', 'Filters', 'FilterSelection'];

  /**
  * @namespace SectorsController
  */
  function SectorsController(Sectors, templateBaseUrl, Filters, FilterSelection) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.sectors = [];
    vm.selectedSectors = Sectors.selectedSectors;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.sectors.controllers.SectorsController
    */
    function activate() {
      // for each active sector, get the results
      Sectors.all().then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update sectors array on view
      */
      function successFn(data, status, headers, config) {
        vm.sectors = data.data;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }

    vm.save = function(){
      // logic to save the filters
      FilterSelection.toSave = true;
    }

  }
})();