/**
* BudgetController
* @namespace oipa.budget.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['$scope', 'Budget', 'FilterSelection'];

  /**
  * @namespace BudgetController
  */
  function BudgetController($scope, Budget, FilterSelection) {
    var vm = this;
    vm.on = true;
    vm.budgetValue = [0,2000000000];
    vm.budget = Budget;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.budget.controllers.BudgetController
    */
    function activate() {

      $scope.$watch("vm.budgetValue", function (budgetValue) {
        Budget.budget.value = budgetValue;
      }, true);

      $scope.$watch("vm.on", function (budgetOn) {
        Budget.budget.on = budgetOn;
      }, true);

      $scope.$watch("vm.budget.toReset", function (toReset) {
        
        if(toReset == true){
          vm.budgetValue = [0,2000000000];
          vm.on = true;
        }
      }, true);
    }

    vm.save = function(){
      FilterSelection.save();
    }


  }
})();