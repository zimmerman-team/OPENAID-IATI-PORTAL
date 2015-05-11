/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivitiesExploreController', ActivitiesExploreController);

  ActivitiesExploreController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace ActivitiesController
  */
  function ActivitiesExploreController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.visualisation_data = null;
    vm.filterSelection = FilterSelection;

    vm.visData = {
      series: ['Activities per year'],
      labels: [],
      data: [
        []
      ]
    };

    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {
      
      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);
    }
    
    vm.update = function(selectionString){

      Aggregations.aggregation('start_planned', 'iati-identifier', selectionString).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        data = vm.reformatData(data.data);
        vm.visData.labels = data.labels;
        vm.visData.data[0] = data.data;
      }

      function errorFn(data, status, headers, config){
        console.warn("error getting data for activities.explore.block");
      }
    }

    vm.reformatData = function(data){
      var formattedData = [];
      var labels = [];

      for(var i = 0; i < data.length;i++){
        if(data[i].start_planned_year != null && data[i].start_planned_year > 1999 && data[i].start_planned_year < 2016){
          labels.push(data[i].start_planned_year);
          formattedData.push(data[i].activity_count);
        }
      }

      for(var i = 2000;i < 2016;i++){
        if (labels.indexOf(i) < 0){
          labels.splice(i - 2000, 0, i);
          formattedData.splice(i - 2000, 0, 0);
        }
      }
      
      return { labels: labels, data: formattedData }
    }

  }
})();