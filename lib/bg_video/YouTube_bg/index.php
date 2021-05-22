<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">    
	<title>Фоновое видео для сайта Youtube Player</title>
	<link type="text/css" rel="stylesheet" href="css/demo.css">
	<link type="text/css" rel="stylesheet" href="css/jquery.mb.YTPlayer.min.css" media="all">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js"></script>
	<script src="js/jquery.mb.YTPlayer.min.js"></script>
	<script src="js/video.js"></script>
</head>
<body> 

<div id="customElement">
	<div class="content">
		<h1>Разработка и продвижение сайтов</h1> 
			<div></div>
		<p>Студия Дизайна LikeWeb.me</p>
		<a href="http://likeweb.me" target="_blank">
			<img class="logo" src="images/logo.png" widht="438" height="405"/>
		</a>
	 </div>
</div>

<div id="video" data-property="{
videoURL:'3McNFrqJMZw', 
containment:'#customElement', 
showControls:false, 
mute:true, 
startAt:0, 
opacity:1, 
addRaster:true, 
quality:'default', 
stopMovieOnBlur:false
}">
</div>

<div class="content2">
	<h2>Наши тарифы услуг на разработку сайтов</h2>
		<div class="services">
			<span>Сайт-визитка</span> / <span>Сайт компании</span> / 
			<span>Интернет-магазин</span> / <span>Landing-Page</span>
		</div>
</div>


</body>
</html>
