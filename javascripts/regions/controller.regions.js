/**
* RegionsController
* @namespace oipa.regions.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions.controllers')
    .controller('RegionsController', RegionsController);

  RegionsController.$inject = ['$scope', 'Regions'];

  /**
  * @namespace RegionsController
  */
  function RegionsController($scope, Regions) {
    var vm = this;

    vm.recipientRegions = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.regions.controllers.RegionsController
    */
    function activate() {
      // for each active filter, get the results
      Regions.all().then(regionsSuccessFn, regionsErrorFn);

      /**
      * @name regionsSuccessFn
      * @desc Update collections array on view
      */
      function regionsSuccessFn(data, status, headers, config) {
        vm.recipientRegions = data.data.results;
      }


      function regionsErrorFn(data, status, headers, config) {
        console.log("getting regions failed");
      }
    }


  }
})();