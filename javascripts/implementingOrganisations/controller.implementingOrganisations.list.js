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
    vm.totalOrganisations = 0;
    vm.hasToContain = $scope.hasToContain;
    vm.pagination = {
        current: 1
    };
    vm.loading = 0;

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
    
    vm.minMaxShown = function(){
      var max = 0;
      if(vm.offset + vm.page_size > vm.totalOrganisations){
        max = vm.totalOrganisations;
      } else{
        max = (vm.offset + vm.page_size);
      }

      var min = 0;
      if(vm.totalOrganisations > 0){
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
      Aggregations.aggregation('transaction-receiver-org', 'disbursement', selectionString + '&order_by=-total_disbursements').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        vm.organisations = data.data;
        vm.totalOrganisations = vm.organisations.length;
        $scope.count = vm.totalOrganisations;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for implementing organistions');
      }
    }

    activate();
  }
})();