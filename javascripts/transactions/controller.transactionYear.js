(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('TransactionYearController', TransactionYearController);

  TransactionYearController.$inject = ['$scope', 'FilterSelection', 'Transaction'];

  function TransactionYearController($scope, FilterSelection, Transaction) {

    var vm = this;
    vm.on = false;
    vm.transactionYear = 2015;
    vm.transaction = Transaction;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.budget.controllers.BudgetController
    */
    function activate() {

      $scope.$watch("vm.transactionYear", function (year) {
        Transaction.year.value = year;
      }, true);

      $scope.$watch("vm.on", function (yearOn) {
        Transaction.year.on = yearOn;
      }, true);

      $scope.$watch("vm.transaction.toReset", function (toReset) {
        
        if(toReset == true){
          vm.transactionYear = 2015;
          vm.on = false;
        }
      }, true);
    }

    vm.save = function(){
      FilterSelection.save();
    }

  }
})();