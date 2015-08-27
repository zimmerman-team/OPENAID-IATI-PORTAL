(function () {
    'use strict';

    angular
        .module('oipa.locations')
        .controller('LocationsMapListController', LocationsMapListController);

    LocationsMapListController.$inject = ['$scope', 'FilterSelection'];

    function LocationsMapListController($scope, FilterSelection){
        var vm = this;
        vm.geoView = 'countries';
        activate();

        function activate(){
            FilterSelection.reset();
        }
    }

})();