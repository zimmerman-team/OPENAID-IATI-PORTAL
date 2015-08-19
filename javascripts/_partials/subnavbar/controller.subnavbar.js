/**
* TopNavBarController
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .controller('SubNavbarController', SubNavbarController);

  SubNavbarController.$inject = ['$scope', '$state'];

  /**
  * @namespace CountriesController
  */
  function SubNavbarController($scope, $state) {
    var vm = this;
    vm.tabs = $scope.tabs;

    vm.changeTab = function(id){
      $scope.selectedTab = id;
    }
  }
})();