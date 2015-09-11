/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$state', '$location', '$document', '$scope', 'Filters', 'FilterSelection', '$sce', 'homeUrl'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($state, $location, $document, $scope, Filters, FilterSelection, $sce, homeUrl) {
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

    vm.buttonTexts = {
      'recipient_countries': {'text': 'Recipient country', hoverShow: false},
      'recipient_regions': {'text': 'Recipient region', hoverShow: false},
      'recipient_budget': {'text': 'Budget', hoverShow: false},
      'recipient_sectors': {'text': 'Sector', hoverShow: false},
      'transaction_year': {'text': 'Transaction date', 'hoverShow': false},
      'recipient_activity_status': {'text': 'Activity status', hoverShow: false},
      'recipient_implementing_organisations': {'text': 'Implementing organisation', hoverShow: false},
      'search': {'text': 'Search in title/description', hoverShow: false},
      'reset': {'text': 'Reset filters', hoverShow: false},
      'download': {'text': 'Download projects', hoverShow: false},
      'share_twitter': {'text': 'Share on Twitter', hoverShow: false},
      'share_linkedin': {'text': 'Share on LinkedIn', hoverShow: false},
      'share_facebook': {'text': 'Share on Facebook', hoverShow: false},
    };

    vm.currentHoverText = '';

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
        FilterSelection.save();
      } else {
        FilterSelection.save();
        vm.setOpenedHeader(slug);
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
      var url = homeUrl + '/export/?format='+format+'&filters='+encodeURIComponent(FilterSelection.selectionString);
      if(vm.currentPage == 'activity'){
        url = homeUrl + '/export/?format='+format+'&detail='+$scope.activityId+'&filters=';
      }
      window.open(url);
    }

    
  }
})();
