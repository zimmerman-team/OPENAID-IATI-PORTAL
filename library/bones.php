<?php

function bones_head_cleanup() {
	// category feeds
	// remove_action( 'wp_head', 'feed_links_extra', 3 );
	// post and comment feeds
	// remove_action( 'wp_head', 'feed_links', 2 );
	// EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// windows live writer
	remove_action( 'wp_head', 'wlwmanifest_link' );
	// previous link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	// start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	// links for adjacent posts
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	// WP version
	remove_action( 'wp_head', 'wp_generator' );
	// remove WP version from css
	add_filter( 'style_loader_src', 'bones_remove_wp_ver_css_js', 9999 );
	// remove Wp version from scripts
	add_filter( 'script_loader_src', 'bones_remove_wp_ver_css_js', 9999 );

} /* end bones head cleanup */

// remove WP version from RSS
function bones_rss_version() { return ''; }

// remove WP version from scripts
function bones_remove_wp_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

// remove injected CSS for recent comments widget
function bones_remove_wp_widget_recent_comments_style() {
	if ( has_filter( 'wp_head', 'wp_widget_recent_comments_style' ) ) {
		remove_filter( 'wp_head', 'wp_widget_recent_comments_style' );
	}
}

// remove injected CSS from recent comments widget
function bones_remove_recent_comments_style() {
	global $wp_widget_factory;
	if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
		remove_action( 'wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style') );
	}
}

// remove injected CSS from gallery
function bones_gallery_style($css) {
	return preg_replace( "!<style type='text/css'>(.*?)</style>!s", '', $css );
}


/*********************
SCRIPTS & ENQUEUEING
*********************/

// loading modernizr and jquery, and reply script
function bones_scripts_and_styles() {

  global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

  if (!is_admin()) {	


		wp_register_style( 'bubbleChart-css', get_stylesheet_directory_uri() . '/css/bubbleChart.css', array(), '' );
		wp_register_style( 'bootstrap-css', get_stylesheet_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.css', array(), '' );
		wp_register_style( 'leaflet-css', get_stylesheet_directory_uri() . '/bower_components/leaflet/dist/leaflet.css', array(), '' );
		wp_register_style( 'angular-slider', get_stylesheet_directory_uri() . '/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css', array(), '' );
		wp_register_style( 'nvd3.css', get_stylesheet_directory_uri() . '/bower_components/nvd3/build/nv.d3.min.css', array(), '' );
		wp_register_style( 'bones-stylesheet', get_stylesheet_directory_uri() . '/library/css/style.css', array(), '', 'all' );
		wp_register_style( 'bones-ie-only', get_stylesheet_directory_uri() . '/library/css/ie.css', array(), '' );


		wp_enqueue_style( 'nvd3.css' );
		wp_enqueue_style( 'bubbleChart-css' );
		wp_enqueue_style( 'leaflet-css' );
		wp_enqueue_style( 'angular-slider' );
		wp_enqueue_style( 'bootstrap-css' );
		wp_enqueue_style( 'bones-stylesheet' );
		wp_enqueue_style( 'bones-ie-only' );

		$wp_styles->add_data( 'bones-ie-only', 'conditional', 'lt IE 9' ); // add conditional wrapper around ie stylesheet

		// deregister old jquery version
		wp_deregister_script("jquery");
		wp_register_script( 'jquery', get_stylesheet_directory_uri() . '/bower_components/jquery/dist/jquery.min.js', array(), '', true );

		wp_register_script( 'countrydata', get_stylesheet_directory_uri() . '/javascripts/data/country_data.js', array(), '', true );


		wp_register_script( 'jquery-scripts', get_stylesheet_directory_uri() . '/library/js/scripts.js', array(), '', true );

		wp_register_script( 'angulartics', get_stylesheet_directory_uri() . '/bower_components/angulartics/dist/angulartics.min.js', array(), '', true );
		wp_register_script( 'angulartics-ga', get_stylesheet_directory_uri() . '/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js', array(), '', true );
		
		wp_register_script( 'bootstrap', get_stylesheet_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js', array(), '', true );
		wp_register_script( 'leaflet.js', get_stylesheet_directory_uri() . '/bower_components/leaflet/dist/leaflet.js', array(), '', true );
		wp_register_script( 'd3.js', get_stylesheet_directory_uri() . '/bower_components/d3/d3.js', array(), '', true );
		wp_register_script( 'nvd3.js', get_stylesheet_directory_uri() . '/bower_components/nvd3/build/nv.d3.min.js', array(), '', true );

		wp_register_script( 'underscore', get_stylesheet_directory_uri() . '/bower_components/underscore/underscore-min.js', array(), '', true );
		wp_register_script( 'angular', get_stylesheet_directory_uri() . '/bower_components/angular/angular.js', array(), '', true );
		wp_register_script( 'ext.xdr', get_stylesheet_directory_uri() . '/bower_components/angular-cors-ie9/dist/angular-cors-ie9.js', array(), '', true );
		

		wp_register_script( 'angular-route', get_stylesheet_directory_uri() . '/bower_components/angular-route/angular-route.min.js', array(), '', true );
		wp_register_script( 'angular-cookies', get_stylesheet_directory_uri() . '/bower_components/angular-cookies/angular-cookies.min.js', array(), '', true );
		wp_register_script( 'angular-animate', get_stylesheet_directory_uri() . '/bower_components/angular-animate/angular-animate.min.js', array(), '', true );
		wp_register_script( 'angular-resource', get_stylesheet_directory_uri() . '/bower_components/angular-resource/angular-resource.min.js', array(), '', true);

		wp_register_script( 'api-check', get_stylesheet_directory_uri() . '/bower_components/api-check/dist/api-check.min.js', array(), '', true);
		wp_register_script( 'angular-formly', get_stylesheet_directory_uri() . '/bower_components/angular-formly/dist/formly.min.js', array(), '', true);		
		wp_register_script( 'angular-formly-bootstrap', get_stylesheet_directory_uri() . '/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js', array(), '', true);		

		wp_register_script( 'angular-ui-router', get_stylesheet_directory_uri() . '/javascripts/_helpers/angularUtils/ui-router.min.js', array(), '', true );
		wp_register_script( 'checklist-module', get_stylesheet_directory_uri() . '/javascripts/_helpers/angularUtils/checklist-model.js', array(), '', true );
		
		wp_register_script( 'angular-nvd3', get_stylesheet_directory_uri() . '/bower_components/angular-nvd3/dist/angular-nvd3.min.js', array(), '', true);
		wp_register_script( 'angular-leaflet-directive', get_stylesheet_directory_uri() . '/javascripts/ext/angular-leaflet-directive.js', array(), '', true);
		
		wp_register_script( 'bootstrap-slider', get_stylesheet_directory_uri() . '/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js', array(), '' );
		wp_register_script( 'angular-slider', get_stylesheet_directory_uri() . '/bower_components/angular-bootstrap-slider/slider.js', array('angular', 'bootstrap-slider', 'jquery'), '' );
		wp_register_script( 'angular-breadcrumb', get_stylesheet_directory_uri() . '/bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js', array(), '' );
		
		wp_register_script( 'infinite-scroll', get_stylesheet_directory_uri() . '/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js', array(), '' );
		
		wp_register_script( 'angular-auto-focus', get_stylesheet_directory_uri() . '/bower_components/angular-auto-focus/angular-auto-focus.js', array(), '', true );

		wp_register_script( 'bones-modernizr', get_stylesheet_directory_uri() . '/library/js/libs/modernizr.custom.min.js', array(), '2.5.3', true );
		
		wp_register_script( 'oipa', get_stylesheet_directory_uri() . '/javascripts/oipa.js', array(), '', true );
		wp_register_script( 'oipa.constants', get_stylesheet_directory_uri() . '/javascripts/oipa.constants.js', array(), '', true );
		wp_register_script( 'oipa.config', get_stylesheet_directory_uri() . '/javascripts/oipa.config.js', array(), '', true );
		wp_register_script( 'oipa.routes', get_stylesheet_directory_uri() . '/javascripts/oipa.routes.js', array(), '', true );
		wp_register_script( 'oipa.filters', get_stylesheet_directory_uri() . '/javascripts/oipa.filters.js', array(), '', true );


		// _PARTIALS
		wp_register_script( 'module.partials', get_stylesheet_directory_uri() . '/javascripts/_partials/module.partials.js', array(), '', true );
		wp_register_script( 'controller.topnavbar', get_stylesheet_directory_uri() . '/javascripts/_partials/topnavbar/controller.topnavbar.js', array(), '', true );
		wp_register_script( 'directive.topnavbar', get_stylesheet_directory_uri() . '/javascripts/_partials/topnavbar/directive.topnavbar.js', array(), '', true );
		wp_register_script( 'controller.subnavbar', get_stylesheet_directory_uri() . '/javascripts/_partials/subnavbar/controller.subnavbar.js', array(), '', true );
		wp_register_script( 'directive.subnavbar', get_stylesheet_directory_uri() . '/javascripts/_partials/subnavbar/directive.subnavbar.js', array(), '', true );



		wp_register_script( 'module.search', get_stylesheet_directory_uri() . '/javascripts/_partials/search/module.search.js', array(), '', true );
		wp_register_script( 'directive.search', get_stylesheet_directory_uri() . '/javascripts/_partials/search/directive.searchbox.js', array(), '', true );
		wp_register_script( 'controller.search', get_stylesheet_directory_uri() . '/javascripts/_partials/search/controller.search.js', array(), '', true );
		wp_register_script( 'service.search', get_stylesheet_directory_uri() . '/javascripts/_partials/search/service.search.js', array(), '', true );

		wp_register_script( 'module.toolbar', get_stylesheet_directory_uri() . '/javascripts/_partials/toolbar/module.toolbar.js', array(), '', true );
		wp_register_script( 'directive.toolbar', get_stylesheet_directory_uri() . '/javascripts/_partials/toolbar/directive.toolbar.js', array(), '', true );

		
		wp_register_script( 'module.tabs', get_stylesheet_directory_uri() . '/javascripts/_partials/tabs/module.tabs.js', array(), '', true );
		wp_register_script( 'controller.tabs', get_stylesheet_directory_uri() . '/javascripts/_partials/tabs/controller.tabs.js', array(), '', true );
		wp_register_script( 'directive.tabs', get_stylesheet_directory_uri() . '/javascripts/_partials/tabs/directive.tabs.js', array(), '', true );
		wp_register_script( 'service.tabs', get_stylesheet_directory_uri() . '/javascripts/_partials/tabs/service.tabs.js', array(), '', true );

		wp_register_script( 'service.timeSlider', get_stylesheet_directory_uri() . '/javascripts/_partials/timeSlider/service.timeSlider.js', array(), '', true );
		
		wp_register_script( 'directive.filters.filter.bar', get_stylesheet_directory_uri() . '/javascripts/_partials/filterbar/directive.filter.bar.js', array(), '', true );
		wp_register_script( 'directive.filterbar.detail.filter.bar', get_stylesheet_directory_uri() . '/javascripts/_partials/filterbar/directive.detail.filter.bar.js', array(), '', true );
		wp_register_script( 'directive.social', get_stylesheet_directory_uri() . '/javascripts/_partials/social/directive.social.js', array(), '', true );		
		//wp_register_script( 'controller.social', get_stylesheet_directory_uri() . '/javascripts/_partials/social/controller.social.js', array(), '', true );	
		// _HELPERS
		wp_register_script( 'module.pagination', get_stylesheet_directory_uri() . '/javascripts/_helpers/angularUtils/directives/pagination/dirPagination.js', array(), '', true );


		// _LAYOUT
		wp_register_script( 'module.layout', get_stylesheet_directory_uri() . '/javascripts/_layout/module.layout.js', array(), '', true );
		wp_register_script( 'controller.layout.index', get_stylesheet_directory_uri() . '/javascripts/_layout/controller.index.js', array(), '', true );
		wp_register_script( 'controller.navbar', get_stylesheet_directory_uri() . '/javascripts/_layout/controller.navbar.js', array(), '', true );
		wp_register_script( 'directive.navbar', get_stylesheet_directory_uri() . '/javascripts/_layout/directive.navbar.js', array(), '', true );


		wp_register_script( 'module.aggregations', get_stylesheet_directory_uri() . '/javascripts/aggregations/module.aggregations.js', array(), '', true );
		wp_register_script( 'service.aggregations', get_stylesheet_directory_uri() . '/javascripts/aggregations/service.aggregations.js', array(), '', true );

		wp_register_script( 'mapping.countries.partnerlanden', get_stylesheet_directory_uri() . '/javascripts/countries/mapping.partnerlanden.js', array(''), '', true );
		wp_register_script( 'module.countries', get_stylesheet_directory_uri() . '/javascripts/countries/module.countries.js', array(), '', true );
		wp_register_script( 'controller.countries', get_stylesheet_directory_uri() . '/javascripts/countries/controller.countries.js', array(), '', true );
		wp_register_script( 'controller.countries.list', get_stylesheet_directory_uri() . '/javascripts/countries/controller.countries.list.js', array(), '', true );
		wp_register_script( 'controller.countries.explore', get_stylesheet_directory_uri() . '/javascripts/countries/controller.countries.explore.js', array(), '', true );
		wp_register_script( 'controller.countries.map', get_stylesheet_directory_uri() . '/javascripts/countries/controller.countries.map.js', array(), '', true );
		wp_register_script( 'controller.country', get_stylesheet_directory_uri() . '/javascripts/countries/controller.country.js', array(), '', true );
		wp_register_script( 'directive.countries', get_stylesheet_directory_uri() . '/javascripts/countries/directive.countries.js', array(), '', true );
		wp_register_script( 'directive.countries.list', get_stylesheet_directory_uri() . '/javascripts/countries/directive.countries.list.js', array(), '', true );
		wp_register_script( 'directive.countries.explore', get_stylesheet_directory_uri() . '/javascripts/countries/directive.countries.explore.js', array(), '', true );
		wp_register_script( 'directive.countries.map', get_stylesheet_directory_uri() . '/javascripts/countries/directive.countries.map.js', array(), '', true );
		wp_register_script( 'service.countries', get_stylesheet_directory_uri() . '/javascripts/countries/service.countries.js', array(), '', true );

		wp_register_script( 'module.policyMarkers', get_stylesheet_directory_uri() . '/javascripts/policyMarkers/module.policyMarkers.js', array(), '', true );
		wp_register_script( 'service.policyMarkers', get_stylesheet_directory_uri() . '/javascripts/policyMarkers/service.policyMarkers.js', array(), '', true );

		wp_register_script( 'module.locations', get_stylesheet_directory_uri() . '/javascripts/locations/module.locations.js', array(), '', true );
		wp_register_script( 'controller.locations.maplist', get_stylesheet_directory_uri() . '/javascripts/locations/controller.locations.maplist.js', array(), '', true );
		wp_register_script( 'controller.locations.visualisation', get_stylesheet_directory_uri() . '/javascripts/locations/controller.locations.visualisation.js', array(), '', true );
		wp_register_script( 'controller.locations.geomap', get_stylesheet_directory_uri() . '/javascripts/locations/controller.locations.geomap.js', array(), '', true );
		wp_register_script( 'directive.locations.geomap', get_stylesheet_directory_uri() . '/javascripts/locations/directive.locations.geomap.js', array(), '', true );
		wp_register_script( 'controller.temp.locations.geomap', get_stylesheet_directory_uri() . '/javascripts/locations/controller.temp.locations.geomap.js', array(), '', true );
		wp_register_script( 'directive.temp.locations.geomap', get_stylesheet_directory_uri() . '/javascripts/locations/directive.temp.locations.geomap.js', array(), '', true );


		wp_register_script( 'module.activities', get_stylesheet_directory_uri() . '/javascripts/activities/module.activities.js', array(), '', true );
		wp_register_script( 'controller.activities', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activities.js', array(), '', true );
		wp_register_script( 'controller.activities.list', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activities.list.js', array(), '', true );
		wp_register_script( 'controller.activity', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activity.js', array(), '', true );
		wp_register_script( 'controller.activity.geomap', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activity.geomap.js', array(), '', true );
		wp_register_script( 'controller.activities.polygonmap', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activities.polygonmap.js', array(), '', true );
		wp_register_script( 'controller.activity.explore', get_stylesheet_directory_uri() . '/javascripts/activities/controller.activities.explore.js', array(), '', true );
		wp_register_script( 'directive.activity.geomap', get_stylesheet_directory_uri() . '/javascripts/activities/directive.activity.geomap.js', array(), '', true );
		wp_register_script( 'directive.activities.geomap', get_stylesheet_directory_uri() . '/javascripts/activities/directive.activities.geomap.js', array(), '', true );
		wp_register_script( 'directive.activity.list', get_stylesheet_directory_uri() . '/javascripts/activities/directive.activity.list.js', array(), '', true );
		wp_register_script( 'service.activities', get_stylesheet_directory_uri() . '/javascripts/activities/service.activities.js', array(), '', true );

		wp_register_script( 'module.budget', get_stylesheet_directory_uri() . '/javascripts/budgets/module.budget.js', array(), '', true );
		wp_register_script( 'controller.budget', get_stylesheet_directory_uri() . '/javascripts/budgets/controller.budget.js', array(), '', true );
		wp_register_script( 'service.budget', get_stylesheet_directory_uri() . '/javascripts/budgets/service.budget.js', array(), '', true );

		wp_register_script( 'module.regions', get_stylesheet_directory_uri() . '/javascripts/regions/module.regions.js', array(), '', true );
		wp_register_script( 'controller.region', get_stylesheet_directory_uri() . '/javascripts/regions/controller.region.js', array(), '', true );
		wp_register_script( 'controller.regions', get_stylesheet_directory_uri() . '/javascripts/regions/controller.regions.js', array(), '', true );
		wp_register_script( 'service.regions', get_stylesheet_directory_uri() . '/javascripts/regions/service.regions.js', array(), '', true );
		wp_register_script( 'controller.regions.list', get_stylesheet_directory_uri() . '/javascripts/regions/controller.regions.list.js', array(), '', true );
		wp_register_script( 'controller.regions.visualisation', get_stylesheet_directory_uri() . '/javascripts/regions/controller.regions.visualisation.js', array(), '', true );
		wp_register_script( 'directive.regions.list', get_stylesheet_directory_uri() . '/javascripts/regions/directive.regions.list.js', array(), '', true );
		


		wp_register_script( 'module.sectors', get_stylesheet_directory_uri() . '/javascripts/sectors/module.sectors.js', array(), '', true );
		wp_register_script( 'controller.sectors', get_stylesheet_directory_uri() . '/javascripts/sectors/controller.sectors.js', array(), '', true );
		wp_register_script( 'controller.sector', get_stylesheet_directory_uri() . '/javascripts/sectors/controller.sector.js', array(), '', true );
		wp_register_script( 'controller.sectors.visualisation', get_stylesheet_directory_uri() . '/javascripts/sectors/controller.sectors.visualisation.js', array(), '', true );
		wp_register_script( 'controller.sectors.explore', get_stylesheet_directory_uri() . '/javascripts/sectors/controller.sectors.explore.js', array(), '', true );
		wp_register_script( 'controller.sectors.list', get_stylesheet_directory_uri() . '/javascripts/sectors/controller.sectors.list.js', array(), '', true );
		wp_register_script( 'directive.sectors', get_stylesheet_directory_uri() . '/javascripts/sectors/directive.sectors.js', array(), '', true );
		wp_register_script( 'directive.sectors.explore', get_stylesheet_directory_uri() . '/javascripts/sectors/directive.sectors.explore.js', array(), '', true );
		wp_register_script( 'directive.sectors.list', get_stylesheet_directory_uri() . '/javascripts/sectors/directive.sectors.list.js', array(), '', true );
		wp_register_script( 'service.sectors', get_stylesheet_directory_uri() . '/javascripts/sectors/service.sectors.js', array(), '', true );

		wp_register_script( 'module.activitystatus', get_stylesheet_directory_uri() . '/javascripts/activityStatus/module.activityStatus.js', array(), '', true );
		wp_register_script( 'controller.activitystatus', get_stylesheet_directory_uri() . '/javascripts/activityStatus/controller.activityStatus.js', array(), '', true );
		wp_register_script( 'service.activitystatus', get_stylesheet_directory_uri() . '/javascripts/activityStatus/service.activityStatus.js', array(), '', true );

		wp_register_script( 'module.implementingOrganisations', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/module.implementingOrganisations.js', array(), '', true );
		wp_register_script( 'controller.implementingOrganisations', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/controller.implementingOrganisations.js', array(), '', true );
		wp_register_script( 'controller.implementingOrganisation', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/controller.implementingOrganisation.js', array(), '', true );
		wp_register_script( 'directive.implementingOrganisations', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/directive.implementingOrganisations.js', array(), '', true );
		wp_register_script( 'service.implementingOrganisations', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/service.implementingOrganisations.js', array(), '', true );
		wp_register_script( 'controller.implementingOrganisations.visualisation', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/controller.implementingOrganisations.visualisation.js', array(), '', true );
		wp_register_script( 'controller.implementingOrganisations.explore', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/controller.implementingOrganisations.explore.js', array(), '', true );
		wp_register_script( 'directive.implementingOrganisations.explore', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/directive.implementingOrganisations.explore.js', array(), '', true );
		wp_register_script( 'controller.implementingOrganisations.list', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/controller.implementingOrganisations.list.js', array(), '', true );
		wp_register_script( 'directive.implementingOrganisations.list', get_stylesheet_directory_uri() . '/javascripts/implementingOrganisations/directive.implementingOrganisations.list.js', array(), '', true );

		wp_register_script( 'module.pages', get_stylesheet_directory_uri() . '/javascripts/pages/module.pages.js', array(), '', true );
		wp_register_script( 'controller.pages', get_stylesheet_directory_uri() . '/javascripts/pages/controller.pages.js', array(), '', true );

		wp_register_script( 'module.contact', get_stylesheet_directory_uri() . '/javascripts/pages/module.contact.js', array(), '', true );
		wp_register_script( 'controller.contact', get_stylesheet_directory_uri() . '/javascripts/pages/controller.contact.js', array(), '', true );

		wp_register_script( 'module.filters', get_stylesheet_directory_uri() . '/javascripts/filters/module.filters.js', array(), '', true );
		wp_register_script( 'controller.filters', get_stylesheet_directory_uri() . '/javascripts/filters/controller.filters.js', array(), '', true );
		wp_register_script( 'controller.filters.selection', get_stylesheet_directory_uri() . '/javascripts/filters/controller.filters.selection.js', array(), '', true );
		wp_register_script( 'service.filters', get_stylesheet_directory_uri() . '/javascripts/filters/service.filters.js', array(), '', true );
		wp_register_script( 'service.filters.selection', get_stylesheet_directory_uri() . '/javascripts/filters/service.filters.selection.js', array(), '', true );
		wp_register_script( 'directive.filters.filter.selection.box', get_stylesheet_directory_uri() . '/javascripts/filters/directive.selection.js', array(), '', true );
		wp_register_script( 'directive.filters.recipientcountries.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.recipientcountries.js', array(), '', true );
		wp_register_script( 'directive.filters.recipientregions.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.recipientregions.js', array(), '', true );
		
		wp_register_script( 'service.transactionYear', get_stylesheet_directory_uri() . '/javascripts/transactions/service.transactionYear.js', array(), '', true );
		wp_register_script( 'controller.transactionYear', get_stylesheet_directory_uri() . '/javascripts/transactions/controller.transactionYear.js', array(), '', true );
		wp_register_script( 'directive.filters.transactionYear.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.transactionYear.js', array(), '', true );

		wp_register_script( 'directive.filters.sectors.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.sectors.js', array(), '', true );
		wp_register_script( 'directive.filters.budget.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.budget.js', array(), '', true );
		wp_register_script( 'directive.filters.activity.status.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.activitystatus.js', array(), '', true );
		wp_register_script( 'directive.filters.implementing.organisations.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.implementingOrganisations.js', array(), '', true );
		wp_register_script( 'directive.filters.search.panel', get_stylesheet_directory_uri() . '/javascripts/filters/directive.panel.search.js', array(), '', true );


		wp_register_script( 'module.search.page', get_stylesheet_directory_uri() . '/javascripts/search/module.search.page.js', array(), '', true );
		wp_register_script( 'controllers.search.page', get_stylesheet_directory_uri() . '/javascripts/search/controllers.search.page.js', array(), '', true );
		wp_register_script( 'controllers.search.panel', get_stylesheet_directory_uri() . '/javascripts/search/controllers.search.panel.js', array(), '', true );
		
		// _CHARTS
		wp_register_script( 'module.bubbleChart', get_stylesheet_directory_uri() . '/javascripts/_charts/bubbleChart/module.bubbleChart.js', array(), '', true );
		wp_register_script( 'controller.bubbleChart', get_stylesheet_directory_uri() . '/javascripts/_charts/bubbleChart/controller.bubbleChart.js', array(), '', true );
		wp_register_script( 'directive.bubbleChart', get_stylesheet_directory_uri() . '/javascripts/_charts/bubbleChart/directive.bubbleChart.js', array(), '', true );
		wp_register_script( 'ext.bubbleChart', get_stylesheet_directory_uri() . '/javascripts/_charts/bubbleChart/ext.bubbleChart.js', array(), '', true );
		wp_register_script( 'service.bubbleChart', get_stylesheet_directory_uri() . '/javascripts/_charts/bubbleChart/service.bubbleChart.js', array(), '', true );
		
		wp_register_script( 'module.sunburst', get_stylesheet_directory_uri() . '/javascripts/_charts/sunburst/module.sunburst.js', array(), '', true );
		wp_register_script( 'controller.sunburst', get_stylesheet_directory_uri() . '/javascripts/_charts/sunburst/controller.sunburst.js', array(), '', true );
		wp_register_script( 'directive.sunburst', get_stylesheet_directory_uri() . '/javascripts/_charts/sunburst/directive.sunburst.js', array(), '', true );
		wp_register_script( 'ext.sunburst', get_stylesheet_directory_uri() . '/javascripts/_charts/sunburst/ext.sunburst.js', array(), '', true );
		wp_register_script( 'service.sunburst', get_stylesheet_directory_uri() . '/javascripts/_charts/sunburst/service.sunburst.js', array(), '', true );

		wp_register_script( 'module.geovis', get_stylesheet_directory_uri() . '/javascripts/_charts/geovis/module.geovis.js', array(), '', true );
		wp_register_script( 'directive.geovis', get_stylesheet_directory_uri() . '/javascripts/_charts/geovis/directive.geovis.js', array(), '', true );
		wp_register_script( 'controller.geovis', get_stylesheet_directory_uri() . '/javascripts/_charts/geovis/controller.geovis.js', array(), '', true );
		wp_register_script( 'ext.geovis', get_stylesheet_directory_uri() . '/javascripts/_charts/geovis/ext.geovis.js', array(), '', true );

		wp_register_script( 'module.stackedBarChart', get_stylesheet_directory_uri() . '/javascripts/_charts/stackedBarChart/module.stackedBarChart.js', array(), '', true );
		wp_register_script( 'controller.stackedBarChart', get_stylesheet_directory_uri() . '/javascripts/_charts/stackedBarChart/controller.stackedBarChart.js', array(), '', true );
		wp_register_script( 'directive.stackedBarChart', get_stylesheet_directory_uri() . '/javascripts/_charts/stackedBarChart/directive.stackedBarChart.js', array(), '', true );
		
		wp_register_script( 'module.oipaLineChart', get_stylesheet_directory_uri() . '/javascripts/_charts/module.oipaLineChart.js', array(), '', true );
		wp_register_script( 'directive.oipaLineChart', get_stylesheet_directory_uri() . '/javascripts/_charts/directive.oipaLineChart.js', array(), '', true );
		wp_register_script( 'controller.oipaLineChart', get_stylesheet_directory_uri() . '/javascripts/_charts/controller.oipaLineChart.js', array(), '', true );
		wp_register_script( 'directive.oipaTableChart', get_stylesheet_directory_uri() . '/javascripts/_charts/directive.oipaTableChart.js', array(), '', true );
		wp_register_script( 'controller.oipaTableChart', get_stylesheet_directory_uri() . '/javascripts/_charts/controller.oipaTableChart.js', array(), '', true );
		wp_register_script( 'directive.oipaTotalFiguresChart', get_stylesheet_directory_uri() . '/javascripts/_charts/directive.oipaTotalFiguresChart.js', array(), '', true );
		wp_register_script( 'controller.oipaTotalFiguresChart', get_stylesheet_directory_uri() . '/javascripts/_charts/controller.oipaTotalFiguresChart.js', array(), '', true );

		wp_register_script( 'directive.financialsLineChart', get_stylesheet_directory_uri() . '/javascripts/_charts/directive.financialsLineChart.js', array(), '', true );
		wp_register_script( 'controller.financialsLineChart', get_stylesheet_directory_uri() . '/javascripts/_charts/controller.financialsLineChart.js', array(), '', true );

		wp_register_script( 'directive.chartWrapper', get_stylesheet_directory_uri() . '/javascripts/_charts/directive.chartWrapper.js', array(), '', true );

		wp_enqueue_script( 'countrydata' );

		wp_enqueue_script( 'bones-modernizr' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-scripts' );
		wp_enqueue_script( 'bootstrap' );
		wp_enqueue_script( 'leaflet.js' );
		wp_enqueue_script( 'bootstrap-slider' );
		wp_enqueue_script( 'angular-slider' );
		wp_enqueue_script( 'angular-breadcrumb' );

		wp_enqueue_script( 'angulartics' );
		wp_enqueue_script( 'angulartics-ga' );

		wp_enqueue_script( 'underscore' );
		wp_enqueue_script( 'd3.js' );
		wp_enqueue_script( 'nvd3.js' );

		wp_enqueue_script( 'angular' );
		wp_enqueue_script( 'ext.xdr' );
		wp_enqueue_script( 'angular-route' );
		wp_enqueue_script( 'angular-cookies' );
		wp_enqueue_script( 'angular-animate' );
		wp_enqueue_script( 'bones-js' );
		wp_enqueue_script( 'checklist-module' );
		wp_enqueue_script( 'angular-ui-router' );
		wp_enqueue_script( 'angular-resource' );

		wp_enqueue_script( 'api-check' );
		wp_enqueue_script( 'angular-formly' );
		wp_enqueue_script( 'angular-formly-bootstrap' );

		wp_enqueue_script( 'angular-nvd3' );

		wp_enqueue_script( 'angular-leaflet-directive' );
		wp_enqueue_script( 'infinite-scroll' );

		wp_enqueue_script( 'angular-auto-focus' );

		wp_enqueue_script( 'oipa' );
		wp_enqueue_script( 'oipa.constants' );
		wp_enqueue_script( 'oipa.config' );
		wp_enqueue_script( 'oipa.routes' );
		wp_enqueue_script( 'oipa.filters' );

		wp_enqueue_script( 'service.timeSlider' );
		
		wp_enqueue_script( 'module.layout' );
		wp_enqueue_script( 'controller.layout.index' );

		// _PARTIALS
		wp_enqueue_script( 'module.partials' );
		wp_enqueue_script( 'controller.topnavbar' );
		wp_enqueue_script( 'directive.topnavbar' );
		wp_enqueue_script( 'controller.subnavbar' );
		wp_enqueue_script( 'directive.subnavbar' );
		
		wp_enqueue_script( 'controller.navbar' );
		wp_enqueue_script( 'directive.navbar' );

		wp_enqueue_script( 'module.search' );
		wp_enqueue_script( 'directive.search' );
		wp_enqueue_script( 'controller.search' );
		wp_enqueue_script( 'service.search' );

		wp_enqueue_script( 'module.locations' );
		wp_enqueue_script( 'controller.locations.maplist' );
		wp_enqueue_script( 'controller.activities.polygonmap' );
		wp_enqueue_script( 'controller.locations.visualisation' );
		wp_enqueue_script( 'controller.locations.geomap' );
		wp_enqueue_script( 'directive.locations.geomap' );
		wp_enqueue_script( 'controller.temp.locations.geomap' );
		wp_enqueue_script( 'directive.temp.locations.geomap' );

		wp_enqueue_script( 'module.toolbar' );
		wp_enqueue_script( 'directive.toolbar' );

		wp_enqueue_script( 'module.pagination' );

		wp_enqueue_script( 'module.aggregations' );
		wp_enqueue_script( 'service.aggregations' );

		wp_enqueue_script( 'mapping.countries.partnerlanden' );
		wp_enqueue_script( 'module.countries' );
		wp_enqueue_script( 'controller.countries' );
		wp_enqueue_script( 'controller.countries.explore' );
		wp_enqueue_script( 'controller.countries.map' );
		wp_enqueue_script( 'controller.countries.list' );
		wp_enqueue_script( 'controller.country' );
		wp_enqueue_script( 'directive.countries' );
		wp_enqueue_script( 'directive.countries.explore' );
		wp_enqueue_script( 'directive.countries.map' );
		wp_enqueue_script( 'directive.countries.list' );
		wp_enqueue_script( 'service.countries' );

		wp_enqueue_script( 'module.policyMarkers' );
		wp_enqueue_script( 'service.policyMarkers' );

		wp_enqueue_script( 'module.activities' );
		wp_enqueue_script( 'controller.activities' );
		wp_enqueue_script( 'controller.activities.list' );
		wp_enqueue_script( 'controller.activity' );
		wp_enqueue_script( 'controller.activity.geomap' );
		wp_enqueue_script( 'directive.activity.geomap' );
		wp_enqueue_script( 'directive.activities.geomap' );
		wp_enqueue_script( 'controller.activity.explore' );
		wp_enqueue_script( 'directive.activity.list');
		wp_enqueue_script( 'service.activities' );

		wp_enqueue_script( 'module.budget' );
		wp_enqueue_script( 'controller.budget' );
		wp_enqueue_script( 'service.budget' );

		wp_enqueue_script( 'module.activitystatus' );
		wp_enqueue_script( 'controller.activitystatus' );
		wp_enqueue_script( 'service.activitystatus' );

		wp_enqueue_script( 'module.tabs' );
		wp_enqueue_script( 'controller.tabs' );
		wp_enqueue_script( 'directive.tabs' );
		wp_enqueue_script( 'service.tabs' );

		wp_enqueue_script( 'module.implementingOrganisations' );
		wp_enqueue_script( 'controller.implementingOrganisations' );
		wp_enqueue_script( 'controller.implementingOrganisation' );
		wp_enqueue_script( 'directive.implementingOrganisations' );
		wp_enqueue_script( 'service.implementingOrganisations' );
		wp_enqueue_script( 'controller.implementingOrganisations.visualisation' );
		wp_enqueue_script( 'controller.implementingOrganisations.explore' );
		wp_enqueue_script( 'directive.implementingOrganisations.explore' );
		wp_enqueue_script( 'controller.implementingOrganisations.type.explore' );
		wp_enqueue_script( 'directive.implementingOrganisations.type.explore' );
		wp_enqueue_script( 'controller.implementingOrganisations.list' );
		wp_enqueue_script( 'directive.implementingOrganisations.list' );

		wp_enqueue_script( 'module.pages' );
		wp_enqueue_script( 'controller.pages' );
		
		wp_enqueue_script( 'module.contact' );
		wp_enqueue_script( 'controller.contact' );

		wp_enqueue_script( 'module.regions' );
		wp_enqueue_script( 'controller.region' );
		wp_enqueue_script( 'controller.regions' );
		wp_enqueue_script( 'service.regions' );
		wp_enqueue_script( 'controller.regions.list' );
		wp_enqueue_script( 'controller.regions.visualisation' );
		wp_enqueue_script( 'directive.regions.list' );
		
		wp_enqueue_script( 'module.sectors' );
		wp_enqueue_script( 'controller.sectors' );
		wp_enqueue_script( 'controller.sector' );
		wp_enqueue_script( 'controller.sectors.visualisation' );
		wp_enqueue_script( 'controller.sectors.explore' );
		wp_enqueue_script( 'controller.sectors.list' );
		wp_enqueue_script( 'directive.sectors' );
		wp_enqueue_script( 'directive.sectors.list' );
		wp_enqueue_script( 'directive.sectors.explore' );
		wp_enqueue_script( 'service.sectors' );
		
		wp_enqueue_script( 'module.filters' );
		wp_enqueue_script( 'service.transactionYear');
		wp_enqueue_script( 'controller.transactionYear' );
		wp_enqueue_script( 'controller.filters' );
		wp_enqueue_script( 'controller.filters.selection' );
		wp_enqueue_script( 'service.filters' );
		wp_enqueue_script( 'service.filters.selection' );
		wp_enqueue_script( 'directive.filters.filter.bar' );
		wp_enqueue_script( 'directive.filterbar.detail.filter.bar' );
		wp_enqueue_script( 'directive.social' );
		//wp_enqueue_script( 'controller.social' );
		wp_enqueue_script( 'directive.filters.filter.selection.box' );
		wp_enqueue_script( 'directive.filters.recipientcountries.panel' );
		wp_enqueue_script( 'directive.filters.transactionYear.panel' );
		wp_enqueue_script( 'directive.filters.recipientregions.panel' );
		wp_enqueue_script( 'directive.filters.sectors.panel' );
		wp_enqueue_script( 'directive.filters.budget.panel' );
		wp_enqueue_script( 'directive.filters.activity.status.panel' );
		wp_enqueue_script( 'directive.filters.implementing.organisations.panel' );
		wp_enqueue_script( 'directive.filters.search.panel' );

		wp_enqueue_script( 'module.search.page' );
		wp_enqueue_script( 'controllers.search.page' );
		wp_enqueue_script( 'controllers.search.panel' );

		// _charts
		wp_enqueue_script( 'module.oipaLineChart' );
		wp_enqueue_script( 'directive.oipaLineChart' );
		wp_enqueue_script( 'controller.oipaLineChart' );
		wp_enqueue_script( 'directive.oipaTableChart' );
		wp_enqueue_script( 'controller.oipaTableChart' );
		wp_enqueue_script( 'directive.oipaTotalFiguresChart' );
		wp_enqueue_script( 'controller.oipaTotalFiguresChart' );
		wp_enqueue_script( 'directive.chartWrapper' );

		wp_enqueue_script( 'module.geovis' );
		wp_enqueue_script( 'directive.geovis' );
		wp_enqueue_script( 'controller.geovis' );
		wp_enqueue_script( 'ext.geovis' );

		wp_enqueue_script( 'module.stackedBarChart' );
		wp_enqueue_script( 'controller.stackedBarChart' );
		wp_enqueue_script( 'directive.stackedBarChart' );

		wp_enqueue_script( 'module.bubbleChart' );
		wp_enqueue_script( 'controller.bubbleChart' );
		wp_enqueue_script( 'directive.bubbleChart' );
		wp_enqueue_script( 'service.bubbleChart' );
		wp_enqueue_script( 'ext.bubbleChart' );
		wp_enqueue_script( 'service.bubbleChart' );

		wp_enqueue_script( 'controller.financialsLineChart' );
		wp_enqueue_script( 'directive.financialsLineChart' );

		wp_enqueue_script( 'module.sunburst');
		wp_enqueue_script( 'controller.sunburst');
		wp_enqueue_script( 'directive.sunburst');
		wp_enqueue_script( 'ext.sunburst');
		wp_enqueue_script( 'service.sunburst');
	}
}

/*********************
THEME SUPPORT
*********************/

// Adding WP 3+ Functions & Theme Support
function bones_theme_support() {

	// wp thumbnails (sizes handled in functions.php)
	add_theme_support( 'post-thumbnails' );

	// default thumb size
	set_post_thumbnail_size(125, 125, true);

	// rss thingy
	add_theme_support('automatic-feed-links');

	// to add header image support go here: http://themble.com/support/adding-header-background-image-support/

	// adding post format support
	// add_theme_support( 'post-formats',
	// 	array(
	// 		'aside',             // title less blurb
	// 		'gallery',           // gallery of images
	// 		'link',              // quick link to other site
	// 		'image',             // an image
	// 		'quote',             // a quick quote
	// 		'status',            // a Facebook like status update
	// 		'video',             // video
	// 		'audio',             // audio
	// 		'chat'               // chat transcript
	// 	)
	// );

	// wp menus
	add_theme_support( 'menus' );

	// registering wp3+ menus
	register_nav_menus(
		array(
			'main-nav' => __( 'The Main Menu', 'bonestheme' ),   // main nav in header
			'footer-links' => __( 'Footer Links', 'bonestheme' ) // secondary nav in footer
		)
	);
} /* end bones theme support */

/*********************
RANDOM CLEANUP ITEMS
*********************/

// remove the p from around imgs (http://css-tricks.com/snippets/wordpress/remove-paragraph-tags-from-around-images/)
function bones_filter_ptags_on_images($content){
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

// This removes the annoying […] to a Read More link
function bones_excerpt_more($more) {
	global $post;
	// edit here if you like
	return '...  <a class="excerpt-read-more" href="'. get_permalink( $post->ID ) . '" title="'. __( 'Read ', 'bonestheme' ) . esc_attr( get_the_title( $post->ID ) ).'">'. __( 'Read more &raquo;', 'bonestheme' ) .'</a>';
}



?>
