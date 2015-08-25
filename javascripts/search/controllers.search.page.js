(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl', '$scope'];

  function SearchPageController(templateBaseUrl, $scope) {
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





  }
})();
