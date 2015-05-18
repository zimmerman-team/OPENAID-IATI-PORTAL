/**
* IndexController
* @namespace oipa.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$sce'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, $sce) {
    var vm = this;
    vm.customFields = customFields;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.layout.IndexController
    */
    function activate() {
      for (var cf in vm.customFields){
          vm.customFields[cf].hoverShow = false;
          vm.customFields[cf].text = $sce.trustAsHtml(vm.customFields[cf][0]);
      }
    }

    $scope.hoverIn = function(id){
      vm.customFields[id].hoverShow = true;
    };

    $scope.hoverOut = function(id){
        vm.customFields[id].hoverShow = false;
    };

  }
})();