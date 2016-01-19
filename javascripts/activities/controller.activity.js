/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['Activities', '$stateParams', 'FilterSelection', '$filter', 'homeUrl', '$http', '$location', 'templateBaseUrl'];

  /**
  * @namespace ActivitiesController
  */
  function ActivityController(Activities, $stateParams, FilterSelection, $filter, homeUrl, $http, $location, templateBaseUrl) {
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
      {'id': 'fullreport', 'name': 'Detailed report', 'count': -1},
      {'id': 'documents', 'name': 'Documents', 'count': -1},
      {'id': 'thirdparty', 'name': 'Third-party data', 'count': -1},
      {'id': 'form', 'name': 'Ask a question about this project', 'count': -1},
    ]

    activate();

    function activate() {      
      Activities.get(vm.activityId).then(successFn, errorFn);
      Activities.getProvidedActivities(vm.activityId).then(providedSuccessFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.activity = data.data;
        vm.transactionData = vm.reformatTransactionData();
        vm.tabs[3].count = vm.activity.documents.length;
        vm.makeForm();
      }
      function providedSuccessFn(data, status, headers, config){
        vm.providedActivities = data.data.results;
        vm.tabs[4].count = data.data.count;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting activity failed");
      }

      var url = homeUrl + '/wp-admin/admin-ajax.php?action=rsr_call&iati_id=' + vm.activityId;
      
      return $http.get(url, {}).then(function(data, status, headers, config){
        vm.rsrProjects = data.data.objects;
        vm.rsrLoading = false;
        // vm.tabs[3].count = vm.rsrProjects.length;
      },function(data, status, headers, config){
        //console.log(data);
      });

    }

    vm.reformatTransactionData = function(){

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

    //form gebeuren
    vm.onSubmit = onSubmit;
    vm.errored = false;
    vm.submitted = false;
    vm.model = {};
    vm.fields = '';

    vm.makeForm = function(){
      // funcation assignment      
      vm.fields = [
        {
          key: 'iati_id',
          type: 'input',
          defaultValue: vm.activity.iati_identifier,
          templateOptions: {
            label: 'IATI Identifier',
            required: true,
            disabled: true
          }
        },
        {
          key: 'first_name',
          type: 'input',
          templateOptions: {
            label: 'First name',
            placeholder: 'Enter your first name...',
            required: true
          }
        },
        {
          key: 'last_name',
          type: 'input',
          templateOptions: {
            label: 'Surname',
            placeholder: 'Enter your surname...',
            required: true
          }
        },
        {
          key: 'organisation',
          type: 'input',
          templateOptions: {
            label: 'Organisation',
            placeholder: 'Enter your organisation\'s name...'
          }
        },
              {
          key: 'email',
          type: 'input',
          templateOptions: {
            label: 'Email',
            placeholder: 'Enter your email address...',
            type: 'email',
            required: true
          }
        },
        {
          key: 'phone',
          type: 'input',
          templateOptions: {
            label: 'Phone',
            placeholder: 'Enter your phone number...'
          }
        },
        {
          key: 'message',
          type: 'textarea',
          templateOptions: {
            label: 'Message',
            placeholder: 'Enter your questions, comments or complaints...',
            required: true,
            rows: 10
          }
        },
      ];

    };

    // function definition
    function onSubmit() {

      $http.post(homeUrl + '/wp-admin/admin-ajax.php?action=angular_form', JSON.stringify(vm.model)).then(successCallback, errorCallback);
      function successCallback(data, status, headers, config){
          if (data.statusText == "OK") {
            vm.submitted = true;
            vm.errored = false;
          }
          else {
            vm.errored = true;
          }
      }
      function errorCallback(data, status, headers, config){
          vm.errored = true;
      }
    }


  }
})();