<?php

include_once 'HtmlWeb.php';
use simplehtmldom\HtmlWeb;

$client = new HtmlWeb();
$html = $client->load('http://pamyatniki-v-samare.ru/pamyatnik__2_01/');

// Returns the page title
echo $html->find(".razmer-price", 0)->outertext . PHP_EOL;

?>
<script src="/jquery-3.6.0.min.js"></script>