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
    vm.activity_id = $stateParams.activity_id;
    
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountryController
    */
    function activate() {
      // for each active country, get the results
      Activities.get(vm.activity_id).then(successFn, errorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function successFn(data, status, headers, config) {
        vm.activity = data.data;
      }


      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }

  }
})();