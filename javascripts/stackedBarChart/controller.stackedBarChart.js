/**
* GenderChartController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.stackedBarChart')
    .controller('StackedBarChartController', StackedBarChartController);

  StackedBarChartController.$inject = ['$scope', 'timeSlider','$http'];

  /**
  * @namespace ActivitiesController
  */
  function StackedBarChartController($scope, timeSlider,$http) {
    var vm = this;
    vm.endpoint = $scope.endpoint;
    vm.groupBy = $scope.groupBy;
    vm.aggregationKey = $scope.aggregationKey;
    vm.useTimeSlider = $scope.timeSlider;
    vm.http = $http;
    vm.jsonData = '';
    vm.dataUrl = $scope.sourceUrl;
    vm.series = ['not targeted','significant objective','principal objective'];

    vm.visData = {
      labels: [],
      datasets: [],

    };

    vm.cachedData = {};
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };



    vm.setOptions = function(group_by, aggregation_key){
        vm.group_by = group_by;
        vm.aggregation_key = aggregation_key;
    }
    
    vm.changeYear = function(year){
     //vm.loadData(year);
      console.log('in change year '+year);      
      if (typeof vm.cachedData[year] !== 'undefined'){
        vm.visData.datasets = vm.cachedData[year];
      }
      else {
          //get the data fot this year
        vm.loadData(year);
        vm.cachedData[year] = vm.visData.datasets;
        console.log(vm.visData);


      }
      vm.loadData(year);
      //stackedBarChart.aggregate('policy_marker', 'significance,year', '', 'iati-identifier').then(succesFn, errorFn); // 1 = policy marker type 1 = Gender Equality

      // function succesFn(data, status, headers, config){
      //   //data = vm.reformatData(data.data);
      //   //vm.visData.labels = data.labels;
      //   //vm.visData.data[0] = data.data;
      // }

      // function errorFn(data, status, headers, config){prima
      //   console.warn('error getting data for activities.explore.block');
      // }
    }
    //vm.changeYear(2014);

    vm.reformatData = function(data){
      //first sum to top categrories
      var name_labels = {
        '11':'onderwijs',
        '12':'gezondheid',
        '13':'bevolkings beleid',
        '14':'water en sanitatie',
        '15':'15 = ?',
        '16':'andere sociale infrastructuur en diensten',
        '21':'transport en opslag',
        '22':'communicatie',
        '23':'energy generatie en aanlevering',
        '24':'economische sectoren',
        '25':'25 ? BUSINESS AND OTHER SERVICES',
        '31':'AGRICULTURE',
        '32':'INDUSTRY',
        '33':'TRADE POLICY AND REGULATIONS AND TRADE-RELATED ADJUSTMENT',
        '41':'General environmental protection',
        '43':'Other multisector',
        '51':'General budget support',
        '52':'Developmental food aid/Food security assistance',
        '53':'Other commodity assistance',
        '60':'ACTION RELATING TO DEBT',
        '72':'Emergency Response',
        '73':'Reconstruction relief and rehabilitation',
        '74':'Disaster prevention and preparedness',
        '91':'ADMINISTRATIVE COSTS OF DONORS',
        '92':'SUPPORT TO NON- GOVERNMENTAL ORGANISATIONS (NGOs)',
        '93':'REFUGEES IN DONOR COUNTRIES',
        '99':'UNALLOCATED/ UNSPECIFIED'
      }
      var summed_data = {};
      for(var i = 0; i < data.length; i++) {
          var label_translated =  name_labels[(data[i]['category_code']+'').substring(0,2)]; 
          if(summed_data[label_translated] == undefined){
            summed_data[label_translated] = {'name':label_translated,"significance":{"not targeted":0.0,"significant objective":0.0,"principal objective":0.0}}
          }
          if(data[i]['significance']["not targeted"] !== undefined){
            summed_data[label_translated]['significance']["not targeted"] += data[i]['significance']["not targeted"];
          }
          
          if(data[i]['significance']["significant objective"] !== undefined){
            summed_data[label_translated]['significance']["significant objective"] += data[i]['significance']["significant objective"];
          }
          
          if(data[i]['significance']["principal objective"] !== undefined){
            summed_data[label_translated]['significance']["principal objective"] += data[i]['significance']["principal objective"];
          }
          
      }
      //reformat dat
      data = [];
      for (var key in summed_data){
        data.push(summed_data[key]);
      }
      var formattedData = {};
      var labels = [];
      /**var datasets = [
                {
                  label:'not targeted',
                  data:[],
                  fillColor: "rgba(220,220,0,0.5)",
                  strokeColor: "rgba(220,220,0,0.8)",
                  highlightFill: "rgba(220,220,0,0.75)",
                  highlightStroke: "rgba(220,220,0,1)"
                },

                {
                  label:'significant objective',
                  data:[],
                  fillColor: "rgba(220,0,220,0.5)",
                  strokeColor: "rgba(220,0,220,0.8)",
                  highlightFill: "rgba(220,0,220,0.75)",
                  highlightStroke: "rgba(220,0,220,1)"
                },

                {
                  label:'principal objective',
                  data:[],
                  fillColor: "rgba(0,220,220,0.5)",
                  strokeColor: "rgba(0,220,220,0.8)",
                  highlightFill: "rgba(0,220,220,0.75)",
                  highlightStroke: "rgba(0,220,220,1)"
                }];
      for(var i = 0; i < data.length; i++) {
          labels.push(data[i]['name'].substring(0,8)+'..');
          if(data[i]['significance']["not targeted"] !== undefined){
            datasets[0]['data'].push(data[i]['significance']["not targeted"])
          }
          else{
            datasets[0]['data'].push(0.0)
          }
          if(data[i]['significance']["significant objective"] !== undefined){
            datasets[1]['data'].push(data[i]['significance']["significant objective"])
          }
          else{
            datasets[1]['data'].push(0.0)
          }
          if(data[i]['significance']["principal objective"] !== undefined){
            datasets[2]['data'].push(data[i]['significance']["principal objective"]) 
          }
          else{
            datasets[2]['data'].push(0.0)
          }
      }
      **/
      var datasets = [
                [],
                [],
                []
                ];
      for(var i = 0; i < data.length; i++) {
          labels.push((data[i]['name']).substring(0,3)+'..');
          //labels.push((data[i]['name']));
          if(data[i]['significance']["not targeted"] !== undefined){
            datasets[0].push(data[i]['significance']["not targeted"])
          }
          else{
            datasets[0].push(0.0)
          }
          if(data[i]['significance']["significant objective"] !== undefined){
            datasets[1].push(data[i]['significance']["significant objective"])
          }
          else{
            datasets[1].push(0.0)
          }
          if(data[i]['significance']["principal objective"] !== undefined){
            datasets[2].push(data[i]['significance']["principal objective"]) 
          }
          else{
            datasets[2].push(0.0)
          }
      }
      console.log(datasets);
      formattedData['labels'] = labels;
      formattedData['datasets'] = datasets;
      return formattedData;
      

      
    }

    vm.loadData = function(year){
      var url = vm.dataUrl+'&year='+year;
      vm.year = year;//set the year so that iT'S AVAILABLE WHEN SWITCHING  policy markers 
      //var url = 'http://localhost:8000/api'+'/v3/policy-marker-sector-list-vis/?format=json'+'&year='+year;
      var data = vm.get(url);
      
    }
    /**
     * @name get
     * @desc Get the data of the aggregation
     * @param {string} url The URL of which the data should be returned
     * @returns {Promise}
     * @memberOf oipa.bubbleChart.BubbleChart
     */
   vm.get = function(url) {
      console.log(url);
      vm.http.get(url, { cache: true }).success(function(data, status, headers, config) {
        //console.log('data is');
        //console.log(data);
        vm.jsonData =  data;
        var formattedData =  vm.reformatData(vm.jsonData);
        vm.visData = formattedData;
        //console.log(vm.visData);

      }).error(function(data, status, headers, config){
        console.log('data not found!');


      });
    }
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {
      //vm.changeYear('2014');
      if(vm.useTimeSlider){

        $scope.service = timeSlider;
        // // watch the timeSlider
        $scope.$watch("service.year", function (newValue) {
          vm.changeYear(newValue);
        }, true);
        
        $scope.$watch("sourceUrl", function (newValue) {
         vm.dataUrl =  $scope.sourceUrl;

          vm.loadData(vm.year);
        }, true);
        

      }
    }

  }
})();