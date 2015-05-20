/**
* OipaLineChartController
* @namespace oipa.charts.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('OipaTotalFiguresChartController', OipaTotalFiguresChartController);

  OipaTotalFiguresChartController.$inject = ['$scope', 'Aggregations'];

  /**
  * @namespace ActivitiesController
  */
  function OipaTotalFiguresChartController($scope, Aggregations) {

    var vm = this;
    vm.totalActivities = 'Loading.. ';
    vm.totalBudget = 'Loading.. ';
    vm.aggregationFilters = $scope.aggregationFilters;

    function activate() {
      

      $scope.$watch('aggregationFilters', function (aggregationFilters) {
        vm.aggregationFilters = aggregationFilters;
        vm.loadData();
      }, true);
    }

    vm.loadData = function(){
      Aggregations.aggregation('activity-status', 'disbursement', vm.aggregationFilters).then(successFnDisbursement, errorFn);
      Aggregations.aggregation('activity-status', 'iati-identifier', vm.aggregationFilters).then(successFnActivityCount, errorFn);

      function successFnDisbursement(data, status, headers, config){

        var key = 'total_disbursements';
        var total = 0;

        for(var i = 0;i < data.data.length;i++){
            total += parseInt(data.data[i][key]);
        }

        vm.totalBudget = total;
      }

      function successFnActivityCount(data, status, headers, config){

        var key = 'activity_count';
        var total = 0;

        for(var i = 0;i < data.data.length;i++){
            total += parseInt(data.data[i][key]);
        }

        vm.totalActivities = total;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data');
      }
    }

    vm.reformatData = function(data){
      return data;
    }

    activate();

  }
})();