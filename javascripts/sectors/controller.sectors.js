/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsController', SectorsController);

  SectorsController.$inject = ['$scope', 'Aggregations', 'Sectors', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace SectorsController
  */
  function SectorsController($scope, Aggregations, Sectors, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientSectors = [];
    vm.sectors = Sectors;
    vm.selectedSectors = Sectors.selectedSectors;
    vm.currentPage = 1;
    vm.q = '';
    vm.offset = 0;
    vm.limit = 4;
    vm.totalCount = 0;
    vm.filterSelection = FilterSelection;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.sectors.controllers.SectorsController
    */
    function activate() {

      vm.offset = 0;
      vm.update();

      $scope.$watch('vm.q', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.offset = 0;
          vm.currentPage = 1;
          vm.update();
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.offset = 0;
          vm.currentPage = 1;
          vm.update();
        }
      }, true);
    }

    vm.pageChanged = function(newPageNumber){
      vm.currentPage = newPageNumber;
      vm.offset = (newPageNumber * vm.limit) - vm.limit;
      vm.update();
    }

    vm.update = function(){
      // for each active sector, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('sectors__in') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&name_query=' + vm.q;
      }

      Aggregations.aggregation('sector', 'iati-identifier', filterString, 'name', vm.limit, vm.offset, 'activity_count').then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.recipientSectors = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();

  }
})();