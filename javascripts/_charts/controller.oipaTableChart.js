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
          vm.extraFilters += '&transaction_date_year=' + $scope.transactionYear + '&page_size=5';

          vm.groupBy = $scope.groupBy;
          vm.groupById = $scope.groupById;
          vm.aggregationKey = $scope.aggregationKey;
          vm.aggregationFilters = $scope.aggregationFilters;
          vm.loadData();
          $scope.refreshData = false;
        }
      });
    }

    vm.loadData = function(){
      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters + vm.extraFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        var results = data.data.results;

        if(vm.groupBy == 'participating_organisation'){
          for(var i = 0;i < results.length;i++){
            results[i][vm.groupBy] = {
              'code': results[i].ref,
              'name': results[i].name
            };
          }
        }

        var filter__in = [];
        for(var i = 0;i < results.length;i++){
          filter__in.push(results[i][vm.groupBy]['code']);
        }
        filter__in = filter__in.join();
        $scope.shownIds = '&' + vm.groupBy + '=' + filter__in;
        vm.chartData = vm.reformatData(results);
      }
    }

    vm.reformatData = function(data){
      for (var i = 0;i < data.length;i++){
        data[i].code = data[i][vm.groupBy][vm.groupById];
        data[i].name = data[i][vm.groupBy].name;
      }
      return data;
    }

    activate();

  }
})();