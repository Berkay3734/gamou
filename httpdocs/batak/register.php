<?php
	include("php/fonksiyonlar.php");
	if(ayargetir("yeni_kayit")!="true"){
		echo json_encode(array(
		"durum" => 1,
		"mesaj" => "Yeni Kayıt İşlemleri kapalıdır..",
		));
		exit(); 
	}
	if (isset($_POST['kayitadi'], $_POST['kayiteposta'], $_POST['kayitpassport'], $_POST['kayitadsoyad'])) {
		ob_start();
		session_start();
		function GetIP(){
			if(getenv("HTTP_CLIENT_IP")) {
				$ip = getenv("HTTP_CLIENT_IP");
				} elseif(getenv("HTTP_X_FORWARDED_FOR")) {
				$ip = getenv("HTTP_X_FORWARDED_FOR");
				if (strstr($ip, ',')) {
					$tmp = explode (',', $ip);
					$ip = trim($tmp[0]);
				}
				} else {
				$ip = getenv("REMOTE_ADDR");
			}
			return $ip;
		}
		$ipnumarasi=  GetIP();
		$kayitadi = trim(filter_input(INPUT_POST, 'kayitadi', FILTER_SANITIZE_STRING));
		$cinsiyet = trim(filter_input(INPUT_POST, 'cinsiyet', FILTER_SANITIZE_STRING));
		$kayitadsoyad = trim(filter_input(INPUT_POST, 'kayitadsoyad', FILTER_SANITIZE_STRING));
		$kayitpassport = trim(filter_input(INPUT_POST, 'kayitpassport', FILTER_SANITIZE_STRING));		
		$kayittel = trim(filter_input(INPUT_POST, 'kayittel', FILTER_SANITIZE_STRING));
		$kayiteposta = trim(filter_input(INPUT_POST, 'kayiteposta', FILTER_SANITIZE_EMAIL));		
		$re = "/^(?=.*[a-z])(?=.*\\d).{8,}$/i"; 
		if(!$kayitadi || !$kayiteposta || !$kayitpassport){
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Bilgileri Eksik Girdiniz..",
			));
		}
		else if(!filter_var($kayiteposta, FILTER_VALIDATE_EMAIL)){
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Mail formatını kontrol ediniz..",
			));
		}
		else if(strlen($kayitpassport)<3) {
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Şifreniz Minimum 3 karakter olmalı..",
			));
		}
		/*
		else if(!preg_match($re, $kayitpassport)) {
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Şifreniz aşağıdaki kriterleri karşılamıyor..<br>Minimum 1 büyük harf<br>Minimum 1 küçük harf<br>Minimum 1 rakam",
			));
		}
		*/
		else{		
			try { 
				include("./php/baglanti.php"); 
				$kullanicikontrol = $baglanti->query("SELECT * from oyuncular where deleted=0 and username='$kayitadi'");
				$mailkontrol = $baglanti->query("SELECT * from oyuncular where deleted=0 and email='$kayiteposta'");	
				$ayarlar = $baglanti->query('SELECT * FROM ayarlar')->fetch(PDO::FETCH_ASSOC);
			if($kullanicikontrol->rowCount()){			
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Kullanıcı Adı kayıtlı"					
			));
			}
			else if($mailkontrol->rowCount()){			
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Mail adresi kayıtlı"					
			));
			}
			else{	
			
			$hashed_password = password_hash($kayitpassport, PASSWORD_DEFAULT);
			$selector = base64_encode(random_bytes(8));
			$token = bin2hex(random_bytes(32));
			$cookieValue = $selector.':'.base64_encode($token);
			$hashedToken = hash('sha256', $token);
			$cookie_url = ayargetir("site_linki");
			if ($cookie_url != "localhost") $cookie_url = '.'.$cookie_url;
			if ($cookie_url == 'localhost') {
				setcookie('authToken', $cookieValue,time()+ 3600* 24 * 365, '/' );
			}else{
				setcookie('authToken', $cookieValue,time()+ 3600* 24 * 365, '/', '/' );
			}
			$ekle = $baglanti->prepare("INSERT INTO oyuncular(serial, email, username, pass, girisip, adsoyad,tel,puan,cinsiyet) VALUES(?,?,?, ?, ?, ?, ?, ?, ?)");
			$ekle->bindParam(1, $hashed_password, PDO::PARAM_STR);
			$ekle->bindParam(2, $kayiteposta, PDO::PARAM_STR);
			$ekle->bindParam(3, $kayitadi, PDO::PARAM_STR);
			$ekle->bindParam(4, $kayitpassport, PDO::PARAM_STR);				
			$ekle->bindParam(5, $ipnumarasi, PDO::PARAM_STR);
			$ekle->bindParam(6, $kayitadsoyad, PDO::PARAM_STR);
			$ekle->bindParam(7, $kayittel, PDO::PARAM_STR);
			$ekle->bindParam(8, $ayarlar["yenikayitcip"], PDO::PARAM_STR);
			$ekle->bindParam(9, $cinsiyet, PDO::PARAM_STR);
			$ekle->execute();
			$_SESSION['login'] = true;
			$_SESSION['FULLNAME'] = ucwords($kayitadi);
			$_SESSION["email"]=$kayiteposta;
			$_SESSION["USERKEYZ"]=$hashed_password;
			$_SESSION['FULLNAME'] = $kayitadsoyad;
			$_SESSION["username"]=$kayitadi;
			$_SESSION['resim']="img/noneuserphoto.jpeg";
			
			echo json_encode(array(
			"durum" => 0,
			"mesaj" => "Hoşgeldin",
			"userid" => $baglanti->lastInsertId(),
			"username" => $kayitadi,
			));
			}
			} catch (PDOException $e) {
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => $e->getMessage(),				
			));
			}
			$baglanti = null;
			}
			}
			else{
			echo json_encode(array(
			"durum" => 1,
			"mesaj" => "Bilgileri Eksik Girdiniz2..",
			));
			}
			?>									