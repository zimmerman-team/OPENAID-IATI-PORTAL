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
    vm.pagination = {
        current: 1
    };

    activate();

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
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString) {
        console.log('updating activity list');
          vm.update(selectionString);
      }, true);
    }

    vm.toggleOrder = function(name){
      if (vm.order_by.indexOf(0) === '-'){
        vm.order_by = name;
      } else {
        vm.order_by = '-' + name;
      }
      vm.update(vm.filterSelection.selectionString);
    }

    vm.maxShown = function(){
      if(vm.offset + vm.page_size > vm.totalActivities){
        return vm.totalActivities;
      } else{
        return (vm.offset + vm.page_size);
      }
    }

    vm.update = function(selectionString){

      Activities.list(selectionString, vm.page_size, vm.order_by, vm.offset).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.totalActivities = data.data.meta.total_count;
        vm.activities = data.data.objects;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }
  }
})();