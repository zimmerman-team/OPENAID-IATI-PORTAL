/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityListController', ActivityListController);

  ActivityListController.$inject = ['$scope', 'Activities', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function ActivityListController($scope, Activities, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.activities = [];
    vm.order_by = 'start_actual';
    vm.page_size = 5;
    vm.offset = 0;
    vm.totalActivities = 0;
    vm.hasToContain = $scope.hasToContain;
    vm.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        vm.offset = (newPage * vm.page_size) - vm.page_size;
        vm.update(vm.filterSelection.selectionString);
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

    vm.toggleOrder = function(name){
      if (vm.order_by.charAt(0) === '-'){
        vm.order_by = name;
      } else {
        vm.order_by = '-' + name;
      }
      vm.update(vm.filterSelection.selectionString);
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

      Activities.list(selectionString, vm.page_size, vm.order_by, vm.offset).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.activities = data.data.objects;
        vm.totalActivities = data.data.meta.total_count;
        $scope.count = vm.totalActivities;        
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }

    activate();
  }
})();