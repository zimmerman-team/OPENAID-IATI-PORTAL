/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationsController', ImplementingOrganisationsController);

  ImplementingOrganisationsController.$inject = ['$scope', 'Aggregations', 'ImplementingOrganisations', 'templateBaseUrl', 'FilterSelection'];

  /**
  * @namespace ImplementingOrganisationsController
  */
  function ImplementingOrganisationsController($scope, Aggregations, ImplementingOrganisations, templateBaseUrl, FilterSelection) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.implementingOrganisations = [];
    vm.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
    vm.currentPage = 1;
    vm.q = '';
    vm.perPage = 4;
    vm.totalCount = 0;
    vm.filterSelection = FilterSelection;

    function activate() {

      vm.page = 1;
      vm.update();

      $scope.$watch('vm.q', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.currentPage = 1;
          vm.update();
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.currentPage = 1;
          vm.update();
        }
      }, true);
    }

    vm.pageChanged = function(newPageNumber){
      vm.currentPage = newPageNumber;
      vm.update();
    }

    vm.update = function(){
      // for each active country, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('participating_organisation') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&q_fields=participating_organisation&q=' + vm.q;
      }

      Aggregations.aggregation('participating_organisation', 'count', filterString + '&participating_organisation_role=4', 'participating_organisation', vm.perPage, vm.currentPage).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.implementingOrganisations = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting implementing organisations failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();


  }
})();