(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl', '$scope', '$stateParams', 'FilterSelection', 'Search'];

  function SearchPageController(templateBaseUrl, $scope, $stateParams, FilterSelection, Search) {
    var vm = this;
    vm.selectedTab = 'activities';
    vm.searchValue = '';
    vm.search = Search;
    vm.filterSelection = FilterSelection;

    vm.tabs = [
      {'id': 'activities', 'name': 'Projects', 'count': -1},
      {'id': 'organisations', 'name': 'Organisations', 'count': -1},
      {'id': 'sectors', 'name': 'Sectors', 'count': -1},
      {'id': 'countries', 'name': 'Countries', 'count': -1},
      {'id': 'regions', 'name': 'Regions', 'count': -1},
    ];

    activate();

    function activate(){
      FilterSelection.reset();
      
      if($stateParams.search != undefined){
        vm.searchValue = $stateParams.search;
        vm.search.searchString = $stateParams.search;
        vm.filterSelection.save();
      }

      if($stateParams.tab != undefined){
        vm.selectedTab = $stateParams.tab;
      }
    }
  }
})();
