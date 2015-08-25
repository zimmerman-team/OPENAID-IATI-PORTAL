/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesExploreController', CountriesExploreController);

  CountriesExploreController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function CountriesExploreController($scope, Aggregations, FilterSelection) {
    var vm = this;
    $scope.filterSelection = FilterSelection;
    vm.visData = [];
    vm.useData = 1;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivityStatusController
    */
    function activate() {
      $scope.$watch("filterSelection.selectionString", function (selectionString) {
          vm.update(selectionString);
      }, true);
    }
    
    vm.update = function(selectionString){

      Aggregations.aggregation('recipient-country', 'disbursement', selectionString).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.reformatData(data.data.results);
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for countries.explore.block');
      }
    }

    vm.reformatData = function(data){
      var formattedData = [];

      var visDataMap = {};
      for(var i = 0;i < vm.visData.length;i++){
        visDataMap[vm.visData[i].id] = i;
        vm.visData[i].aggregations[0] = 0;
      }

      // no year is used, put everything under year 0
      for(var i = 0; i < data.length;i++){
        if(data[i].country_id != null){
          if(visDataMap[data[i].country_id] != undefined){
            vm.visData[visDataMap[data[i].country_id]].aggregations[0] = data[i].total_disbursements;
          } else{
            vm.visData.push({
              id:data[i].country_id, 
              code:data[i].country_id, 
              name: data[i].name, 
              aggregations: {'0': data[i].total_disbursements }
            });
          }
        }
      }
      vm.useData++;
    }

  }
})();