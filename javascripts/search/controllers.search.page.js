(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl'];

  function SearchPageController(templateBaseUrl) {
    var vm = this;
    vm.selectedTab = 'activities';

    vm.tabs = [
      {'id': 'activities', 'name': 'Projecten', 'count': 'to do'},
      {'id': 'organisations', 'name': 'Organisaties', 'count': 'to do'},
      {'id': 'sectors', 'name': 'Sectoren', 'count': 'to do'},
      {'id': 'countries', 'name': 'Landen', 'count': 'to do'},
      {'id': 'regions', 'name': 'Regio\'s', 'count': 'to do'},
    ];


  }
})();
