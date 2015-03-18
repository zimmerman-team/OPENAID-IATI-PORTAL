(function () {
    'use strict';

    angular
        .module('oipa.sectors', [
            'oipa.sectors.controllers',
            'oipa.sectors.directives',
            'oipa.sectors.services'
        ]);
    
    angular
        .module('oipa.sectors.controllers', ['oipa.constants']);

    angular
        .module('oipa.sectors.directives', ['oipa.constants']);

    angular
        .module('oipa.sectors.services', ['oipa.constants']);

})();

