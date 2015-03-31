/**
* ImplementingOrganisationsExploreController
* @namespace oipa.implementingOrganisations
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationsExploreController', ImplementingOrganisationsExploreController);

  ImplementingOrganisationsExploreController.$inject = ['$scope', 'ImplementingOrganisations', 'FilterSelection'];

  /**
  * @namespace ImplementingOrganisationsExploreController
  */
  function ImplementingOrganisationsExploreController($scope, ImplementingOrganisations, FilterSelection) {
    var vm = this;
    vm.visualisation_data = null;
    vm.selectionString = FilterSelection.selectionString;
    vm.implementingOrganisations = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {
      
      $scope.$watch("vm.selectionString", function (newValue) {
          vm.update();
      }, true);

    }
    
    vm.update = function(data){
      ImplementingOrganisations.all().then(successFn, errorFn);
    }

    function successFn(data, status, headers, config) {
      vm.implementingOrganisations = data.data.results;
    }


    function errorFn(data, status, headers, config) {
      console.log("getting implementing organisations failed");
    }


  }
})();