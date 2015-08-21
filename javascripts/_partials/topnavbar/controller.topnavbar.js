/**
* TopNavBarController
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .controller('TopNavbarController', TopNavbarController);

  TopNavbarController.$inject = ['$scope', '$state'];

  /**
  * @namespace CountriesController
  */
  function TopNavbarController($scope, $state) {
    var vm = this;
    vm.searchValue = '';
    vm.selectedView = '';
    vm.views = $scope.views;

    activate();

    function activate() {

      if($scope.views.length > 0){
        vm.selectedView = $scope.views[0]['id'];
      }

      $scope.$watch('vm.searchValue', function(){
        $scope.searchValue = vm.searchValue;
      });
    }

    vm.changeView = function(){
      $state.go(vm.selectedView);
    }

    vm.submitForm = function(){
      $scope.submitSearch = true;
    }



  }
})();