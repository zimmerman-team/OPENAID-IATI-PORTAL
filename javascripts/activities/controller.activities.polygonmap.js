(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .controller('ActivitiesPolygonGeoMapController', ActivitiesPolygonGeoMapController);

  ActivitiesPolygonGeoMapController.$inject = ['$scope', '$http', 'leafletData', 'TransactionAggregations', 'templateBaseUrl', 'homeUrl', 'FilterSelection', '$filter'];

  /**
  * @namespace ActivitiesPolygonGeoMapController
  */
  function ActivitiesPolygonGeoMapController($scope, $http, leafletData, TransactionAggregations, templateBaseUrl, homeUrl, FilterSelection, $filter) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';

    vm.defaults = {
      tileLayer: 'https://api.mapbox.com/styles/v1/zimmerman2014/ck7u9omkg459k1iryyuve5n0v/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw',
      maxZoom: 4,
      minZoom: 2,
      attributionControl: false,
      scrollWheelZoom: false,
      continuousWorld: false
    };

    vm.center = {
        lat: 14.505,
        lng: 18.00,
        zoom: 3
    };

    vm.legend = {
        position: 'bottomleft',
        colors: [ '#fb6a00', '#fd7f23', '#ffa35f', '#ffc8a0' ],
        labels: [ '> € 100 mln', '€ 25-100 mln', '€ 5-25 mln', '€ 0-5 mln' ]
    };

    vm.geojson = {
      data: null,
    };

    function activate() {

      FilterSelection.reset();

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.selectionString = selectionString;
        vm.updateMap();
      }, true);
    }

    vm.updateMap = function(){

        TransactionAggregations.aggregation('recipient_country', 'activity_count,disbursement', vm.selectionString).then(countrySuccessFn, errorFn);

        function countrySuccessFn(data, status, headers, config) {
            vm.updateCountryPolygons(data.data.results);
        }

        function errorFn(data, status, headers, config) {
            console.log("getting countries failed");
        }
    }

    vm.updateCountryPolygons = function(data) {

        var formattedCD = {
          type: "FeatureCollection",
          features: []
        };
        for(var i = 0;i < data.length;i++){
          var country = namedGeoJson[data[i].recipient_country.code];
          country.properties.project_amount = data[i].activity_count;
          country.properties.total_disbursements = data[i].disbursement;
          formattedCD.features.push(country);
        }
        vm.geojson.data = formattedCD;
    }

    activate();
  }
})();
