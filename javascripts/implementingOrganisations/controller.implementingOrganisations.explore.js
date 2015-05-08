/**
* ImplementingOrganisationsExploreController
* @namespace oipa.implementingOrganisations
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationsExploreController', ImplementingOrganisationsExploreController);

  ImplementingOrganisationsExploreController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace ImplementingOrganisationsExploreController
  */
  function ImplementingOrganisationsExploreController($scope, Aggregations, FilterSelection) {
    var vm = this;
    $scope.filterSelection = FilterSelection;
    vm.visData = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {
      $scope.$watch("filterSelection.selectionString", function (selectionString) {
          vm.update(selectionString);
      }, true);
    }
    
    vm.update = function(selectionString){

      Aggregations.aggregation('transaction-receiver-org', 'disbursement', selectionString, '-total_disbursements', '5').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.reformatData(data.data);
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for countries.explore.block');
      }
    }

    vm.reformatData = function(data){
      vm.visData = data;
    }


  }
})();