/**
* LoginController
* @namespace ncs.authentication.controllers
*/
(function() {
	'use strict';

	angular
		.module('ncs.authentication.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication'];

	/**
	* @namespace LoginController
	*/
	function LoginController($location, $scope, Authentication){
		var vm = this;

		vm.login = login;

		activate();

		/**
		* @name activate
		* @desc Actions to be performed when this controller is instantiated
		* @memberOf ncs.authentication.controllers.loginController
		*/ 
		function activate() {
			// If the user is authenticated, they should not be here.
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		/**
		* @name login
		* @desc Log the user in 
		* @memberOf ncs.authentication.controllers.LoginController
		*/
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();