<?php 

$format  = $_GET['format'];


$oipa_url = 'http://dev.oipa.nl/api/activities/';

if(empty($_GET['detail'])){
    $oipa_url .= '?limit=400&reporting_organisation=NL-1&format=' . $format;
    $oipa_filter  = $_GET['filters'];
    $url = $oipa_url . urldecode($oipa_filter);
} else {
    $url = $oipa_url . $_GET['detail'] . '/?format=' . $format;
}

$filename = 'export.' . $format;
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=" . $filename);
readfile($url);
