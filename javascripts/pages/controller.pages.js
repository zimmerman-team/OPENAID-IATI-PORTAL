/**
* PagesController
* @namespace oipa.pages
*/
(function () {
  'use strict';

  angular
    .module('oipa.pages')
    .controller('PagesController', PagesController);

  PagesController.$inject = ['templateBaseUrl', 'wpAPIResource', 'homeUrl', '$location'];

  /**
  * @namespace PagesController
  */
  function PagesController(templateBaseUrl, wpAPIResource, homeUrl, $location) {
    var vm = this;
    vm.post = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.pages.PagesController
    */
    function activate() {
      // var test = wpAPIResource.get( {
      //     param1: 'posts',
      //     param2: 3
      // } ).then(succesFn, errorFn);
      // console.log(test);

      vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
      vm.shareDescription = encodeURIComponent('View the Aid projects of the Dutch Ministry of Foreign Affairs on ' + vm.pageUrlDecoded);

      function succesFn(){

      }

      function errorFn(){
        
      }
    }

  }
})();