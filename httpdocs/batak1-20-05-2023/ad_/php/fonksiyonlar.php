<?php
	function yetki_kontrol($rutbe,$ozellik){ //belirtilen rutbenin belirtilen yetkisi bulunuyor mu kontrol et
		include("baglan.php");
		$sorgu = $baglanti->query('SELECT yetkiler FROM yetki_gruplari WHERE id=\''.$rutbe.'\' LIMIT 1');
		$yetki = $sorgu->fetch(PDO::FETCH_ASSOC);
		if($sorgu->rowCount()){
			$ozellikler = explode(',', $yetki['yetkiler']);
			if (in_array($ozellik, $ozellikler)){ //bu rütbe bu yetkiye sahip
				return true;
				}else{ //degil
				return false;
			}
		}
		else{
			return false;
		}
	}
	function ayargetir($name) {
		include("baglan.php");
		$ayarlar = $baglanti->query('SELECT * FROM site_ayarlari where adi="'.$name.'"')->fetch(PDO::FETCH_ASSOC);
		return trim($ayarlar['deger']); 
	}
	function loginkontrol($authToken) {
		include("baglan.php");
		$sorgu = $baglanti->query("SELECT * from oyuncular where serial='".$authToken."'");	
		$cikti = $sorgu->fetch(PDO::FETCH_ASSOC);
		if($sorgu->rowCount()){
			$sonuc = $baglanti->exec("UPDATE oyuncular SET logtime=now() WHERE id = '".$cikti['id']."'");
			if (yetki_kontrol($cikti["yetki_grubu"], "panelegiris")){
				$_SESSION["adminLogin1"] = "true";
				$_SESSION["adminid"] = $cikti["id"];
			}
			$_SESSION['login'] = true;
			$_SESSION['usertype']="User";
			$_SESSION['FULLNAME'] = $cikti['adsoyad'];
			$_SESSION["email"]=$cikti['email'];
			$_SESSION["username"]=$cikti['username'];
			$_SESSION["USERKEYZ"]=$cikti['serial'];
			$cookie_url = ayargetir("site_linki");
			if ($cookie_url != "localhost") $cookie_url = '.'.$cookie_url;
			setcookie('authToken', $cikti['serial'],time()+ 3600* 24 * 365, '/', $cookie_url );
			$_SESSION['cinsiyet'] = $cikti['cinsiyet'];
			$_SESSION['resim']=$cikti["resim"];
			$_SESSION['userid']=$cikti["id"];
			if($cikti["resim"]==null||$cikti["resim"]==""){	 
				$_SESSION['resim']="img/noneuserphoto.jpeg";
			}
			return true; 
			}else{
			return false;
		}
		
		
	}
?>