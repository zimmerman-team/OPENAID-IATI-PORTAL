/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activityStatus')
    .controller('ActivityStatusController', ActivityStatusController);

  ActivityStatusController.$inject = ['ActivityStatus', 'templateBaseUrl'];

  /**
  * @namespace ActivityStatusController
  */
  function ActivityStatusController(ActivityStatus, templateBaseUrl) {
    var vm = this;

    vm.templateBaseUrl = templateBaseUrl;
    vm.activityStatuses = null;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {
      var data = ActivityStatus.all();
      vm.activityStatuses = data.results;
    }

  }
})();