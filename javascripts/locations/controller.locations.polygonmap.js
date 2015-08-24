controller.locations.polygonmap.js/**
* LocationsGeoMapController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .controller('LocationsGeoMapController', LocationsGeoMapController);

  LocationsGeoMapController.$inject = ['$scope', 'leafletData', 'Aggregations', 'templateBaseUrl', 'homeUrl', 'FilterSelection'];

  /**
  * @namespace LocationsGeoMapController
  */
  function LocationsGeoMapController($scope, leafletData, Aggregations, templateBaseUrl, homeUrl, FilterSelection) {
    var vm = this;

    vm.geoView = "countries";

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
    vm.markers = {};

    vm.filterSelection = FilterSelection;
    vm.selectionString = '';


    function activate() {
      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.selectionString = selectionString;
        vm.updateMap();
      }, true);
    }

    vm.updateMap = function(){

        for(var key in vm.markers){
          vm.markers[key].opacity = 0;
        }

        Aggregations.aggregation('recipient-country', 'iati-identifier', vm.selectionString).then(countrySuccessFn, errorFn);

        // countries

        function countrySuccessFn(data, status, headers, config) {
            vm.updateCountryMarkers(data.data);
        }

        function errorFn(data, status, headers, config) {
            console.log("getting countries failed");
        }
    }

    vm.updateCountryMarkers = function(markerData) {
      
      var selectedCountryRelationMap = {};
      for(var i = 0;i < vm.selectedCountryRelation.length;i++){
        selectedCountryRelationMap[vm.selectedCountryRelation[i]['name'].replace(/\s/g, '')] = true;
      }

      for (var i = 0; i < markerData.length;i++){
         

          if(vm.markers[markerData[i].country_id] !== undefined){
            vm.markers[markerData[i].country_id].opacity = 1;
          } else {

            if(markerData[i].location != null){
              var location = markerData[i].location.substr(6, (markerData[i].location.length - 7));
              location = location.split(' ');
              var flag = markerData[i].country_id;
              var flag_lc = flag.toLowerCase();
              vm.markers[markerData[i].country_id] = {
                lat: parseInt(location[1]),
                lng: parseInt(location[0]),
                message: '<span class="flag-icon flag-icon-'+flag_lc+'"></span>'+
                '<h4>'+markerData[i].name+'</h4>'+
                '<p><b>Activiteiten:</b> '+markerData[i]['activity_count']+'</p>'+
                '<p><b>Totaal budget:</b> XXX</p>'+
                '<p><b>Type relatie:</b> '+partnerType+'</p>'+
                '<a class="btn btn-default" href="'+homeUrl+'/landen/'+markerData[i].country_id+'/">Ga naar overzicht land</a>',
              }
            }
          }
        }

        if(vm.geoView != 'countries' && vm.markers[markerData[i].country_id] !== undefined){
          vm.markers[markerData[i].country_id].opacity = 0;
        }
      }
    }

    activate();
  }
})();