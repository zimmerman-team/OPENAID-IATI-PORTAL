/**
* CountriesController
* @namespace oipa.tabs
*/
(function () {
  'use strict';

  angular
    .module('oipa.tabs')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['Tabs'];

  /**
  * @namespace CountriesController
  */
  function TabsController(Tabs) {
    var vm = this;
    vm.tabs = null;
    vm.currentTab = null;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountriesController
    */
    function activate() {
      vm.tabs = Tabs.all();
      if(vm.tabs.length > 0){
        vm.currentTab = vm.tabs[0].id;
      } 
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
    }


    /**
    * @name updateVisualisation
    * @desc update the bubble chart service to get the data that should be used. then update the visualisation
    * @memberOf oipa.tabs.TabsController
    */
    function updateVisualisation(){
      

    }


  }
})();