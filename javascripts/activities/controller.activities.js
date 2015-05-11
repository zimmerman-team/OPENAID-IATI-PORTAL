/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivitiesController', ActivitiesController);

  ActivitiesController.$inject = ['Activities'];

  /**
  * @namespace ActivitiesController
  */
  function ActivitiesController(Activities) {
    var vm = this;

    vm.activities = null;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivitySTatusController
    */
    function activate() {

    }


  }
})();