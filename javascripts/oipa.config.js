(function () {
    'use strict';

    angular
        .module('oipa.config')
        .config(config);

    config.$inject = ['$locationProvider', 'paginationTemplateProvider', 'templateBaseUrl', '$breadcrumbProvider'];

    /**
     * @name config
     * @desc Enable HTML5 routing
     */
    function config($locationProvider, paginationTemplateProvider, templateBaseUrl, $breadcrumbProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        paginationTemplateProvider.setPath(templateBaseUrl + '/templates/pagination/dirPagination.tpl.html');
        $breadcrumbProvider.setOptions({
          prefixStateName: 'home',
          template: 'bootstrap3'
        });
    }


})();
