/**
* Posts
* @namespace oipa.tabs
*/
(function () {
	'use strict';

	angular
		.module('oipa.tabs')
		.factory('Tabs', Tabs);

	Tabs.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Tabs($http, oipaUrl) {

		var tabData = null;

		var Tabs = {
			all: all 
		};

		return Tabs;



		////////////////////


		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
        	// TO DO: connect to wp-api
        	if (this.tabData == null){
	        	var data = [
			        {
			            "id": 1, 
			            "header": "Uitgaven per land", 
			            "title": "Bekijk hoeveel activiteiten er per land plaatsvinden",
			            "text": "Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
			        },
			        {
			            "id": 2, 
			            "header": "Uitgaven per sector", 
			            "title": "Etiam porta sem malesuada magna mollis euismod.",
			            "text": "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo."
			        },
			        {
			            "id": 3, 
			            "header": "Uitgaven per organisatie", 
			            "title": "Donec id elit non mi porta gravida at eget metus.",
			            "text": "Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
			        },
			        {
			            "id": 4, 
			            "header": "Activiteiten per land", 
			            "title": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
			            "text": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod."
			        },
			        {
			            "id": 5,
			            "header": "Uitvoerende organisaties", 
			            "title": "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
			            "text": "Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla."
			        },
			    ];

				this.tabData = data;
			}
			return this.tabData;
        }
	}
})();