/**
* ActivityGeoMapController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivityGeoMapController', ActivityGeoMapController);

  ActivityGeoMapController.$inject = ['$scope', 'leafletData', 'homeUrl'];

  /**
  * @namespace ActivityGeoMapController
  */
  function ActivityGeoMapController($scope, leafletData, homeUrl) {
    var vm = this;

    vm.defaults = {
      tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.088155ee/{z}/{x}/{y}.png',
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
      Hulprelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Hulprelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Overgangsrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Overgangsrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      EXITrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-EXITrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Handelsrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Handelsrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Overige: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Overige"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
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

      for (var i = 0; i < vm.activity.countries.length;i++){
         
        var country = vm.activity.countries[i];

        var partnerType = 'Overige';
        if(partnerlanden[country.code] !== undefined){
          partnerType = partnerlanden[country.code].replace(/\s/g, ''); 
        }

        var location = country.center_longlat.replace('POINT (', '').replace(')', '');
        location = location.split(' ');
        var flag = country.code;
        var flag_lc = flag.toLowerCase();
        vm.markers[country.code] = {
            lat: parseInt(location[1]),
            lng: parseInt(location[0]),
            message: '<span class="flag-icon flag-icon-'+flag_lc+'"></span>'+
                '<h4>'+country.name+'</h4>'+
                '<p><b>Type relatie:</b> '+partnerType+'</p>'+
                '<a class="btn btn-default" href="'+homeUrl+'/landen/'+country.code+'/">Ga naar overzicht land</a>',
            icon: vm.markerIcons[partnerType],
        }
      }
    }

    vm.updateRegionMarkers = function() {

      for (var i = 0; i < vm.activity.regions.length;i++){
         
        var region = vm.activity.regions[i];
        if (!region.center_longlat) return;
        var location = region.center_longlat.replace('POINT (', '').replace(')', '');
        location = location.split(' ');
        vm.markers[region.code] = {
            lat: parseInt(location[1]),
            lng: parseInt(location[0]),
            message: '<h4>'+region.name+'</h4>'+
                '<a class="btn btn-default" href="'+homeUrl+'/regios/'+region.code+'/">Ga naar overzicht regio</a>',
            icon: vm.markerIcons['Overige'],
        }
      }
    }

    activate();
  }
})();