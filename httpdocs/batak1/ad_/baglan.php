<?php

include('php/env.php');

	$baglanti = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
	$baglanti->exec("SET NAMES utf8");
	$baglanti->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
	date_default_timezone_set('Europe/Istanbul'); 
	
?>
