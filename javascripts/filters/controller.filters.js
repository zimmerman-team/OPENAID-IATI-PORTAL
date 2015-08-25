/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$state', '$location', '$document', '$scope', 'Filters', 'FilterSelection', '$sce'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($state, $location, $document, $scope, Filters, FilterSelection, $sce) {
    var vm = this;
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.excludeFilter = $scope.excludeFilter;
    vm.excludeDashboard = $scope.excludeDashboard;
    vm.currentPage = $scope.currentPage;
    vm.showSelection = false;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.currentHoverText = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();
    vm.pageTitle = $document[0].title;
    vm.shareDescription = '';

    vm.selectedView = '';
    vm.views = $scope.views;


    vm.buttonTexts = {
      'recipient_countries': {'text': 'Ontvangend land', hoverShow: false},
      'recipient_regions': {'text': 'Ontvangende regio', hoverShow: false},
      'recipient_budget': {'text': 'Budget', hoverShow: false},
      'recipient_sectors': {'text': 'Sector', hoverShow: false},
      'recipient_activity_status': {'text': 'Activiteit status', hoverShow: false},
      'recipient_implementing_organisations': {'text': 'Ontvangende organisatie', hoverShow: false},
      'download': {'text': 'Download projecten', hoverShow: false},
      'share_twitter': {'text': 'Deel via Twitter', hoverShow: false},
      'share_linkedin': {'text': 'Deel via LinkedIn', hoverShow: false},
      'share_facebook': {'text': 'Deel via Facebook', hoverShow: false},
    };

    vm.currentHoverText = '';

    activate();

    function activate() {
      if($scope.views.length > 0){
        vm.selectedView = $scope.views[0]['id'];
      }

      vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
      vm.shareDescription = encodeURIComponent('Bekijk de ontwikkelingshulpprojecten van de Rijksoverheid op ' + vm.pageUrlDecoded);
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
      console.log(vm.openedPanel);
      FilterSelection.toSave = true;
    }

    vm.isOpenedHeader = function(slug){
      return FilterSelection.openedPanel == slug;
    }

    vm.showDownload = function(){
      console.log("TO DO; show download options");
    }

    
  }
})();
