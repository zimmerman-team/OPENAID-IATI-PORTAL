/**
* RegionsController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionsController', RegionsController);

  RegionsController.$inject = ['Regions', 'templateBaseUrl'];

  /**
  * @namespace RegionsController
  */
  function RegionsController(Regions, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientRegions = [];
    vm.selectedRegions = Regions.selectedRegions;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.regions.RegionsController
    */
    function activate() {
      // for each active filter, get the results
      Regions.all().then(regionsSuccessFn, regionsErrorFn);

      function regionsSuccessFn(data, status, headers, config) {
        vm.recipientRegions = data.data;
      }

      function regionsErrorFn(data, status, headers, config) {
        console.log("getting regions failed");
      }
    }


  }
})();