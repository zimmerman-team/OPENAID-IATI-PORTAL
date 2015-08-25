/**
* Countries
* @namespace oipa.activities
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .directive('activityList', activityList);

  activityList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function activityList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'ActivityListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
        searchValue: '=?',
        count: '=?',
        shown: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/activities/activity-list.html'
    };

    return directive;
  }
})();