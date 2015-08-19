/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$state', '$scope', 'Filters', 'FilterSelection', '$sce'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($state, $scope, Filters, FilterSelection, $sce) {
    var vm = this;
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.excludeFilter = $scope.excludeFilter;
    vm.excludeDashboard = $scope.excludeDashboard;
    vm.currentPage = $scope.currentPage;
    vm.openedPanel = ''; 
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.currentHoverText = '';

    vm.buttonTexts = {
      'recipient_countries': {'text': 'Ontvangend land', hoverShow: false},
      'recipient_regions': {'text': 'Ontvangende regio', hoverShow: false},
      'recipient_budget': {'text': 'Budget', hoverShow: false},
      'recipient_sectors': {'text': 'Sector', hoverShow: false},
      'recipient_activity_status': {'text': 'Activiteit status', hoverShow: false},
      'recipient_implementing_organisations': {'text': 'Ontvangende organisatie', hoverShow: false},
      'download': {'text': 'Download is nog niet geimplementeerd', hoverShow: false},
      'share_twitter': {'text': 'Twitter share is nog niet geimplementeerd', hoverShow: false},
      'share_linkedin': {'text': 'LinkedIn share is nog niet geimplementeerd', hoverShow: false},
      'share_facebook': {'text': 'Facebook share is nog niet geimplementeerd', hoverShow: false},
    };

    vm.currentHoverText = '';

    activate();

    function activate() {
      
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

    vm.isIncludedDashboard = function(id){
      if(vm.excludeDashboard != undefined){
        return (vm.excludeDashboard.indexOf(id) > -1) ? false : true;
      } else {
        return true;
      }
    }

    vm.hoverIn = function(id){
      vm.buttonTexts[id].hoverShow = true;
      vm.currentHoverText =  $sce.trustAsHtml(vm.buttonTexts[id].text);
    };

    vm.hoverOut = function(id){
        vm.buttonTexts[id].hoverShow = false;
    };

    vm.hasOpenFilters = function(){
      return FilterSelection.openedPanel.length;
    }

    vm.setOpenedHeader = function(slug){
      FilterSelection.openedPanel = slug;
      vm.showSelection = false;
    }

    vm.toggleOpenPanel = function(slug){
      if(FilterSelection.openedPanel == slug){
        FilterSelection.openedPanel = '';
        FilterSelection.toSave = true;
      } else {
        vm.setOpenedHeader(slug);
      }
    }

    vm.toggleSelection = function(){
      vm.showSelection = !vm.showSelection;
      FilterSelection.openedPanel = '';
    }

    vm.resetFilters = function(){
      FilterSelection.toReset = true;
    }

    vm.saveFilters = function(){
      FilterSelection.toSave = true;
      FilterSelection.openedPanel = '';
    }

    vm.isOpenedHeader = function(slug){
      return FilterSelection.openedPanel == slug;
    }

    vm.showDownload = function(){
      console.log("TO DO; show download options");
    }

    vm.share = function(medium){
      console.log("TO DO; open "+medium+" share url in new window");
    }
    
  }
})();
