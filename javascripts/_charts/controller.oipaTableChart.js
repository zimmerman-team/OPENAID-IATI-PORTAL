/**
* OipaLineChartController
* @namespace oipa.charts.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('OipaTableChartController', OipaTableChartController);

  OipaTableChartController.$inject = ['$scope', 'Aggregations', 'homeUrl'];

  function OipaTableChartController($scope, Aggregations, homeUrl) {

    var vm = this;
    vm.chartData = [];
    vm.unformattedData = []; 
    vm.extraFilters = '';
    vm.homeUrl = homeUrl;

    function activate() {

      $scope.$watch('refreshData', function(refreshData){

        if(refreshData == true){

          vm.extraFilters = '&activity_status__in=' + $scope.activityStatus;
          vm.extraFilters += '&transaction_date__year__in=' + $scope.transactionYear;

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
      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters + vm.extraFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        if(vm.aggregationExtraSelect == 'iati-identifier'){
          vm.unformattedData = data.data.results;

          var filter__in = [];
          for(var i = 0;i < vm.unformattedData.length;i++){
            filter__in.push(vm.unformattedData[i][vm.groupById]);
          }
          filter__in = filter__in.join();

          if(vm.groupBy == 'transaction__receiver-org'){
            vm.groupBy = 'participating-org';
            vm.groupById = 'organisation_id';
          }

          vm.aggregationExtraSelect = 'iati-identifier-add';
          Aggregations.aggregation(vm.groupBy, 'iati-identifier', '&activity_status__in=' + $scope.activityStatus +'&' + vm.aggregationExtraSelectIn + '=' + filter__in).then(succesFn, errorFn);
          
          
        } else if(vm.aggregationExtraSelect == 'iati-identifier-add'){

          var countMap = {};
          for(var i = 0;i < data.data.results.length;i++){
            countMap[data.data.results[i][vm.groupById]] = data.data.results[i]['activity_count'];
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
            vm.chartData = vm.reformatData(data.data.results);
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
          $scope.shownIds = '&' + vm.aggregationExtraSelectIn + '=' + _in.join() + '&activity_status__in=' + $scope.activityStatus;
        }

      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data');
      }
    }

    vm.reformatData = function(data){

      for (var i = 0;i < data.length;i++){
        data[i].id = data[i][vm.groupById];
      }
      return data;
    }

    activate();

  }
})();