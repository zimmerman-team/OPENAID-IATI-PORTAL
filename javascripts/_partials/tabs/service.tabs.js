/**
* Posts
* @namespace oipa.tabs
*/
(function () {
	'use strict';

	angular
		.module('oipa.tabs')
		.factory('Tabs', Tabs);

	Tabs.$inject = ['$http', 'oipaUrl', 'templateBaseUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Tabs($http, oipaUrl, templateBaseUrl) {

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
			            "header": "Gendergelijkheid", 
			            "title": "Gelijkheid voor vrouwen in de wereld",
			            "text": "In veel ontwikkelingslanden is er een ongelijke positie tussen mannen en vrouwen. Nederland ziet dat als een rem op groei, ontwikkeling en stabiliteit. De Rijksoverheid komt daarom op voor de versterking van de rechten en de positie van vrouwen in ontwikkelingslanden.",
			            "data_url": oipaUrl + "/aggregate/?format=json&group_by=policy-marker-significance&aggregation_key=iati-identifier&reporting_organisation__in=NL-1",
			            "chart_type": "StackedBarChart"
			        },
			        {
			            "id": 2, 
			            "header": "Handel", 
			            "title": "Handel en ontwikkelingssamenwerking",
			            "text": "Steeds meer lage-inkomenslanden en middeninkomenslanden zijn naast ontvangers van hulp ook handelspartners. De Rijksoverheid stimuleert daarom investeringen en handel in deze landen.",
			            "data_url":  oipaUrl + "/aggregate/?format=json&group_by=policy-marker-significance&aggregation_key=iati-identifier&reporting_organisation__in=NL-1",
			            "chart_type": "StackedBarChart"
			        },
			        {
			            "id": 3, 
			            "header": "Partnerlanden", 
			            "title": "Aidrelations, transitionrelations en traderelations",
			            "text": "Nederland heeft op het terrein van buitenlandse handel en ontwikkelingssamenwerking met bepaalde landen een bijzondere relatie. Op het gebied van ontwikkelingssamenwerking heten deze landen 'partnerlanden'. Op handelsgebied zijn dit 'focuslanden'.",
			            "data_url": oipaUrl + "/aggregate/?group_by=recipient-country,transaction_date_year&aggregation_key=disbursement&reporting_organisation__in=NL-1",
			            "color_map_url": templateBaseUrl + "/javascripts/countries/mapping.partnerlanden.js",
			            "chart_type": "BubbleChart",
			            "detail_url":"landen"
			        },
			        {
			            "id": 4, 
			            "header": "sectoren", 
			            "title": "veiligheid en rechtsorde, water, voedselzekerheid",
			            "text": "De Nederlandse overheid wil duurzame economische groei in ontwikkelingslanden bevorderen. Daarnaast wil Nederland werken aan stabiliteit en veiligheid in de wereld en de waarborg van mensenrechten.",
			            "data_url": oipaUrl + "/aggregate/?group_by=sector,transaction_date_year&aggregation_key=disbursement&reporting_organisation__in=NL-1",
			            "color_map_url": templateBaseUrl + "/javascripts/countries/mapping.partnerlanden.js",
			            "chart_type": "BubbleChart",
			            "detail_url":"sectoren"
			        },
			        {
			            "id": 5,
			            "header": "Uitvoerende organisaties", 
			            "title": "financiering ontwikkelingshulp",
			            "text": "Nederland biedt op verschillende manieren ontwikkelingshulp. Bijvoorbeeld via programma’s van de Wereldbank en Europese Unie (EU). Of door het bedrijfsleven in ontwikkelingslanden te stimuleren.",
			            "data_url": oipaUrl + "/aggregate/?group_by=recipient-country,transaction_date_year&aggregation_key=disbursement&reporting_organisation__in=NL-1",
			            "color_map_url": templateBaseUrl + "/javascripts/countries/mapping.partnerlanden.js",
			            "chart_type": "BubbleChart",
			            "detail_url":"sectoren"
			        },
			    ];

				this.tabData = data;
			}
			return this.tabData;
        }
	}
})();