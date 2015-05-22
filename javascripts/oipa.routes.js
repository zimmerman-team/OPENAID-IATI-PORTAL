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
            url:          '/iati-explorer/list/',
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
            name:        'land',
            url:         '/landen/:country_id/',
            controller:  'CountryController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/country.html',
            ncyBreadcrumb: {
                parent: 'landen',
                label: '{{vm.country.name}}'
            }
        })
        .state({
            name:        'landen',
            url:         '/landen/',
            controller:  'CountriesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/countries.html',
            ncyBreadcrumb: {
                label: 'Landen'
            }
        })
        .state({
            name:        'organisatie',
            url:         '/organisaties/:organisation_id/',
            controller:  'ImplementingOrganisationController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementingOrganisation.html'
        })
        .state({
            name:        'organisaties',
            url:         '/organisaties/',
            controller:  'ImplementingOrganisationsController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementingOrganisations.html'
        })
        .state({
            name:        'sector',
            url:         '/sectoren/:sector_id/',
            controller:  'SectorController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sector.html'
        })
        .state({
            name:        'sectoren',
            url:         '/sectoren/',
            controller:  'SectorsController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/sectors/sectors.html'
        })
        .state({
            name:        'over',
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
