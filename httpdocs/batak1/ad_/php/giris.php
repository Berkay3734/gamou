<?php
	include("../baglan.php");
	ob_start();
	session_start();
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
	if(isset($_POST)){
		
		$login = $baglanti->prepare("SELECT * FROM oyuncular WHERE username=? AND pass=? and deleted=0");
		$login->execute(array($_POST["k"], $_POST["p"]));
		$l = $login->fetch(PDO::FETCH_ASSOC);
		if($l){
			if (yetki_kontrol($l["yetki_grubu"], "panelegiris")){
				$_SESSION["adminLogin1"] = "true";
				$_SESSION["adminid"] = $l["id"];
				$_SESSION["USERKEYZ"]=$l['serial'];
				$_SESSION['login'] = true;
				$_SESSION['usertype']="User";
				$_SESSION['FULLNAME'] = $l['adsoyad'];
				$_SESSION["email"]=$l['email'];
				$_SESSION["username"]=$l['username'];
				$_SESSION["USERKEYZ"]=$l['serial'];
				$_SESSION['resim']=$l["resim"];
				$_SESSION['userid']=$l["id"];
				if($l["resim"]==null||$l["resim"]==""){	 
					$_SESSION['resim']="img/noneuserphoto.jpeg";
				}
				echo 'ok ';
				return;
				}else{
				echo 'none';
				return;
				
			}
		}
		else{
			echo 'none';
			return;
			
		}
		/*
			if($l){
			$_SESSION["adminLogin1"] = "true";
			$_SESSION["adminid"] = $l["id"];
			$_SESSION["USERKEYZ"]=$l['serial'];
			$_SESSION['login'] = true;
			$_SESSION['usertype']="User";
			$_SESSION['FULLNAME'] = $l['adsoyad'];
			$_SESSION["email"]=$l['email'];
			$_SESSION["username"]=$l['username'];
			$_SESSION["USERKEYZ"]=$l['serial'];
			$_SESSION['resim']=$l["resim"];
			$_SESSION['userid']=$l["id"];
			if($l["resim"]==null||$l["resim"]==""){	 
			$_SESSION['resim']="img/noneuserphoto.jpeg";
			}
			echo 'ok';
			return;
			}else{
			echo 'none';
			return;
			}
		*/
		}
	?>
	
	
