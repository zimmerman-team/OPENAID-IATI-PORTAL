/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsExploreController', SectorsExploreController);

  SectorsExploreController.$inject = ['$scope', 'Sectors', 'FilterSelection'];

  /**
  * @namespace SectorsController
  */
  function SectorsExploreController($scope, Sectors, FilterSelection) {
    var vm = this;

    vm.sectors = [];
    vm.selectionString = FilterSelection.selectionString;

    activate();
    
    function activate() {
      // for each active sector, get the results
      
      Sectors.all(vm.selectionString).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.sectors = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }

      $scope.$watch("vm.selectionString", function (newValue) {
          console.warn('selection updates, we should update the visualisation (controller.sectors.explore.js)');
      }, true);
    }

    vm.initVisualisation = function(){

    }

    vm.updateVisualisation = function(){

    }


  }
})();