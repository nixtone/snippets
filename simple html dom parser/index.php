<?
include_once $_SERVER['DOCUMENT_ROOT'].'/parser/HtmlWeb.php';
use simplehtmldom\HtmlWeb;
$client = new HtmlWeb();
$html = $client->load('https://snipp.ru/php/yamaps-db');
echo $html->find("h1", 0)->outertext . PHP_EOL;
?>
