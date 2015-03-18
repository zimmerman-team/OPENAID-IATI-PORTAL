/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['Filters'];

  /**
  * @namespace FiltersController
  */
  function FiltersController(Filters) {
    var vm = this;

    vm.selected_filters = [];

    vm.active_filters = [
      { slug: 'recipient_countries', name: 'Land', amount: 0},
      { slug: 'recipient_regions', name: 'Regio', amount: 0},
      { slug: 'budget', name: 'Budget', amount: 0},
      { slug: 'sectors', name: 'Sector', amount: 0},
      { slug: 'start_end_date', name: 'Start & eind datum activiteit', amount: 0},
      { slug: 'implementing_organisations', name: 'Ontvangende organisatie', amount: 0},
      { slug: 'policy_markers', name: 'Beleidskenmerken', amount: 0},
      { slug: 'activity_status', name: 'Status activiteit', amount: 0},
      { slug: 'document_link', name: 'Aanwezigheid documenten', amount: 0},
    ];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.filters.FiltersController
    */
    function activate() {

    }

    
    vm.isOpenedHeader = function(slug){
      return Filters.isOpenedHeader(slug);
    }

    vm.setOpenedHeader = function(slug){
      Filters.setOpenedHeader(slug);
    }

    vm.toggleOpenFilters = function(){
      if(Filters.isOpenedHeader(null)){
        vm.setOpenedHeader('recipient_countries');
      } else {
        vm.setOpenedHeader(null);
      }
    }


    vm.resetFilters = function(){
      
    }

    vm.saveFilters = function(){
      // logic to save the filters
      Filters.setOpenedHeader(null);
    }

    vm.cancelFilters = function(){
      vm.resetFilters();
      Filters.setOpenedHeader(null);
    }




  }
})();