/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .controller('receiverOrganisationsController', receiverOrganisationsController);

  receiverOrganisationsController.$inject = ['$scope', 'TransactionAggregations', 'receiverOrganisations', 'templateBaseUrl', 'FilterSelection'];

  /**
  * @namespace receiverOrganisationsController
  */
  function receiverOrganisationsController($scope, TransactionAggregations, receiverOrganisations, templateBaseUrl, FilterSelection) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.receiverOrganisations = [];
    vm.selectedreceiverOrganisations = receiverOrganisations.selectedreceiverOrganisations;
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
        if (filterString[i].indexOf('receiver_organisation') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&q_fields=receiver_organisation&q=' + vm.q;
      }

      TransactionAggregations.aggregation('receiver_org', 'activity_count', filterString, 'receiver_org', vm.perPage, vm.currentPage).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.receiverOrganisations = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting receiving organisations failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();
  }
})();