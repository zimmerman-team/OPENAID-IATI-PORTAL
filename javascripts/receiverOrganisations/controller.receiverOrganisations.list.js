/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .controller('receiverOrganisationsListController', receiverOrganisationsListController);

  receiverOrganisationsListController.$inject = ['$scope', 'TransactionAggregations', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesExploreController
  */
  function receiverOrganisationsListController($scope, TransactionAggregations, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.organisations = [];
    vm.totalOrganisations = 0;
    vm.order_by = 'receiver_org';
    vm.page = 1;
    vm.pageSize = 15;
    vm.busy = false;
    vm.extraSelectionString = '&';
    vm.hasToContain = $scope.hasToContain;
    vm.templateBaseUrl = templateBaseUrl;
    vm.loading = true;
    vm.searchPage = false;

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
          searchValue == '' ? vm.extraSelectionString = '' : vm.extraSelectionString = '&q_fields=receiver_organisation&q='+searchValue;
          vm.update();
          vm.loading = false;
          vm.searchPage = true;
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

      vm.page = 1;
      TransactionAggregations.aggregation('receiver_org', 'activity_count,disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, vm.pageSize, vm.page).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.organisations = data.data.results;
        vm.totalOrganisations = data.data.count;
        $scope.count = vm.totalOrganisations;
        vm.loading = false;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for receiver.orgs.block');
        vm.loading = false;
      }
    }

    vm.nextPage = function(){
      if (!vm.hasContains() || vm.busy || (vm.totalOrganisations <= (vm.page * vm.pageSize))) return;

      vm.busy = true;
      vm.page += 1;
      TransactionAggregations.aggregation('receiver_org', 'activity_count,disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, vm.pageSize, vm.page).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.organisations = vm.organisations.concat(data.data.results);
        vm.busy = false;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data on lazy loading');
      }
    };

    activate();
  }
})();