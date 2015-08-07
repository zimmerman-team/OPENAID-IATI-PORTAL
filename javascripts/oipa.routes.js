(function () {
    'use strict';

    angular
      .module('oipa.routes')
      .config(config);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'templateBaseUrl', ];

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($stateProvider, $locationProvider, $routeProvider, templateBaseUrl){

      $locationProvider.html5Mode(true);
      $routeProvider.otherwise('/');

      $stateProvider
        .state({
            name:         'home',
            url:          '/',
            controller:   'IndexController',
            controllerAs: 'vm',
            templateUrl:  templateBaseUrl + '/templates/layout/index.html',
            ncyBreadcrumb: {
                label: 'Home'
            }
        })
        .state({
            name:         'iati-explorer',
            url:          '/iati-explorer/',
            controller:   'ExploreController',
            controllerAs: 'vm',
            templateUrl:  templateBaseUrl + '/templates/layout/iati-explorer.html',
            ncyBreadcrumb: {
                label: 'IATI Explorer'
            }
        })
        .state({
            name:         'iati-explorer-map',
            url:          '/iati-explorer/map/',
            controller:   'ExploreController',
            controllerAs: 'vm',
            templateUrl:  templateBaseUrl + '/templates/layout/iati-explorer-map.html',
            ncyBreadcrumb: {
                label: 'IATI Explorer'
            }
        })
        .state({
            name:         'iati-explorer-list',
            url:          '/iati-explorer/lijst/',
            controller:   'ExploreController',
            controllerAs: 'vm',
            templateUrl:  templateBaseUrl + '/templates/layout/iati-explorer-list.html',
            ncyBreadcrumb: {
                label: 'IATI Explorer'
            }
        })
        .state({
            name:        'activiteit',
            url:         '/iati-explorer/:activity_id/',
            controller:  'ActivityController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/activities/activity.html',
            ncyBreadcrumb: {
                label: 'IATI Activiteit detail pagina'
            }
        })
        .state({
            name:        'countries-map',
            url:         '/locaties/map/',
            controller:  'ExploreController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/countries-view-map.html',
            ncyBreadcrumb: {
                label: 'Landen'
            }
        })
        .state({
            name:        'countries-list',
            url:         '/locaties/lijst/',
            controller:  'CountriesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/countries-view-list.html',
            ncyBreadcrumb: {
                label: 'Landen'
            }
        })
        .state({
            name:        'country',
            url:         '/landen/:country_id/',
            controller:  'CountryController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/country-view-detail.html',
            ncyBreadcrumb: {
                parent: 'landen',
                label: '{{vm.country.name}}'
            }
        })
        .state({
            name:        'countries',
            url:         '/locaties/',
            controller:  'CountriesVisualisationController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/countries-view-visualisation.html',
            ncyBreadcrumb: {
                label: 'Landen'
            }
        })
        .state({
            name:        'organisations-list',
            url:         '/organisaties/lijst/',
            controller:  'ImplementingOrganisationsExploreController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-view-list.html'
        })
        .state({
            name:        'organisations-map',
            url:         '/organisaties/map/',
            controller:  'ExploreController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-view-map.html'
        })
        .state({
            name:        'organisations',
            url:         '/organisaties/',
            controller:  'ImplementingOrganisationsVisualisationController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-view-visualisation.html'
        })
        .state({
            name:        'organisation',
            url:         '/organisaties/:organisation_id/',
            controller:  'ImplementingOrganisationController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisation.html'
        })
        .state({
            name:        'themas-map',
            url:         '/themas/map/',
            controller:  'ExploreController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sectors-view-map.html',
        })
        .state({
            name:        'themas-list',
            url:         '/themas/lijst/',
            controller:  'SectorsExploreController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sectors-view-list.html'
        })
        .state({
            name:        'themas',
            url:         '/themas/',
            controller:  'SectorsVisualisationController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sectors-view-visualisation.html'
        })
        .state({
            name:        'thema',
            url:         '/themas/:sector_id/',
            controller:  'SectorController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sector.html'
        })
        
        .state({
            name:        'about',
            url:         '/over/',
            controller:  'PagesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/pages/pages.html',
            ncyBreadcrumb: {
                label: '{{vm.title}}'
            }
        })
        .state({
            name:        'iati-publiceren',
            url:         '/iati-publiceren/',
            controller:  'PagesController',
            controllerAs: 'vm.post.title',
            templateUrl: templateBaseUrl + '/templates/pages/pages.html'
        });

     
    }
})();
