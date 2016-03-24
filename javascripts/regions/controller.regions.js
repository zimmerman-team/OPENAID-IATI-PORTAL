/**
* RegionsController
* @namespace oipa.regions.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionsController', RegionsController);

  RegionsController.$inject = ['$scope', 'Aggregations', 'Regions', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace RegionsController
  */
  function RegionsController($scope, Aggregations, Regions, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientRegions = [];
    vm.regions = Regions;
    vm.selectedRegions = Regions.selectedRegions;
    vm.filterSelection = FilterSelection;
    vm.q = '';
    vm.currentPage = 1;
    vm.page_size = 4;
    vm.totalCount = 0;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.Regions.controllers.RegionsController
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
      vm.update();
    }

    vm.update = function(){
      // for each active region, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('recipient_region') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&q=' + vm.q;
      }

      Aggregations.aggregation('recipient_region', 'count', filterString, 'recipient_region', vm.page_size, vm.currentPage).then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.recipientRegions = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting regions failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();

  }
})();