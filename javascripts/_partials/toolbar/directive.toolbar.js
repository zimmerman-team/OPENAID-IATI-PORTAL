/**
* Collection
* @namespace oipa.toolbar
*/
(function () {
  'use strict';

  angular
    .module('oipa.toolbar')
    .directive('toolBar', toolBar);

  toolBar.$inject = ['templateBaseUrl'];
  /**
  * @namespace Collection
  */
  function toolBar(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.directives.Collection
    */
    var directive = {
      restrict: 'E',
      templateUrl: templateBaseUrl + '/templates/_partials/toolbar/tool-bar.html'
    };

    return directive;
  }
})();
