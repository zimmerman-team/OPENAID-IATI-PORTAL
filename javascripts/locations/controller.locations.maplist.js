(function () {
    'use strict';

    angular
        .module('oipa.locations')
        .controller('LocationsMapListController', LocationsMapListController);

    LocationsMapListController.$inject = ['$scope', 'FilterSelection'];

    function LocationsMapListController($scope, FilterSelection){
        var vm = this;
        vm.geoView = 'countries';
        vm.selectedCountryRelation = [
          {'id':1, 'name': 'Aid relation'}, 
          {'id':2, 'name': 'Transition relation'}, 
          {'id':3, 'name': 'EXIT relation'}, 
          {'id':4, 'name': 'Trade relation'}, 
          {'id':5, 'name': 'Other'}
        ];
        activate();

        function activate(){
            FilterSelection.reset();
        }
    }

})();