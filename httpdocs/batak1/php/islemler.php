<?php
	include("baglanti.php");
	ob_start();
	session_start();
	
	if(!$_SESSION["username"]){
		header("Location: ./index.php"); 
	}
	if($_POST["islem"]=="davet_izni"){
		$davet_izni = trim(filter_input(INPUT_POST, 'davet_izni', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE oyuncular SET davet_izni='".$davet_izni."' WHERE id = '".$_SESSION["userid"]."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket güncellendi.".$_SESSION["username"]					
		));	
	}
	elseif($_POST["islem"]=="sikayetler_ozelmesaj"){
		$aciklama = trim(filter_input(INPUT_POST, 'aciklama', FILTER_SANITIZE_STRING));
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$mesajkontrol = $baglanti->query("SELECT * FROM ozelmesajlar where alici_id='".$_SESSION["userid"]."' and id='".$id."'")->fetch(PDO::FETCH_ASSOC);
		if($mesajkontrol){
			$sonuc = $baglanti->exec("INSERT sikayetler_ozelmesaj SET sikayet_edilen = '".$mesajkontrol["gonderici_id"]."',mesaj_id = '".$id."',sikayet_eden = '".$_SESSION["userid"]."',aciklama = '".$aciklama."'");
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => "Şikayetiniz Yönetime iletildi.. En kısa sürede incelenecektir.."					
			));	
		}
		else{
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => "Mesaj bulunamadı.."					
			));	
		}
	}
	elseif($_POST["islem"]=="sohbet_izni"){
		$sohbet_izni = trim(filter_input(INPUT_POST, 'sohbet_izni', FILTER_SANITIZE_STRING));
		$sonuc = $baglanti->exec("UPDATE oyuncular SET sohbet_izni='".$sohbet_izni."' WHERE id = '".$_SESSION["userid"]."'");
		echo json_encode(array(
		"durum" => "success",
		"mesaj" => "Paket güncellendi.".$sohbet_izni					
		));	
	}
	elseif($_POST["islem"]=="odaya_git"){
		$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
		$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where id='".$_SESSION["userid"]."'")->fetch(PDO::FETCH_ASSOC);	
		$odabilgisi = $baglanti->query("SELECT * FROM salonlar where id='".$id."'")->fetch(PDO::FETCH_ASSOC);	
		$salonbankontrol = $baglanti->query("SELECT * from salondanbanlananlar where engellenen = '".$_SESSION['userid']."' and salon_id='".$id."' and bitis>now()")->fetch(PDO::FETCH_ASSOC);
		if($_SESSION["usertype"]=="Misafir"){
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => $odabilgisi["ad"]." isimli salona yönlendiriliyorsunuz..",
			"url" => $odabilgisi["url"],
			));
		}
		elseif($userbilgisi["puan"]<$odabilgisi["enaz"]){
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => $odabilgisi["ad"]." Salonu için puanınız yetersiz..!!<br>Başka salona girmeyi deneyin.."					
			));	
		}
		elseif($salonbankontrol){
			echo json_encode(array(
			"durum" => "error",
			"mesaj" => $odabilgisi["ad"]." isimli salondan banlısınız..<br>Başka salona girmeyi deneyin..",
			));
		}
		else{
			echo json_encode(array(
			"durum" => "success",
			"mesaj" => $odabilgisi["ad"]." isimli salona yönlendiriliyorsunuz..",
			"url" => $odabilgisi["url"],
			));
		}
	}
	elseif($_POST["islem"]=="arkadaslik_izni"){
	$arkadaslik_izni = trim(filter_input(INPUT_POST, 'arkadaslik_izni', FILTER_SANITIZE_STRING));
	$sonuc = $baglanti->exec("UPDATE oyuncular SET arkadaslik_izni='".$arkadaslik_izni."' WHERE id = '".$_SESSION["userid"]."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Paket güncellendi."					
	));	
	}
	elseif($_POST["islem"]=="odeme_bildirimi"){	
	$coin = trim(filter_input(INPUT_POST, 'coin', FILTER_SANITIZE_STRING));
	$banka = trim(filter_input(INPUT_POST, 'banka', FILTER_SANITIZE_STRING));
	$paket_adi = trim(filter_input(INPUT_POST, 'paket', FILTER_SANITIZE_STRING));
	$tutar = trim(filter_input(INPUT_POST, 'tutar', FILTER_SANITIZE_STRING));
	$sonuc = $baglanti->exec("INSERT satinalma_gecmisi SET coin_miktari = '".$coin."',banka = '".$banka."',userid = '".$_SESSION['userid']."',tutar='".$tutar."',paket_adi='".$paket_adi."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Ödeme bildirimi yönetime iletildi.."					
	));	
	}
	elseif($_POST["islem"]=="hediye_puan_gonder"){	
	$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where username='".$_SESSION["username"]."'")->fetch(PDO::FETCH_ASSOC);	
	$aliciid = trim(filter_input(INPUT_POST, 'aliciid', FILTER_SANITIZE_STRING));
	$puan = trim(filter_input(INPUT_POST, 'puan', FILTER_SANITIZE_STRING));	
	if($userbilgisi["puan"]>$puan){
	$sonuc = $baglanti->exec("INSERT hediye_puan_gecmisi SET alici = '".$aliciid."',puan = '".$puan."',gonderici = '".$_SESSION['userid']."'");
	$gondericidenal = $baglanti->exec("UPDATE oyuncular SET puan = puan - '".$puan."' WHERE id = '".$_SESSION["userid"]."'");
	$aliciyaver = $baglanti->exec("UPDATE oyuncular SET puan = puan + '".$puan."' WHERE id = '".$aliciid."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Hediye puan iletildi.."					
	));	
	}
	else {
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => "Gönderdiğin puan için bakiyen yetersiz.."					
	));	
	}
	}
	elseif($_POST["islem"]=="goldpaketal"){	
	$paketid = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where id='".$_SESSION["userid"]."'")->fetch(PDO::FETCH_ASSOC);	
	$paketbilgisi = $baglanti->query("SELECT * FROM gold_paketler where id='".$paketid."'")->fetch(PDO::FETCH_ASSOC);	
	if($userbilgisi["altin"]>=$paketbilgisi["deger"]){
	$goldbilgisi = $baglanti->query("SELECT DATEDIFF(gold_uyeler.end,DATE(now())) as fark FROM gold_uyeler where user_id='".$_SESSION['userid']."' and end>=DATE(now()) order by end DESC limit 1")->fetch(PDO::FETCH_ASSOC);	
	$gun=$paketbilgisi["gun"];
	if($goldbilgisi){
	if($goldbilgisi["fark"]>0){
	$gun=$gun+$goldbilgisi["fark"];
	}
	}
	$baglanti->exec("INSERT gold_uyeler SET onaylayan = '".$_SESSION['userid']."',user_id = '".$_SESSION['userid']."',start = DATE(now()),end = DATE_ADD(now(), INTERVAL ".$gun." DAY)");
	$baglanti->exec("UPDATE oyuncular SET altin = altin - '".$paketbilgisi["deger"]."' WHERE id = '".$_SESSION["userid"]."'");
	$sontarihbilgisi = $baglanti->query("SELECT end FROM gold_uyeler where user_id='".$_SESSION['userid']."' and end>=DATE(now()) order by end DESC limit 1")->fetch(PDO::FETCH_ASSOC);	
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => date('d-m-Y', strtotime($sontarihbilgisi["end"]))." tarihine kadar Vip üye paketiniz eklendi..<br>Tebrikler.."					
	));	
	}
	else {
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => "Altın Satınalmak İster misin..??",					
	"title" => "Altın bakiyen (".$userbilgisi["altin"].") yetersiz.."					
	));	
	}
	}
	elseif($_POST["islem"]=="uyebanla"){
	$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and username='".$_SESSION["username"]."'")->fetch(PDO::FETCH_ASSOC);
	if($userbilgisi["is_admin"]==0){
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => "Banlama yetkiniz yok.."					
	));	
	}else{
	$userid = trim(filter_input(INPUT_POST, 'userid', FILTER_SANITIZE_STRING));
	$aliciyaver = $baglanti->exec("UPDATE oyuncular SET bandurumu =1 WHERE id = '".$userid."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Üye Banlandı.."					
	));	
	}
	}
	elseif($_POST["islem"]=="profilgetir"){
	$alici = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
	$userbilgisi = $baglanti->query("SELECT tip,adsoyad,id,resim,username FROM oyuncular where id='".$alici."'")->fetch(PDO::FETCH_ASSOC);
	echo json_encode(array(
	"durum" => "success", 		
	"user" => $userbilgisi		
	));	
	}
	elseif($_POST["islem"]=="sohbetgetir"){
	$alici = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
	$sohbetgecmisi = $baglanti->query("SELECT * FROM ozelmesajlar where gonderici_id='".$_SESSION["userid"]."' and alici_id='".$alici."' and mesaj_tipi='ozel' or alici_id='".$_SESSION["userid"]."' and mesaj_tipi='ozel' and gonderici_id='".$alici."' order by tarih asc")->fetchAll(PDO::FETCH_ASSOC);
	$aliciyaver = $baglanti->exec("UPDATE ozelmesajlar SET durum ='Okundu' WHERE alici_id='".$_SESSION["userid"]."' and gonderici_id='".$alici."'");
	$userbilgisi = $baglanti->query("SELECT tip,adsoyad,id,resim,username FROM oyuncular where id='".$alici."'")->fetch(PDO::FETCH_ASSOC);
	echo json_encode(array(
	"durum" => "success",
	"ozelmesajlar" => $sohbetgecmisi,  		
	"alici" => $userbilgisi		
	));	
	}elseif($_POST["islem"]=="arkadas_getir"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$userbilgisi = $baglanti->query("SELECT username as adsoyad,seviye,puan,toplamoyun,kazandigi,kaybettigi,id,resim,(select yetki_adi from yetki_gruplari where id=yetki_grubu) as yetki FROM oyuncular where id='".$id."'")->fetch(PDO::FETCH_ASSOC);
	echo json_encode(array(
	"durum" => "success", 		
	"arkadas" => $userbilgisi		
	));	
	}elseif($_POST["islem"]=="arkadas_sil"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$userbilgisi = $baglanti->query("delete from arkadaslar where id='".$id."'")->fetch(PDO::FETCH_ASSOC);
	echo json_encode(array(
	"durum" => "success", 		
	"mesaj" => "Arkadaşlıktan çıkarıldı.."		
	));	
	}
	elseif($_POST["islem"]=="okunduyap"){
	$alici = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
	$gonderici = trim(filter_input(INPUT_POST, 'gonderici', FILTER_SANITIZE_STRING));
	$aliciyaver = $baglanti->exec("UPDATE ozelmesajlar SET durum ='Okundu' WHERE alici_id='".$_SESSION["userid"]."' and gonderici_id='".$gonderici."'");
	echo json_encode(array(
	"durum" => "success"
	));	
	}
	elseif($_POST["islem"]=="uye_engelle"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$engelkontrol = $baglanti->query("SELECT * FROM engeller where engellenen='".$id."' and engelleyen='".$_SESSION["userid"]."'")->fetch(PDO::FETCH_ASSOC);
	if($engelkontrol){
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => "Üyeyi daha önceden engellemişsiniz.."
	));	
	}
	else{
	$sonuc = $baglanti->exec("INSERT engeller SET engelleyen = '".$_SESSION["userid"]."',engellenen = '".$id."'");
	echo json_encode(array(
	"durum" => "success"
	));	
	}
	}
	elseif($_POST["islem"]=="engel_kaldir"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$sonuc = $baglanti->exec("delete from engeller where engelleyen = '".$_SESSION["userid"]."' and engellenen = '".$id."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Engel kaldırıldı..",
	));	
	}
	elseif($_POST["islem"]=="ozelmesajat"){
	$alici = trim(filter_input(INPUT_POST, 'alici', FILTER_SANITIZE_STRING));
	$mesaj = trim(filter_input(INPUT_POST, 'mesaj', FILTER_SANITIZE_STRING));
	$userbilgisi = $baglanti->query("SELECT sohbet_izni,id,resim,username FROM oyuncular where id='".$alici."'")->fetch(PDO::FETCH_ASSOC);
	if($userbilgisi["sohbet_izni"]=="true"){
	$engelkontrol = $baglanti->query("SELECT * FROM engeller where engellenen='".$_SESSION["userid"]."' and engelleyen='".$alici."'")->fetch(PDO::FETCH_ASSOC);
	if($engelkontrol){
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => $userbilgisi["username"]." isimli Alıcı tarafından engellisiniz.."
	));	
	}else{
	$sonuc = $baglanti->exec("INSERT ozelmesajlar SET gonderici_id = '".$_SESSION["userid"]."',alici_id = '".$alici."',mesaj = '".$mesaj."',mesaj_tipi='ozel'");
	$inserid = $baglanti->lastInsertId();
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => $mesaj,
	"mesajid" => $inserid,
	"alici" => $userbilgisi	
	));	
	}
	}else{
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => $userbilgisi["username"]." isimli Alıcının Sohbet İzni Kapalı.."
	));	
	}
	}
	elseif($_POST["islem"]=="kendinibanla"){
	$baglanti->query("delete FROM sistemdenbanlananlar where engellenen = '".$_SESSION["userid"]."'")->fetch(PDO::FETCH_ASSOC);
	$sonuc = $baglanti->exec("INSERT sistemdenbanlananlar SET bannotu = '',aciklama = 'Masadan Ayrıldı',engellenen = '".$_SESSION["userid"]."',engelleyen='".$_SESSION["userid"]."',bitis=DATE_ADD(now(), INTERVAL 2 HOUR);");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Sistemden Banlandı."					
	));	
	}
	elseif($_POST["islem"]=="arkadas_islemleri"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	if($_POST["neolacak"]=="ekle"){
	$userbilgisi = $baglanti->query("SELECT arkadaslik_izni,id,resim,username FROM oyuncular where id='".$id."'")->fetch(PDO::FETCH_ASSOC);
	if($userbilgisi["arkadaslik_izni"]=="true"){
	$arkadaskontrol = $baglanti->query("SELECT * FROM arkadaslar where user_id='".$_SESSION["userid"]."' and friend_id='".$id."'")->fetch(PDO::FETCH_ASSOC);
	if($arkadaskontrol){
	if($arkadaskontrol["statu"]==0){
	echo json_encode(array(
	"durum" => "info",
	"mesaj" => "Teklifin arkadaşın onayında bekliyor.."					
	));
	}elseif($arkadaskontrol["statu"]==1){
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "Zaten arkadaşsınız.."					
	));
	}elseif($arkadaskontrol["statu"]==2){
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => "Reddedilmiş teklifin var. Tekrar teklif gönderemezsin.."					
	));
	}
	}
	else{
	$sonuc = $baglanti->exec("INSERT arkadaslar SET user_id='".$_SESSION["userid"]."',friend_id = '".$id."'");
	echo json_encode(array(
	"durum" => "success",
	"mesaj" => "İstek Gönderildi."					
	));	
	}
	}else{
	echo json_encode(array(
	"durum" => "error",
	"mesaj" => $userbilgisi["username"]." isimli Alıcının Arkaşlık İzni Kapalı.."
	));	
	}
	}elseif($_POST["neolacak"]=="kabul_et"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$sorgu = $baglanti->exec("UPDATE arkadaslar SET statu =1 WHERE friend_id='".$_SESSION["userid"]."' and user_id='".$id."'");
	echo json_encode(array(
	"durum" => "success"
	));	
	}elseif($_POST["neolacak"]=="reddet"){
	$id = trim(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING));
	$sorgu = $baglanti->exec("UPDATE arkadaslar SET statu =2 WHERE friend_id='".$_SESSION["userid"]."' and user_id='".$id."'");
	echo json_encode(array(
	"durum" => "success"
	));	
	}
	}
	?>																										