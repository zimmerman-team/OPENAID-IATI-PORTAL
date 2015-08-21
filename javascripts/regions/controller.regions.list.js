/**
* RegionListController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionListController', RegionListController);

  RegionListController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function RegionListController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.regions = [];
    vm.order_by = 'total_disbursements';
    vm.page_size = 5;
    vm.offset = 0;
    vm.totalActivities = 0;
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
      if(vm.offset + vm.page_size > vm.totalActivities){
        max = vm.totalActivities;
      } else{
        max = (vm.offset + vm.page_size);
      }
      var min = 0;
      if(vm.totalActivities > 0){
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
      Aggregations.aggregation('recipient-region', 'disbursement', selectionString + '&order_by=-total_disbursements').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){

        vm.regions = data.data;
        vm.totalActivities = vm.regions.length;
        $scope.count = vm.totalActivities;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }

    activate();
  }
})();