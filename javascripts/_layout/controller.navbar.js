/**
* NavbarController
* @namespace oipa.navbar.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', '$state', 'templateBaseUrl', 'homeUrl'];

  function NavbarController($scope, $state, templateBaseUrl, homeUrl) {
    var vm = this;

    $scope.homeUrl = homeUrl;
    $scope.templateBaseUrl = templateBaseUrl;
    vm.stateName = '';
    vm.state = $state;
    activate();

    function activate(){

      $scope.$watch('vm.state.current.name', function(name){
        if (['activities', 'activities-list', 'activiteit'].indexOf(name) >= 0) { vm.stateName = 'activities'; }
        else if (['locations', 'locations-map', 'locations', 'country'].indexOf(name) >= 0) { vm.stateName = 'locations'; }
        else if (['regions', 'regions-list', 'regions-vis', 'region'].indexOf(name) >= 0) { vm.stateName = 'regions'; }
        else if (['sectors', 'sector-list', 'sector'].indexOf(name) >= 0) { vm.stateName = 'sectors'; }
        else if (['organisations', 'organisation'].indexOf(name) >= 0) { vm.stateName = 'organisations'; }
        else if (['search'].indexOf(name) >= 0) { vm.stateName = 'search'; }
        else if (['about'].indexOf(name) >= 0) { vm.stateName = 'about'; }
        else { vm.stateName = 'home'; }

        $("html, body").animate({
          scrollTop:0
        },400);
      }, true);

      $(window).scroll(function() {
        var height = $(window).scrollTop();
        var $fixedbar = $('.filters-fixed');

        if(height  > 60 ) {
            $fixedbar.addClass('fixed');
            $('.pad-helper').addClass('faux-pad');
            $("#toTop").fadeIn();
        }
        if (height < 60 ) {
           $fixedbar.removeClass('fixed');
           $('.pad-helper').removeClass('faux-pad');
           $("#toTop").fadeOut();
        }
      });
      
    }
    
  }
})();