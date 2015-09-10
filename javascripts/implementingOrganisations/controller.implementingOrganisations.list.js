/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationsListController', ImplementingOrganisationsListController);

  ImplementingOrganisationsListController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function ImplementingOrganisationsListController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.organisations = [];
    vm.totalOrganisations = 0;
    vm.order_by = 'name';
    vm.offset = 0;
    vm.hasToContain = $scope.hasToContain;
    vm.busy = false;
    vm.extraSelectionString = '';


    function activate() {
      // use predefined filters or the filter selection
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString, oldString) {
        if(selectionString !== oldString){
          vm.update(selectionString);
        }
      }, true);

      $scope.$watch("searchValue", function (searchValue, oldSearchValue) {
        if(searchValue == undefined) return;
        if(searchValue !== oldSearchValue){
          searchValue == '' ? vm.extraSelectionString = '' : vm.extraSelectionString = '&name_query='+searchValue;
          vm.update();
        }
      }, true);

      // do not prefetch when the list is hidden
      if($scope.shown != undefined){
        $scope.$watch("shown", function (shown) {
          vm.busy = !shown ? true : false;
        }, true);
      }

      vm.update(vm.filterSelection.selectionString);
    }

    vm.toggleOrder = function(){
      vm.update(vm.filterSelection.selectionString);
    }

    vm.hasContains = function(){
      if(vm.hasToContain !== undefined){
        var totalString = vm.filterSelection.selectionString + vm.extraSelectionString;
        if(totalString.indexOf(vm.hasToContain) < 0){
          return false;
        }
      }
      return true;
    }

    vm.update = function(){
      if (!vm.hasContains()) return false;

      vm.offset = 0;
      Aggregations.aggregation('transaction__receiver-org', 'disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, 15, vm.offset, 'activity_count').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.organisations = data.data.results;
        vm.totalOrganisations = data.data.count;
        $scope.count = vm.totalOrganisations;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for implementing.orgs.block');
      }
    }

    vm.nextPage = function(){
      if (!vm.hasContains() || vm.busy || (vm.totalOrganisations < (vm.offset + 15))) return;

      vm.busy = true;
      vm.offset = vm.offset + 15;
      Aggregations.aggregation('transaction__receiver-org', 'disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, 15, vm.offset, 'activity_count').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        for (var i = 0; i < data.data.results.length; i++) {
          vm.organisations.push(data.data.results[i]);
        }
        vm.busy = false;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data on lazy loading');
      }
    };

    activate();
  }
})();