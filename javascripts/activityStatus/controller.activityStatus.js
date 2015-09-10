(function () {
  'use strict';

  angular
    .module('oipa.activityStatus')
    .controller('ActivityStatusController', ActivityStatusController);

  ActivityStatusController.$inject = ['$scope', 'Aggregations', 'ActivityStatus', 'FilterSelection', 'templateBaseUrl'];

  function ActivityStatusController($scope, Aggregations, ActivityStatus, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.activityStatuses = [];
    vm.statuses = ActivityStatus;
    vm.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
    vm.filterSelection = FilterSelection;

    function activate() {

      vm.update();

      $scope.$watch('vm.filterSelection.selectionString', function(valueNew, valueOld){
        if (valueNew !== valueOld){
          vm.update();
        }
      }, true);
    }

    vm.update = function(){
      // for each active activity status, get the results
      var filterString = FilterSelection.selectionString.split('&');
      for(var i = 0;i < filterString.length;i++){
        if (filterString[i].indexOf('activity_status__in') > -1){
          delete filterString[i];
        }
      }
      filterString = filterString.join('&');

      Aggregations.aggregation('activity-status', 'iati-identifier', filterString, 'name', 10, 0, 'activity_count').then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.totalCount = data.data.count;
        vm.activityStatuses = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting activity statuses failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

    activate();

  }
})();