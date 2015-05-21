/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['Activities', '$stateParams'];

  /**
  * @namespace ActivitiesController
  */
  function ActivityController(Activities, $stateParams) {
    var vm = this;
    vm.activity = null;
    vm.activityId = $stateParams.activity_id;
    vm.landPartnerType = '';
    vm.showDetails = false;
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
                return d3.format('r')(d);
            },
            axisLabelDistance: 20
        }
      }
    };

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountryController
    */
    function activate() {
      // for each active country, get the results
      Activities.get(vm.activityId).then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.activity = data.data;
        vm.setPartnerLand();
        vm.transactionData = vm.reformatTransactionData();
      }


      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }

    vm.setPartnerLand = function(){
      if (vm.activity.countries.length > 0){
        if(partnerlanden[vm.activity.countries[0]['code']] !== undefined){
          vm.landPartnerType = partnerlanden[vm.activity.countries[0]['code']];
        } else {
          vm.landPartnerType = 'Overige';
        }
      }
    }

    vm.reformatTransactionData = function(){

      var data = [
        {
            values: [],      //values - represents the array of {x,y} data points
            key: 'Commitments', 
            color: '#2077B4'  
        },
        {
            values: [],
            key: 'Disbursements',
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



  }
})();