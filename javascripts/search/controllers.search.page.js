(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl', '$scope', '$stateParams'];

  function SearchPageController(templateBaseUrl, $scope, $stateParams) {
    var vm = this;
    vm.selectedTab = 'activities';
    vm.searchValue = '';

    vm.tabs = [
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'organisations', 'name': 'Organisaties', 'count': -1},
      {'id': 'sectors', 'name': 'Sectoren', 'count': -1},
      {'id': 'countries', 'name': 'Landen', 'count': -1},
      {'id': 'regions', 'name': 'Regio\'s', 'count': -1},
    ];

    activate();

    function activate(){

      if($stateParams.search != undefined){
        vm.searchValue = $stateParams.search;
      }

      if($stateParams.tab != undefined){
        vm.selectedTab = $stateParams.tab;
      }

    }

  }
})();
