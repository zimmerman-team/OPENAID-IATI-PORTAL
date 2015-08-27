/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activityStatus')
    .controller('ActivityStatusController', ActivityStatusController);

  ActivityStatusController.$inject = ['ActivityStatus', 'templateBaseUrl', 'FilterSelection', 'Filters'];

  /**
  * @namespace ActivityStatusController
  */
  function ActivityStatusController(ActivityStatus, templateBaseUrl, FilterSelection, Filters) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.activityStatuses = [];
    vm.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      // for each active country, get the results
      ActivityStatus.all().then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.activityStatuses = data.data.results;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting activity statuses failed");
      }
    }

    vm.save = function(){
      FilterSelection.save();
    }

  }
})();