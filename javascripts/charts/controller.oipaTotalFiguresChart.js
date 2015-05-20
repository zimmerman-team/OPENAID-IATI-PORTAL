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
      Aggregations.aggregation('activity-status', 'disbursement', vm.aggregationFilters).then(successFn, errorFn);
      Aggregations.aggregation('activity-status', 'iati-identifier', vm.aggregationFilters).then(successFn, errorFn);

      function successFn(data, status, headers, config){

        var key = '';
        if(data.data.length > 0 & data.data[0]['total_disbursements'] !== undefined){
            key = 'total_disbursements';
        } else if(data.data.length > 0 & data.data[0]['activity_count'] !== undefined){
            key = 'activity_count';
        }

        var total = 0;
        for(var i = 0;i < data.data.length;i++){
            total += parseInt(data.data[i][key]);
        }

        if(key == 'total_disbursements'){
            vm.totalBudget = total;
        } else if(key == 'activity_count'){
            vm.totalActivities = total;
        }
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