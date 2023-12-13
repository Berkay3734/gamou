<?php
	
	ob_start();
	session_start();
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
	header("Location: ./");
