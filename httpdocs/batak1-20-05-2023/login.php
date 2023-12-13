<?php
	ob_start(); 
	session_start();
	ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include("php/fonksiyonlar.php");
	if($_POST['giristipi']=="user"){
		$username=$_POST['kuladi'];
		$password=$_POST['sifre'];
		$benihatirla=$_POST['remember'];
		$aktifoda=$_POST['aktifoda'];
		
		if($username!="" && $password!=""){
			try {
				include("php/baglanti.php");
				$sorgu = $baglanti->query("SELECT * from oyuncular where deleted=0 and username='$username' and BINARY pass='$password' or deleted=0 and email='$username' and BINARY pass='$password'");		
				$sorgu1 = $baglanti->query("SELECT * from salonlar where url='$aktifoda'")->fetch(PDO::FETCH_ASSOC);		
				$cikti = $sorgu->fetch(PDO::FETCH_ASSOC);
				if($sorgu->rowCount()){
					$salonbankontrol = $baglanti->query("SELECT * from salondanbanlananlar where engellenen = '".$cikti['id']."' and salon_id='".$sorgu1["id"]."' and bitis>now()")->fetch(PDO::FETCH_ASSOC);
					$sistembankontrol = $baglanti->query("SELECT * from sistemdenbanlananlar where engellenen = '".$cikti['id']."' and bitis>now()")->fetch(PDO::FETCH_ASSOC);
					$adminkontrol = $baglanti->query("SELECT * FROM yetki_gruplari INNER join oyuncular on oyuncular.yetki_grubu=yetki_gruplari.id where oyuncular.id='".$cikti['id']."'")->fetch(PDO::FETCH_ASSOC);

					$cookie_url = ayargetir("site_linki");
					if ($cookie_url != "localhost") $cookie_url = '.'.$cookie_url;

					if($sistembankontrol){
						echo json_encode(array(
						"durum" => 1,
						"mesaj" => "Sistemden banlısınız..",
						));
					}
					elseif($salonbankontrol){
						echo json_encode(array(
						"durum" => 1,
						"mesaj" => $sorgu1["ad"]." isimli salondan banlısınız..<br>Başka salona girmeyi deneyin..",
						));
					}
					elseif($cikti["bandurumu"]==1){
						echo json_encode(array(
						"durum" => 1,
						"mesaj" => "Sistemden süresiz banlısınız..",
						));
					}
				else {	
				if($sorgu1["enaz"]<$cikti["puan"]){	
				if ($_POST['remember']=="true") {
					if ($cookie_url == 'localhost') {
						setcookie("username", $username,time()+ 3600* 24 * 365, '/' );
					}else{
						setcookie("username", $username,time()+ 3600* 24 * 365, '/', '/' );
					}
				} else {
				unset($_COOKIE['username']); 
				if ($cookie_url == 'localhost') {
					setcookie("username", "",time() - 3600, '/' );
				}else{
					setcookie("username", "",time() - 3600, '/', '/' );
				}
				}
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
				setcookie('authToken', $cikti['serial'],time()+ 3600* 24 * 365, '/', $cookie_url );
				$_SESSION['cinsiyet'] = $cikti['cinsiyet'];
				$_SESSION['resim']=$cikti["resim"];
				$_SESSION['userid']=$cikti["id"];
				if($cikti["resim"]==null||$cikti["resim"]==""){	 
				$_SESSION['resim']="img/noneuserphoto.jpeg";
				}
				echo json_encode(array(
				"durum" => 0,
				"mesaj" => $_SESSION
				));
				}else{
				echo json_encode(array(
				"durum" => 1,
				"mesaj" => 'Puanınız <b><span class="text-danger">'.$_POST['aktifodaadi'].'</span></b> salonu için yetersiz',
				));
				}
				}
				}
				else{
				echo json_encode(array(
				"durum" => 1,
				"mesaj" => "Kullanıcı Adı/Şifre Hatalı",
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
				else{	
				echo json_encode(array(
				"durum" => 1,
				"mesaj" => "Kullanıcı Adı/Şifre boş bırakılamaz",
				));
				}
				}elseif($_POST['giristipi']=="misafir"){
				$number = rand(100,10000000);
				$_SESSION['login'] = false;
				$_SESSION['cinsiyet'] = $_POST['cinsiyet'];
				$_SESSION['FULLNAME']="Misafir-".$number;
				$_SESSION["username"]="Misafir-".$number;
				$_SESSION["USERKEYZ"]="Misafir-".$number;
				$_SESSION['resim']="img/noneuserphoto.jpeg";
				$_SESSION['userid']="Misafir-".$number;
				$_SESSION['usertype']="Misafir";
				echo json_encode(array(
				"durum" => 0,
				"mesaj" => $_SESSION
				));
				}
				?>																					