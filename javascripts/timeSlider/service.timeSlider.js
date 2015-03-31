/**
* Posts
* @namespace oipa.tabs
*/
(function () {
    'use strict';

    angular
        .module('oipa')
        .factory('timeSlider', timeSlider);

    timeSlider.$inject = ['$http'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function timeSlider($http) {

        this.year = 2014;

        var timeSlider = {
            year: this.year,
            getYear: getYear,
            setYear: setYear
        };

        return timeSlider;

        ////////////////////

        function getYear(){
            return currentYear;
        }

        /**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function setYear(year) {
            currentYear = year;
        }
    }
})();
