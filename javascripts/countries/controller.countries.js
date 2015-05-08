/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesController', CountriesController);

  CountriesController.$inject = ['Countries', 'Filters', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesController
  */
  function CountriesController(Countries, Filters, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientCountries = [];
    vm.selectedCountries = Countries.selectedCountries;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      // for each active country, get the results
      Countries.all().then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.recipientCountries = data.data;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.save = function(){
      // logic to save the filters
      FilterSelection.toSave = true;
      Filters.setOpenedHeader(null);
    }


  }
})();