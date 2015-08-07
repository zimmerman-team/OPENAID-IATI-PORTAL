(function () {
    'use strict';

    angular
        .module('oipa.sunburst')
        .factory('Sunburst', Sunburst);

    Sunburst.$inject = ['$http', 'oipaUrl'];

    function Sunburst($http, oipaUrl) {

        this.sunburstCount = 0;

        var Sunburst = {
            sunburstCount: this.sunburstCount,
        };

        return Sunburst;
    }
})();


