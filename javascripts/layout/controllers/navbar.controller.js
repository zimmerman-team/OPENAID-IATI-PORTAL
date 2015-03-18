/**
* NavbarController
* @namespace oipa.layout.controllers
*/
(function () {
	'use strict';

	angular
		.module('oipa.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope'];

	/** 
	* @namespace NavBarController
	*/
	function NavbarController($scope){
		var vm = this;

		// vm.logout = logout;

		/**
	    * @name logout
	    * @desc Log the user out
	    * @memberOf oipa.layout.controllers.NavbarController
	    */
		// function logout(){
		// 	Authentication.logout();
		// }
	}

})();