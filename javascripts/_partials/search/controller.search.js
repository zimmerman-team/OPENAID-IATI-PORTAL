/**
* SearchController
* @namespace oipa.search
*/
(function () {
  'use strict';

  angular
    .module('oipa.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', '$state', 'Aggregations', 'Activities', 'templateBaseUrl'];

  /**
  * @namespace SearchController
  */
  function SearchController($scope, $state, Aggregations, Activities, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.searchString = '';
    vm.showResults = false;

    vm.searchData = {
      'activities': {'total': 0, 'data': [], 'loaded': false},
      'countries': {'total': 0, 'data': [], 'loaded': false},
      'regions': {'total': 0, 'data': [], 'loaded': false},
      'sectors': {'total': 0, 'data': [], 'loaded': false},
      'organisations': {'total': 0, 'data': [], 'loaded': false},
    }

    vm.submit = function(){
      // set parameter search and go to search results page
      $state.go('search');
    }

    vm.search = function(){

      if(vm.searchString.length < 2){
        vm.showResults = false;
        return false;
      }

      function errorFn(data, status, headers, config){
        console.log(data);
      }

      // reset previous search, show results box with loaders
      for (var item in vm.searchData){
        vm.searchData[item].loaded = false;
        vm.searchData[item].data = [];
        vm.searchData[item].total = 0;
      }

      vm.showResults = true;

      // get results from activities
      Activities.list('&query='+vm.searchString, 3, 'total_budget', 0).then(function(data, status, headers, config){
        vm.searchData.activities.data = data.data.objects;
        vm.searchData.activities.total = data.data.meta.total_count;
        vm.searchData.activities.loaded = true;
      }, errorFn);

      // get results from countries aggregation
      Aggregations.aggregation('recipient-country', 'iati-identifier', '&name_query=' + vm.searchString).then(function(data, status, headers, config){
        vm.searchData.countries.data = data.data.slice(0,3);
        vm.searchData.countries.total = data.data.length;
        vm.searchData.countries.loaded = true;
      }, errorFn);

      // get results from regions aggregation
      Aggregations.aggregation('recipient-region', 'iati-identifier', '&name_query=' + vm.searchString).then(function(data, status, headers, config){
        vm.searchData.regions.data = data.data.slice(0,3);
        vm.searchData.regions.total = data.data.length;
        vm.searchData.regions.loaded = true;
      }, errorFn);

      // get results from sectors aggregation
      Aggregations.aggregation('sector', 'iati-identifier', '&name_query=' + vm.searchString).then(function(data, status, headers, config){
        vm.searchData.sectors.data = data.data.slice(0,3);
        vm.searchData.sectors.total = data.data.length;
        vm.searchData.sectors.loaded = true;
      }, errorFn);

      // get results from organisations aggregation
      Aggregations.aggregation('transaction__receiver-org', 'iati-identifier', '&name_query=' + vm.searchString).then(function(data, status, headers, config){
        vm.searchData.organisations.data = data.data.slice(0,3);
        vm.searchData.organisations.total = data.data.length;
        vm.searchData.organisations.loaded = true;
      }, errorFn);
    }

  }
})();