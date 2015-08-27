/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsController', SectorsController);

  SectorsController.$inject = ['$scope', 'Sectors', 'templateBaseUrl', 'Filters', 'FilterSelection'];

  /**
  * @namespace SectorsController
  */
  function SectorsController($scope, Sectors, templateBaseUrl, Filters, FilterSelection) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.sectors = [];
    vm.selectedSectors = Sectors.selectedSectors;
    activate();

    function activate() {
      Sectors.all().then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.sectors = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

  }
})();