/**
* IndexController
* @namespace oipa.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope) {
    var vm = this;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf ncs.layout.controllers.IndexController
    */
    function activate() {
      // Collections.all().then(collectionsSuccessFn, collectionsErrorFn);

      // $scope.$on('filters.created', function (event, collection) {
      //   vm.collections.unshift(collection);
      // });


      // /**
      // * @name collectionsSuccessFn
      // * @desc Update collections array on view
      // */
      // function collectionsSuccessFn(data, status, headers, config) {
      //   vm.collections = data.data;
      // }


      // /**
      // * @name collectionsErrorFn
      // * @desc Show snackbar with error
      // */
      // function collectionsErrorFn(data, status, headers, config) {
      //   Snackbar.error(data.error);
      // }
    }
  }
})();