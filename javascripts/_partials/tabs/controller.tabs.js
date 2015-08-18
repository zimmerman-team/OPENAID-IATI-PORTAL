/**
* CountriesController
* @namespace oipa.tabs
*/
(function () {
  'use strict';

  angular
    .module('oipa.tabs')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['$scope', 'Tabs', 'timeSlider'];

  /**
  * @namespace CountriesController
  */
  function TabsController($scope, Tabs, timeSlider) {
    var vm = this;
    vm.tabs = null;
    vm.currentTab = null;
    vm.slider = {
      value: 2014,
      min: 2000,
      max: 2015
    }

    vm.sbcOptions = {
      groupBy: 'policy-marker-significance,sector,transaction_date_year',
      aggregationKey: 'disbursement'
    }

    vm.bcOptions = {
      groupBy: '',
      aggregationKey: '',
      colorMapUrl: ''
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
          timeSlider.year = newValue;
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
          if(vm.tabs[i].chart_type == 'BubbleChart'){

            vm.bcOptions.detailUrl = vm.tabs[i].detail_url;
            vm.bcOptions.colorMapUrl = vm.tabs[i].color_map_url;

          } else if(vm.tabs[i].chart_type == 'StackedBarChart'){
            
            vm.bcOptions.colorMapUrl = vm.tabs[2].color_map_url;

          }
          break;

        }
      }
    }

    activate();
  }
})();