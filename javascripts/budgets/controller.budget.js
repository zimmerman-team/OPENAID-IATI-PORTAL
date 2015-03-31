/**
* BudgetController
* @namespace oipa.budget.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['$scope', 'Budget'];

  /**
  * @namespace BudgetController
  */
  function BudgetController(Budget) {
    var vm = this;

    

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.budget.controllers.BudgetController
    */
    function activate() {
  
    }


  }
})();