(function () {
    'use strict';

    angular
        .module('oipa.navbar', [
            'oipa.navbar.controllers',
            'oipa.navbar.directives',
        ]);
    
    angular
        .module('oipa.navbar.controllers', ['oipa.constants']);

    angular
        .module('oipa.navbar.directives', ['oipa.constants']);

})();

