/**
* Collection
* @namespace oipa.toolbar.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.toolbar.directives')
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
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/toolbar/tool-bar.html'
    };

    return directive;
  }
})();