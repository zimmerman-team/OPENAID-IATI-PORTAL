/**
* RegionsController
* @namespace oipa.regions
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
    vm.q = '';
    vm.offset = 0;
    vm.limit = 4;
    vm.totalCount = 0;
    vm.filterSelection = FilterSelection;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.regions.controllers.RegionsController
    */
    function activate() {

      vm.offset = 0;
      vm.update();

      $scope.$watch('vm.q', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.offset = 0;
          vm.update();
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.offset = 0;
          vm.update();
        }
      }, true);
    }

    vm.pageChanged = function(newPageNumber){
      vm.offset = (newPageNumber * vm.limit) - vm.limit;
      vm.update();
    }

    vm.update = function(){
      // for each active region, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('regions__in') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&name_query=' + vm.q;
      }

      Aggregations.aggregation('recipient-region', 'iati-identifier', filterString, 'name', vm.limit, vm.offset, 'activity_count').then(successFn, errorFn);


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