/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountryController', CountryController);

  CountryController.$inject = ['Countries', 'templateBaseUrl', 'country_id'];

  /**
  * @namespace CountriesController
  */
  function CountryController(Countries, templateBaseUrl, country_id) {
    var vm = this;
    vm.country = null;
    
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountryController
    */
    function activate() {
      // for each active country, get the results
      Countries.getCountry(country_id).then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.country = data.data.results;
      }


      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }


  }
})();