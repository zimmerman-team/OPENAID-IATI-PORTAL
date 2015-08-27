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

            FilterSelection.reset();

            $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
                vm.selectionString = selectionString;
                FilterSelection.openedPanel = '';
            }, true);

            setTimeout(function(){ FilterSelection.reset(); }, 100);
        }

        vm.toggleSelection = function(){
            vm.showSelection = !vm.showSelection;
            FilterSelection.openedPanel = '';
        }

        vm.resetFilters = function(){
            FilterSelection.reset();
        }

        vm.saveFilters = function(){
            FilterSelection.save();
        }

        vm.isOpenedHeader = function(slug){
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