<!doctype html>

<!--[if lt IE 7]><html lang="nl" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html lang="nl" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html lang="nl" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html lang="nl" class="no-js"><!--<![endif]-->

	<head>
		<meta charset="utf-8">

		<?php // force Internet Explorer to use the latest rendering engine available ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title>OpenaidNL beta</title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-touch-icon.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">
            <meta name="theme-color" content="#121212">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

		
		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>
		<base href="<?php echo home_url() . '/'; ?>" />
		<script>
			var home_url = '<?php echo home_url(); ?>';
			var template_url = '<?php echo get_template_directory_uri(); ?>';
			// var oipa_url = 'http://localhost:8000/api/v3';
			var oipa_url = 'http://149.210.176.175/api/v3';
			var reporting_organisation_id = 'NL-1';
			<?php $customFields = get_post_custom(); ?>
			var customFields = <?php echo json_encode($customFields); ?>;
			var partnerlanden = {"AF":"Aidrelation","BI":"Aidrelation","ML":"Aidrelation","PS":"Aidrelation","RW":"Aidrelation","SS":"Aidrelation","YE":"Aidrelation","BD":"Transitionrelation","BJ":"Transitionrelation","ET":"Transitionrelation","GH":"Transitionrelation","ID":"Transitionrelation","KE":"Transitionrelation","MZ":"Transitionrelation","UG":"Transitionrelation","BO":"EXIT relation","BF":"EXIT relation","CO":"EXIT relation","CD":"EXIT relation","EG":"EXIT relation","GE":"EXIT relation","GT":"EXIT relation","XK":"EXIT relation","MD":"EXIT relation","MN":"EXIT relation","NI":"EXIT relation","PK":"EXIT relation","SN":"EXIT relation","ZA":"EXIT relation","SR":"EXIT relation","TZ":"EXIT relation","VN":"EXIT relation","ZM":"EXIT relation","BR":"Traderelation","CN":"Traderelation","IN":"Traderelation","IQ":"Traderelation","MX":"Traderelation","NG":"Traderelation","TR":"Traderelation","UA":"Traderelation"}
		</script>
	</head>

	<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage" ng-app="oipa">




