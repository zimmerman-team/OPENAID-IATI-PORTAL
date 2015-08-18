(function () {
    'use strict';

    angular
      .module('ncs.authentication', [
          'ncs.authentication.controllers',
          'ncs.authentication.services'
      ]);

    angular
        .module('ncs.authentication.controllers', []);

    angular
        .module('ncs.authentication.services', ['ngCookies']);
})();
