/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$state', '$location', '$document', '$scope', 'Filters', 'FilterSelection', '$sce', 'homeUrl', '$filter'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($state, $location, $document, $scope, Filters, FilterSelection, $sce, homeUrl, $filter) {
    var vm = this;
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.excludeFilter = $scope.excludeFilter;
    vm.excludeDashboard = $scope.excludeDashboard;
    vm.currentPage = $scope.currentPage;
    vm.selectionString = '';
    vm.currentHoverText = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();
    vm.pageTitle = $document[0].title;
    vm.shareDescription = '';
    vm.selectedView = '';
    vm.views = $scope.views;

    activate();

    function activate() {
      if($scope.views != undefined && $scope.views.length > 0){
        vm.selectedView = $scope.views[0]['id'];
      }
      
      vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
      vm.shareDescription = encodeURIComponent('View the Aid projects of the Dutch Ministry of Foreign Affairs on ' + vm.pageUrlDecoded);
    }

    vm.changeView = function(){
      $state.go(vm.selectedView);
    }

    vm.goToPage = function(type){
      if (type == ''){
        $state.go(vm.currentPage);
        return false;
      }
      $state.go(vm.currentPage + '-' + type);
    }

    vm.isIncludedFilter = function(id){
      if(vm.excludeFilter != undefined){
        return (vm.excludeFilter.indexOf(id) > -1) ? false : true;
      } else {
        return true;
      }
    }

    vm.hasOpenFilters = function(){
      return FilterSelection.openedPanel.length;
    }

    vm.setOpenedHeader = function(slug){
      FilterSelection.openedPanel = slug;
      vm.showSelection = false;
    }

    vm.toggleOpenPanel = function(slug){
      
      if(FilterSelection.openedPanel == slug){
        FilterSelection.save();
      } else {
        FilterSelection.save();
        vm.setOpenedHeader(slug);
      }

      //for modifying tooltip
      if(angular.element('.tooltip-max > .currency').length == 0) {
        angular.element('.tooltip-max').append('<div class="currency">'+$filter('shortcurrency')(angular.element('.tooltip-max .tooltip-inner').text(),'€')+'</div>');
      }
      if(angular.element('.tooltip-min > .currency').length == 0) {
        angular.element('.tooltip-min').append('<div class="currency">'+$filter('shortcurrency')(angular.element('.tooltip-min .tooltip-inner').text(),'€')+'</div>');
      }
      
    }

    vm.toggleSelection = function(){
      vm.showSelection = !vm.showSelection;
      FilterSelection.openedPanel = '';
    }

    vm.resetFilters = function(){
      FilterSelection.reset();
    }

    vm.saveFilters = function(){
      FilterSelection.save();
    }

    vm.isOpenedHeader = function(slug){
      return FilterSelection.openedPanel == slug;
    }

    vm.download = function(format){
      var url = homeUrl + '/export/?type=activity-list&format='+format+'&filters='+encodeURIComponent(FilterSelection.selectionString);
      window.open(url);
    }
    
  }
})();
