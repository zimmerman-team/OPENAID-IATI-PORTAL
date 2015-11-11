/**
* ActivityGeoMapController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityGeoMapController', ActivityGeoMapController);

  ActivityGeoMapController.$inject = ['$scope', 'leafletData', 'homeUrl', 'countryLocations'];

  /**
  * @namespace ActivityGeoMapController
  */
  function ActivityGeoMapController($scope, leafletData, homeUrl, countryLocations) {
    var vm = this;

    vm.defaults = {
      tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.483b5b1a/{z}/{x}/{y}.png',
      maxZoom: 4,
      minZoom: 2,
      attributionControl: false,
      scrollWheelZoom: false,
      continuousWorld: false
    };
    vm.center = {
        lat: 14.505,
        lng: 18.00,
        zoom: 2
    };
    vm.markers = {};
    vm.markerIcons = {
      Aidrelation: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Aidrelation"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Transitionrelation: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Transitionrelation"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      EXITrelation: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-EXITrelation"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Traderelation: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Traderelation"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Other: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Other"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Regiocirkel: { html: '<div class="region-marker-circle"></div>' ,type: 'div',iconSize: [200, 200],iconAnchor: [100, 100],markerColor: 'blue',iconColor: 'white',}
    };

    vm.activity = $scope.activity;


    function activate() {

        $scope.$watch('activity', function(activity){
            if(activity){
                vm.activity = activity;
                vm.updateGeo();
            }
        }, true);
    }

    vm.updateGeo = function(){
        vm.updateCountryMarkers();
        vm.updateRegionMarkers();

        leafletData.getMap().then(function(map) {
            map.fitBounds(vm.getBounds());
        });

    }

    vm.getBounds = function(){
        var minlat = 0;
        var maxlat = 0;
        var minlng = 0;
        var maxlng = 0;
        var first = true;
        for (var marker in vm.markers){

            var value = vm.markers[marker];
            var curlat = value.lat;
            var curlng = value.lng;

            if (first){
                minlat = curlat;
                maxlat = curlat;
                minlng = curlng;
                maxlng = curlng;
            }

            if (curlat < minlat){
                minlat = curlat;
            }
            if (curlat > maxlat){
                maxlat = curlat;
            }
            if (curlng < minlng){
                minlng = curlng;
            }
            if (curlng > maxlng){
                maxlng = curlng;
            }

            first = false;
        }

        return [[minlat, minlng],[maxlat, maxlng]];
    }


    vm.updateCountryMarkers = function() {

      for (var i = 0; i < vm.activity.recipient_countries.length;i++){
         
        var recipient_country = vm.activity.recipient_countries[i];

        var partnerType = 'Other';
        if(partnerlanden[recipient_country.country.code] !== undefined){
          partnerType = partnerlanden[recipient_country.country.code].replace(/\s/g, ''); 
        }

        var location = countryLocations[recipient_country.country.code].location.coordinates;
        var flag = recipient_country.country.code;
        var flag_lc = flag.toLowerCase();
        vm.markers[recipient_country.country.code] = {
            lat: parseInt(location[1]),
            lng: parseInt(location[0]),
            message: '<span class="flag-icon flag-icon-'+flag_lc+'"></span>'+
                '<h4>'+recipient_country.country.name+'</h4>'+
                '<p><b>Relationship type:</b> '+partnerType+'</p>'+
                '<a class="btn btn-default" href="'+homeUrl+'/countries/'+recipient_country.country.code+'/">Go to country overview</a>',
            icon: vm.markerIcons[partnerType],
        }
      }
    }

    vm.updateRegionMarkers = function() {

      for (var i = 0; i < vm.activity.recipient_regions.length;i++){
         
        var region = vm.activity.regions[i];
        if (!region.center_longlat) return;
        var location = countryLocations[recipient_country.country.code].location.coordinates;

        var message = '<h4>'+region.name+'</h4>'+
              '<a class="btn btn-default" href="'+homeUrl+'/regions/'+region.code+'/">Ga naar regio overzicht</a>';

            vm.markers[region.code] = {
              lat: parseInt(location[1]),
              lng: parseInt(location[0]),
              icon: vm.markerIcons['Regiocirkel'],
            }
      }
    }

    activate();
  }
})();