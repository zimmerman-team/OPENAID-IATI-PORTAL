/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
    'use strict';

    angular
        .module('oipa.search')
        .factory('Search', Search);

    Search.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function Search($http, oipaUrl, reportingOrganisationId) {
        var m = this;
        m.searchString = '';

        var Search = {
            searchString: m.searchString,
        };

        return Search;
    }
})();