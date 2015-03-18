/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesController', CountriesController);

  CountriesController.$inject = ['$scope', 'Countries', 'templateBaseUrl'];

  /**
  * @namespace CountriesController
  */
  function CountriesController($scope, Countries, templateBaseUrl) {
    var vm = this;

    $scope.templateBaseUrl = templateBaseUrl;
    
    vm.recipientCountries = [];
    vm.selectedCountries = [];
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      // for each active country, get the results
      Countries.all().then(countriesSuccessFn, countriesErrorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function countriesSuccessFn(data, status, headers, config) {
        vm.recipientCountries = data.data.results;
      }


      function countriesErrorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }


  }
})();