/**
* CountriesController
* @namespace oipa.countries
*/

function errorFn(data, status, headers, config){
  console.warn('error');
}

(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityListController', ActivityListController);

  ActivityListController.$inject = ['$scope', 'Activities', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesExploreController
  */
  function ActivityListController($scope, Activities, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.activities = [];
    vm.order_by = '-planned_start_date';
    vm.pageSize = 5;
    vm.page = 1;
    vm.totalActivities = 0;
    vm.hasToContain = $scope.hasToContain;
    vm.busy = false;
    vm.extraSelectionString = '';
    vm.loading = true;
    vm.templateBaseUrl = templateBaseUrl;
    vm.searchPage = false;

    function activate() {
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString) {
        vm.update(selectionString);
      }, true);

      $scope.$watch("searchValue", function (searchValue) {
        if (searchValue == undefined) return false; 
        searchValue == '' ? vm.extraSelectionString = '' : vm.extraSelectionString = '&q='+searchValue;
        vm.update();
        vm.searchPage = true;
        vm.loading = false;
      }, true);

      // do not prefetch when the list is hidden
      if($scope.shown != undefined){
        $scope.$watch("shown", function (shown) {
            vm.busy = !shown ? true : false;
        }, true);
      }
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

      Activities.list(vm.filterSelection.selectionString + vm.extraSelectionString, vm.pageSize, vm.order_by, vm.page).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.activities = data.data.results;
        vm.totalActivities = data.data.count;
        $scope.count = vm.totalActivities;   
        vm.loading = false;     
      }
      function errorFn() {
        vm.loading = false;
      }
    }

    vm.nextPage = function(){
      if (!vm.hasContains() || vm.busy || (vm.totalActivities <= (vm.page * vm.pageSize))) return;

      vm.busy = true;
      vm.page += 1;
      Activities.list(vm.filterSelection.selectionString + vm.extraSelectionString, vm.pageSize, vm.order_by, vm.page).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.activities = vm.activities.concat(data.data.results);
        vm.busy = false;   
      }
    };

    activate();
  }
})();