/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['Activities', '$stateParams', 'FilterSelection', '$filter'];

  /**
  * @namespace ActivitiesController
  */
  function ActivityController(Activities, $stateParams, FilterSelection, $filter) {
    var vm = this;
    vm.activity = null;
    vm.activityId = $stateParams.activity_id;

    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'transactions', 'name': 'Transacties', 'count': -1},
      {'id': 'documents', 'name': 'Documenten', 'count': -1},
    ]

    activate();

    function activate() {      
      Activities.get(vm.activityId).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.activity = data.data;
        vm.transactionData = vm.reformatTransactionData();
        vm.tabs[2].count = vm.activity.documents.length;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting activity failed");
      }
    }

    vm.reformatTransactionData = function(){

      var data = [
        {
            values: [],      //values - represents the array of {x,y} data points
            key: 'Verplichtingen', 
            color: '#2077B4'  
        },
        {
            values: [],
            key: 'Uitgaven',
            color: '#FF7F0E'
        },
      ];

      for (var i =0; i < vm.activity.transactions.length;i++){

        if(vm.activity.transactions[i]['transaction_type'] == 'C'){
          data[0]['values'].push([(new Date(vm.activity.transactions[i]['transaction_date']).getTime()), parseInt(vm.activity.transactions[i]['value'])]);
        } else if(vm.activity.transactions[i]['transaction_type'] == 'D'){
          data[1]['values'].push([(new Date(vm.activity.transactions[i]['transaction_date']).getTime()), parseInt(vm.activity.transactions[i]['value'])]);
        }
      }

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }

      data[0]['values'].sort(sortFunction);
      data[1]['values'].sort(sortFunction);

      for (var i = 1; i < data[0]['values'].length;i++){
        data[0]['values'][i][1] += data[0].values[(i-1)][1];
      }

      for (var i = 1; i < data[1]['values'].length;i++){
        data[1]['values'][i][1] += data[1].values[(i-1)][1];
      }

      return data;
    }


    vm.transactionData = [];
    vm.transactionChartOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 85
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        color: d3.scale.category10().range(),
        transitionDuration: 300,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        interpolate: 'monotone',
        xAxis: {
            axisLabel: '',
            tickFormat: function(d) {
              
                return d3.time.format('%Y-%m-%d')(new Date(d))
            },
            showMaxMin: false,
            staggerLabels: true
        },
        yAxis: {
            axisLabel: '',
            tickFormat: function(d){
                return $filter('shortcurrency')(d,'€');
            },
            axisLabelDistance: 20
        }
      }
    };



  }
})();