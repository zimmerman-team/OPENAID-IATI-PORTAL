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
            templateUrl:  templateBaseUrl + '/templates/layout/index.html'
        })
        .state({
            name:        'land',
            url:         '/landen/:country_id/',
            controller:  'CountryController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/country.html'
        })
        .state({
            name:        'landen',
            url:         '/landen/',
            controller:  'CountriesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/countries/countries.html'
        })
        .state({
            name:        'organisatie',
            url:         '/organisaties/:organisation_id',
            controller:  'ImplementingOrganisationsController',
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
            url:         '/sectoren/:sector_id',
            controller:  'SectorsController',
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
            templateUrl: templateBaseUrl + '/templates/pages/pages.html'
        })
        .state({
            name:        'tools',
            url:         '/tools/',
            controller:  'PagesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/pages/pages.html'
        })
        .state({
            name:        'iati-publiceren',
            url:         '/iati-publiceren/',
            controller:  'PagesController',
            controllerAs: 'vm',
            templateUrl: templateBaseUrl + '/templates/pages/pages.html'
        });

     
    }
})();
