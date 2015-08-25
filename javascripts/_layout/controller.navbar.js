/**
* NavbarController
* @namespace oipa.navbar.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.layout')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'templateBaseUrl', 'homeUrl'];

  function NavbarController($scope, templateBaseUrl, homeUrl) {
    var vm = this;

    $scope.homeUrl = homeUrl;
    $scope.templateBaseUrl = templateBaseUrl;
    activate();


    function activate(){
      // jQuery hier
      
    }
    
  }
})();

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