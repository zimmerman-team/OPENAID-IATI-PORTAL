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
    vm.order_by = 'total_disbursements';
    vm.page_size = 5;
    vm.offset = 0;
    vm.totalActivities = 0;
    vm.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        vm.offset = (newPage * vm.page_size) - vm.page_size;
    };

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivityStatusController
    */
    function activate() {
      // use predefined filters or the filter selection
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString) {
          vm.update(selectionString);
      }, true);
    }
    
    vm.maxShown = function(){
      if(vm.offset + vm.page_size > vm.totalActivities){
        return vm.totalActivities;
      } else{
        return (vm.offset + vm.page_size);
      }
    }

    vm.update = function(selectionString){

      Aggregations.aggregation('transaction-receiver-org', 'disbursement', selectionString + '&order_by=-total_disbursements').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.organisations = data.data;
        vm.totalActivities = vm.organisations.length;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }

    activate();
  }
})();