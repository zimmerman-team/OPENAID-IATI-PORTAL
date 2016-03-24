/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
    'use strict';

    angular
        .module('oipa.regions')
        .factory('Regions', Regions);

    Regions.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function Regions($http, oipaUrl, reportingOrganisationId) {
        var m = this;
        m.selectedRegions = [];

        var Regions = {
            selectedRegions: m.selectedRegions,
            getRegion: getRegion,
            getRegions: getRegions
        };

        return Regions;

        function getRegion(code) {
            return $http.get(oipaUrl + '/regions/' + code + '/?format=json', { cache: true });
        }

        function getRegions(countries) {

            var url = oipaUrl + '/activities/aggregations/?format=json&group_by=recipient_region&aggregations=count';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            url += '&recipient_region=' + countries;
            return $http.get(url, { cache: true });
        }
    }
})();