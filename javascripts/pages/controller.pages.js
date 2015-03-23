/**
* PagesController
* @namespace oipa.pages
*/
(function () {
  'use strict';

  angular
    .module('oipa.pages')
    .controller('PagesController', PagesController);

  PagesController.$inject = ['templateBaseUrl', 'wpAPIResource'];

  /**
  * @namespace PagesController
  */
  function PagesController(templateBaseUrl, wpAPIResource) {
    var vm = this;
    vm.post = '';

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

      function succesFn(){

      }

      function errorFn(){
        
      }
    }

  }
})();