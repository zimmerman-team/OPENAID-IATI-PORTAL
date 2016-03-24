/**
* IndexController
* @namespace oipa.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$sce', 'FilterSelection'];

  function IndexController($scope, $sce, FilterSelection) {
    var vm = this;

    activate();

    function activate() {

      FilterSelection.reset();

      for (var cf in vm.customFields){
          vm.customFields[cf].hoverShow = false;
          vm.customFields[cf].text = $sce.trustAsHtml(vm.customFields[cf][0]);
      }

      $scope.$watch('vm.top5', function(){
        vm.tableChartOptions = vm.top5Options[vm.top5];
        vm.lineChartOptions = vm.top5ListOptions[vm.top5];
        vm.refreshTableChart = true;
      });

      $scope.$watch('vm.transactionYear', function(){
        vm.refreshTableChart = true;
      });

      $scope.$watch('vm.activityStatus', function(){
        vm.refreshTableChart = true;
      });

      //reactivate carousel
      $('.carousel').carousel({
        pause: "hover"
      });
    }

    vm.customFields = customFields;
    $scope.hoverIn = function(id){
      vm.customFields[id].hoverShow = true;
    };

    $scope.hoverOut = function(id){
        vm.customFields[id].hoverShow = false;
    };

    vm.top5 = 'recipient_country';
    vm.tableChartOptions = null;
    vm.lineChartOptions = {};
    vm.shownIds = '';
    vm.activityStatus = '2';
    vm.transactionYear = '2015';

    vm.refreshTableChart = false;
    vm.top5Options = {
      'recipient_country': {
        aggregationFilters: '&amp;order_by=-disbursement&amp;limit=5',
        groupBy: 'recipient_country',
        groupById: 'code',
        groupSref: 'country',
        aggregationKey: 'count,disbursement',
      },
      'participating_organisation': {
        aggregationFilters: '&amp;order_by=-disbursement&amp;limit=5',
        groupBy: 'participating_organisation',
        groupById: 'ref',
        groupSref: 'organisation',
        aggregationKey: 'disbursement',
      },
      'sector': {
        aggregationFilters: '&amp;order_by=-disbursement&amp;limit=5',
        groupBy: 'sector',
        groupById: 'code',
        groupSref: 'sector',
        aggregationKey: 'disbursement',
      }
    };

    vm.top5ListOptions = {  
      'recipient_country': {
        groupBy: 'recipient_country,transaction_date_year',
        groupById: 'code',
        hasToContain: 'recipient_country'
      },
      'participating_organisation': {
        groupBy: 'participating_organisation,transaction_date_year',
        groupById: 'ref',
        hasToContain: 'participating_organisation'
      },
      'sector': {
        groupBy: 'sector,transaction_date_year',
        groupById: 'code',
        hasToContain: 'sector'
      }
    };
  }
})();