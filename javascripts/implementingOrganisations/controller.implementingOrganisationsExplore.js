(function () {
    'use strict';

    angular
        .module('oipa.implementingOrganisations')
        .controller('ImplementingOrganisationsExploreController', ImplementingOrganisationsExploreController);

    ImplementingOrganisationsExploreController.$inject = ['$scope', 'FilterSelection'];

    function ImplementingOrganisationsExploreController($scope, FilterSelection){
        var vm = this;
        vm.openedPanel = ''; // panels: 
        vm.showSelection = false;
        vm.filterSelection = FilterSelection;
        vm.selectionString = '';
        vm.currentHoverText = '';

        activate();

        function activate() {
            $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
                vm.selectionString = selectionString;
                FilterSelection.openedPanel = '';
            }, true);
        }

        vm.toggleSelection = function(){
            vm.showSelection = !vm.showSelection;
            FilterSelection.openedPanel = '';
        }

        vm.resetFilters = function(){
            FilterSelection.toReset = true;
        }

        vm.saveFilters = function(){
            FilterSelection.toSave = true;
            FilterSelection.openedPanel = '';
        }

        vm.isOpenedHeader = function(slug){
            console.log(slug);
            console.log(FilterSelection.openedPanel);
          return FilterSelection.openedPanel == slug;
        }

        vm.showDownload = function(){
            console.log("TO DO; show download options");
        }

        vm.share = function(medium){
            console.log("TO DO; open "+medium+" share url in new window");
        }
    }

})();