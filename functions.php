<?php

require_once( 'library/bones.php' );

// CUSTOMIZE THE WORDPRESS ADMIN (off by default)
require_once( 'library/admin.php' );

/*********************
LAUNCH BONES
Let's get everything up and running.
*********************/

function openaid_init() {

  add_theme_support( 'angular-wp-api',
    array(
      'oipa'
    ));
  
  //Allow editor style.
  add_editor_style( get_stylesheet_directory_uri() . '/library/css/editor-style.css' );

  // let's get language support going, if you need it
  //load_theme_textdomain( 'bonestheme', get_template_directory() . '/library/translation' );

  // USE THIS TEMPLATE TO CREATE CUSTOM POST TYPES EASILY
  //require_once( 'library/custom-post-type.php' );

  // launching operation cleanup
  add_action( 'init', 'bones_head_cleanup' );
  // remove WP version from RSS
  add_filter( 'the_generator', 'bones_rss_version' );
  // remove pesky injected css for recent comments widget
  add_filter( 'wp_head', 'bones_remove_wp_widget_recent_comments_style', 1 );
  // clean up comment styles in the head
  add_action( 'wp_head', 'bones_remove_recent_comments_style', 1 );
  // clean up gallery output in wp
  add_filter( 'gallery_style', 'bones_gallery_style' );

  // enqueue base scripts and styles
  add_action( 'wp_enqueue_scripts', 'bones_scripts_and_styles', 999 );
  // ie conditional wrapper

  // launching this stuff after theme setup
  bones_theme_support();

  // adding sidebars to Wordpress (these are created in functions.php)
  //add_action( 'widgets_init', 'bones_register_sidebars' );

  // cleaning up random code around images
  add_filter( 'the_content', 'bones_filter_ptags_on_images' );
  // cleaning up excerpt
  add_filter( 'excerpt_more', 'bones_excerpt_more' );

} /* end bones ahoy */

// let's get this party started
add_action( 'after_setup_theme', 'openaid_init' );


/************* OEMBED SIZE OPTIONS *************/

if ( ! isset( $content_width ) ) {
	$content_width = 640;
}

/************* THUMBNAIL SIZE OPTIONS *************/

// Thumbnail sizes
add_image_size( 'bones-thumb-600', 600, 150, true );
add_image_size( 'bones-thumb-300', 300, 100, true );


add_filter( 'image_size_names_choose', 'bones_custom_image_sizes' );

function bones_custom_image_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'bones-thumb-600' => __('600px by 150px'),
        'bones-thumb-300' => __('300px by 100px'),
    ) );
}


function add_rewrite_rules( $wp_rewrite ) 
{
  $new_rules = array(
    'project/([^/]+)/?$' => 'index.php?pagename=project&iati_id='.$wp_rewrite->preg_index(1),
    'landen/([^/]+)/?$' => 'index.php?pagename=landen&country_id='.$wp_rewrite->preg_index(1),
    'organisaties/([^/]+)/?$' => 'index.php?pagename=organisaties&donor_id='.$wp_rewrite->preg_index(1),
    'sectoren/([^/]+)/?$' => 'index.php?pagename=sectoren&donor_id='.$wp_rewrite->preg_index(1),
    'embed/([^/]+)/?$' => 'index.php?pagename=embed&iati_id='.$wp_rewrite->preg_index(1),
  );
  $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
}
add_action('generate_rewrite_rules', 'add_rewrite_rules');


function rsr_call() {
  $iati_id = "";
  if (isset($_REQUEST['iati_id'])){
    $iati_id = $_REQUEST['iati_id'];
  }

  $search_url = "http://rsr.akvo.org/api/v1/project/?format=json&partnerships__iati_activity_id=" . $iati_id . "&distinct=True&limit=100";
  $content = file_get_contents($search_url);
  echo $content;
  die();
}
add_action('wp_ajax_projects_list', 'projects_list');
add_action('wp_ajax_nopriv_projects_list', 'projects_list');
add_action('wp_ajax_rsr_call', 'rsr_call');
add_action('wp_ajax_nopriv_rsr_call', 'rsr_call');





function angular_form() {

  $json = file_get_contents('php://input');
  $obj = json_decode($json, true);

  $fname = $obj['first_name'];
  $lname = $obj['last_name'];
  $org = $obj['organisation'];
  $phone = $obj['phone'];
  $email = $obj['email'];
  $message = $obj['message'];

  $txt = "Mail sent from Openaid.nl \n";
  $txt .= "name: " . $fname . " " . $lname . "\n";
  $txt .= "organisation: " . $org . "\n";
  $txt .= "email: " . $email . "\n";
  $txt .= "phone: " . $phone . "\n";
  $txt .= "message: " . $message . "\n";

  mail("daan@zimmermanzimmerman.nl","OpenaidNL Contact form message",$txt);

  return 'Mail sent';
  exit();

}

add_action('wp_ajax_angular_form', 'angular_form');
add_action('wp_ajax_nopriv_angular_form', 'angular_form');

