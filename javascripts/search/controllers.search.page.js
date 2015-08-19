(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl'];

  function SearchPageController(templateBaseUrl) {
    var vm = this;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'activities', 'name': 'Projecten', 'count': '1'},
      {'id': 'organisations', 'name': 'Organisaties', 'count': '4'},
      {'id': 'sectors', 'name': 'Sectoren', 'count': '4'},
      {'id': 'countries', 'name': 'Landen', 'count': '4'},
      {'id': 'regions', 'name': 'Regios', 'count': '4'},
    ];

    activate();

    function activate() {
      
    }

  }
})();
