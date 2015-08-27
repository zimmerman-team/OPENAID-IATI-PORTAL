/**
* sunburst
* @namespace oipa.sunburst
*/
(function () {
  'use strict';

  angular
    .module('oipa.geovis')
    .controller('GeovisController', GeovisController);

  GeovisController.$inject = ['$scope'];

  function GeovisController($scope) {

    var vm = this;
    vm.chart = null;
    vm.chartId = null;

    function activate() {

      vm.chartId = "geovis-0";
      vm.chart = new ZzLocationVis(vm.chartId);
      
      $scope.$watch("refreshVisualisation", function (refreshVisualisation) {
        if(refreshVisualisation == true){
          vm.update($scope.formattedData);
        }
        $scope.refreshVisualisation = false;
      }, true);

      $scope.$on("$destroy", function() {
        delete vm.chart;
      });
    }

    vm.update = function(formattedData){
      if(formattedData !== undefined){
        vm.chart.updateData(formattedData);
      }
    }



    activate();
  }
})();