(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('chartWrapper', chartWrapper);

  chartWrapper.$inject = ['templateBaseUrl','$http'];

  function chartWrapper(templateBaseUrl) {

    var directive = {
      restrict: 'E',
      templateUrl: templateBaseUrl + '/templates/charts/chart-wrapper.html'
    };

    return directive;
  }
})();