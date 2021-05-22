<?
$nav = [
	['ID' => 1, 'PARENT' => 0, 'NAME' => 'item1', 'URL' => '/item1'],
	['ID' => 2, 'PARENT' => 0, 'NAME' => 'item2', 'URL' => '/item2'],
	['ID' => 3, 'PARENT' => 0, 'NAME' => 'item3', 'URL' => '/item3'],
	['ID' => 4, 'PARENT' => 0, 'NAME' => 'item4', 'URL' => '/item4'],
	['ID' => 5, 'PARENT' => 0, 'NAME' => 'item5', 'URL' => '/item5'],
	['ID' => 6, 'PARENT' => 2, 'NAME' => 'subitem1', 'URL' => '/subitem1'],
	['ID' => 7, 'PARENT' => 2, 'NAME' => 'subitem2', 'URL' => '/subitem2'],
	['ID' => 8, 'PARENT' => 2, 'NAME' => 'subitem3', 'URL' => '/subitem3'],
	['ID' => 9, 'PARENT' => 7, 'NAME' => 'pitem1', 'URL' => '/pitem1'],
	['ID' => 10, 'PARENT' => 7, 'NAME' => 'pitem2', 'URL' => '/pitem2'],
	['ID' => 11, 'PARENT' => 7, 'NAME' => 'pitem3', 'URL' => '/pitem3'],
	['ID' => 12, 'PARENT' => 7, 'NAME' => 'pitem4', 'URL' => '/pitem4'],
	['ID' => 13, 'PARENT' => 5, 'NAME' => 'subitem1', 'URL' => '/subitem1'],
	['ID' => 14, 'PARENT' => 5, 'NAME' => 'subitem2', 'URL' => '/subitem2'],
	['ID' => 15, 'PARENT' => 5, 'NAME' => 'subitem3', 'URL' => '/subitem3'],
	['ID' => 16, 'PARENT' => 5, 'NAME' => 'subitem4', 'URL' => '/subitem4'],
	['ID' => 17, 'PARENT' => 13, 'NAME' => 'item1', 'URL' => '/item1']
];
function navView($menuItems = array(), $parentID = 0, $viewChild = true) {
	global $CURRENT;
	foreach($menuItems as $item) {
		if($item['SITE'] != $CURRENT['SITE']['ID']) continue;
		if($item['PARENT'] == $parentID) $navItems[] = $item;
	}
	if($navItems) {
		echo "<ul>";
		foreach($navItems as $nItem): ?>
			<li<?=($nItem['CURRENT'])?' class="active"':'';?>><a href="<?=$nItem['URL']?>"><?=$nItem['NAME']?></a><? if($viewChild) navView($menuItems, $nItem['ID']); ?></li>
		<? endforeach;
		echo "</ul>";
	}
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Nav</title>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
$(document).ready(function() {
	// nav items 'Has child' appointment
	$('nav li > ul').each(function(index, el) {
		$(this).parent().addClass('hasChild');
	});
});
</script>
<style>
/* Reset and default styles */
ul {
	padding: 0;
	margin: 0;
}
li {
	list-style: none;
}
nav a {
	padding: 6px 15px 7px;
	background: #ccc;
	text-decoration: none;
	border: 1px solid #ff0000;
	box-sizing: border-box;
}
.hasChild > a { /* Has child — marker */
	background: #40a6f5;
}

/* Engine */
nav a {
	display: block;
}
nav li {
	position: relative;
}
nav > ul {
	display: flex;
}
nav ul:not(:first-child) {
	position: absolute;
	display: none;
	z-index: 1;
}
nav li:hover > ul {
	display: block;
}
nav > ul > li > ul ul {
	position: absolute;
	top: 0;
	left: 100%;
}

/* Mobile menu */
.hamburger {
	cursor: pointer;
}
.hamburger > div {
	width: 40px;
	height: 4px;
	background: #000;
	margin-bottom: 8px;
}
.hamburger > div:last-child {
	margin-bottom: 0;
}

/* Mm styles */
.hamburger {
	position: fixed;
	top: 8px;
	right: 10px;
}
</style>
</head>
<body>

<div class="hamburger">
	<div></div>
	<div></div>
	<div></div>
</div>

<nav>
<? navView($nav) ?>
</nav>

</body>
</html>