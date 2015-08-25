/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationsController', ImplementingOrganisationsController);

  ImplementingOrganisationsController.$inject = ['ImplementingOrganisations', 'templateBaseUrl', 'FilterSelection'];

  /**
  * @namespace ImplementingOrganisationsController
  */
  function ImplementingOrganisationsController(ImplementingOrganisations, templateBaseUrl, FilterSelection) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.implementingOrganisations = [];
    vm.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.ImplementingOrganisationsController
    */
    function activate() {
      // for each active country, get the results;
      ImplementingOrganisations.all().then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.implementingOrganisations = data.data.results;
      }


      function errorFn(data, status, headers, config) {
        console.log("getting implementing organisations failed");
      }
    }

    vm.save = function(){
      FilterSelection.toSave = true;
    }


  }
})();