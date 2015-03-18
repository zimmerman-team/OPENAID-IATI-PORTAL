/**
* Register controller
* @namespace ncs.authentication.controllers
*/
(function () {
    'use strict';

    angular
      .module('ncs.authentication.controllers')
      .controller('RegisterController', RegisterController);
    
    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf ncs.authentication.controllers.RegisterController
    */ 
    function activate() {
        // If the user is authenticated, they should not be here.
        if (Authentication.isAuthenticated()) {
            $location.url('/');
        }
    }

    /**
    * @namespace RegisterController
    */
    function RegisterController($location, $scope, Authentication) {
        var vm = this;

        vm.register = register;

        /**
        * @name register
        * @desc Register a new user
        * @memberOf ncs.authentication.controllers.RegisterController
        */
        function register(){
            Authentication.register(vm.email, vm.password, vm.username);
        }
    }
})();

