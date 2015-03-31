/**
* GenderExploreController
* @namespace oipa.policyMarker
*/
(function () {
  'use strict';

  angular
    .module('oipa.policyMarkers')
    .controller('GenderExploreController', GenderExploreController);

  GenderExploreController.$inject = ['$scope', 'PolicyMarkers', 'FilterSelection'];

  /**
  * @namespace ActivitiesController
  */
  function GenderExploreController($scope, PolicyMarkers, FilterSelection) {
    var vm = this;
    vm.visualisation_data = null;
    vm.selectionString = FilterSelection.selectionString;

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
      
      $scope.$watch("vm.selectionString", function (newValue) {
          vm.update();
      }, true);
    }
    
    vm.update = function(data){
      
      console.log('oipa.gender.explore.update called');
      PolicyMarkers.aggregation('year', 'start_planned', 'iati-identifier').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        data = vm.reformatData(data.data);
        vm.visData.labels = data.labels;
        vm.visData.data[0] = data.data;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activities.explore.block');
      }
    }

    vm.reformatData = function(data){
      var formattedData = [];
      var labels = [];

      for(var i = 0; i < data.length;i++){
        if(data[i].group_field != null && data[i].group_field > 1999 && data[i].group_field < 2016){
          labels.push(data[i].group_field);
          formattedData.push(data[i].aggregation_field);
        }
      }

      return { labels: labels, data: formattedData }
    }

    

  }
})();