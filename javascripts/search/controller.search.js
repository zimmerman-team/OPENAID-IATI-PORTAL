/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'Search', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesController
  */
  function SearchController($scope, Search, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.searchString = Search.searchString;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {

    }

    vm.save = function(){
      console.log('save called');
      FilterSelection.toSave = true;
    }

  }
})();