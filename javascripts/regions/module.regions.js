(function () {
    'use strict';

    angular
        .module('oipa.regions', [
            'oipa.regions.controllers',
            'oipa.regions.directives',
            'oipa.regions.services'
        ]);
    
    angular
        .module('oipa.regions.controllers', []);

    angular
        .module('oipa.regions.directives', ['oipa.constants']);

    angular
        .module('oipa.regions.services', ['oipa.constants']);

})();

