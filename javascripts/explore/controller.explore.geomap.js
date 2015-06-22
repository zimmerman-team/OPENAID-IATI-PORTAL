/**
* ExploreGeoMapController
* @namespace oipa.explore
*/
(function () {
  'use strict';

  angular
    .module('oipa.explore')
    .controller('ExploreGeoMapController', ExploreGeoMapController);

  ExploreGeoMapController.$inject = ['$scope', 'leafletData', 'Aggregations', 'templateBaseUrl', 'homeUrl', 'FilterSelection'];

  /**
  * @namespace ExploreGeoMapController
  */
  function ExploreGeoMapController($scope, leafletData, Aggregations, templateBaseUrl, homeUrl, FilterSelection) {
    var vm = this;
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

    vm.markerData = [];
    vm.defaults = {
      tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.hmpkg505/{z}/{x}/{y}.png',
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

    vm.geoView = 'landen';


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {

      $scope.$watch("vm.selectedCountryRelation", function (selectionString) {
          if(vm.markerData.length > 0){
            vm.updateMarkers();
          }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.selectionString = selectionString;
        Aggregations.aggregation('recipient-country-geo', 'iati-identifier', vm.selectionString).then(successFn, errorFn);

        function successFn(data, status, headers, config) {

          vm.markerData = data.data;
          vm.updateMarkers();
        }

        function errorFn(data, status, headers, config) {
          console.log("getting countries failed");
        }
      }, true);

      $scope.$watch("vm.geoView", function (viewName) {
          if(viewName == "regios"){
          
          }
      }, true);


      // for each active country, get the results
      
    }

    vm.setGeoView = function(viewName){
      vm.geoView = viewName;
    }

    vm.selectedGeoView = function(viewName){
      return vm.geoView == viewName ? true : false;
    }

    vm.updateMarkers = function() {
      
      var selectedCountryRelationMap = {};
      for(var i = 0;i < vm.selectedCountryRelation.length;i++){
        selectedCountryRelationMap[vm.selectedCountryRelation[i]['name'].replace(/\s/g, '')] = true;
      }

      for(var key in vm.markers){
        vm.markers[key].opacity = 0;
      }

      for (var i = 0; i < vm.markerData.length;i++){
         
        var partnerType = 'Overige';
        if(partnerlanden[vm.markerData[i].country_id] !== undefined){
          partnerType = partnerlanden[vm.markerData[i].country_id].replace(/\s/g, ''); 
        }
        
        if (selectedCountryRelationMap[partnerType] !== undefined){

          if(vm.markers[vm.markerData[i].country_id] !== undefined){
            vm.markers[vm.markerData[i].country_id].opacity = 1;
          } else {

            if(vm.markerData[i].location != null){
              var location = vm.markerData[i].location.substr(6, (vm.markerData[i].location.length - 7));
              location = location.split(' ');
              var flag = vm.markerData[i].country_id;
              var flag_lc = flag.toLowerCase();
              vm.markers[vm.markerData[i].country_id] = {
                lat: parseInt(location[1]),
                lng: parseInt(location[0]),
                message: '<span class="flag-icon flag-icon-'+flag_lc+'"></span>'+
                '<h4>'+vm.markerData[i].name+'</h4>'+
                '<p><b>Activiteiten:</b> '+vm.markerData[i]['activity_count']+'</p>'+
                '<p><b>Totaal budget:</b> XXX</p>'+
                '<p><b>Type relatie:</b> '+partnerType+'</p>'+
                '<a class="btn btn-default" href="'+homeUrl+'/landen/'+vm.markerData[i].country_id+'/">Ga naar overzicht land</a>',
                icon: vm.markerIcons[partnerType],
              }
            }
          }
        }
      }
    }

    activate();

  }
})();