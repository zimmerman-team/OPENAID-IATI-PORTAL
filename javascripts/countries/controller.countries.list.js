/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesListController', CountriesListController);

  CountriesListController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function CountriesListController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.countries = [];
    vm.order_by = 'total_disbursements';
    vm.page_size = 5;
    vm.offset = 0;
    vm.totalCountries = 0;
    vm.hasToContain = $scope.hasToContain;
    vm.pagination = {
        current: 1
    };
    vm.loading = 0;

    $scope.pageChanged = function(newPage) {
        vm.offset = (newPage * vm.page_size) - vm.page_size;
    };


    function activate() {
      // use predefined filters or the filter selection
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString) {
          vm.update(selectionString);
      }, true);
    }
    
    vm.minMaxShown = function(){
      var max = 0;
      if(vm.offset + vm.page_size > vm.totalCountries){
        max = vm.totalCountries;
      } else{
        max = (vm.offset + vm.page_size);
      }

      var min = 0;
      if(vm.totalCountries > 0){
        min = vm.offset;
      }

      return min + ' - ' + max;
    }

    vm.update = function(selectionString){
      if(vm.hasToContain !== undefined){
        if(selectionString.indexOf(vm.hasToContain) < 0){
          return false;
        }
      }
      Aggregations.aggregation('recipient-country', 'disbursement', selectionString + '&order_by=-total_disbursements').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        vm.countries = data.data;
        vm.totalCountries = vm.countries.length;
        $scope.count = vm.totalCountries;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }

    activate();
  }
})();