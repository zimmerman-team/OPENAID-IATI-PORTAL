/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$scope', 'Filters', 'FilterSelection', '$sce'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($scope, Filters, FilterSelection, $sce) {
    var vm = this;
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.excludeFilter = $scope.excludeFilter;
    vm.excludeDashboard = $scope.excludeDashboard;

    vm.buttonTexts = {
      'recipient_countries': {'text': 'Ontvangend land', hoverShow: false},
      'recipient_regions': {'text': 'Ontvangende regio', hoverShow: false},
      'recipient_budget': {'text': 'Budget', hoverShow: false},
      'recipient_sectors': {'text': 'Sector', hoverShow: false},
      'recipient_activity_status': {'text': 'Activiteit status', hoverShow: false},
      'recipient_implementing_organisations': {'text': 'Ontvangende organisatie', hoverShow: false},
      'charts': {'text': 'Toon in chart view', hoverShow: false},
      'map': {'text': 'Toon in map view', hoverShow: false},
      'list': {'text': 'Toon in list view', hoverShow: false},
    };
    vm.currentHoverText = '';

    activate();

    function activate() {
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
    
  }
})();
