<?php
	include("../baglan.php");
	ob_start();
	session_start();

	if(!$_SESSION["adminLogin1"]){
		echo json_encode(array(
		"durum" => "error",
		"mesaj" => "Yetkiniz Yok..", 
		));
		exit();
	}	
	$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where id='".$_SESSION["adminid"]."'")->fetch(PDO::FETCH_ASSOC);
	function yetki_kontrol($rutbe,$ozellik){ //belirtilen rutbenin belirtilen yetkisi bulunuyor mu kontrol et
		include("../baglan.php");
		$yetki = $baglanti->query('SELECT yetkiler FROM yetki_gruplari WHERE id=\''.$rutbe.'\' LIMIT 1')->fetch(PDO::FETCH_ASSOC);
		$ozellikler = explode(',', $yetki['yetkiler']);
		if (in_array($ozellik, $ozellikler)){ //bu rütbe bu yetkiye sahip
			return true;
			}else{ //degil
			return false;
		}
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
	if (!yetki_kontrol($userbilgisi["yetki_grubu"], $_POST["islem"])){
		echo json_encode(array(
		"durum" => "error",  
		"mesaj" => "Yetkin Yok.."					
		));	
		exit();
	}
	if($_POST["islem"]=="uyeguncelle"){
		$userid = trim(filter_input(INPUT_POST, 'userid', FILTER_SANITIZE_STRING));
		$tel = trim(filter_input(INPUT_POST, 'tel', FILTER_SANITIZE_STRING));
		$ban = trim(filter_input(INPUT_POST, 'ban', FILTER_SANITIZE_STRING));
		$silindi = trim(filter_input(INPUT_POST, 'silindi', FILTER_SANITIZE_STRING));
		$yetki = trim(filter_input(INPUT_POST, 'yetki', FILTER_SANITIZE_STRING));
		$yetkigrubu = trim(filter_input(INPUT_POST, 'yetkigrubu', FILTER_SANITIZE_STRING));
		$puan = trim(filter_input(INPUT_POST, 'puan', FILTER_SANITIZE_STRING));
		$altin = trim(filter_input(INPUT_POST, 'altin', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE oyuncular SET deleted='".$silindi."',yetki_grubu='".$yetkigrubu."',bandurumu='".$ban."',tel = '".$tel."',is_admin = '".$yetki."',puan = '".$puan."',altin = '".$altin."' WHERE id = '".$userid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Profil güncellendi."					
		));	
	}
	elseif($_POST["islem"]=="salonguncelle"){
		$salonid = trim(filter_input(INPUT_POST, 'salonid', FILTER_SANITIZE_STRING));
		$salonadi = trim(filter_input(INPUT_POST, 'salonadi', FILTER_SANITIZE_STRING));
		$girislimiti = trim(filter_input(INPUT_POST, 'girislimiti', FILTER_SANITIZE_STRING));
		$altlimit = trim(filter_input(INPUT_POST, 'altlimit', FILTER_SANITIZE_STRING));
		$ustlimit = trim(filter_input(INPUT_POST, 'ustlimit', FILTER_SANITIZE_STRING));
		$mesaj = trim(filter_input(INPUT_POST, 'mesaj', FILTER_SANITIZE_STRING));
		$eskisalon = $baglanti->query("SELECT * FROM salonlar WHERE id='".$salonid."'")->fetch(PDO::FETCH_ASSOC);
		$salon = $baglanti->query("SELECT * FROM salonlar WHERE url = '".seo($salonadi)."' and id<>'".$salonid."'")->fetch(PDO::FETCH_ASSOC);
		if($salon){
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => $salonadi." isimli salon var güncellenemez."				
			));	
			}else{
			$sonuc = $baglanti->exec("UPDATE salonlar SET url = '".seo($salonadi)."',salonmesaji='".$mesaj."', ad='".$salonadi."',enaz = '".$girislimiti."',alt = '".$altlimit."',ust = '".$ustlimit."' WHERE id = '".$salonid."'");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Salon güncellendi.",
			"url" => $eskisalon["url"],	
			"yeniurl" => seo($salonadi),
			"id" => $salonid
			));	
		}
	}
	elseif($_POST["islem"]=="salonekle"){
		$salonadi = trim(filter_input(INPUT_POST, 'salonadi', FILTER_SANITIZE_STRING));
		$girislimiti = trim(filter_input(INPUT_POST, 'girislimiti', FILTER_SANITIZE_STRING));
		$altlimit = trim(filter_input(INPUT_POST, 'altlimit', FILTER_SANITIZE_STRING));
		$ustlimit = trim(filter_input(INPUT_POST, 'ustlimit', FILTER_SANITIZE_STRING));
		$mesaj = trim(filter_input(INPUT_POST, 'mesaj', FILTER_SANITIZE_STRING));
		$salon = $baglanti->query("SELECT * FROM salonlar WHERE url = '".seo($salonadi)."' and deleted=0")->fetch(PDO::FETCH_ASSOC);
		if($salon){
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => $salonadi." isimli salon var eklenemez."				
			));	
			}else{
			$sonuc = $baglanti->exec("INSERT salonlar SET url = '".seo($salonadi)."',ad = '".$salonadi."',enaz='".$girislimiti."',alt='".$altlimit."',ust='".$ustlimit."',salonmesaji='".$mesaj."'");
			$last_id = $baglanti->lastInsertId();
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Salon Eklendi.",
			"id" => $last_id, 					
			"url" => seo($salonadi), 					
			));	
		}
	}
	elseif($_POST["islem"]=="salonsil"){ 
		$salonid = trim(filter_input(INPUT_POST, 'salonid', FILTER_SANITIZE_STRING));
		$oda = $baglanti->query("SELECT * FROM salonlar WHERE id = '".$salonid."'")->fetch(PDO::FETCH_ASSOC);		
		$yenioda = $baglanti->query("SELECT * FROM salonlar WHERE enaz<(select enaz from salonlar where id='".$salonid."') and deleted=0 order by enaz desc limit 1")->fetch(PDO::FETCH_ASSOC);
		$sonuc = $baglanti->exec("delete from salonlar WHERE id = '".$salonid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket silindi."	,
		"oda" => $oda["url"],
		"yenioda" => $yenioda["url"],
		"yeniodaadi" => $yenioda["ad"],
		"id" => $salonid
		));	
	}
	elseif($_POST["islem"]=="paketguncelle"){
		$padi = trim(filter_input(INPUT_POST, 'padi', FILTER_SANITIZE_STRING));
		$paketid = trim(filter_input(INPUT_POST, 'paketid', FILTER_SANITIZE_STRING));
		$pdegeri = trim(filter_input(INPUT_POST, 'pdegeri', FILTER_SANITIZE_STRING));
		$ptutari = trim(filter_input(INPUT_POST, 'ptutari', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE paketler SET adi='".$padi."',deger='".$pdegeri."',tutar = '".$ptutari."' WHERE id = '".$paketid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket güncellendi."					
		));	
	}	
	elseif($_POST["islem"]=="paketekle"){
		$pdegeri = trim(filter_input(INPUT_POST, 'pdegeri', FILTER_SANITIZE_STRING));
		$ptutari = trim(filter_input(INPUT_POST, 'ptutari', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("INSERT paketler SET deger = '".$pdegeri."',tutar='".$ptutari."',tip='altin'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket Eklendi."					
		));	
	}
	elseif($_POST["islem"]=="paketsil"){
		$paketid = trim(filter_input(INPUT_POST, 'paketid', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("update paketler set deleted=1 WHERE id = '".$paketid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="radyoekle"){
		$ad = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$url = trim(filter_input(INPUT_POST, 'url', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("INSERT radyolar SET adi = '".$ad."',link='".$url."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Radyo Eklendi."					
		));	
	}
	elseif($_POST["islem"]=="radyoguncelle"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$url = trim(filter_input(INPUT_POST, 'url', FILTER_SANITIZE_STRING));
		$ad = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE radyolar SET adi='".$ad."',link='".$url."' WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket güncellendi."					
		));	
	}	
	elseif($_POST["islem"]=="radyosil"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("delete from radyolar WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Radyo silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="bankaekle"){
		$adi = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$iban = trim(filter_input(INPUT_POST, 'iban', FILTER_SANITIZE_STRING));
		$bankafoto="";
		$target_dir = "../../images/bankalar/";
		if ($_FILES["bankafoto"]['name']) {					
			$file_ext=strtolower(end(explode('.',$_FILES['bankafoto']['name'])));   
			$rasgele_isim = rand(1,10000);
			$file_name = seo($pdegeri)."-".$rasgele_isim.".".$file_ext;
			$yuklemeYeri = $target_dir. $file_name;			
			$bankafoto="images/bankalar/".$file_name;			
			$sonuc1 = move_uploaded_file($_FILES["bankafoto"]["tmp_name"], $yuklemeYeri);					
		}
		$sonuc = $baglanti->exec("INSERT bankalar SET adi = '".$adi."',iban='".$iban."',resim='".$bankafoto."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Banka Eklendi."					
		));	
	}
	elseif($_POST["islem"]=="bankasil"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("update bankalar set deleted=1 WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Banka silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="odeme_bildirim_sil"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("update satinalma_gecmisi set deleted=1 WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Talep silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="odeme_bildirim_onayla"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE satinalma_gecmisi SET statu='1',onaylayan='".$_SESSION["adminid"]."',onay_tarihi=now() WHERE id = '".$id."'");
		$puanekle = $baglanti->query("update oyuncular set altin=altin + (select coin_miktari from satinalma_gecmisi where id='".$id."') where id=(select userid from satinalma_gecmisi where id='".$id."') ")->fetch(PDO::FETCH_ASSOC);
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Talep onaylandı."	 				
		));	
	}
	elseif($_POST["islem"]=="bankaguncelle"){
		$adi = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$iban = trim(filter_input(INPUT_POST, 'iban', FILTER_SANITIZE_STRING));		
		$bankasorgu = $baglanti->query("SELECT * from bankalar where id='".$id."' ")->fetch(PDO::FETCH_ASSOC);
		$bankafoto=$bankasorgu["resim"];
		$target_dir = "../../images/bankalar/";
		if ($_FILES["bankafoto"]['name']) {					
			$file_ext=strtolower(end(explode('.',$_FILES['bankafoto']['name'])));   
			$rasgele_isim = rand(1,10000);
			$file_name = seo($pdegeri)."-".$rasgele_isim.".".$file_ext;
			$yuklemeYeri = $target_dir. $file_name;		
			$bankafoto="images/bankalar/".$file_name;			
			if($bankafoto!=null&&$bankafoto!=""){
				unlink($bankafoto);  
			}		
			$sonuc1 = move_uploaded_file($_FILES["bankafoto"]["tmp_name"], $yuklemeYeri);					
		}
		$sonuc = $baglanti->exec("UPDATE bankalar SET adi='".$adi."',iban='".$iban."',resim='".$bankafoto."' WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Banka güncellendi."					
		));	
	}	
	elseif($_POST["islem"]=="botekle"){
		try {
			$adi = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
			$puan = trim(filter_input(INPUT_POST, 'puan', FILTER_SANITIZE_STRING));
			$sonuc = $baglanti->exec("INSERT oyuncular SET adsoyad = '".$adi."',puan='".$puan."', tip=2");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Bot Eklendi."					
			));	
		}
		catch (PDOException $e) {
			echo json_encode(array(
			"durum" => "error",
			"mesaj" =>$e->getMessage()			
			));	
		}
	}
	elseif($_POST["islem"]=="salonamesajat"){
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Üye silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="herkesemesajat"){
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Üye silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="uyesil"){
		$botid = trim(filter_input(INPUT_POST, 'botid', FILTER_SANITIZE_STRING));
		if($_POST["altislem"]=="komplesil"){
			$sonuc = $baglanti->exec("delete from oyuncular WHERE id = '".$botid."'");
			}else{
			$sonuc = $baglanti->exec("update oyuncular set deleted=1 WHERE id = '".$botid."'");
		}
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Üye silindi."	 				
		));	
	}
	elseif($_POST["islem"]=="hediyeekle"){
		$pdegeri = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$ptutari = trim(filter_input(INPUT_POST, 'puan', FILTER_SANITIZE_STRING));
		$hediyephoto="";
		$target_dir = "../../hediye/";
		if ($_FILES["hediyephoto"]['name']) {					
			$file_ext=strtolower(end(explode('.',$_FILES['hediyephoto']['name'])));   
			$rasgele_isim = rand(1,10000);
			$file_name = seo($pdegeri)."-".$rasgele_isim.".".$file_ext;
			$yuklemeYeri = $target_dir. $file_name;			
			$hediyephoto="hediye/".$file_name;			
			$sonuc1 = move_uploaded_file($_FILES["hediyephoto"]["tmp_name"], $yuklemeYeri);					
		}
		$sonuc = $baglanti->exec("INSERT hediyeler SET adi = '".$pdegeri."',puan='".$ptutari."',resim='".$hediyephoto."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Hediye Eklendi"					
		));	
	}
	elseif($_POST["islem"]=="hediyesil"){
		$paketid = trim(filter_input(INPUT_POST, 'paketid', FILTER_SANITIZE_STRING));
		$hediyesorgu = $baglanti->query("SELECT * from hediyeler where id='".$paketid."' ")->fetch(PDO::FETCH_ASSOC);
		$hediyephoto=$hediyesorgu["resim"];
		if($hediyephoto!=null&&$hediyephoto!=""){
			unlink($hediyephoto);  
		}
		$sonuc = $baglanti->exec("update hediyeler set deleted=1 WHERE id = '".$paketid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Hediye silindi."					
		));	
	}	
	elseif($_POST["islem"]=="hediyeguncelle"){
		$paketid = trim(filter_input(INPUT_POST, 'paketid', FILTER_SANITIZE_STRING));
		$pdegeri = trim(filter_input(INPUT_POST, 'adi', FILTER_SANITIZE_STRING));
		$ptutari = trim(filter_input(INPUT_POST, 'puan', FILTER_SANITIZE_STRING));
		$hediyesorgu = $baglanti->query("SELECT * from hediyeler where id='".$paketid."' ")->fetch(PDO::FETCH_ASSOC);
		$hediyephoto=$hediyesorgu["resim"];
		$target_dir = "../../hediye/";
		if ($_FILES["hediyephoto"]['name']) {					
			$file_ext=strtolower(end(explode('.',$_FILES['hediyephoto']['name'])));   
			$rasgele_isim = rand(1,10000);
			$file_name = seo($pdegeri)."-".$rasgele_isim.".".$file_ext;
			$yuklemeYeri = $target_dir. $file_name;		
			if($hediyephoto!=null&&$hediyephoto!=""){
				unlink($hediyephoto);  
			}
			$hediyephoto="hediye/".$file_name;				
			$sonuc1 = move_uploaded_file($_FILES["hediyephoto"]["tmp_name"], $yuklemeYeri);					
		}
		$sonuc = $baglanti->exec("UPDATE hediyeler SET adi='".$pdegeri."',puan = '".$ptutari."',resim = '".$hediyephoto."' WHERE id = '".$paketid."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Hediye güncellendi."					
		));	
	}		
	elseif($_POST["islem"]=="ayarkaydet"){
		$yenikayitcip = trim(filter_input(INPUT_POST, 'yenikayitcip', FILTER_SANITIZE_STRING));
		$uye_renk = trim(filter_input(INPUT_POST, 'uye_renk', FILTER_SANITIZE_STRING));
		$misafir_girisi = trim(filter_input(INPUT_POST, 'misafir_girisi', FILTER_SANITIZE_STRING));
		$yenikayitcepistegi = trim(filter_input(INPUT_POST, 'yenikayitcepistegi', FILTER_SANITIZE_STRING));
		$gonderici_maili = trim(filter_input(INPUT_POST, 'gonderici_maili', FILTER_SANITIZE_STRING));
		$gonderici_sifresi = trim(filter_input(INPUT_POST, 'gonderici_sifresi', FILTER_SANITIZE_STRING));
		$mail_host = trim(filter_input(INPUT_POST, 'mail_host', FILTER_SANITIZE_STRING));
		$uyeresmi = trim(filter_input(INPUT_POST, 'uyeresmi', FILTER_SANITIZE_STRING));
		$sohbet = trim(filter_input(INPUT_POST, 'sohbet', FILTER_SANITIZE_STRING));
		$uyeadi = trim(filter_input(INPUT_POST, 'uyeadi', FILTER_SANITIZE_STRING));
		$sms_username = trim(filter_input(INPUT_POST, 'sms_username', FILTER_SANITIZE_STRING));
		$sms_password = trim(filter_input(INPUT_POST, 'sms_password', FILTER_SANITIZE_STRING));
		$sms_mkodu = trim(filter_input(INPUT_POST, 'sms_mkodu', FILTER_SANITIZE_STRING));
		$sms_gondericiadi = trim(filter_input(INPUT_POST, 'sms_gondericiadi', FILTER_SANITIZE_STRING));
		$sms_sifrehatirlat = trim(filter_input(INPUT_POST, 'sms_sifrehatirlat', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE ayarlar SET misafir_girisi = '".$misafir_girisi."',uye_renk = '".$uye_renk."',cepkayit = '".$yenikayitcepistegi."',yenikayitcip = '".$yenikayitcip."',gonderici_maili = '".$gonderici_maili."', gonderici_sifresi = '".$gonderici_sifresi."', mail_host = '".$mail_host."',sohbet = '".$sohbet."', uyeresmi = '".$uyeresmi."', uyeadi = '".$uyeadi."', sms_username = '".$sms_username."', sms_password = '".$sms_password."', sms_mkodu = '".$sms_mkodu."', sms_gondericiadi = '".$sms_gondericiadi."', sms_sifrehatirlat = '".$sms_sifrehatirlat."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Ayarlar güncellendi."					
		));	
	}
	elseif($_POST["islem"]=="ban_kaldir"){
		$userid = trim(filter_input(INPUT_POST, 'userid', FILTER_SANITIZE_STRING));
		$nereden = trim(filter_input(INPUT_POST, 'nereden', FILTER_SANITIZE_STRING));
		$salonid = trim(filter_input(INPUT_POST, 'salonid', FILTER_SANITIZE_STRING));
		if($nereden=="salondanbanlananlar"){
			$baglanti->query("delete FROM ".$nereden." where engellenen='".$userid."' and salon_id='".$salonid."'")->fetch(PDO::FETCH_ASSOC);
			}else{
			$baglanti->query("delete FROM ".$nereden." where engellenen='".$userid."'")->fetch(PDO::FETCH_ASSOC);
		}
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Üye Banlandı.."					
		));	
	}	
	elseif($_POST["islem"]=="yetki_goruntule"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$yetkigrubu = $baglanti->query("SELECT sira,renk,yetkiler,yetki_adi FROM yetki_gruplari where id='".$id."'")->fetch(PDO::FETCH_ASSOC);
		$yetkiler = $baglanti->query("SELECT * FROM yetkiler order by yetki_adi")->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode(array(
		"durum" => "success",  
		"yetkigrubu" => $yetkigrubu,					
		"yetkiler" => $yetkiler				
		));	
	}
	elseif($_POST["islem"]=="yetkigrubu_sil"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$yetkigrubu = $baglanti->query("delete FROM yetki_gruplari where id='".$id."'")->fetch(PDO::FETCH_ASSOC);
		echo json_encode(array(
		"durum" => "success"			
		));	
	}	
	elseif($_POST["islem"]=="yetkigrubu_ekle"){
		$yetkiler = trim(filter_input(INPUT_POST, 'yetkiler', FILTER_SANITIZE_STRING));
		$renk = trim(filter_input(INPUT_POST, 'renk', FILTER_SANITIZE_STRING));
		$grup_adi = trim(filter_input(INPUT_POST, 'grup_adi', FILTER_SANITIZE_STRING));
		$yetkigrubu = $baglanti->query("INSERT yetki_gruplari SET renk = '".$renk."',yetkiler = '".$yetkiler."',yetki_adi = '".$grup_adi."'")->fetch(PDO::FETCH_ASSOC);
		echo json_encode(array(
		"durum" => "success"  			
		));	
	}	
	elseif($_POST["islem"]=="yetkigrubu_guncelle"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$yetkiler = trim(filter_input(INPUT_POST, 'yetkiler', FILTER_SANITIZE_STRING));
		$renk = trim(filter_input(INPUT_POST, 'renk', FILTER_SANITIZE_STRING));
		$sira = trim(filter_input(INPUT_POST, 'sira', FILTER_SANITIZE_STRING));
		$grup_adi = trim(filter_input(INPUT_POST, 'grup_adi', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE yetki_gruplari SET sira='".$sira."',renk='".$renk."',yetki_adi='".$grup_adi."',yetkiler='".$yetkiler."' WHERE id = '".$id."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket güncellendi."					
		));	
	}	
	elseif($_POST["islem"]=="binpuanyap"){
		$userid = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
		$puankontrol = $baglanti->query("SELECT puan from oyuncular where id = '".$userid."'")->fetch(PDO::FETCH_ASSOC);
		if($puankontrol["puan"]<=1000){
			$sonuc = $baglanti->exec("UPDATE oyuncular SET puan='1000' WHERE id = '".$userid."'");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Üye puanı 1000 puan olarak güncellendi."					
			));	
		}
		else{
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => "Üyenin puanı 1000'den büyük.."					
			));	
		}
	}
	elseif($_POST["altislem"]=="anlikuyeislemleri"){
		$engelleyen = trim(filter_input(INPUT_POST, 'gonderici', FILTER_SANITIZE_STRING));
		$engellenen = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
		if($userbilgisi["id"]==$engellenen){
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => "Kendin için işlem yapamazsın..", 
			));
			exit();
		}
		if($_POST["islem"]=="uyesustur"){			
			$suskunkontrol = $baglanti->query("SELECT * from susturulanlar where engellenen = '".$engellenen."'")->fetch(PDO::FETCH_ASSOC);
			if($suskunkontrol){
				echo json_encode(array(
				"durum" => "info",
				"mesaj" => "Üye Zaten Susturulmuş."					
				));	
				}else{
			$sonuc = $baglanti->exec("INSERT susturulanlar SET engellenen = '".$engellenen."',engelleyen='".$engelleyen."'");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Üye Susturuldu."					
			));	
			}
		}
		elseif($_POST["islem"]=="uyeyisalondanat"){
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Üye Salondan Atıldı."					
		));	
		}
		elseif($_POST["islem"]=="uyeyisistemdenat"){
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Üye Sistemden Atıldı."					
			));	
		}
		elseif($_POST["islem"]=="salondanbanla"){
			$sure = trim(filter_input(INPUT_POST, 'sure', FILTER_SANITIZE_STRING));
			$salon_id = trim(filter_input(INPUT_POST, 'salon', FILTER_SANITIZE_STRING));
			$aciklama = trim(filter_input(INPUT_POST, 'aciklama', FILTER_SANITIZE_STRING));
			$bannotu = trim(filter_input(INPUT_POST, 'bannotu', FILTER_SANITIZE_STRING));
			$baglanti->query("delete FROM salondanbanlananlar where engellenen = '".$engellenen."' and salon_id = '".$salon_id."'")->fetch(PDO::FETCH_ASSOC);
			$sonuc = $baglanti->exec("INSERT salondanbanlananlar SET bannotu = '".$bannotu."',aciklama = '".$aciklama."',salon_id = '".$salon_id."',engellenen = '".$engellenen."',engelleyen='".$engelleyen."',bitis=DATE_ADD(now(), INTERVAL ".$sure.");");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Salondan Banlandı."					
			));	
		}
		elseif($_POST["islem"]=="sistemdenbanla"){
			$sure = trim(filter_input(INPUT_POST, 'sure', FILTER_SANITIZE_STRING));
			$aciklama = trim(filter_input(INPUT_POST, 'aciklama', FILTER_SANITIZE_STRING));
			$bannotu = trim(filter_input(INPUT_POST, 'bannotu', FILTER_SANITIZE_STRING));
			$baglanti->query("delete FROM sistemdenbanlananlar where engellenen = '".$engellenen."'")->fetch(PDO::FETCH_ASSOC);
			$sonuc = $baglanti->exec("INSERT sistemdenbanlananlar SET bannotu = '".$bannotu."',aciklama = '".$aciklama."',engellenen = '".$engellenen."',engelleyen='".$engelleyen."',bitis=DATE_ADD(now(), INTERVAL ".$sure.");");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Sistemden Banlandı."					
			));	
		}
	}															