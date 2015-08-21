/**
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
    vm.countryRelation = [
      {'id':1, 'name': 'Hulp relatie'}, 
      {'id':2, 'name': 'Overgangsrelatie'}, 
      {'id':3, 'name': 'EXIT relatie'}, 
      {'id':4, 'name': 'Handelsrelatie'}, 
      {'id':5, 'name': 'Overige'}];
    vm.selectedCountryRelation = [
      {'id':1, 'name': 'Hulp relatie'}, 
      {'id':2, 'name': 'Overgangsrelatie'}, 
      {'id':3, 'name': 'EXIT relatie'}, 
      {'id':4, 'name': 'Handelsrelatie'}, 
      {'id':5, 'name': 'Overige'}];

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
    vm.markerIcons = {
      Hulprelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Hulprelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Overgangsrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Overgangsrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      EXITrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-EXITrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Handelsrelatie: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Handelsrelatie"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
      Overige: { html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle marker-circle-Overige"></div>',type: 'div',iconSize: [28, 35],iconAnchor: [14, 18],markerColor: 'blue',iconColor: 'white',},
    };

    vm.filterSelection = FilterSelection;
    vm.selectionString = '';

    vm.geoView = 'countries';
    vm.resultCounter = 0;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {

      $scope.$watch("vm.selectedCountryRelation", function (selectionString) {
          // if(vm.markerData.length > 0){
          //   vm.updateMarkers();
          // }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.selectionString = selectionString;
        vm.updateMap();
      }, true);
    }



    vm.changeView = function(){
      $scope.geoView = vm.geoView;
      vm.updateMap();
    }

    vm.updateMap = function(){

        for(var key in vm.markers){
          vm.markers[key].opacity = 0;
        }

        Aggregations.aggregation('recipient-country', 'iati-identifier', vm.selectionString).then(countrySuccessFn, errorFn);
        Aggregations.aggregation('recipient-region', 'iati-identifier', vm.selectionString).then(regionSuccessFn, errorFn);

        function countrySuccessFn(data, status, headers, config) {
            vm.updateCountryMarkers(data.data);
        }

        function regionSuccessFn(data, status, headers, config){
            vm.updateRegionMarkers(data.data);
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
         
        var partnerType = 'Overige';
        if(partnerlanden[markerData[i].country_id] !== undefined){
          partnerType = partnerlanden[markerData[i].country_id].replace(/\s/g, ''); 
        }
        
        if (selectedCountryRelationMap[partnerType] !== undefined){

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
                icon: vm.markerIcons[partnerType],
              }
            }
          }
        }

        if(vm.geoView != 'countries' && vm.markers[markerData[i].country_id] !== undefined){
          vm.markers[markerData[i].country_id].opacity = 0;
        }
      }
    }

    vm.updateRegionMarkers = function(markerData) {
      
      for (var i = 0; i < markerData.length;i++){

        if(vm.markers[markerData[i].region_id] !== undefined){
          vm.markers[markerData[i].region_id].opacity = 1;
        } else if(markerData[i].location != null){
          var location = markerData[i].location.substr(6, (markerData[i].location.length - 7));
          location = location.split(' ');
          vm.markers[markerData[i].region_id] = {
            lat: parseInt(location[1]),
            lng: parseInt(location[0]),
            message: '<span class="flag-icon flag-icon-'+markerData[i].region_id+'"></span>'+
            '<h4>'+markerData[i].name+'</h4>'+
            '<p><b>Activiteiten:</b> '+markerData[i]['activity_count']+'</p>'+
            '<p><b>Totaal budget:</b> XXX</p>'+
            '<a class="btn btn-default" href="'+homeUrl+'/regios/'+markerData[i].region_id+'/">Ga naar regio overzicht</a>',
            icon: vm.markerIcons['Overige'],
          }
        }

        if(vm.geoView != 'regions' && vm.markers[markerData[i].region_id] !== undefined){
          vm.markers[markerData[i].region_id].opacity = 0;
        }
      }
    }

    activate();
  }
})();