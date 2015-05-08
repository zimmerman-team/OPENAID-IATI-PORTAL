/**
* FiltersController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersController', FiltersController);

  FiltersController.$inject = ['$scope', 'Filters'];

  /**
  * @namespace FiltersController
  */
  function FiltersController($scope, Filters) {
    $scope.activeFilters = [
      { slug: 'recipient_countries', name: 'Land'},
      { slug: 'recipient_regions', name: 'Regio'},
      { slug: 'budget', name: 'Budget'},
      { slug: 'sectors', name: 'Sector'},
      // { slug: 'start_end_date', name: 'Start & eind datum activiteit', amount: 0},
      { slug: 'implementing_organisations', name: 'Ontvangende organisatie'},
      { slug: 'activity_status', name: 'Status activiteit'},
    ];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.filters.FiltersController
    */
    function activate() {
    }

    $scope.isOpenedHeader = function(slug){
      return Filters.isOpenedHeader(slug);
    }

    $scope.setOpenedHeader = function(slug){
      Filters.setOpenedHeader(slug);
    }

    $scope.toggleOpenFilters = function(){
      if(Filters.isOpenedHeader(null)){
        $scope.setOpenedHeader('recipient_countries');  
      } else {
        $scope.setOpenedHeader(null);
      }
    }

    $scope.resetFilters = function(){
      
    }

    $scope.saveFilters = function(){
      // logic to save the filters
      // FilterSelection.toSave = true;
      Filters.setOpenedHeader(null);
    }

    $scope.cancelFilters = function(){
      // vm.resetFilters();
      Filters.setOpenedHeader(null);
    }

  }
})();