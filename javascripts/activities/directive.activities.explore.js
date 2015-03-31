/**
* Countries
* @namespace oipa.activities
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .directive('activitiesExploreBlock', activitiesExploreBlock);

  activitiesExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function activitiesExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'ActivitiesExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/activities/activities-explore-block.html'
    };

    return directive;
  }
})();