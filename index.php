<?php get_header(); ?>

<navbar></navbar>

<div id="openaid-main" ui-view></div>


<a href="#" id="toTop">
  <span class="fa-stack fa-lg">
    <i class="fa fa-square fa-stack-2x"></i>
    <i class="fa fa-caret-up fa-stack-1x fa-inverse"></i>
  </span>
</a>

<div class="container link">
	<a id="to-iati-studio" href="https://www.iatistudio.com/" target="_blank">
		<img src="<?php echo get_template_directory_uri(); ?>/images/is_logo_full.svg" title="IATI Studio">
		<span class="hideMe">Build your own charts</span>
	</a>
</div>

<?php get_footer(); ?>