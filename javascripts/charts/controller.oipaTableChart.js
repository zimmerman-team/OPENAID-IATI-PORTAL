/**
* OipaLineChartController
* @namespace oipa.charts.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('OipaTableChartController', OipaTableChartController);

  OipaTableChartController.$inject = ['$scope', 'Aggregations'];

  function OipaTableChartController($scope, Aggregations) {

    var vm = this;
    
    vm.chartData = [];
    vm.unformattedData = []; 

    function activate() {
      $scope.$watch('refreshData', function(refreshData){

        if(refreshData == true){

          vm.groupBy = $scope.groupBy;
          vm.groupById = $scope.groupById;
          vm.aggregationKey = $scope.aggregationKey;
          vm.aggregationFilters = $scope.aggregationFilters;
          vm.aggregationExtraSelect = $scope.aggregationExtraSelect;
          vm.aggregationExtraSelectIn = $scope.aggregationExtraSelectIn;

          vm.loadData();
          $scope.refreshData = false;
        }
      });
    }

    vm.loadData = function(){

      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        if(vm.aggregationExtraSelect == 'iati-identifier'){
          vm.unformattedData = data.data;

          var filter__in = [];
          for(var i = 0;i < vm.unformattedData.length;i++){
            filter__in.push(vm.unformattedData[i][vm.groupById]);
          }
          filter__in = filter__in.join();

          if(vm.groupBy == 'transaction-receiver-org'){
            vm.groupBy = 'participating-org';
            vm.groupById = 'organisation_id';
          }

          Aggregations.aggregation(vm.groupBy, 'iati-identifier', '&' + vm.aggregationExtraSelectIn + '=' + filter__in).then(succesFn, errorFn);
          vm.aggregationExtraSelect = 'iati-identifier-add';
          
        } else if(vm.aggregationExtraSelect == 'iati-identifier-add'){

          var countMap = {};
          for(var i = 0;i < data.data.length;i++){
            countMap[data.data[i][vm.groupById]] = data.data[i]['activity_count'];
          }

          if(vm.groupById == 'organisation_id'){
            vm.groupById = 'receiver_organisation_id';
          }

          for(var i = 0;i < vm.unformattedData.length;i++){
            vm.unformattedData[i]['activity_count'] = countMap[vm.unformattedData[i][vm.groupById]];
          }
          
          vm.chartData = vm.reformatData(vm.unformattedData);

        } else {
          if(vm.unformattedData == []){
            vm.chartData = vm.reformatData(data.data);
          } else {
            vm.chartData = vm.reformatData(vm.unformattedData);
          }
        }

        var _in = [];
        for(var i = 0;i < vm.chartData.length;i++){
          if(vm.chartData[i][vm.groupById] != undefined){
            _in.push(vm.chartData[i][vm.groupById]);
          } 
        }

        if(_in.length > 1){
          $scope.shownIds = '&' + vm.aggregationExtraSelectIn + '=' + _in.join();
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