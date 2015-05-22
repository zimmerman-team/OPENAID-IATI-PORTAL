/**
* ExploreGeoMapController
* @namespace oipa.explore
*/
(function () {
  'use strict';

  angular
    .module('oipa.explore')
    .controller('ExploreGeoMapController', ExploreGeoMapController);

  ExploreGeoMapController.$inject = ['$scope', 'leafletData', 'Aggregations', 'templateBaseUrl'];

  /**
  * @namespace ExploreGeoMapController
  */
  function ExploreGeoMapController($scope, leafletData, Aggregations, templateBaseUrl) {
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
    vm.openaidMarker = {
      type: 'div',
      iconSize:     [28, 35],
      iconAnchor:   [14, 18],
      markerColor: 'blue',
      iconColor: 'white',
      html: '<div class="fa fa-map-marker fa-stack-1x fa-inverse marker-circle" style="background-color: rgba(207,32,38,0.4); border-radius: 20px;font-size:14px;width: 20px; height: 20px;"></div>',
    };

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


      // for each active country, get the results
      Aggregations.aggregation('recipient-country-geo', 'iati-identifier', '').then(successFn, errorFn);

      function successFn(data, status, headers, config) {

        vm.markerData = data.data;
        vm.updateMarkers();
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.updateMarkers = function() {
      
      var selectedCountryRelationMap = {};
      for(var i = 0;i < vm.selectedCountryRelation.length;i++){
        selectedCountryRelationMap[vm.selectedCountryRelation[i]['name'].replace(/\s/g, '')] = true;
      }
      vm.markers = [];

      for (var i = 0; i < vm.markerData.length;i++){
        if(typeof vm.markers[vm.markerData[i].country_id] == 'undefined' && vm.markerData[i].location != null){
          
          var partnerType = 'Overige';
          if(partnerlanden[vm.markerData[i].country_id] !== undefined){
            partnerType = partnerlanden[vm.markerData[i].country_id].replace(/\s/g, ''); 
          } 

          
          if (selectedCountryRelationMap[partnerType] !== undefined){
            console.log('1');
            var location = vm.markerData[i].location.substr(6, (vm.markerData[i].location.length - 7));
            location = location.split(' ');
            vm.markers[vm.markerData[i].country_id] = {
              lat: parseInt(location[1]),
              lng: parseInt(location[0]),
              message: '<span class="flag-icon flag-icon-'+vm.markerData[i].country_id+'"></span>'+
              '<h4>'+vm.markerData[i].name+'</h4>'+
              '<p><b>Activiteiten:</b> '+vm.markerData[i]['activity_count']+'</p>'+
              '<p><b>Totaal budget:</b> 0.00</p>'+
              '<p><b>Type relatie:</b> '+partnerType+'</p>'+
              '<button class="btn btn-default">Ga naar overzicht land</button>',
              icon: vm.openaidMarker,
            }
          }
        }
      }
    }

    activate();

  }
})();