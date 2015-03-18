/**
* FiltersController
* @namespace oipa.filters.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersSelectionController', FiltersSelectionController);

  FiltersSelectionController.$inject = [];

  /**
  * @namespace FiltersController
  */
  function FiltersSelectionController($scope) {
    var vm = this;

    vm.selected_filters = {
      recipient_countries: '',
      recipient_regions: '',
      budget: '',
      sectors: '',
      start_end_date: '',
      implementing_organisations: '',
      policy_markers: '',
      activity_status: '',
      document_link: '',
    };


    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.filters.controllers.FiltersController
    */
    function activate() {
      
    }
  }
  
})();