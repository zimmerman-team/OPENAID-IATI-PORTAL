(function () {
    'use strict';

    angular
        .module('oipa.config')
        .config(config);

    config.$inject = ['$locationProvider', 'paginationTemplateProvider', 'templateBaseUrl', '$breadcrumbProvider', '$logProvider', '$urlRouterProvider'];

    function config($locationProvider, paginationTemplateProvider, templateBaseUrl, $breadcrumbProvider, $logProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        paginationTemplateProvider.setPath(templateBaseUrl + '/templates/_helpers/pagination/dirPagination.tpl.html');
        $breadcrumbProvider.setOptions({
          prefixStateName: 'home',
          template: 'bootstrap3'
        });
        $logProvider.debugEnabled(false);
        $urlRouterProvider.deferIntercept();
    }

})();
