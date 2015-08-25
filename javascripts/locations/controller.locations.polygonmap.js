/**
* LocationsPolygonGeoMapController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .controller('LocationsPolygonGeoMapController', LocationsPolygonGeoMapController);

  LocationsPolygonGeoMapController.$inject = ['$scope', 'leafletData', 'Aggregations', 'templateBaseUrl', 'homeUrl', 'FilterSelection'];

  /**
  * @namespace LocationsGeoMapController
  */
  function LocationsPolygonGeoMapController($scope, leafletData, Aggregations, templateBaseUrl, homeUrl, FilterSelection) {
    var vm = this;
    vm.geojsonData = {"type":"FeatureCollection","features":[{"type":"Feature","id":"JPN","properties":{"name":"Japan"},"geometry":{"type":"MultiPolygon","coordinates":[[[[134.638428,34.149234],[134.766379,33.806335],[134.203416,33.201178],[133.79295,33.521985],[133.280268,33.28957],[133.014858,32.704567],[132.363115,32.989382],[132.371176,33.463642],[132.924373,34.060299],[133.492968,33.944621],[133.904106,34.364931],[134.638428,34.149234]]],[[[140.976388,37.142074],[140.59977,36.343983],[140.774074,35.842877],[140.253279,35.138114],[138.975528,34.6676],[137.217599,34.606286],[135.792983,33.464805],[135.120983,33.849071],[135.079435,34.596545],[133.340316,34.375938],[132.156771,33.904933],[130.986145,33.885761],[132.000036,33.149992],[131.33279,31.450355],[130.686318,31.029579],[130.20242,31.418238],[130.447676,32.319475],[129.814692,32.61031],[129.408463,33.296056],[130.353935,33.604151],[130.878451,34.232743],[131.884229,34.749714],[132.617673,35.433393],[134.608301,35.731618],[135.677538,35.527134],[136.723831,37.304984],[137.390612,36.827391],[138.857602,37.827485],[139.426405,38.215962],[140.05479,39.438807],[139.883379,40.563312],[140.305783,41.195005],[141.368973,41.37856],[141.914263,39.991616],[141.884601,39.180865],[140.959489,38.174001],[140.976388,37.142074]]],[[[143.910162,44.1741],[144.613427,43.960883],[145.320825,44.384733],[145.543137,43.262088],[144.059662,42.988358],[143.18385,41.995215],[141.611491,42.678791],[141.067286,41.584594],[139.955106,41.569556],[139.817544,42.563759],[140.312087,43.333273],[141.380549,43.388825],[141.671952,44.772125],[141.967645,45.551483],[143.14287,44.510358],[143.910162,44.1741]]]]}}]};
    vm.templateBaseUrl = templateBaseUrl;
    vm.defaults = {
      tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.088155ee/{z}/{x}/{y}.png',
      maxZoom: 12,
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

    function getColor(d) {
        return d > 10 ? '#0f567c' :
               d > 8  ? '#045A8D' :
               d > 6  ? '#176792' :
               d > 4   ? '#2476A2' :
               d > 2   ? '#2B8CBE' :
               d > 0    ? '#65a8cf' :
                          'transparent';
    }

    function getWeight(d) {
        return d > 0  ? 1 : 0;
    }

    function style(feature) {
        return {
            fillColor: '#0f567c',
            weight: 2,
            opacity: 1,
            color: '#FFF',
            dashArray: '',
            fillOpacity: 0.7
        };
    }

    vm.geojson = {
        data: {"type":"FeatureCollection","features":[{"type":"Feature","id":"JPN","properties":{"name":"Japan"},"geometry":{"type":"MultiPolygon","coordinates":[[[[134.638428,34.149234],[134.766379,33.806335],[134.203416,33.201178],[133.79295,33.521985],[133.280268,33.28957],[133.014858,32.704567],[132.363115,32.989382],[132.371176,33.463642],[132.924373,34.060299],[133.492968,33.944621],[133.904106,34.364931],[134.638428,34.149234]]],[[[140.976388,37.142074],[140.59977,36.343983],[140.774074,35.842877],[140.253279,35.138114],[138.975528,34.6676],[137.217599,34.606286],[135.792983,33.464805],[135.120983,33.849071],[135.079435,34.596545],[133.340316,34.375938],[132.156771,33.904933],[130.986145,33.885761],[132.000036,33.149992],[131.33279,31.450355],[130.686318,31.029579],[130.20242,31.418238],[130.447676,32.319475],[129.814692,32.61031],[129.408463,33.296056],[130.353935,33.604151],[130.878451,34.232743],[131.884229,34.749714],[132.617673,35.433393],[134.608301,35.731618],[135.677538,35.527134],[136.723831,37.304984],[137.390612,36.827391],[138.857602,37.827485],[139.426405,38.215962],[140.05479,39.438807],[139.883379,40.563312],[140.305783,41.195005],[141.368973,41.37856],[141.914263,39.991616],[141.884601,39.180865],[140.959489,38.174001],[140.976388,37.142074]]],[[[143.910162,44.1741],[144.613427,43.960883],[145.320825,44.384733],[145.543137,43.262088],[144.059662,42.988358],[143.18385,41.995215],[141.611491,42.678791],[141.067286,41.584594],[139.955106,41.569556],[139.817544,42.563759],[140.312087,43.333273],[141.380549,43.388825],[141.671952,44.772125],[141.967645,45.551483],[143.14287,44.510358],[143.910162,44.1741]]]]}}]},
        style: {
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'green',
            dashArray: '',
            fillOpacity: 0.7
        }
    };

    
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';

    function activate() {


      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.selectionString = selectionString;
        vm.updateMap();
      }, true);
    }

    vm.updateMap = function(){

        Aggregations.aggregation('recipient-country', 'iati-identifier', vm.selectionString).then(countrySuccessFn, errorFn);

        function countrySuccessFn(data, status, headers, config) {
            vm.updateCountryPolygons(data.data.results);
        }

        function errorFn(data, status, headers, config) {
            console.log("getting countries failed");
        }
    }

    vm.updateCountryPolygons = function(countryData) {

        // var formattedCD = {};

        // for(var i = 0;i < countryData.length;i++){
        //     formattedCD[countryData[i].country_id] = countryData[i].activity_count;
        // }

        // // countries
        // for(var i = 0;i < vm.geojsonData.features.length;i++){
        //     if(formattedCD[vm.geojsonData.features[i].id] != undefined){
        //         vm.geojsonData.features[i].properties.project_amount = formattedCD[vm.geojsonData.features[i].id].project_amount;
        //     } else {
        //         vm.geojsonData.features[i].properties.project_amount = 0;
        //     }
        // }
        // console.log(vm.geojsonData);
        // vm.geojson.data = vm.geojsonData;
    }

    activate();
  }
})();