(function () {
    'use strict';

    angular
        .module('oipa.explore')
        .controller('ExploreController', ExploreController);

    ExploreController.$inject = ['$scope', 'FilterSelection'];

    function ExploreController($scope, FilterSelection){
        var vm = this;
        vm.filterSelection = FilterSelection;
        vm.selectionString = '';
        
        activate();

        function activate() {
            
            $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
                console.log('selection string changed');
            }, true);
            
        }
    }

})();