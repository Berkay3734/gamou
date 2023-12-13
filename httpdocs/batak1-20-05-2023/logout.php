<?php
	ob_start();
	session_start();
	include("php/fonksiyonlar.php");
	unset($_SESSION["login"]);
	unset($_SESSION["FULLNAME"]);
	unset($_SESSION["email"]);
	unset($_SESSION["username"]);
	unset($_SESSION["USERKEYZ"]);
	unset($_SESSION["resim"]);
	unset($_SESSION["userid"]);	
	unset($_SESSION["cinsiyet"]);	
	unset($_SESSION["adminLogin1"]);
	unset($_SESSION["adminid"]);
	unset($_COOKIE['authToken']); 
	$cookie_url = ayargetir("site_linki");
	if ($cookie_url != "localhost") $cookie_url = '.'.$cookie_url;
	setcookie("authToken", "",time() - 3600, '/', $cookie_url );
	header("Location: ./");
?> 
