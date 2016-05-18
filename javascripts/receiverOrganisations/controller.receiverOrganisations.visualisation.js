(function () {
    'use strict';

    angular
        .module('oipa.receiverOrganisations')
        .controller('receiverOrganisationsVisualisationController', receiverOrganisationsVisualisationController);

    receiverOrganisationsVisualisationController.$inject = ['$scope', 'FilterSelection', 'templateBaseUrl'];

    function receiverOrganisationsVisualisationController($scope, FilterSelection, templateBaseUrl){
        var vm = this;
        vm.filterSelection = FilterSelection;
        vm.selectionString = '';
        vm.templateBaseUrl = templateBaseUrl;
        vm.submitSearch = '';

        activate();

        function activate() {

            FilterSelection.reset();

            $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
                vm.selectionString = selectionString;
            }, true);
        }

    }

})();