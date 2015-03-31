/**
* Collection
* @namespace oipa.search.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.search')
    .directive('searchBox', searchBox);

  searchBox.$inject = ['templateBaseUrl'];
  /**
  * @namespace Collection
  */
  function searchBox(templateBaseUrl) {

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
      templateUrl: templateBaseUrl + '/templates/search/search-box.html'
    };

    return directive;
  }
})();