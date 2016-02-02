<!doctype html>

<!--[if lt IE 7]><html lang="nl" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html lang="nl" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html lang="nl" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html lang="nl" class="no-js"><!--<![endif]-->

	<head>
		<meta charset="utf-8">

		<?php // force Internet Explorer to use the latest rendering engine available ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title>OpenaidNL IATI Transparency Portal</title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="google-site-verification" content="kg16hK4Zau7ML-7qPPGv2GLlDel1LRY8ynmo8AU7VzI" />

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/favicon/apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="<?php echo get_template_directory_uri(); ?>/favicon/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-16x16.png">
		<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/favicon/manifest.json">
		<meta name="msapplication-TileColor" content="#444">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/favicon/ms-icon-144x144.png">
		<meta name="theme-color" content="#444">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
		
		<?php // wordpress head functions ?>
        <!--[if lt IE 10]>
        <script src="<?php echo get_template_directory_uri(); ?>/xhr-xdr-adapter.js" type="text/javascript"></script>
        <![endif]-->
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>
		<base href="<?php echo home_url() . '/'; ?>" />
		<script>
			var home_url = '<?php echo home_url(); ?>';
			var template_url = '<?php echo get_template_directory_uri(); ?>';
			// var oipa_url = 'http://localhost:8000/api/v3';
			var oipa_url = 'https://v1.oipa.nl/api/v3';
			var reporting_organisation_id = 'NL-1';
			<?php $customFields = get_post_custom(); ?>
			var customFields = <?php echo json_encode($customFields); ?>;
			var partnerlanden = {"AF":"Aidrelation","BI":"Aidrelation","ML":"Aidrelation","PS":"Aidrelation","RW":"Aidrelation","SS":"Aidrelation","YE":"Aidrelation","BD":"Transitionrelation","BJ":"Transitionrelation","ET":"Transitionrelation","GH":"Transitionrelation","ID":"Transitionrelation","KE":"Transitionrelation","MZ":"Transitionrelation","UG":"Transitionrelation","BO":"EXIT relation","BF":"EXIT relation","CO":"EXIT relation","CD":"EXIT relation","EG":"EXIT relation","GE":"EXIT relation","GT":"EXIT relation","XK":"EXIT relation","MD":"EXIT relation","MN":"EXIT relation","NI":"EXIT relation","PK":"EXIT relation","SN":"EXIT relation","ZA":"EXIT relation","SR":"EXIT relation","TZ":"EXIT relation","VN":"EXIT relation","ZM":"EXIT relation","BR":"Traderelation","CN":"Traderelation","IN":"Traderelation","IQ":"Traderelation","MX":"Traderelation","NG":"Traderelation","TR":"Traderelation","UA":"Traderelation"}
		</script>
		<!-- Begin Inspectlet Embed Code -->
<script type="text/javascript" id="inspectletjs">
window.__insp = window.__insp || [];
__insp.push(['wid', 1494660393]);
(function() {
function ldinsp(){var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();

})();
</script>
<!-- End Inspectlet Embed Code -->      
        <!-- Start Visual Website Optimizer Asynchronous Code -->
                <script type='text/javascript'>
                var _vwo_code=(function(){
                var account_id=198044,
                settings_tolerance=2000,
                library_tolerance=2500,
                use_existing_jquery=false,
                // DO NOT EDIT BELOW THIS LINE
                f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
                </script>
                <!-- End Visual Website Optimizer Asynchronous Code -->
	</head>

	<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage" ng-app="oipa">

		<div ng-if="false">
		    <h3 style="text-align:center;padding-top:100px;">Loading OpenaidNL, please wait...</h3>
			<div class="svg-loader">
                <img src="<?php echo get_template_directory_uri(); ?>/images/spinning-circles.svg" width="50">
            </div>
		</div>




