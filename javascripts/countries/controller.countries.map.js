/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesMapController', CountriesMapController);

  CountriesMapController.$inject = ['$scope', 'leafletData', 'Countries', 'templateBaseUrl'];

  /**
  * @namespace CountriesController
  */
  function CountriesMapController($scope, leafletData, Countries, templateBaseUrl) {
    var vm = this;
    vm.templateBaseUrl = templateBaseUrl;
    vm.recipientCountries = [];
    activate();

    angular.extend($scope, {
      defaults: {
          tileLayer: 'https://{s}.tiles.mapbox.com/v3/zimmerman2014.deb5109d/{z}/{x}/{y}.png',
          maxZoom: 12,
          minZoom: 2,
          attributionControl: false,
          scrollWheelZoom: false,
          continuousWorld: false
      },
      center: {
          lat: 14.505,
          lng: 18.00,
          zoom: 1
      },
      markers: {},
      openaidMarker: {
        iconUrl: templateBaseUrl + '/images/country-marker.png',
        iconSize:     [28, 35],
        iconAnchor:   [14, 18],
        // shadowUrl: 'img/leaf-shadow.png',
        // shadowSize:   [50, 64],
        // shadowAnchor: [4, 62]
      },
    });

 

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      // for each active country, get the results
      Countries.all().then(countriesSuccessFn, countriesErrorFn);

      /**
      * @name collectionsSuccessFn
      * @desc Update collections array on view
      */
      function countriesSuccessFn(data, status, headers, config) {
        vm.recipientCountries = data.data.results;
        vm.updateMarkers();
      }

      function countriesErrorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.updateMarkers = function() {
      for (var i = 0; i < vm.recipientCountries.length;i++){
        if(
          typeof $scope.markers[vm.recipientCountries[i].code] == 'undefined' 
          && vm.recipientCountries[i].location != null 
          && vm.recipientCountries[i].aggregations != null 
          && vm.recipientCountries[i].aggregations.count > 0){

          // create new
          $scope.markers[vm.recipientCountries[i].code] = {
            lat: vm.recipientCountries[i].location.coordinates[1],
            lng: vm.recipientCountries[i].location.coordinates[0],
            message: vm.recipientCountries[i].name + ' (' + vm.recipientCountries[i].code + ')<br>' + vm.recipientCountries[i].aggregations.count + ' projects',
            icon: $scope.openaidMarker
          }
        }
      }
    }

  }
})();