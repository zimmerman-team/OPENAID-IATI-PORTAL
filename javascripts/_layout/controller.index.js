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
    }

    vm.customFields = customFields;
    $scope.hoverIn = function(id){
      vm.customFields[id].hoverShow = true;
    };

    $scope.hoverOut = function(id){
        vm.customFields[id].hoverShow = false;
    };

    vm.top5 = 'recipient-country';
    vm.tableChartOptions = null;
    vm.lineChartOptions = {};
    vm.shownIds = '';
    vm.activityStatus = '2';
    vm.transactionYear = '2015';

    vm.refreshTableChart = false;
    vm.top5Options = {
      'recipient-country': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'recipient-country',
        groupById: 'country_id',
        groupSref: 'countries',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'countries__in'
      },
      'transaction__receiver-org': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'transaction__receiver-org',
        groupById: 'receiver_organisation_id',
        groupSref: 'organisations',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'participating_organisation__in'
      },
      'sector': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'sector',
        groupById: 'sector_id',
        groupSref: 'sectors',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'sectors__in'
      }
    };

    vm.top5ListOptions = {
      'recipient-country': {
        groupBy: 'recipient-country,transaction__transaction-date_year',
        groupById: 'country_id'
      },
      'transaction__receiver-org': {
        groupBy: 'transaction__receiver-org,transaction__transaction-date_year',
        groupById: 'receiver_organisation_id',
      },
      'sector': {
        groupBy: 'sector,transaction__transaction-date_year',
        groupById: 'sector_id',
      }
    };
  }
})();