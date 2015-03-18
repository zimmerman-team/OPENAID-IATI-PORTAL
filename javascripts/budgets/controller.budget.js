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
  function BudgetController($scope, Budget) {
    var vm = this;

    $scope.demo1 = {
      min: 0,
      max: 10000000
    };

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