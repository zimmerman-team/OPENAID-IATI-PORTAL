/**
* IndexController
* @namespace oipa.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['Filters'];

  /**
  * @namespace IndexController
  */
  function IndexController(Filters) {
    var vm = this;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.layout.IndexController
    */
    function activate() {

    }
  }
})();