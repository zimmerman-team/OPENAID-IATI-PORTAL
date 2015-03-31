(function () {
    'use strict';

    angular
        .module('oipa', [
            'checklist-model',
            'ui.bootstrap-slider',
            'angularUtils.directives.dirPagination',
            'chart.js',
            'leaflet-directive',
            'oipa.constants',
            'oipa.config',
            'oipa.routes',
            'oipa.layout',
            'oipa.navbar',
            'oipa.footer',
            'oipa.search',
            'oipa.toolbar',
            'oipa.countries',
            'oipa.regions',
            'oipa.sectors',
            'oipa.filters',
            'oipa.budget',
            'oipa.activityStatus',
            'oipa.pages',
            'oipa.implementingOrganisations',
            'oipa.bubbleChart',
            'oipa.tabs',
            'oipa.explore',
            'oipa.activities',
            'oipa.policyMarkers',
            'oipa.stackedBarChart',
        ]);

    angular
        .module('oipa.constants', []);

    angular
        .module('oipa.config', ['angularUtils.directives.dirPagination']);

    angular
        .module('oipa.routes', ['ui.router']);

    angular
        .module('oipa')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();
