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
      { slug: 'implementing_organisations', name: 'Ontvangende organisatie'},
      { slug: 'activity_status', name: 'Status activiteit'},
    ];

  }
})();