/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors.controllers')
    .controller('SectorsController', SectorsController);

  SectorsController.$inject = ['$scope', 'Sectors', 'templateBaseUrl'];

  /**
  * @namespace SectorsController
  */
  function SectorsController($scope, Sectors, templateBaseUrl) {
    var vm = this;

    $scope.templateBaseUrl = templateBaseUrl;
    
    vm.sectors = [];

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
        vm.sectors = data.data.results;
      }


      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }
  }
})();