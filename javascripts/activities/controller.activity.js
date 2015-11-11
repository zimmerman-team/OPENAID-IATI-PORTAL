/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['Activities', '$stateParams', 'FilterSelection', '$filter', 'homeUrl', '$http', 'templateBaseUrl'];

  /**
  * @namespace ActivitiesController
  */
  function ActivityController(Activities, $stateParams, FilterSelection, $filter, homeUrl, $http, templateBaseUrl) {
    var vm = this;
    vm.activity = null;
    vm.activityId = $stateParams.activity_id;
    vm.rsrProjects = [];
    vm.rsrLoading = true;
    vm.templateBaseUrl = templateBaseUrl;

    vm.selectedTab = 'summary';

    vm.tabs = [
      {'id': 'summary', 'name': 'Summary', 'count': -1},
      {'id': 'transactions', 'name': 'Transactions', 'count': -1},
      {'id': 'documents', 'name': 'Documents', 'count': -1},
      {'id': 'thirdparty', 'name': 'Third-party data', 'count': -1},
    ]

    activate();

    function activate() {      
      Activities.get(vm.activityId).then(successFn, errorFn);
      Activities.getTransactions(vm.activityId).then(procesTransactions, errorFn);

      function successFn(data, status, headers, config) {
        vm.activity = data.data;
        vm.tabs[2].count = vm.activity.document_links.length;
      }

      function procesTransactions(data, status, headers, config){
        vm.transactionData = vm.reformatTransactionData(data.data.results);
      }

      function errorFn(data, status, headers, config) {
        console.log("getting activity failed");
      }

      var url = homeUrl + '/wp-admin/admin-ajax.php?action=rsr_call&iati_id=' + vm.activityId;
      
      return $http.get(url, {}).then(function(data, status, headers, config){
        vm.rsrProjects = data.data.objects;
        vm.rsrLoading = false;
        vm.tabs[3].count = vm.rsrProjects.length;
      },function(data, status, headers, config){
        console.log(data);
      });

    }

    vm.reformatTransactionData = function(transactions){

      var data = [
        {
            values: [],
            key: 'Commitment', 
            color: '#2077B4'  
        },
        {
            values: [],
            key: 'Expenditure',
            color: '#FF7F0E'
        },
      ];
      for (var i =0; i < transactions.length;i++){

        if(transactions[i].transaction_type.code == '2'){
          data[0]['values'].push([(new Date(transactions[i].transaction_date).getTime()), parseInt(transactions[i]['value'])]);
        } else if(transactions[i]['transaction_type'] == '3'){
          data[1]['values'].push([(new Date(transactions[i].transaction_date).getTime()), parseInt(transactions[i]['value'])]);
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
        interpolate: 'step',
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