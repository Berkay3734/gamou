<!DOCTYPE html>
<?php
	ob_start(); 
	session_start();
	if(isset($_SESSION["adminLogin1"]) && $_SESSION["adminLogin1"]){
		header("Location: panel.php");
	}  
?>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<title>GİRİŞ</title>
		<link rel="stylesheet" type="text/css" media="screen" href="./css/template.css">
		<script src="./js/query.js"></script>
		<script src="./js/panel.js"></script>
	</head>
	<body oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
		<div class="zemin">
			<div class="ifade">
				<img src="./img/1.png">
			</div>
			<div class="login">
				<ul>
					<li style="padding-top: 10px;">Giriş kimliğiniz</li>
					<li><input type="text" id="kullaniciadi" name="kullaniciadi"></li>
				</ul>
				<ul>
					<li style="padding-top: 10px;">Parola</li>
					<li><input type="password" id="parola"></li>
				</ul>
				<ul>
					<li></li>
					<li><input type="submit" value="Şimdi bağlan" id="baglan"></li>
				</ul>
			</div>
			<div class="load"></div>
		</div>
	</body>
</html>
