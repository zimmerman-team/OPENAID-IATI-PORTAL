(function () {
    'use strict';

    angular
        .module('oipa.filters')
        .factory('Transaction', Transaction);

    Transaction.$inject = ['$http'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function Transaction($http) {
        var m = this;
        m.year = {
          on: false,
          year: '2015'
        };
        m.toReset = false;
        

        var Transaction = {
            year: m.year,
            toReset: m.toReset,
        };

        return Transaction;
    }
})();