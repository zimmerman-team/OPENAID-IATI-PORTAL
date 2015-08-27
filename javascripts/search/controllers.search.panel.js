(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('SearchPanelController', SearchPanelController);

  SearchPanelController.$inject = ['Search', 'FilterSelection'];

  function SearchPanelController(Search, FilterSelection) {
    var vm = this;
    vm.query = '';

    vm.submit = function(){
      vm.save();
    }

    vm.save = function(){
      Search.searchString = vm.query;
      FilterSelection.save();
    }

  }
})();
