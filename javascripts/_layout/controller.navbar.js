/**
* NavbarController
* @namespace oipa.navbar.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'templateBaseUrl', 'homeUrl'];

  /**
  * @namespace NavbarController
  */
  function NavbarController($scope, templateBaseUrl, homeUrl) {
    var vm = this;

    $scope.homeUrl = homeUrl;
    $scope.templateBaseUrl = templateBaseUrl;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.navbar.controllers.NavbarController
    */
    function activate() {
    	
    }
    
  }
})();