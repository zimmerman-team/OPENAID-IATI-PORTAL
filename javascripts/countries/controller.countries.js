/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesController', CountriesController);

  CountriesController.$inject = ['$scope', 'Aggregations', 'Countries', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesController
  */
  function CountriesController($scope, Aggregations, Countries, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientCountries = [];
    vm.countries = Countries;
    vm.selectedCountries = Countries.selectedCountries;
    vm.currentPage = 1;
    vm.q = '';
    vm.offset = 0;
    vm.limit = 4;
    vm.totalCount = 0;
    vm.filterSelection = FilterSelection;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
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
      // for each active country, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('countries__in') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');
      
      if(vm.q != ''){
        filterString += '&name_query=' + vm.q;
      }

      Aggregations.aggregation('recipient-country', 'iati-identifier', filterString, 'name', vm.limit, vm.offset, 'activity_count').then(successFn, errorFn);


      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.recipientCountries = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();

  }
})();