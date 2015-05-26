/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'Search', 'FilterSelection', 'templateBaseUrl', '$state'];

  /**
  * @namespace CountriesController
  */
  function SearchController($scope, Search, FilterSelection, templateBaseUrl, $state) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.searchString = '';
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      $scope.$watch("vm.searchString", function (searchString) {
        Search.searchString = searchString;
      }, true);
    }

    vm.save = function(){
      FilterSelection.toSave = true;
      $state.go('iati-explorer-list');
    }

  }
})();