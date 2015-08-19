/**
* TopNavBarController
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .controller('SubNavbarController', SubNavbarController);

  SubNavbarController.$inject = ['$scope'];

  /**
  * @namespace CountriesController
  */
  function SubNavbarController($scope) {
    var vm = this;
    vm.tabs = $scope.tabs;

    vm.openTab = function(id){
    console.log(id);
      $scope.selectedTab = id;
    }
  }
})();