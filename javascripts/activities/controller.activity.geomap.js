/**
* ActivityGeoMapController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityGeoMapController', ActivityGeoMapController);

  ActivityGeoMapController.$inject = ['$scope', 'leafletData', 'homeUrl', 'Countries', 'Regions'];

  /**
  * @namespace ActivityGeoMapController
  */
  function ActivityGeoMapController($scope, leafletData, homeUrl, Countries, Regions) {
    var vm = this;

    vm.defaults = {
      tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.deb5109d/{z}/{x}/{y}.png',
      maxZoom: 4,
      minZoom: 2,
      attributionControl: false,
      scrollWheelZoom: false,
      continuousWorld: false
    };
    vm.center = {
        lat: -59.204,
        lng: -131.484,
        zoom: 8
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
        vm.setPosition(7);
    }

    vm.setPosition = function(max_zoom){
      leafletData.getMap().then(function(map) {
          map.fitBounds(vm.getBounds());
          if(map._zoom > max_zoom){
            map.setZoom(max_zoom);
          }
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

      if (vm.activity.recipient_countries.length != 0) {
        for (var i = 0; i < vm.activity.recipient_countries.length;i++){
          Countries.getCountry(vm.activity.recipient_countries[i].country.code).then(successFn, errorFn);
        }
      }

      function successFn(data, status, headers, config) {
        var partnerType = 'Other';
        if(partnerlanden[data.data.code] !== undefined){
          partnerType = partnerlanden[data.data.code].replace(/\s/g, ''); 
        }
        var flag = data.data.code;
        var flag_lc = flag.toLowerCase();

        vm.markers[data.data.code] = {
            lat: parseFloat(data.data.location.coordinates[1]),
            lng: parseFloat(data.data.location.coordinates[0]),
            message: '<span class="flag-icon flag-icon-'+flag_lc+'"></span>'+
                '<h4>'+data.data.name+'</h4>'+
                '<p><b>Relationship type:</b> '+partnerType+'</p>'+
                '<a class="btn btn-default" href="'+homeUrl+'/countries/'+data.data.code+'/">Go to country overview</a>',
            icon: vm.markerIcons[partnerType],
        }
        vm.setPosition(5);
      }
    }

    vm.updateRegionMarkers = function() {

      if (vm.activity.recipient_regions.length != 0) {
        for (var i = 0; i < vm.activity.recipient_regions.length;i++){
          Regions.getRegion(vm.activity.recipient_regions[i].region.code).then(successFn, errorFn);
        }
      }

      function successFn(data, status, headers, config) {
        vm.markers[data.data.code] = {
            lat: parseFloat(data.data.location.coordinates[1]),
            lng: parseFloat(data.data.location.coordinates[0]),
            message: '<h4>'+data.data.name+'</h4>'+
              '<a class="btn btn-default" href="'+homeUrl+'/regions/'+data.data.code+'/">Ga naar regio overzicht</a>',
            icon: vm.markerIcons['Regiocirkel'],
        }
        vm.setPosition(5);
      }
    }

    activate();
  }
})();