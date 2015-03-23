/**
* CountriesController
* @namespace oipa.tabs
*/
(function () {
  'use strict';

  angular
    .module('oipa.tabs')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['$scope', 'Tabs', 'BubbleChart'];

  /**
  * @namespace CountriesController
  */
  function TabsController($scope, Tabs, BubbleChart) {
    var vm = this;
    vm.tabs = null;
    vm.currentTab = null;
    vm.slider = {
      value: 2014,
      min: 2000,
      max: 2015
    }

    

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      vm.tabs = Tabs.all();
      if(vm.tabs.length > 0){
        vm.setTab(vm.tabs[0].id);
      }

      $scope.$watch("vm.slider.value", function (newValue) {
          BubbleChart.update(newValue);
      }, true);

    }

    /**
    * @name isSelected
    * @desc check if current tab is shown
    * @memberOf oipa.tabs.TabsController
    */
    vm.isSelected = function(id){
      return vm.currentTab === id ? true : false;
    }

    /**
    * @name isSelected
    * @desc check if current tab is shown
    * @memberOf oipa.tabs.TabsController
    */
    vm.setTab = function(id){
      vm.currentTab = id;
      vm.updateVisualisation(id);
    }

    /**
    * @name updateVisualisation
    * @desc update the bubble chart service to get the data that should be used. then update the visualisation
    * @memberOf oipa.tabs.TabsController
    */
    vm.updateVisualisation = function(id){
      for(var i = 0;i < vm.tabs.length;i++){
        if(vm.tabs[i].id == id){
          BubbleChart.loadData(2014, vm.tabs[i].data_url);
          break;
        }
      }
    }

    // vm.prefix = 'Current value: ';
    // vm.suffix = '%';
    // vm.formaterFn = function(value) {
    //   return vm.prefix + value + $scope.suffix;
    // };

    // vm.delegateEvent = null;
    // vm.slideDelegate = function ( value, event ) {
    //   if( angular.isObject(event) ) {
    //     $log.log('Slide delegate value on ' + event.type + ': ' + value);
    //   }
    //   else {
    //     $log.log('Slide delegate value: ' + event);
    //   }
    //   vm.delegateEvent = event;
    // };
    activate();
  }
})();