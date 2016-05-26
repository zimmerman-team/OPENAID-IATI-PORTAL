(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['Activities', '$stateParams', 'FilterSelection', '$filter', 'homeUrl', '$http', '$location', 'templateBaseUrl', '$sce'];

  function ActivityController(Activities, $stateParams, FilterSelection, $filter, homeUrl, $http, $location, templateBaseUrl, $sce) {

    var vm = this;
    vm.activity = null;
    vm.activityId = $stateParams.activity_id;
    vm.rsrProjects = [];
    vm.rsrLoading = true;
    vm.templateBaseUrl = templateBaseUrl;
    vm.start_date = null;
    vm.end_date = null;
    vm.start_planned = null;
    vm.start_actual = null;
    vm.end_planned = null;
    vm.end_actual = null;
    vm.pageUrlDecoded = $location.absUrl();
    vm.loading = true;
    vm.implementing_organisations = [];
    vm.accountable_organisations = [];
    vm.funding_organisations = [];
    vm.extending_organisations = [];
    vm.transactionData = [];
    vm.isDGISProject = true;

    vm.selectedTab = 'summary';

    vm.tabs = [
      {'id': 'summary', 'name': 'Summary', 'count': -1},
      {'id': 'transactions', 'name': 'Transactions', 'count': -1},
      {'id': 'fullreport', 'name': 'Detailed report', 'count': -1},
      {'id': 'documents', 'name': 'Documents', 'count': -1},
      {'id': 'partners', 'name': 'Partners', 'count': -1},
      {'id': 'form', 'name': 'Ask a question about this project', 'count': -1},
    ]

    activate();

    function activate() {

      var dgis_identifiers_start_with = ['XM-DAC-7', 'NL-1'];
      if (vm.activityId.indexOf('XM-DAC-7') == -1 && vm.activityId.indexOf('NL-1') == -1){
        vm.isDGISProject = false;
      }

      Activities.get(vm.activityId).then(successFn, errorFn);
      Activities.getTransactions(vm.activityId).then(procesTransactions, errorFn);
      Activities.getProvidedActivities(vm.activityId).then(providedSuccessFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.activity = data.data;
        vm.tabs[3].count = vm.activity.document_links.length;
        vm.makeForm();
        vm.loading = false;
        vm.description = null;
        var desc = '';
        if(vm.activity.descriptions.length){

          for (var i = 0; i < vm.activity.descriptions[0].narratives.length;i++){
            desc += vm.activity.descriptions[0].narratives[i].text + '<br>&nbsp<br>';
          }

          vm.description = $sce.trustAsHtml(desc.replace(/\\n/g, '<br>'));
        }

        for(var i = 0;i < vm.activity.activity_dates.length;i++){
          if(vm.activity.activity_dates[i].type.code == 1){ 
            vm.start_planned = vm.activity.activity_dates[i].iso_date;
          } else if(vm.activity.activity_dates[i].type.code == 2){
            vm.start_actual = vm.activity.activity_dates[i].iso_date;
          } else if(vm.activity.activity_dates[i].type.code == 3){
            vm.end_planned = vm.activity.activity_dates[i].iso_date;
          } else if(vm.activity.activity_dates[i].type.code == 4){
            vm.end_actual = vm.activity.activity_dates[i].iso_date;
          }
        }

        for (var i = 0; i < vm.activity.related_activities.length;i++){
          vm.activity.related_activities[i].name = programmesMapping[vm.activity.related_activities[i].ref];
        }

        for (var i = 0; i < vm.activity.participating_organisations.length;i++){
          if(vm.activity.participating_organisations[i].role.code == '1'){
            vm.funding_organisations.push(vm.activity.participating_organisations[i]);
          }
          if(vm.activity.participating_organisations[i].role.code == '2'){
            vm.accountable_organisations.push(vm.activity.participating_organisations[i]);
          }
          if(vm.activity.participating_organisations[i].role.code == '3'){
            vm.extending_organisations.push(vm.activity.participating_organisations[i]);
          }
          if(vm.activity.participating_organisations[i].role.code == '4'){
            vm.implementing_organisations.push(vm.activity.participating_organisations[i]);
          }
        }

        if(vm.end_actual != null){
          vm.end_date = vm.end_actual;
        } else if(vm.end_planned != null){
          vm.end_date = vm.end_planned;
        } else {
          vm.end_date = 'Data to be added';
        }

        if(vm.start_actual != null){
          vm.start_date = vm.start_actual;
        } else if(vm.start_planned != null){
          vm.start_date = vm.start_planned;
        } else {
          vm.start_date = 'Data to be added';
        }
      }

      function providedSuccessFn(data, status, headers, config){
        vm.providedActivities = data.data.results;
        vm.tabs[4].count = data.data.count;
      }

      function procesTransactions(data, status, headers, config){
        vm.transactionData = angular.copy(data.data.results);
        vm.reformatTransactionData(data.data.results);
      }

      vm.rsrLoading = false;
      // var url = homeUrl + '/wp-admin/admin-ajax.php?action=rsr_call&iati_id=' + vm.activityId;
      
      // return $http.get(url, {}).then(function(data, status, headers, config){
      //   vm.rsrProjects = data.data.objects;
      //   vm.rsrLoading = false;
      //   // vm.tabs[3].count = vm.rsrProjects.length;
      // },function(data, status, headers, config){
      //   //console.log(data);
      // });
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
            key: 'Disbursements',
            color: '#FF7F0E'
        },
      ];

      vm.disbursements = 0;
      vm.budget = 0;

      for (var i =0; i < transactions.length;i++){

        var date = transactions[i].transaction_date;
        var value = transactions[i].value;

        if(transactions[i].transaction_type.code == 2){
          data[0]['values'].push([(new Date(date).getTime()), parseInt(value)]);
          vm.budget += parseInt(value);
        } else if(transactions[i].transaction_type.code == 3 || transactions[i].transaction_type.code == 4){
          data[1]['values'].push([(new Date(date).getTime()), parseInt(value)]);
          vm.disbursements += parseInt(value);
        }
      }

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          } else {
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

      vm.transactionChartData = data;
    }
    
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

    vm.download = function(format){
      var url = homeUrl + '/export/?type=activity-detail&format='+format+'&detail='+vm.activityId;
      window.open(url);
    }

  }
})();