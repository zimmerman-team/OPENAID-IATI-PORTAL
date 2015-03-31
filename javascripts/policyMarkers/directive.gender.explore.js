/**
* Countries
* @namespace oipa.activities
*/
(function () {
  'use strict';

  angular
    .module('oipa.policyMarkers')
    .directive('genderExploreBlock', genderExploreBlock);

  genderExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function genderExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'GenderExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/policyMarkers/gender-explore-block.html'
    };

    return directive;
  }
})();