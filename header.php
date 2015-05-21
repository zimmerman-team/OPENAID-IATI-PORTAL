<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

	<head>
		<meta charset="utf-8">

		<?php // force Internet Explorer to use the latest rendering engine available ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title><?php wp_title(''); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-touch-icon.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">
            <meta name="theme-color" content="#121212">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

		
		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>
		<base href="<?php echo home_url() . '/'; ?>" />
		<script>
			var home_url = '<?php echo home_url(); ?>';
			var template_url = '<?php echo get_template_directory_uri(); ?>';
			var oipa_url = 'http://localhost:8000/api/v3';
			// var oipa_url = 'http://149.210.176.175/api/v3';
			var reporting_organisation_id = 'NL-1';
			<?php $customFields = get_post_custom(); ?>
			var customFields = <?php echo json_encode($customFields); ?>;
			var partnerlanden = {"AF":"Hulprelatie","BI":"Hulprelatie","ML":"Hulprelatie","PS":"Hulprelatie","RW":"Hulprelatie","SS":"Hulprelatie","YE":"Hulprelatie","BD":"Overgangsrelatie","BJ":"Overgangsrelatie","ET":"Overgangsrelatie","GH":"Overgangsrelatie","ID":"Overgangsrelatie","KE":"Overgangsrelatie","MZ":"Overgangsrelatie","UG":"Overgangsrelatie","BO":"EXIT relatie","BF":"EXIT relatie","CO":"EXIT relatie","CD":"EXIT relatie","EG":"EXIT relatie","GE":"EXIT relatie","GT":"EXIT relatie","XK":"EXIT relatie","MD":"EXIT relatie","MN":"EXIT relatie","NI":"EXIT relatie","PK":"EXIT relatie","SN":"EXIT relatie","ZA":"EXIT relatie","SR":"EXIT relatie","TZ":"EXIT relatie","VN":"EXIT relatie","ZM":"EXIT relatie","BR":"Handelsrelatie","CN":"Handelsrelatie","IN":"Handelsrelatie","IQ":"Handelsrelatie","MX":"Handelsrelatie","NG":"Handelsrelatie","TR":"Handelsrelatie","UA":"Handelsrelatie"}
		</script>
	</head>

	<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage" ng-app="oipa">




