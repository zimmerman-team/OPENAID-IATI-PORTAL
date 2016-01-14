/**
* ContactController
* @namespace oipa.contact
*/
(function () {
  'use strict';

  angular
    .module('oipa.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['templateBaseUrl', 'wpAPIResource', 'homeUrl', '$location','$http'];

  /**
  * @namespace ContactController
  */
  function ContactController(templateBaseUrl, wpAPIResource, homeUrl, $location, $http) {
    var vm = this;
    vm.post = '';
    vm.pageUrl = '';
    vm.pageUrlDecoded = $location.absUrl();

    // funcation assignment
    vm.onSubmit = onSubmit;
    vm.errored = false;
    vm.submitted = false;
    vm.model = {};
    
    vm.fields = [
      {
        key: 'first_name',
        type: 'input',
        templateOptions: {
          label: 'First name',
          placeholder: 'Enter your first name...',
          required: true
        }
      },
      {
        key: 'last_name',
        type: 'input',
        templateOptions: {
          label: 'Surname',
          placeholder: 'Enter your surname...',
          required: true
        }
      },
      {
        key: 'organisation',
        type: 'input',
        templateOptions: {
          label: 'Organisation',
          placeholder: 'Enter your organisation\'s name...'
        }
      },
            {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Enter your email address...',
          type: 'email',
          required: true
        }
      },
      {
        key: 'phone',
        type: 'input',
        templateOptions: {
          label: 'Phone',
          placeholder: 'Enter your phone number...'
        }
      },
      {
        key: 'message',
        type: 'textarea',
        templateOptions: {
          label: 'Message',
          placeholder: 'Enter your questions, comments or complaints...',
          required: true,
          rows: 10
        }
      },
    ];

    // function definition
    function onSubmit() {

      $http.post(homeUrl + '/wp-admin/admin-ajax.php?action=angular_form', JSON.stringify(vm.model)).then(successCallback, errorCallback);
      function successCallback(data, status, headers, config){
          if (data.statusText == "OK") {
            vm.submitted = true;
            vm.errored = false;
          }
          else {
            vm.errored = true;
          }
      }
      function errorCallback(data, status, headers, config){
          vm.errored = true;
      }
    }

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.contact.ContactController
    */
    function activate() {
      // var test = wpAPIResource.get( {
      //     param1: 'posts',
      //     param2: 3
      // } ).then(succesFn, errorFn);
      // console.log(test);

      vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
      vm.shareDescription = encodeURIComponent('Contact us on ' + vm.pageUrlDecoded);

      function succesFn(){

      }

      function errorFn(){
        
      }
    }

  }
})();