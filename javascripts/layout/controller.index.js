/**
* IndexController
* @namespace oipa.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$sce', 'Aggregations', 'homeUrl'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, $sce, Aggregations, homeUrl) {
    var vm = this;

    activate();

    function activate() {
      for (var cf in vm.customFields){
          vm.customFields[cf].hoverShow = false;
          vm.customFields[cf].text = $sce.trustAsHtml(vm.customFields[cf][0]);
      }

      $scope.$watch('vm.top5', function(){
        vm.tableChartOptions = vm.top5Options[vm.top5];
        vm.refreshTableChart = true;
      });

      Aggregations.aggregation('recipient-country-geo', 'iati-identifier', '').then(countrySuccessFn, errorFn);
      
      function countrySuccessFn(data, status, headers, config) {
        vm.updateCountryMarkers(data.data);
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }


    
    vm.customFields = customFields;
    $scope.hoverIn = function(id){
      vm.customFields[id].hoverShow = true;
    };

    $scope.hoverOut = function(id){
        vm.customFields[id].hoverShow = false;
    };


    vm.top5 = 'recipient-country';
    vm.tableChartOptions = null;
    vm.lineChartOptions = {};

    vm.refreshTableChart = false;
    vm.top5Options = {
      'recipient-country': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'recipient-country',
        groupById: 'country_id',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'countries__in'
      },
      'transaction-receiver-org': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'transaction-receiver-org',
        groupById: 'receiver_organisation_id',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'participating_organisation__in'
      },
      'sector': {
        aggregationFilters: '&amp;order_by=-total_disbursements&amp;limit=5',
        groupBy: 'sector',
        groupById: 'sector_id',
        aggregationKey: 'disbursement',
        aggregationExtraSelect: 'iati-identifier',
        aggregationExtraSelectIn: 'sectors__in'
      }
    };

    vmtop5ListOptions = {
      'recipient-country': {
        groupBy: 'recipient-country,transaction_date_year',
        groupById: 'country_id'
      },
      'transaction-receiver-org': {
        groupBy: 'transaction-receiver-org, transaction_date_year',
        groupById: 'receiver_organisation_id',
      },
      'sector': {
        groupBy: 'sector, transaction_date_year',
        groupById: 'sector_id',
      }
    }





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
    
    vm.resultCounter = 0;
 
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
      }
    }

  }
})();