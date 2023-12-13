<?php
	ob_start();
	session_start();
	if(!$_SESSION["USERKEYZ"]){
		echo "yetkiniz yok";
		exit();
	}
	function seo($s) {
		$tr = array('ş','Ş','ı','I','İ','ğ','Ğ','ü','Ü','ö','Ö','Ç','ç','(',')','/',':',',');
		$eng = array('s','s','i','i','i','g','g','u','u','o','o','c','c','','','-','-','');
		$s = str_replace($tr,$eng,$s);
		$s = strtolower($s);
		$s = preg_replace('/&amp;amp;amp;amp;amp;amp;amp;amp;amp;.+?;/', '', $s);
		$s = preg_replace('/\s+/', '-', $s);
		$s = preg_replace('|-+|', '-', $s);
		$s = preg_replace('/#/', '', $s);
		$s = str_replace('.', '', $s);
		$s = trim($s, '-');
		return $s;
	}
	$cinsiyet = trim(filter_input(INPUT_POST, 'cinsiyet', FILTER_SANITIZE_STRING));
	$yenisifre = trim(filter_input(INPUT_POST, 'sifre', FILTER_SANITIZE_STRING));
	$myusername = trim(filter_input(INPUT_POST, 'myusername', FILTER_SANITIZE_STRING));
	if($yenisifre!=""&&strlen($yenisifre)<3){
		echo json_encode(array(
		"durum" => "error",
		"mesaj" => "Şifre 3 karakterden az olamaz.."					
		));
		exit();
	}
	else if($myusername!=""&&strlen($myusername)<3){
		echo json_encode(array(
		"durum" => "error",
		"mesaj" => "Kullanıcı adı 3 karakterden az olamaz.."					
		));
		exit();
	}
	
	else if ($_FILES["profilresmi"]['name']) {	
		$tip = $_FILES['profilresmi']['type'];
		if ($tip != 'image/jpg' &&$tip != 'image/jpeg' && $tip != 'image/png') {
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => "Profil fotoğrafınız sadece resim dosyası olabilir..".$tip,
			));
			exit();
		}
	}
	try {
		include("baglanti.php");
		$kullanici = $baglanti->query("SELECT * from oyuncular where id='".$_SESSION["userid"]."' ")->fetch(PDO::FETCH_ASSOC);
		$username=$kullanici["username"];
		if($myusername!=""&&strlen($myusername)>=3&&$kullanici["username"]!=$myusername){
			$yeniusernamesorgu = $baglanti->query("SELECT * from oyuncular where username='".$myusername."'")->fetch(PDO::FETCH_ASSOC);
			if($yeniusernamesorgu){
				echo json_encode(array(
				"durum" => "error",
				"mesaj" => "Kullanıcı adı sistemde kayıtlı.."					
				));
				exit();
			}
			$username=$myusername;
		}
		
		$sifre=$kullanici["pass"];
		if($yenisifre!=""){
			$sifre=$yenisifre;
		}
		$profilresmi=$kullanici["resim"];
		$target_dir = "img/profilfoto/";
		if ($_FILES["profilresmi"]['name']) {	
			$file_ext=strtolower(end(explode('.',$_FILES['profilresmi']['name'])));   
			$rasgele_isim = rand(1,10000);
			$file_name = seo($kullanici["username"])."-".$rasgele_isim.".".$file_ext;
			$yuklemeYeri = "../".$target_dir. $file_name;
			if($profilresmi!=null&&$profilresmi!=""){
				unlink("../".$profilresmi);  
			}
			if(move_uploaded_file($_FILES["profilresmi"]["tmp_name"], $yuklemeYeri)){
				$uzanti=$file_ext;
				if ($uzanti=="jpg"  || $uzanti=="jpeg" )
				$mevcut_resim = imagecreatefromjpeg($yuklemeYeri);  
				if ($uzanti=="png")
				$mevcut_resim = imagecreatefrompng($yuklemeYeri); 
				if ($uzanti=="gif" )
				$mevcut_resim = imagecreatefromgif($yuklemeYeri); 
				list($genislik, $yukseklik) = getimagesize($yuklemeYeri);
				$boyut = 250;
				$oran = $genislik / $boyut;
				$yeni_genislik = $genislik / $oran;
				$yeni_yukseklik = $yukseklik / $oran;
				$yeni_resim = imagecreatetruecolor(round($yeni_genislik), round($yeni_yukseklik));
				imagecopyresampled($yeni_resim, $mevcut_resim, 0, 0, 0, 0, round($yeni_genislik), round($yeni_yukseklik), $genislik, $yukseklik);
				switch($uzanti) {
					case "gif":
					imagegif($yeni_resim, $yuklemeYeri); 
					break;
					case "jpeg":
					case "jpg":
					imagejpeg($yeni_resim, $yuklemeYeri,100); 
					break;
					case "png":
					case "x-png":
					imagepng($yeni_resim, $yuklemeYeri);  
					break;
				} 
				$profilresmi=$target_dir. $file_name;
			}
			
		}
		$sonuc = $baglanti->exec("UPDATE oyuncular SET username='".$username."',pass='".$sifre."',resim='".$profilresmi."',cinsiyet='".$cinsiyet."' WHERE id = '".$kullanici['id']."'");
		$_SESSION['resim']=$profilresmi;
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Profil güncellendi..",				
		"cinsiyet" => $cinsiyet,				
		"username" => $username,				
		"resim" => $profilresmi				
		));	
	}
	catch (PDOException $e) {
		echo json_encode(array(
		"durum" => 1,
		"mesaj" =>$e->getMessage()			
		));	
	}					