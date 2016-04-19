/**
* SocialController
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .controller('SocialController', SocialController);

  SocialController.$inject = ['$state', '$location', '$document', '$scope', 'Filters', 'FilterSelection', '$sce', 'homeUrl', '$filter'];

  /**
  * @namespace SocialController
  */
  function SocialController($state, $location, $document, $scope, Filters, FilterSelection, $sce, homeUrl, $filter) {
    var vm = this;
    vm.currentPage = $scope.currentPage;
    vm.currentHoverText = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();
    vm.pageTitle = $document[0].title;
    vm.shareDescription = '';

    vm.buttonTexts = {
      'download': {'text': 'Download projects', hoverShow: false},
      'share_twitter': {'text': 'Share on Twitter', hoverShow: false},
      'share_linkedin': {'text': 'Share on LinkedIn', hoverShow: false},
      'share_facebook': {'text': 'Share on Facebook', hoverShow: false},
    };

    vm.currentHoverText = '';

    activate();

    function activate() {      
      vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
      vm.shareDescription = encodeURIComponent('View the Aid projects of the Dutch Ministry of Foreign Affairs on ' + vm.pageUrlDecoded);
    }
  
    vm.hoverIn = function(id){
      vm.buttonTexts[id].hoverShow = true;
      vm.currentHoverText =  $sce.trustAsHtml(vm.buttonTexts[id].text);
    };

    vm.hoverOut = function(id){
        vm.buttonTexts[id].hoverShow = false;
    };

    vm.download = function(format){
      var url = homeUrl + '/export/?format='+format+'&filters='+encodeURIComponent(FilterSelection.selectionString);
      if(vm.currentPage == 'activity'){
        url = homeUrl + '/export/?format='+format+'&detail='+$scope.activityId+'&filters=';
      }
      window.open(url);
    }

    
  }
})();
