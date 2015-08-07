(function () {
    'use strict';

    angular
        .module('oipa.implementingOrganisations')
        .controller('ImplementingOrganisationsVisualisationController', ImplementingOrganisationsVisualisationController);

    ImplementingOrganisationsVisualisationController.$inject = ['$scope', 'FilterSelection', 'templateBaseUrl'];

    function ImplementingOrganisationsVisualisationController($scope, FilterSelection, templateBaseUrl){
        var vm = this;
        vm.filterSelection = FilterSelection;
        vm.selectionString = '';
        vm.templateBaseUrl = templateBaseUrl;

        activate();

        function activate() {

            $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
                vm.selectionString = selectionString;
                FilterSelection.openedPanel = '';
            }, true);

            setTimeout(function(){ FilterSelection.toReset = true; }, 100);
        }

    }

})();