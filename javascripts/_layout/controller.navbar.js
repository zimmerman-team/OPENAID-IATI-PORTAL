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
        if (['activities', 'activities-list', 'activiteit'].indexOf(name) >= 0) vm.stateName = 'activities';
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