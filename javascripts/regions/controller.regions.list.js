/**
* RegionListController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionListController', RegionListController);

  RegionListController.$inject = ['$scope', 'TransactionAggregations', 'FilterSelection', 'regionMapping', 'templateBaseUrl'];

  /**
  * @namespace regionsExploreController
  */
  function RegionListController($scope, TransactionAggregations, FilterSelection, regionMapping, templateBaseUrl) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.regions = [];
    vm.totalRegions = 0;
    vm.order_by = 'recipient_region';
    vm.page = 1;
    vm.pageSize = 9999;
    vm.hasToContain = $scope.hasToContain;
    vm.busy = false;
    vm.extraSelectionString = '';
    vm.isCollapsed = false;
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
        if(searchValue == undefined) return false;
        if(searchValue !== oldSearchValue){
          searchValue == '' ? vm.extraSelectionString = '' : vm.extraSelectionString = '&q_fields=recipient_region&q='+searchValue;
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
      TransactionAggregations.aggregation('recipient_region', 'activity_count,disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, 400, 1).then(succesFn, errorFn);

      function replaceDac5(arr){
        var i = arr.length;
        while(i--){
          if(arr[i].hasOwnProperty('children')){
            replaceDac5(arr[i].children);
            if(!arr[i].children.length){
              arr.splice(i, 1);
            }
          } else {
            var match = _.find(vm.remoteRegions, function(region) {
              return region.recipient_region.code === arr[i].region_id;
            })
            if (match) {
              arr[i] = match;
            } else {
              arr.splice(i, 1);
            }
          }
        }
      }

      function updateDisbursements(region) {
        if(!region.hasOwnProperty('children')) {
          return [region.disbursement, region.activity_count];
        }
        var disbursement = 0;
        var activity_count = 0;
        for (var i = 0; i < region.children.length; i++) {
          var values = updateDisbursements(region.children[i])
          if (values[0]) disbursement += values[0];
          if (values[1]) activity_count += values[1];
          // disbursement += updateDisbursements(region.children[i]) 
        }
        region.disbursement = disbursement;
        region.activity_count = activity_count;
        return [disbursement, activity_count]
      }

      function sortRegionChildren(region, i) {
        if (region.hasOwnProperty('children')) {
          region.children = _.sortBy(region.children, vm.order_by_final)
          if (this) region.children = region.children.reverse();
          _.each(region.children, sortRegionChildren, this);
        }
      }

      function applyRegionHierarchy(regions) {
        // replace lowest level DAC5 in regionmapping with regions
        replaceDac5(regions.children);
        _.each(regions.children, updateDisbursements)

        // first level
        if (vm.order_by.charAt(0) === "-") { //reverse
          vm.order_by_final = vm.order_by.substring(1);
          regions = _.sortBy(_.each(regions.children, sortRegionChildren, true), vm.order_by_final).reverse();
        } else {
          vm.order_by_final = vm.order_by;
          regions = _.sortBy(_.each(regions.children, sortRegionChildren), vm.order_by_final)
        }
        return regions;
      }

      function succesFn(data, status, headers, config){
        vm.remoteRegions = data.data.results;
        vm.regionMapping = angular.copy(regionMapping);
        vm.regions = applyRegionHierarchy(vm.regionMapping);
        vm.totalRegions = data.data.count;
        $scope.count = vm.totalRegions; 
        vm.loading = false;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for region.block');
        vm.loading = false;
      }
    }

    vm.toggleHideChildren = function($event) {
      var parent = $($event.target).closest('.parent') 
      var children = parent.next();

      //children.toggle()
      parent.toggleClass('expanded').toggleClass('collapsed')

    }

    vm.toggleOrder = function(){
      vm.update(vm.filterSelection.selectionString);
    }

    activate();
  }
})();