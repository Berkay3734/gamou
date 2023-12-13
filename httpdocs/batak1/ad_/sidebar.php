<?php
	ob_start();
	// session_start();
	if (!isset($_SESSION["adminLogin1"])) {
		header("Location: ./");
		die();
	}
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
		die();
	}
	include("baglan.php");
?>
<nav class="sidebar">
	<div class="sidebar-header">
		<a href="/" class="sidebar-brand"> Doğunet <span>Ajans</span>
		</a>
		<div class="sidebar-toggler not-active">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<div class="sidebar-body">
		<ul class="nav">
			<li class="nav-item nav-category">Menü</li>
			<li class="nav-item">
				<a href="./panel.php" class="nav-link">
					<i class="link-icon" data-feather="home"></i>
					<span class="link-title">Anasayfa</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./ayarlar.php" class="nav-link">
					<i class="link-icon " data-feather="settings"></i>
					<span class="link-title">Site Ayarları</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-bs-toggle="collapse" href="#oyuncular" role="button" aria-expanded="false" aria-controls="emails">
					<i class="link-icon" data-feather="users"></i>
					<span class="link-title">Oyuncular</span>
					<i class="link-arrow" data-feather="chevron-down"></i>
				</a>
				<div class="collapse" id="oyuncular">
					<ul class="nav sub-menu">
						<li class="nav-item"> 
							<a href="./gercekoyuncular.php" class="nav-link">
								Gerçek Oyuncular
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./vipuyeler.php" class="nav-link">
								Vip Oyuncular
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./silinenoyuncular.php" class="nav-link">
								Silinen Oyuncular
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./botoyuncular.php" class="nav-link">
								Bot Oyuncular
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./onlineoyuncular.php" class="nav-link">
								Online Oyuncular
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./onlinebotlar.php" class="nav-link">
								Online Botlar
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./banlioyuncular.php" class="nav-link">
								Banlı Oyuncular
							</a> 
						</li>
					</ul>
				</div>
			</li>
			<li class="nav-item"> 
				<a href="./yoneticiler.php" class="nav-link">
					<i class="link-icon " data-feather="user-check"></i>
					<span class="link-title">Yöneticiler</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./yetki-gruplari.php" class="nav-link">
					<i class="link-icon " data-feather="key"></i>
					<span class="link-title">Yetki Grupları</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./yetkililer.php" class="nav-link">
					<i class="link-icon " data-feather="key"></i>
					<span class="link-title">Yetkililer</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./salonlar.php" class="nav-link">
					<i class="link-icon " data-feather="home"></i>
					<span class="link-title">Salonlar</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-bs-toggle="collapse" href="#masalar" role="button" aria-expanded="false" aria-controls="emails">
					<i class="link-icon" data-feather="home"></i>
					<span class="link-title">Masalar</span>
					<i class="link-arrow" data-feather="chevron-down"></i>
				</a>
				<div class="collapse" id="masalar">
					<ul class="nav sub-menu">
						<li class="nav-item"> 
							<a href="./aktifmasalar.php" class="nav-link">
								Aktif Masalar
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./masagecmisi.php" class="nav-link">
								Masa Geçmişi
							</a>
						</li>
					</ul>
				</div>
			</li>
			<li class="nav-item"> 
				<a href="./kredi.php" class="nav-link">
					<i class="link-icon " data-feather="credit-card"></i>
					<span class="link-title">Kredi Paketleri</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./bankalar.php" class="nav-link">
					<i class="link-icon " data-feather="gift"></i>
					<span class="link-title">Bankalar</span>
				</a> 
			</li>
			<li class="nav-item"> 
				<a href="./radyolar.php" class="nav-link">
					<i class="link-icon " data-feather="music"></i>
					<span class="link-title">Radyolar</span>
				</a> 
			</li>
			<li class="nav-item"> 
				<a href="./satinalmabildirimleri.php" class="nav-link">
					<i class="link-icon " data-feather="shopping-cart"></i>
					<?php 
						$satinalmabildirimi = $baglanti->query("SELECT count(*) as bildirimadedi from satinalma_gecmisi where statu=0 and deleted=0")->fetch(PDO::FETCH_ASSOC);		
					?>
					<span class="link-title">Satınalma Bildirimleri 
						<?php if($satinalmabildirimi["bildirimadedi"]>0){?>
							<span class="badge bg-primary"><?php echo $satinalmabildirimi["bildirimadedi"];?></span>
						<?php }?>
					</span>
				</a>
			</li>
			<li class="nav-item"> 
				<a href="./satinalmalar.php" class="nav-link">
					<i class="link-icon " data-feather="shopping-bag"></i>
					<span class="link-title">Satın Alma Geçmişi</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-bs-toggle="collapse" href="#hediyeler" role="button" aria-expanded="false" aria-controls="emails">
					<i class="link-icon" data-feather="box"></i>
					<span class="link-title">Hediye İşlemleri</span>
					<i class="link-arrow" data-feather="chevron-down"></i>
				</a>
				<div class="collapse" id="hediyeler">
					<ul class="nav sub-menu">
						<li class="nav-item"> 
							<a href="./hediyeler.php" class="nav-link">
								Hediyeler
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./hediyegecmisi.php" class="nav-link">
								Hediye Geçmişi
							</a>
						</li>
						<li class="nav-item"> 
							<a href="./hediyepuangecmisi.php" class="nav-link">
								Hediye Puan Geçmişi
							</a>
						</li>
					</ul>
				</div>
			</li>
			<li class="nav-item">  
				<a href="./sikayetler.php" class="nav-link">
					<i class="link-icon " data-feather="alert-triangle"></i>
					<span class="link-title">Şikayet Bildirimleri</span>
				</a>
			</li> 
			<li class="nav-item"> 
				<a href="./oturumukapat.php" class="nav-link">
					<i class="link-icon " data-feather="log-out"></i>
					<span class="link-title">Güvenli çıkış</span>
				</a>
			</li>
		</ul>
	</div>
</nav>																