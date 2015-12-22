(function () {
  'use strict';

  angular
    .module('oipa.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['$scope', 'Budget', 'FilterSelection', '$filter'];

  function BudgetController($scope, Budget, FilterSelection, $filter) {
    var vm = this;
    vm.on = false;
    vm.budgetValue = [0,2000000000];
    vm.budget = Budget;

    activate();

    function activate() {

      $scope.$watch("vm.budgetValue", function (budgetValue) {
        Budget.budget.value = budgetValue;

        //tooltip mods
        $('.tooltip-max .currency').html(function(){
          return $filter('shortcurrency')($('.tooltip-max .tooltip-inner').text(),'€');
        });
        $('.tooltip-min .currency').html(function(){
          return $filter('shortcurrency')($('.tooltip-min .tooltip-inner').text(),'€');
        });

      }, true);

      $scope.$watch("vm.on", function (budgetOn) {
        Budget.budget.on = budgetOn;
      }, true);

      $scope.$watch("vm.budget.toReset", function (toReset) {
        if(toReset == true){
          vm.budgetValue = [0,2000000000];
          vm.on = false;
          vm.budget.toReset = false;
        }
      }, true);
    }

    vm.save = function(){
      FilterSelection.save();
    }

  }
})();