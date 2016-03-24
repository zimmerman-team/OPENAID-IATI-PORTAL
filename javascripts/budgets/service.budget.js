/**
* Posts
* @namespace oipa.budget.services
*/
(function () {
    'use strict';

    angular
        .module('oipa.budget')
        .factory('Budget', Budget);

    Budget.$inject = ['$http'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function Budget($http) {
        var m = this;
        m.budget = {
          on: false,
          value: []
        };
        m.toReset = false;
        

        var Budget = {
            budget: m.budget,
            toReset: m.toReset,
            all: all 
        };

        return Budget;

        function all() {
            return m.budget;
        }
    }
})();