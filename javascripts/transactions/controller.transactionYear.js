(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('TransactionYearController', TransactionYearController);

  TransactionYearController.$inject = ['$scope', 'FilterSelection', 'Transaction'];

  function TransactionYearController($scope, FilterSelection, Transaction) {
    var vm = this;
    vm.on = false;
    vm.transactionYear = '';
    vm.transaction = Transaction;

    activate();

    function activate() {

      $scope.$watch("vm.transactionYear", function (year) {
        Transaction.year.value = year;
      }, true);

      $scope.$watch("vm.on", function (yearOn) {
        Transaction.year.on = yearOn;
      }, true);

      $scope.$watch("vm.transaction.toReset", function (toReset) {
        if(toReset == true){
          vm.transactionYear = '';
          vm.on = false;
          vm.transaction.toReset = false;
        }
      }, true);
    }

    vm.save = function(){
      FilterSelection.save();
    }

  }
})();