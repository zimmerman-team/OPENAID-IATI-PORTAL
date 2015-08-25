<?php 
$format  = $_GET['format'];
$oipa_url = 'http://149.210.176.175/api/v3/activities/?limit=400&reporting_organisation__in=NL-1&format=' . $format;
$oipa_filter  = $_GET['filters'];
$url = $oipa_url . urldecode($oipa_filter);
$filename = 'export.' . $format;
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=" . $filename);
readfile($url);
