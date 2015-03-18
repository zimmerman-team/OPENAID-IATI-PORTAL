/**
* Collection
* @namespace oipa.filters.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.footer.directives')
    .directive('footerArea', footerArea);

  footerArea.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function footerArea(templateBaseUrl) {

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
      templateUrl: templateBaseUrl + '/templates/layout/footer.html'
    };

    return directive;
  }
})();