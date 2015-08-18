(function () {
  'use strict';

  angular
    .module('oipa.searchPage')
    .controller('SearchPageController', SearchPageController);

  SearchPageController.$inject = ['templateBaseUrl'];

  function SearchPageController(templateBaseUrl) {
    var vm = this;

    activate();

    function activate() {
      
    }

  }
})();
