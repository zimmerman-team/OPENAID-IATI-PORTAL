/**
* sunburst
* @namespace oipa.sunburst
*/
(function () {
  'use strict';

  angular
    .module('oipa.sunburst')
    .controller('SunburstController', SunburstController);

  SunburstController.$inject = ['$scope', 'Sunburst'];

  function SunburstController($scope, Sunburst) {

    var vm = this;
    vm.chart = null;
    vm.chartId = null;
    vm.initialized = false;

    function activate() {

      vm.chartId = "sunburst-" + Sunburst.sunburstCount;
      vm.chart = new ZzSunburst(vm.chartId);
      
      $scope.$watch("refreshSunburst", function (refreshSunburst) {
        if(refreshSunburst == true){
          vm.update($scope.formattedData);
        }
        $scope.refreshSunburst = false;
      }, true);

      $scope.$on("$destroy", function() {
        delete vm.chart;
      });
    }

    vm.update = function(formattedData){
      if(formattedData !== undefined){
        vm.chart.update(formattedData);
      }
    }

    activate();
  }
})();