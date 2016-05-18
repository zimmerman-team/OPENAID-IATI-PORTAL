(function () {
  'use strict';

  angular
    .module('oipa.pages')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['templateBaseUrl', 'wpAPIResource', 'homeUrl', '$location', '$http', 'oipaUrl'];

  function AboutController(templateBaseUrl, wpAPIResource, homeUrl, $location, $http, oipaUrl) {
    var vm = this;
    vm.post = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();

    activate();

    function activate() {

		vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
		vm.shareDescription = encodeURIComponent('View the Aid projects of the Dutch Ministry of Foreign Affairs on ' + vm.pageUrlDecoded);
		vm.totalCount = null;
		vm.lastUpdated = null;
		var url = oipaUrl + '/datasets/?format=json&publisher=XM-DAC-7&type=1';
		
		$http.get(url, { cache: true }).then(succesFn, errorFn);

		function succesFn(data, status, headers, config){
			var results = data.data.results;
			var totalCount = 0;
			var lastUpdated = '<error>';
			for (var i = 0; i < results.length;i++){
				totalCount += results[i]['activity_count']
				lastUpdated = results[i]['date_updated']
			}

			vm.totalCount = totalCount
			vm.lastUpdated = lastUpdated
		}

		function errorFn(data, status, headers, config){
			console.log(data);
		}
    }

  }
})();