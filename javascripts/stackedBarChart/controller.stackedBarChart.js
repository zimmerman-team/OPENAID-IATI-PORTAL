/**
* GenderChartController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.stackedBarChart')
    .controller('StackedBarChartController', StackedBarChartController);

  StackedBarChartController.$inject = ['$scope', 'timeSlider'];

  /**
  * @namespace ActivitiesController
  */
  function StackedBarChartController($scope, timeSlider) {
    var vm = this;
    vm.endpoint = $scope.endpoint;
    vm.groupBy = $scope.groupBy;
    vm.aggregationKey = $scope.aggregationKey;
    vm.useTimeSlider = $scope.timeSlider;
    

    vm.visData = {
      labels: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7"],
      datasets: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ]
    };

    vm.cachedData = {
      '2000': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2001': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2002': [
        [6, 2, 7, 6, 5, 22, 33],
        [55, 21, 27, 50, 60, 17, 100]
      ],
      '2003': [
        [35, 44, 55, 65, 33, 55, 22],
        [18, 42, 34, 44, 77, 45, 88]
      ],
      '2004': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2005': [
        [44, 33, 22, 33, 44, 55, 66],
        [14, 16, 15, 71, 14, 51, 61]
      ],
      '2006': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2007': [
        [6, 2, 7, 6, 5, 22, 33],
        [55, 21, 27, 50, 60, 17, 100]
      ],
      '2008': [
        [35, 44, 55, 65, 33, 55, 22],
        [18, 42, 34, 44, 77, 45, 88]
      ],
      '2009': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2010': [
        [44, 33, 22, 33, 44, 55, 66],
        [14, 16, 15, 71, 14, 51, 61]
      ],
      '2011': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2012': [
        [6, 2, 7, 6, 5, 22, 33],
        [55, 21, 27, 50, 60, 17, 100]
      ],
      '2013': [
        [35, 44, 55, 65, 33, 55, 22],
        [18, 42, 34, 44, 77, 45, 88]
      ],
      '2014': [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      '2015': [
        [44, 33, 22, 33, 44, 55, 66],
        [14, 16, 15, 71, 14, 51, 61]
      ],
    }

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
      if(vm.useTimeSlider){

        $scope.service = timeSlider;

        // // watch the timeSlider
        $scope.$watch("service.year", function (newValue) {
          vm.changeYear(newValue);
        }, true);
      }
    }

    vm.setOptions = function(group_by, aggregation_key){
        vm.group_by = group_by;
        vm.aggregation_key = aggregation_key;
    }
    
    vm.changeYear = function(year){
      
      if (typeof vm.cachedData[year] !== 'undefined'){
        vm.visData.datasets = vm.cachedData[year];
      }

      //stackedBarChart.aggregate('policy_marker', 'significance,year', '', 'iati-identifier').then(succesFn, errorFn); // 1 = policy marker type 1 = Gender Equality

      // function succesFn(data, status, headers, config){
      //   //data = vm.reformatData(data.data);
      //   //vm.visData.labels = data.labels;
      //   //vm.visData.data[0] = data.data;
      // }

      // function errorFn(data, status, headers, config){
      //   console.warn('error getting data for activities.explore.block');
      // }
    }

    vm.reformatData = function(data){
      
    }

  }
})();