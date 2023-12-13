<?php
	ob_start();
	session_start();
	include("php/baglanti.php");
	include("php/fonksiyonlar.php");
	$odabilgisi = $baglanti->query("SELECT * FROM salonlar where url='" . $_GET["salon"] . "'")->fetch(PDO::FETCH_ASSOC);
	if (!$odabilgisi) {
		$ilksalon = $baglanti->query("SELECT * from salonlar order by enaz limit 1")->fetch(PDO::FETCH_ASSOC);
		header("Location: ./oyun.php?salon=" . $ilksalon["url"]);
	}
	$profilephoto = "img/noneuserphoto.jpeg";
	if (!isset($_SESSION['usertype']) && !isset($_COOKIE['authToken'])) {
		header("Location: ./");
		} elseif (isset($_SESSION['usertype']) && $_SESSION['usertype'] == "Misafir") {
		$profilephoto = "img/noneuserphoto.jpeg";
		} elseif (!isset($_COOKIE['authToken'])) {
		header("Location: ./");
		} else if (loginkontrol($_COOKIE['authToken']) == false) {
		header("Location: ./");
		} else if (loginkontrol($_COOKIE['authToken']) == true) {
		$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and username='" . $_SESSION["username"] . "'")->fetch(PDO::FETCH_ASSOC);
		$arkadaslarim = $baglanti->query("SELECT * from arkadaslar WHERE user_id='" . $userbilgisi["id"] . "' or friend_id='" . $userbilgisi["id"] . "'");
		if ($_SESSION['resim'] != null && $_SESSION['resim'] != "") {
			$profilephoto = $_SESSION['resim'];
		}
		$salonbankontrol = $baglanti->query("SELECT * from salondanbanlananlar where engellenen = '" . $userbilgisi["id"] . "' and salon_id='" . $odabilgisi["id"] . "' and bitis>now()")->fetch(PDO::FETCH_ASSOC);
		$sistembankontrol = $baglanti->query("SELECT * from sistemdenbanlananlar where engellenen = '" . $userbilgisi["id"] . "' and bitis>now()")->fetch(PDO::FETCH_ASSOC);
		if ($sistembankontrol) {
			header("Location: logout.php");
			} elseif ($salonbankontrol) {
			header("Location: logout.php");
		}
		$_SESSION['usertype'] = "User";
		} else {
		header("Location: ./");
	}
	$eniyiler = $baglanti->query("SELECT * from oyuncular where deleted=0 order by puan desc limit 25");
	$best3 = $baglanti->query("SELECT * from oyuncular where deleted=0 order by puan desc limit 3");
	$site_linki = trim(ayargetir("site_linki"));
?>
<!DOCTYPE html>
<html lang="tr">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="ad_/assets/vendors/core/core.css">
		<link rel="stylesheet" href="ad_/assets/css/demo1/style.css">
		<link rel="stylesheet" href="assets/css/batak/style.css?v<?php echo rand(); ?>">
		<link rel="stylesheet" href="assets/css/batak/styles.css?v<?php echo rand(); ?>">
		<link rel="stylesheet" href="assets/css/batak/animation.css">
		<script src="ad_/assets/vendors/core/core.js"></script>	
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<link rel="stylesheet" href="assets/css/batak/style-b.css?v<?php echo rand(); ?>">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
		<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
		<script defer src="assets/js/batak/app.js?v<?php echo rand(); ?>"></script>
		<script type="module" src="https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>
		<title><?php echo $odabilgisi["ad"] ?> - Okey</title>
		<script>
			var hesapbilgilerim = {
				token: '<?php echo $_SESSION['USERKEYZ'] ?>',
				usertype: '<?php echo $_SESSION['usertype'] ?>',
				userlogin: '<?php echo $_SESSION['login'] ?>',
				oda: "<?php echo $odabilgisi["id"]; ?>",
				id: '<?php echo $_SESSION['userid'] ?>',
				resim: '<?php echo $_SESSION['resim'] ?>',
			}
			var site_linki = '<?php echo trim($site_linki); ?>';
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				showCloseButton: true,
				timer: 3000,
				timerProgressBar: true,
			});
		</script>
		<!--<script type="text/javascript" src="https://o.<-?php echo trim($site_linki); ?>/socket.io/socket.io.js"></script>-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.min.js" integrity="sha512-AI5A3zIoeRSEEX9z3Vyir8NqSMC1pY7r5h2cE+9J6FLsoEmSSGLFaqMQw8SWvoONXogkfFrkQiJfLeHLz3+HOg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>
	</head>
	<body>
		<div class="transition-tile-box deactive">
			<div class="tile tile-1"></div>
			<div class="tile tile-2"></div>
			<div class="tile tile-3"></div>
			<div class="tile tile-4"></div>
			<div class="tile tile-5"></div>
			<div class="tile tile-6"></div>
			<div class="tile tile-7"></div>
		</div>
		<section class="popular-players deactive">
			<div class="popular-players__left">
				<h3>Top 25</h3>
				<div class="cylinder-placement">
					<div class="cylinder-box cylinder-1">
						<div class="cylinder-box__image cylinder-1__image">
							<img src="assets/images/ahmet.png" alt="Ahmet">
							<span>2</span>
						</div>
						<div class="tank tank-1">
							<div class="bottom"></div>
							<div class="middle"></div>
							<div class="top"></div>
						</div>
					</div>
					<div class="cylinder-box cylinder-2">
						<div class="cylinder-box__image cylinder-2__image">
							<img src="assets/images/ahmet.png" alt="Ahmet">
							<span>1</span>
						</div>
						<div class="tank tank-2">
							<div class="bottom"></div>
							<div class="middle"></div>
							<div class="top"></div>
						</div>
					</div>
					<div class="cylinder-box cylinder-3">
						<div class="cylinder-box__image cylinder-3__image">
							<img src="assets/images/ahmet.png" alt="Ahmet">
							<span>3</span>
						</div>
						<div class="tank tank-3">
							<div class="bottom"></div>
							<div class="middle"></div>
							<div class="top"></div>
						</div>
					</div>
				</div>
				<div class="best-3">
					<?php
						$i = 0;
						while ($data = $best3->fetch(PDO::FETCH_ASSOC)) {
							$arkadas = $baglanti->query("SELECT * FROM oyuncular where id='" . $data["id"] . "'")->fetch(PDO::FETCH_ASSOC);
							$arkadasresmi = "img/noneuserphoto.jpeg";
							if ($arkadas["resim"] != "" && $arkadas["resim"] != null) {
								$arkadasresmi = $arkadas["resim"];
							}
							$i++;
							if ($i == 1) {
								$place = "first";
							}
							if ($i == 2) {
								$place = "second";
							}
							if ($i == 3) {
								$place = "third";
							}
						?>
						<div class="best-3__placement <?= $place ?>-place">
							<div class="best-3__placement--left">
								<span class="place-number"><?= $i ?></span>
								<span class="place-number"><?= $i ?></span>
								<img src="<?= $arkadasresmi ?>" alt="Ahmet">
							</div>
							<div class="best-3__placement--right">
								<div class="placement-info__top"><?= $arkadas["username"] ?></div>
								<div class="placement-info__bottom"><?= $arkadas["puan"] ?> $</div>
							</div>
						</div>
					<?php } ?>
				</div>
			</div>
			<div class="popular-players__right">
				<div class="tab-box">
					<div class="tab-box__assets">
						<div class="tab-box__buttons">
							<button class="tab-box__buttons--button button1">Günün iyileri</button>
							<button class="tab-box__buttons--button button2">Tecrübeliler</button>
							<button class="tab-box__buttons--button button3 active">En iyiler</button>
						</div>
						<div class="tab-box__leave">
							<button class="leave-button">
								<i class="fa-solid fa-x"></i>
							</button>
						</div>
					</div>
					<div class="tab-box__container">
						<div class="tab-box__container--people the-best-of-day button1">
							<div class="tab-box__container--people--person">
								<span class="number">7</span>
								<div class="info">
									<img src="assets/images/ahmet.png" alt="Ahmet">
									<span class="name">Seko</span>
								</div>
								<span class="money">12.745634 $</span>
							</div>
						</div>
						<div class="tab-box__container--people experienced button2">
							<div class="tab-box__container--people--person">
								<span class="number">7</span>
								<div class="info">
									<img src="assets/images/ahmet.png" alt="Ahmet">
									<span class="name">Seko</span>
								</div>
								<span class="money">12.745634 $</span>
							</div>
						</div>
						<div class="tab-box__container--people the-best button3 active">
							<?php
								$i = 0;
								while ($data = $eniyiler->fetch(PDO::FETCH_ASSOC)) {
									$arkadas = $baglanti->query("SELECT * FROM oyuncular where id='" . $data["id"] . "'")->fetch(PDO::FETCH_ASSOC);
									$arkadasresmi = "img/noneuserphoto.jpeg";
									if ($arkadas["resim"] != "" && $arkadas["resim"] != null) {
										$arkadasresmi = $arkadas["resim"];
									}
									$i++;
								?>
								<div class="tab-box__container--people--person">
									<span class="number"><?= $i; ?></span>
									<div class="info">
										<img src="<?= $arkadasresmi; ?>" alt="Ahmet">
										<span class="name"><?= $arkadas["username"]; ?></span>
									</div>
									<span class="money"><?= $arkadas["puan"]; ?> $</span>
								</div>
							<?php } ?>
						</div>
					</div>
				</div>
			</div>
		</section>
		<main id="homePage" class="">
			<div class="animation-background deactive">
			</div>
			<?php if ($_SESSION['login']) { ?>
				<div class="profile-box deactive">
					<div class="profile-box__content">
						<div class="profile-box__content--menu">
							<button class="exit-profile-box">
								<i class="fa-solid fa-x"></i>
								<span>Kapat</span>
							</button>
							<button class="edit-profile-box">
								<i class="fa-solid fa-pen-to-square"></i>
								<span>Profil ayarları</span>
							</button>
						</div>
						<div class="profile-box__content--body">
							<div class="personal-info">
								<div class="personal-info--left">
									<button class="image-button">
										<div class="lakap">
										<span class="myuserlakap">Oyuncu Unvan</span>
										</div>
										<div class="image-button__content-wrapper">
											<img class="profilresmim" src="<?= $profilephoto; ?>" alt="Profile picture">
											<i class="fa-solid fa-camera"></i>
										</div>
									</button>
									<div class="belonging-box">
										
										<span class="name myusername"><?= $userbilgisi["username"] ?></span>
										<span class="coin">
											<img src="assets/icons/golden-coin.png" alt="altin para" id="golden-coin">
											<span class="puanim">0 $</span>
										</span>
									</div>
								</div>
							</div>
							<div class="game-info highes-pot">
								<div class="game-info__left">
									<img src="assets/icons/rocket.png" alt="roket">
									<span class="text">En yüksek çanak</span>
								</div>
								<div class="game-info__right">
									<span class="amount">478</span>
								</div>
							</div>
							<div class="game-info games-played">
								<div class="game-info__left">
									<img src="assets/icons/king-coins.png" alt="kral altin para">
									<span class="text">Toplam oyun sayısı</span>
								</div>
								<div class="game-info__right">
									<span class="amount">6</span>
								</div>
							</div>
							<div class="game-info games-won">
								<div class="game-info__left">
									<img src="assets/icons/medal.png" alt="madalyon">
									<span class="text">Kazandığı oyun sayısı</span>
								</div>
								<div class="game-info__right">
									<span class="amount">6</span>
								</div>
							</div>
							<div class="game-info friend-amount">
								<div class="game-info__left">
									<img src="assets/icons/whitch.png" alt="Cadı">
									<span class="text">Arkadaş sayısı</span>
								</div>
								<div class="game-info__right">
									<span class="amount"><?= $arkadaslarim->rowCount() ?></span>
								</div>
							</div>
							<div class="game-info date-started">
								<div class="game-info__left">
									<img src="assets/icons/sand-watch.png" alt="kum saati">
									<span class="text">Oyuna başlama tarihi</span>
								</div>
								<div class="game-info__right">
									<span class="amount"><?= date("d-m-Y", strtotime($userbilgisi["created"])) ?></span>
								</div>
							</div>
							<div class="game-info gifts">
								<div class="game-info__left">
									<img src="assets/icons/gift.png" alt="hediye">
									<span class="text">Hediyyeleri</span>
								</div>
								<div class="game-info__right">
									<span class="amount">17</span>
								</div>
							</div>
							<div class="game-info bans">
								<div class="game-info__left">
									<img src="assets/icons/ban.png" alt="ban">
									<span class="text">Engellenenler</span>
								</div>
								<div class="game-info__right">
									<span class="amount">17</span>
								</div>
							</div>
						</div>
					</div>
					<div class="profile-box__edit deactive">
						<div class="profile-box__edit--menu">
							<button class="back-to-profile-content">
								<i class="fa-solid fa-chevron-left"></i>
								<span class="back-to-profile-content--text">Profile dön</span>
							</button>
						</div>
						<div class="profile-box__edit--body">
							<form action="GET">
								<div class="personal-info">
									<div class="personal-info--left">
										<button class="image-button">
											<div class="image-button__content-wrapper">
												<img class="profilresmim" src="<?= $profilephoto; ?>" alt="Profile picture">
												<i class="fa-solid fa-camera"></i>
											</div>
										</button>
										<div class="belonging-box">
											<span class="name myusername"><?= $userbilgisi["username"] ?></span>
											<span class="coin">
												<img src="assets/icons/golden-coin.png" alt="altin para" id="golden-coin">
												<span class="puanim">0 $</span>
											</span>
										</div>
									</div>
									<div class="personal-info--right">
										<button class="edit-personal-info">
											<i class="fa-solid fa-pen-to-square"></i>
										</button>
									</div>
								</div>
								<div class="gender-password-box">
									<div class="gender-box">
										<label for="gender">Cinsiyet</label>
										<select name="gender" id="gender">
											<option value="female">Kadın</option>
											<option value="male">Erkek</option>
											<option value="other">Diğer</option>
											<option value="not-to-mention">Belirtmek istemiyorum</option>
										</select>
									</div>
									<div class="password-box">
										<label for="new-password">Yeni parola</label>
										<input type="password" id="new-password">
									</div>
								</div>
								<div class="upload-image-box">
									<span class="image-label">Profili düzenle</span>
									<div class="upload-image-tools">
										<label for="imgInput">Ekle</label>
										<input type="file" accept="image/*" id="imgInput" style="display: none;">
										<img id="preview" src="#" alt="Image preview" style="display: none;">
										<button id="removeBtn" style="display: none;">Kaldır</button>
									</div>
								</div>
								<div class="font-type">
									<label for="fontSelect">Yazı tipi</label>
									<select name="font-types" id="fontSelect">
										<option value="Arial">Arial</option>
										<option value="Georgia">Georgia</option>
										<option value="Verdana">Verdana</option>
										<option value="Times New Roman">Times New Roman</option>
									</select>
								</div>
								<div class="renk-sec">
								<div class="nick-color">
									<label for="nickColorInput">Nick rengi</label>
									<input type="color" id="nickColorInput" value="#ff0000">
								</div>
								<div class="font-color">
									<label for="fontColorInput">Nick rengi</label>
									<input type="color" id="fontColorInput" value="#0000ff">
								</div>
			</div>
								<div class="save-reject">
									<div class="sidebar-desktop--button trash-button">
										<div class="icon-box">
											<i class="fa-solid fa-trash-can"></i>
										</div>
										<span>Hesabımı sil</span>
									</div>
									<div class="buttons">
										<button class="reject">Vazgeç</button>
										<button class="save">Kaydet</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="friends-box deactive">
					<div class="friends-box__menu">
						<span class="friends-box__menu--name">Arkadaşlar</span>
						<button class="friends-box__menu--button">
							<i class="fa-solid fa-x"></i>
						</button>
					</div>
					<div class="friends-box__body">
						<?php
							while ($data = $arkadaslarim->fetch(PDO::FETCH_ASSOC)) {
								$yetki = "<p></p>";
								if ($data["user_id"] != $userbilgisi["id"]) {
									$arkadas = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and id='" . $data["user_id"] . "'")->fetch(PDO::FETCH_ASSOC);
									} else {
									$arkadas = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and id='" . $data["friend_id"] . "'")->fetch(PDO::FETCH_ASSOC);
								}
								if ($arkadas["yetki_grubu"] > 0) {
									$yetkisinedir = $baglanti->query("SELECT renk,yetki_adi FROM yetki_gruplari where id='" . $arkadas["yetki_grubu"] . "'")->fetch(PDO::FETCH_ASSOC);
									$yetki = '<p class="yonetici-rank" style="background:' . $yetkisinedir["renk"] . ';border: 1px solid ' . $yetkisinedir["renk"] . ';">' . $yetkisinedir["yetki_adi"] . '</p>';
								}
								$arkadasresmi = "img/noneuserphoto.jpeg";
								if ($arkadas["resim"] != "" && $arkadas["resim"] != null) {
									$arkadasresmi = $arkadas["resim"];
								}
							?>
							<div class="friend">
								<div class="friend__info">
									<div class="friend__info--img">
										<img src="<?php echo $arkadasresmi; ?>" alt="Ahmet">
										<div class="star-box">
											<span class="star-number"><?php echo $arkadas["seviye"]; ?></span>
											<img src="assets/icons/star.png" alt="Yildiz">
										</div>
									</div>
									<div class="friend__info--text">
										<span class="friend__info--text--name"><?php echo $arkadas["username"]; ?></span>
										<span class="friend__info--text--money"><?php echo $arkadas["puan"]; ?>$</span>
									</div>
								</div>
								<div class="friend__tools">
									<button class="done">
										<i class="fa-solid fa-square-check"></i>
									</button>
									<button class="message">
										<i class="fa-solid fa-envelope"></i>
									</button>
								</div>
							</div>
						<?php } ?>
					</div>
				</div>
			<?php } ?>
			<div class="invite-box deactive">
				<div class="invite-box__menu">
					<span class="invite-box__menu--name">Davet et</span>
					<button class="invite-box__menu--button">
						<i class="fa-solid fa-x"></i>
					</button>
				</div>
				<div class="invite-box__body">
					<div class="person">
						<div class="person__info">
							<div class="person__info--img">
								<img src="assets/images/ahmet.png" alt="Ahmet">
								<div class="star-box">
									<span class="star-number">12</span>
									<img src="assets/icons/star.png" alt="Yildiz">
								</div>
							</div>
							<div class="person__info--text">
								<span class="person__info--text--name">Metin</span>
								<div class="person__info--text--money">
									<img src="assets/icons/golden-coin.png" alt="Altin para">
									<span>3776$</span>
								</div>
							</div>
						</div>
						<div class="person__tools">
							<button class="invite-button">
								<span>DAVET ET</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="manager-box deactive">
				<div class="manager-box__menu">
					<span class="manager-box__menu--name">Yönetim kadrosu</span>
					<button class="manager-box__menu--button">
						<i class="fa-solid fa-x"></i>
					</button>
				</div>
				<div class="manager-box__body">
					<div class="manager-box__body--top">
						<div class="system-owner">
							<span class="system-owner__category">
								<i class="fa-solid fa-users-between-lines"></i>
								<span class="system-owner__category--text">
									Sistem sahibi
								</span>
							</span>
						</div>
						<div class="person">
							<div class="person__info">
								<div class="person__info--icon">
									<i class="fa-solid fa-heart heart"></i>
								</div>
								<div class="person__info--img">
									<img src="assets/images/ahmet.png" alt="Ahmet">
								</div>
								<div class="person__info--text">
									<span class="person__info--text--name">Metin</span>
								</div>
							</div>
							<div class="person__tools">
								<span class="person__tools--money">3776$</span>
							</div>
						</div>
					</div>
					<div class="manager-box__body--bottom">
						<div class="authorities">
							<span class="authorities__category">
								<i class="fa-solid fa-star star"></i>
								<span class="authorities__category--text">Yetkililer</span>
							</span>
						</div>
						<div class="person">
							<div class="person__info">
								<div class="person__info--icon">
									<i class="fa-solid fa-heart heart"></i>
								</div>
								<div class="person__info--img">
									<img src="assets/images/ahmet.png" alt="Ahmet">
								</div>
								<div class="person__info--text">
									<span class="person__info--text--name">Metin</span>
								</div>
							</div>
							<div class="person__tools">
								<span class="person__tools--money">3776$</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="notification-box deactive">
				<div class="notification-box__menu">
					<span class="notification-box__menu--name">Bildirimler</span>
					<button class="notification-box__menu--button">
						<i class="fa-solid fa-x"></i>
					</button>
				</div>
				<div class="notification-box__body">
					<div class="person">
						<div class="person__info">
							<div class="person__info--img">
								<img src="assets/images/ahmet.png" alt="Ahmet">
							</div>
							<div class="person__info--text">
								<span class="person__info--text--name">Metin</span>
								<div class="person__info--text--message">
									<span>Sana mesaj gönderdi</span>
								</div>
							</div>
						</div>
						<div class="person__tools">
							<button class="tool-button">
								<i class="fa-solid fa-envelope envelope"></i>
								<i class="fa-solid fa-user account"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="table-features deactive">
				<div class="table-features__menu">
					<span class="table-features__menu--name">Masa özelliklerini seç</span>
					<button class="table-features__menu--button">
						<i class="fa-solid fa-x"></i>
					</button>
				</div>
				<div class="table-features__body">
					<div class="table-features__body--top">
						<div class="table-features__body--top--left">
							<select class="form-select" id="oyuntipi">
								<option value="Koz Maça">Koz Maça</option>
								<option value="İhaleli">İhaleli</option>								
							</select>
							<div class="gamer-amount">
								<label for="gamer-amount">El sayısı</label>
								<input type="number" min="2" value="2" max="4" id="elsayisi">
							</div>
						</div>
						<div class="table-features__body--top--right">
							<div class="table-settings">
								<span class="table-settings__header">Ayarlar</span>
								<div class="table-settings__audience-chat">
									<span class="table-settings__audience-chat--text">Arttırmalı</span>
									<div class="table-settings__audience-chat--activate">
										<div class="table-settings__audience-chat--activate--circle"></div>
									</div>
								</div>
								<div class="table-settings__accept-audience">
									<span class="table-settings__accept-audience--text">Eşli</span>
									<div class="table-settings__accept-audience--activate">
										<div class="table-settings__accept-audience--activate--circle"></div>
									</div>
								</div>
							</div>
							<div class="table-features__chip-amount" style="display:none">
								<label for="table-chip-amount">
									<span class="table-features__chip-amount--text">Çip miktarı: </span>
									<span class="table-features__chip-amount--amount">13</span>
								</label>
								<div class="table-chip-amount-box">
									<button class="decrease-chip">
										-
									</button>
									<input type="range" min="1" max="24" id="table-chip-amount">
									<button class="increase-chip">+</button>
								</div>
							</div>
						</div>
					</div>
					<div class="table-features__body--bottom">
						<button onclick="masayarat()" class="table-accept">TAMAM</button>
						<button class="table-cancel">VAZGEÇ</button>
					</div>
				</div>
			</div>
			<div class="yetki-talep-container deactive">
				<div class="header">
					<p>Yetki Talep</p>
					<a href="#" class="leave-authority">
						<img src="assets/icons/exit.svg" alt="" />
					</a>
				</div>
				<div class="main">
					<div>
						<p>
							Merhaba; <br /><br />
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
							doloribus dolorem dolores obcaecati libero eum, sit, ipsam aperiam
							fuga sunt eos similique architecto ut. Delectus recusandae nemo
							dolor esse exercitationem. Molestiae totam ad illum sit cumque
							magnam, impedit nobis in. ipsum dolor sit amet consectetur
							adipisicing elit. Dolorum esse eligendi quia distinctio. Obcaecati
							ut cum saepe iste, exercitationem fugiat.
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
							doloribus dolorem dolores obcaecati libero eum, sit, ipsam aperiam
							fuga sunt eos similique architecto ut. Delectus recusandae nemo
							dolor esse exercitationem. Molestiae totam ad illum sit cumque
							magnam, impedit nobis in. ipsum dolor sit amet consectetur
							adipisicing elit. Dolorum esse eligendi quia distinctio. Obcaecati
							ut cum saepe iste, exercitationem fugiat.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
							doloribus dolorem dolores obcaecati libero eum, sit, ipsam aperiam
							fuga sunt eos similique architecto ut. Delectus recusandae nemo
							dolor esse exercitationem. Molestiae totam ad illum sit cumque
							magnam, impedit nobis in. ipsum dolor sit amet consectetur
							adipisicing elit. Dolorum esse eligendi quia distinctio. Obcaecati
							ut cum saepe iste, exercitationem fugiat.
						</p>
					</div>
				</div>
				<div class="footer">
					<button>Başvur</button>
				</div>
			</div>
			<div class="vip-container deactive">
				<div class="vip-header">
					<div class="header-activity">
						<div class="payment-methods">
							<button>
								<img src="assets/images/icons8-diamond-481.png" alt="" /> İLE
								AL
							</button>
							<button>
								<img src="assets/images/icons8-coin-wallet-481.png" alt="" />
								İLE AL
							</button>
						</div>
						<div id="exitVipButton" class="exit-button">
							<img src="assets/icons/exit-icon.svg" />
						</div>
					</div>
				</div>
				<div class="vip-body">
					<div class="left-side">
						<button class="active">
							<img src="assets/images/icons8-stack-of-coins-481.png" alt="" />
							ÇİP AL
						</button>
						<button>
							<img src="assets/images/icons8-diamond-481.png" alt="" /> ELMAS
							AL
						</button>
						<button>
							<img src="assets/images/icons8-vip-641.png" alt="" /> GOLD VIP AL
						</button>
						<button>
							<img src="assets/images/icons8-vip-481.png" alt="" /> VIP AL
						</button>
					</div>
					<div class="right-side">
						<div class="body-container">
							<?php 
								$datalar = $baglanti->query("SELECT * FROM paketler where tip='cip'"); //  group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)
								while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
								?>
								<div class="items" id="cipal<?php echo $data["tip"].$data["id"];?>">
									<div class="inimage active">
										<img src="assets/images/paketresimleri/<?php echo $data["resim"];?>" alt="<?php echo $data["adi"];?>" />
										<p><?php echo $data["deger"];?></p>
										<button><?php echo $data["fiyat"];?></button>
									</div>
								</div>
								<?php
								}
							?>
							<?php 
								$datalar = $baglanti->query("SELECT * FROM paketler where tip='elmas'"); //  group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)
								while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
								?>
								<div class="items" id="elmas<?php echo $data["tip"].$data["id"];?>">
									<div class="inimage active">
										<img src="assets/images/paketresimleri/<?php echo $data["resim"];?>" alt="<?php echo $data["adi"];?>" />
										<p><?php echo $data["deger"];?></p>
										<button><?php echo $data["fiyat"];?></button>
									</div>
								</div>
								<?php
								}
							?>
							
							<?php 
								$datalar = $baglanti->query("SELECT * FROM paketler where tip='gold_vip'"); //  group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)
								while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
								?>
								<div class="items" id="goldvip<?php echo $data["tip"].$data["id"];?>">
									<div class="inimage active">
										<img src="assets/images/paketresimleri/<?php echo $data["resim"];?>" alt="<?php echo $data["adi"];?>" />
										<p><?php echo $data["deger"];?></p>
										<button><?php echo $data["fiyat"];?></button>
									</div>
								</div>
								<?php
								}
							?>
							<?php 
								$datalar = $baglanti->query("SELECT * FROM paketler where tip='vip'"); //  group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)
								while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
								?>
								<div class="items" id="normalvip<?php echo $data["tip"].$data["id"];?>">
									<div class="inimage active">
										<img src="assets/images/paketresimleri/<?php echo $data["resim"];?>" alt="<?php echo $data["adi"];?>" />
										<p><?php echo $data["deger"];?></p>
										<button><?php echo $data["fiyat"];?></button>
									</div>
								</div>
								<?php
								}
							?>
						</div>
					</div>
				</div>
			</div>
			<div class="prize-container deactive">
				<div class="prize-left">
					<div class="prize-directory">
						<div class="vector-box">
							<img src="assets/images/Vector-611.png" alt="" />
							<img src="assets/images/Vector-611.png" alt="" />
							<img src="assets/images/Vector-611.png" alt="" />
							<img src="assets/images/Vector-611.png" alt="" />
							<img class="absolute" src="assets/images/stack-of-gold-coins-9 1.png" alt="" />
						</div>
						<div class="prize-days">
							<div class="days">
								<div class="prize-day">
									<p>4.GÜN</p>
								</div>
								<div class="prize">
									<p>1250</p>
								</div>
							</div>
							<div class="days">
								<div class="prize-day">
									<p>4.GÜN</p>
								</div>
								<div class="prize">
									<p>1250</p>
								</div>
							</div>
							<div class="days">
								<div class="prize-day">
									<p>YARIN</p>
								</div>
								<div class="prize">
									<p>1000</p>
								</div>
							</div>
							<div class="days taken">
								<div class="prize-day ">
									<p>BUGÜN</p>
								</div>
								<div class="prize">
									<p>750</p>
								</div>
							</div>
							<div class="days taken">
								<div class="prize-day">
									<p>DÜN</p>
								</div>
								<div class="prize">
									<p>500</p>
								</div>
							</div>
						</div>
					</div>
					<div class="prize-slogan">
						<p>Her gün gel <br />daha fazla çip al</p>
					</div>
				</div>
				<div class="prize-mid">
					<div class="header">
						<img src="assets/images/Günlük-Bonus.png" alt="" />
						<img class="exit exit-prize" src="assets/icons/Vector.svg" alt="" />
					</div>
					<div class="main">
						<div class="contain">
							<p>Sadakat</p>
							<span>750</span>
						</div>
						<div class="contain">
							<p>Arkadaşlar</p>
							<span>1x5=5</span>
						</div>
						<div class="contain">
							<p>Seviye</p>
							<span>5</span>
						</div>
						<div class="contain">
							<p>Toplam</p>
							<span class="total">$760</span>
						</div>
					</div>
					<div class="footer">
						<button>Ödülünü al</button>
					</div>
				</div>
				<div class="prize-right">
					<img src="assets/icons/golden-coin.png" alt="" class="coin coin1">
					<img src="assets/icons/golden-coin.png" alt="" class="coin coin2">
					<img src="assets/icons/golden-coin.png" alt="" class="coin coin3">
					<div class="header">
						<h2>MOBİLDE OYNA</h2>
						<p><span>%100</span> daha fazla <span>BONUS</span> kazan!</p>
					</div>
					<div class="main">
						<img src="assets/images/pile-coins-png-clip-art-14-1.png" alt="" />
					</div>
					<div class="footer">
						<a href="#">
							<div class="contain">
								<img src="assets/icons/apple.svg" alt="" />
								<div class="text-box">
									<p>App Store</p>
									<span>Üzerinden İndir</span>
								</div>
							</div>
						</a>
						<a href="#">
							<div class="contain">
								<img src="assets/icons/google.svg" alt="" />
								<div class="text-box">
									<p>Play Store</p>
									<span>Üzerinden İndir</span>
								</div>
							</div>
						</a>
						<a href="#">
							<div class="contain">
								<img src="assets/icons/huawei.svg" alt="" />
								<div class="text-box">
									<p>App Gallery</p>
									<span>ile keşfedin</span>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="wheel-container deactive">
				<div class="wheel-container__top">
					<div class="wheel-pointer-circle-box">
						<div class="wheel-pointer-circle">
							<div class="wheel-pointer"></div>
						</div>
					</div>
					<div class="wheel-circle-box">
						<img class="wheel" src="assets/images/wheel.png" alt="Çark">
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<img src="assets/icons/golden-coin.png" alt="Altın para">
								<span>15</span>
							</div>
						</div>
						<div class="wheel-prize">
							<div>
								<span class="prize-pas">PAS</span>
							</div>
						</div>
					</div>
					<div class="wheel-support-box">
						<div class="wheel-support-line"></div>
						<img src="./assets/images/Opened-Treasure-Chest-PNG-Free-Image1.png" alt="Altın sandığı" class="treasure-chest">
						<img src="./assets/images/wheel-support.png" alt="Çark desteği" class="wheel-support">
						<img src="./assets/images/080lswpc70j3xqxp96jfx92tbtl41.png" alt="Altın çuvalı" class="gold-sack">
					</div>
				</div>
				<div class="wheel-container__bottom">
					<button class="spin-wheel">ÇEVİR!</button>
					<p class="spin-wheel-text">
						Çarkı çevir 100 derece hediye kazan !
					</p>
				</div>
			</div>
			<div class="support deactive">
				<div class="header">
					<p>Destek / Şikayet</p>
					<img src="assets/icons/exit.svg" alt="">
				</div>
				<div class="body">
					<p>Konu:</p>
					<div class="radio-buttons">
						<label for="sikayet"><input name="support" id="sikayet" type="radio" /> Şikayet</label>
						<label for="oyunHatasi"><input name="support" id="oyunHatasi" type="radio" /> Oyun Hatası</label>
						<label for="genel"><input name="support" id="genel" type="radio" /> Genel</label>
					</div>
					<div class="support-special">
						<div class="left-side">
							<p>Mesaj</p>
							<textarea></textarea>
							<button>Gönder</button>
						</div>
						<div class="right-side">
							<p>Ekran Görüntüsü</p>
							<img loading="lazy" src="assets/images/Rectangle33.png" alt=""> <!-- 500 394-->
							<button>Kapat</button>
						</div>
					</div>
				</div>
			</div>
			<section class="navbar-section">
				<nav>
					<div class="navbar-left">
						<div class="menu-bar-box">
							<div class="menu-bar">
								<div class="bar bar-1"></div>
								<div class="bar bar-2"></div>
								<div class="bar bar-3"></div>
							</div>
						</div>
						<div class="navbar-left__profile-section">
							<div class="navbar-left__profile-section--top">
								<div class="profileName">
									<button class="profile-button">
										<span class="profile-notifications">3</span>
										<img src="<?php echo $profilephoto;?>" alt="Profile picture">
									</button>
									<p style="color:white; font-size:10px"><?php echo $_SESSION["username"];?></p>
								</div>
								<button class="buy-chip-button">
									<i class="fa-solid fa-plus"></i>
								</button>
								<img src="assets/icons/golden-coin.png" alt="altin para" id="golden-coin">
								<span class="money-amount">900$</span>
								<div class="coins">
									<img src="assets/icons/king-coins.png" alt="koinler">
									<span>90</span>
								</div>
							</div>
						</div>
						<button class="managers">
							<img src="assets/images/managers.png" alt="Yöneticiler">
							<div class="managers__text-box">
								<span>Yöneticiler</span>
							</div>
						</button>
						<button class="fortune-wheel">
							<i class="fa-solid fa-dharmachakra"></i>
						</button>
					</div>
					<div style="clear:both;" class="logo">
						<img src="assets/images/apkLogo.png" alt="Okey logo">
					</div>
					<div class="navbar-right">
						<button class="hourly-money-button">
							<span class="first-word">SAATLİK</span>
							<span class="second-word">BONUS</span>
							<span class="third-word">HAZIR</span>
							<i class="fa-solid fa-hourglass-start"></i>
						</button>
						<button class="vip-membership-button">
							<span>VİP üyelik!</span>
							<i class="fa-solid fa-check"></i>
						</button>
						<button class="rent-hall">
							<img src="assets/icons/house-icon.png" alt="Ev">
							<div class="rent-hall__text-box">
								<span>Salon Kirala</span>
							</div>
						</button>
						<div id="context-menu" class="sag-tik">
							<ul>
								<li class="sekmeler">Profili Görüntüle</li>
								<li>Arkadaşı Ekle</li>
								<li>Özel</li>
								<li>Engelle</li>
								<li>Puan Gönder</li>
								<li>Hediye Gönder</li>
								<li>Banla</li>
								<li>Sustur</li>
								<li>Salondan At</li>
								<li>Sistemden At</li>
								<li>Salondan Banla</li>
								<li>Sistemden Banla</li>
							</ul>
						</div>
						<div class="tool-box">
							<button class="maximize-button">
								<img src="assets/icons/maximise.svg" alt="maximise icon">
							</button>
							<button class="messages-button">
								<i class="fa-regular fa-bell"></i>
							</button>
							<button class="settings-button">
								<i class="fa-sharp fa-solid fa-gear"></i>
							</button>
							<button class="exit-button">
								<a href="logout.php">
									<i class="fa-solid fa-power-off"></i>
								</a>
							</button>
						</div>
					</div>
				</nav>
			</section>
			<section class="body-section">
				<section class="hall-section deactive">
					<div class="hall-container">
						<header>
							<h2>Salon listesi</h2>
							<button id="exit-hall">X</button>
						</header>
						<div class="hall-table-box">
							<table>
								<thead>
									<tr>
										<th>Salon adı</th>
										<th>Oyuncu sayısı</th>
										<th>
											<img src="assets/icons/money_sign.svg" alt="Money sign">
											Katılım
										</th>
										<th>
											<img src="assets/icons/money_sign.svg" alt="Money sign">
											Bahis
										</th>
									</tr>
								</thead>
								<tbody class="salonlar" style="display:none">
									<?php
										$i = 0;
										$datalar = $baglanti->query("SELECT * from salonlar where deleted=0 order by enaz");
										while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
										?>
										<tr class="<?php if ($odabilgisi["id"] == $data["id"]) {
											echo "active";
										} ?> odasec" data-odaid="<?php echo $data["id"] ?>" data-oda="<?php echo $data["url"] ?>" data-ad="<?php echo $data["ad"] ?>">
										<td>
											<img src="assets/icons/emoji_1.svg" alt="Emoji-1">
											<?php echo $data["ad"] ?>
										</td>
										<td><?php echo $data["online"] ?></td>
										<td><?php echo $data["enaz"] ?></td>
										<td><?php echo $data["alt"] ?>-<?php echo $data["ust"] ?></td>
										</tr>
										<?php
											$i++;
										}
									?>
								</tbody>
							</table>
						</div>
					</div>
				</section>
				<div class="sidebar-desktop">
					<!-- <button class="exit-sidebar-button">
						<i class="fa-solid fa-x"></i>
					</button> -->
					<div class="button-content-wrapper sidebar-top">
						<span class="sidebar-name">Menü</span>
						<button class="sidebar-exit-button">
							<i class="fa-solid fa-x"></i>
						</button>
					</div>
					<button class="button-content-wrapper new-demand-button">
						<div class="sidebar-desktop--button">
							<div class="icon-box">
								<i class="fa-solid fa-triangle-exclamation"></i>
							</div>
							<span>Yetki talep</span>
						</div>
					</button>
					<button class="button-content-wrapper music-button">
						<div class="sidebar-desktop--button music-button">
							<div class="icon-box">
								<i class="fa-solid fa-headphones"></i>
							</div>
							<span>Müzik</span>
						</div>
					</button>
					<button class="button-content-wrapper theBest-button">
						<div class="sidebar-desktop--button the_best-button">
							<div class="icon-box">
								<i class="fa-solid fa-users-between-lines"></i>
							</div>
							<span>En iyiler</span>
						</div>
					</button>
					<button class="button-content-wrapper">
						<div class="sidebar-desktop--button language-button">
							<div class="icon-box">
								<i class="fa-solid fa-globe"></i>
							</div>
							<span>Dil ayarları</span>
						</div>
					</button>
					<button id="communication" class="button-content-wrapper">
						<div class="sidebar-desktop--button contact-button">
							<div class="icon-box">
								<i class="fa-solid fa-envelope"></i>
							</div>
							<span>İletişim</span>
						</div>
					</button>
					<div class="full-space">
						<button>
							<i class="fa-brands fa-facebook"></i>
							<span>Bağlan</span>
						</button>
					</div>
					<button class="button-content-wrapper">
						<!-- <div class="sidebar-desktop--button trash-button">
							<div class="icon-box">
							<i class="fa-solid fa-trash-can"></i>
							</div>
							<span>Hesabımı sil</span>
						</div> -->
					</button>
				</div>
				<div class="body-section__left">
					<div class="tables-container">
						<div class="tables-nav">
							<!-- <div class="tables-nav__top">
								<div class="player-number">
								<span class="player-number__name">Oyuncu Sayısı:</span>
								<span class="player-number__number">2.980</span>
								</div>
							</div> -->
							<div class="tables-nav__bottom">
								<div class="tables-nav__bottom--tools">
									<div class="table-nav-buttons">
										<button class="halls-button" style="display:none">
											<i class="fa-solid fa-list-ul"></i>
											<span> Salonlar</span>
										</button>
										<button class="arrow-button" style="display:none">
											<i class="fa-solid fa-arrow-right"></i>
										</button>
										<button class="open-table-button">
											<i class="fa-solid fa-plus"></i>
										</button>
									</div>
								</div>
								<div class="tables-nav__bottom--right">
									<div class="tables-nav__bottom--right--space">
										<div class="marquee">
											<span><?= $odabilgisi["salonmesaji"]; ?></span>
										</div>
										<div class="marquee marquee2">
											<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reiciendis, voluptate hic reprehenderit sapiente ea quam dolor!&nbsp;&nbsp;&nbsp;</span>
										</div>
									</div>
									<button class="tables-nav__bottom--right--button">
										<span>Yaz Gönder</span>
										<i class="fa-solid fa-paper-plane"></i>
									</button>
								</div>
							</div>
						</div>
						<div class="tables aktifmasalar">
						</div>
					</div>
					<div class="chatting">
						<div class="tab-box">
							<div class="tab">
								<button data-nereden="lobi" class="tablinks lobi-chat-button active">Lobi Chat</button>
								<button data-nereden="masa" class="tablinks masa-chat-button">Masa Chat</button>
								<button class="change-size minimise">
									<i class="up-icon fa-solid fa-angle-up"></i>
									<i class="down-icon fa-solid fa-angle-down"></i>
								</button>
							</div>
							<div id="masa-chat" class="masa-chat  tabcontent">
							</div>
							<div id="lobi-chat" class="lobi-chat tabcontent active">
							</div>
						</div>
						<emoji-picker style="display:flex; position:absolute; bottom: 20%;"></emoji-picker>
						<div class="message-box">
							<div class="emojis-box">
								<button class="emoji-button">
									<img src="assets/icons/Star_Struck-removebg-preview (1).png" alt="star-struck emoji">
								</button>
								<button class="emoji-button"><i class="fa-solid fa-paperclip"></i></button>
								<button class="emoji-button"><i class="fa-solid fa-microphone"></i></button>
							</div>
							<input type="text" placeholder="Mesaj yaz" id="mesajtext">
							<div class="send">
								<button id="send" class="send-button">Gönder</button>
							</div>
						</div>
					</div>
				</div>
				<div class="body-section__right">
					<div class="people-tools">
						<div class="people-tools__radio">
							<div class="people-tools__radio--buttons">
								<div class="play">
									<button class="play-button">
										<i class="fa-solid fa-play"></i>
									</button>
								</div>
								<div class="prev-next">
									<button class="prev-button">
										<i class="fa-solid fa-backward"></i>
									</button>
									<button class="next-button">
										<i class="fa-solid fa-forward"></i>
									</button>
								</div>
							</div>
							<div class="people-tools__radio--channel-name">
								Alem FM
							</div>
						</div>
						<div class="people-tools__category">
							<button class="your-friends active">Arkadaşların</button>
							<button class="last-played">Son oynadıkların</button>
						</div>
						<!-- <div class="people-tools__header">
							<span class="player">Oyuncu</span>
							<span class="table">Masa</span>
						</div> -->
					</div>
					<div class="people aktifkullanicilar">
					</div>
					<div class="specialMessageBox">
						<div class="header">
							<div class="messageSection backToMessageList"><i class="changeIcon fa-solid fa-user"></i></div>
							<div class="messageSection"><i class="fa-regular fa-comments"><span class="messageNotification" style="display:none">0</span></i></div>
							<div class="messageSection messageSectionMinimize"><i class="changeIconMinimize fa-solid fa-plus"></i></div>
						</div>
						<div class="messages-list minimize">
							<?php
								// $datalar = $baglanti->query("SELECT durum,gonderici_id,alici_id from ozelmesajlar where gonderici_id='" . $userbilgisi["id"] . "' and mesaj_tipi='ozel' or alici_id='" . $userbilgisi["id"] . "' and mesaj_tipi='ozel' group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)");
								$datalar = $baglanti->query("SELECT durum,gonderici_id,alici_id from ozelmesajlar where gonderici_id='" . $userbilgisi["id"] . "' and mesaj_tipi='ozel' or alici_id='" . $userbilgisi["id"] . "' and mesaj_tipi='ozel'"); //  group by least(gonderici_id, alici_id), greatest(gonderici_id, alici_id)
								while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
									if ($data["alici_id"] != 0 && $data["alici_id"] != $userbilgisi["id"]) {
										$alici = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and id='" . $data["alici_id"] . "'")->fetch(PDO::FETCH_ASSOC);
										} elseif ($data["gonderici_id"] != 0 && $data["gonderici_id"] != $userbilgisi["id"]) {
										$alici = $baglanti->query("SELECT * FROM oyuncular where deleted=0 and id='" . $data["gonderici_id"] . "'")->fetch(PDO::FETCH_ASSOC);
									}
									if ($alici) {
										$aliciresmi = "img/noneuserphoto.jpeg";
										if ($alici["resim"] != "" && $alici["resim"] != null) {
											$aliciresmi = $alici["resim"];
										}
										$aliciadi = $alici["username"];
										if ($alici["tip"] == 2) {
											$aliciadi = $alici["adsoyad"];
										}
										$sonmesaj = $baglanti->query("SELECT mesaj FROM ozelmesajlar where gonderici_id='" . $data["gonderici_id"] . "' and alici_id='" . $data["alici_id"] . "' or alici_id='" . $data["gonderici_id"] . "' and gonderici_id='" . $data["alici_id"] . "' order by tarih desc limit 1")->fetch(PDO::FETCH_ASSOC);
									?>
									<div class="special-userMessage" id="userMessagelist-<?php echo $alici["id"]; ?>" data-aliciid="<?php echo $alici["id"]; ?>">
										<div class="userphoto">
											<img src="<?php echo $aliciresmi; ?>" alt="">
										</div>
										<div class="nameSection">
											<p><?php echo $aliciadi; ?></p>
											<span class="<?php if ($data["durum"] == "Okunmadı" && $data["alici_id"] == $_SESSION["userid"]) {
												echo "KalinYazi";
											} ?>"><?php echo $sonmesaj["mesaj"]; ?></span>
										</div>
										<div class="delete"><i class="fa-solid fa-trash-can"></i></div>
									</div>
									<?php }
								} ?>
						</div>
						<div class="speacial-userMessage-inside dontshow">
							<div class="message-box specialMessage minimize">
								<div class="header">
									<div class="header-top">
										<div class="left-side">
											<img class="ozelmesajaliciresmi" src="img/noneuserphoto.jpeg" alt="">
											<p class="ozel-mesaj-isim">Erdem Bulut</p>
										</div>
										<div class="right-side">
											<i class="fa-solid fa-phone"></i>
											<i class="fa-solid fa-camera"></i>
											<i class="fa-solid fa-ban"></i>
										</div>
									</div>
									<div class="header-bottom">
										<img src="img/Vector615.png" alt="">
									</div>
								</div>
								<div class="body minimize messageBoxBody">
								</div>
							</div>
							<div class="sendMessageBox">
								<div class="icons">
									<img src="assets/icons/Star-Struck.svg" alt="">
									<i class="fa-solid fa-paperclip"></i>
									<i class="fa-solid fa-microphone"></i>
								</div>
								<div class="messageInput "><input class="ozel-mesaj-input" type="text" placeholder="Mesajını Yaz.." /></div>
								<div class="sendButton send-ozel-message"><button>Gönder</button></div>
							</div>
						</div>
					</div>
				</div>
				<div class="user-popup disable">
					<div class="popup-profile-photo">
						<div class="popup-img">
							<img src="img/noneuserphoto.jpeg" alt="">
						</div>
						<div class="popup-name">Baran</div>
						<div class="popup-tag">User</div>
						<div class="exit-user-popup"><i class="fa-solid fa-x"></i></div>
					</div>
					<div class="popup-profile-info">
						<ul>
							<li><a href="#"><i class="fa-solid fa-user"></i>
								<p>Profili Görüntüle</p>
							</a></li>
							<li><a href="#"><i class="fa-solid fa-user-plus"></i>
								<p>Arkadaşı Ekle</p>
							</a></li>
							<li class="specialMessageToPerson"><a href="#"><i class="fa-solid fa-comments"></i>
								<p>Özel Mesaj</p>
							</a></li>
							<li><a href="#"><i class="fa-solid fa-ban"></i>
								<p>Engelle</p>
							</a></li>
							<li><a href="#"><i class="fa-solid fa-star"></i></i>
								<p>Puan Gönder</p>
							</a></li>
							<li><a href="#"><i class="fa-solid fa-gift"></i></i>
								<p>Hediye Gönder</p>
							</a></li>
				</ul>
			</div>
		</div>
	</section>
</main>
<div class="modal"  id="masamodal" tabindex="-1">
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content">
			
			<div class="modal-body p-0">
				<div class="game">
					<div class="tahta">
<div id="start">
			<button type="button" class="start green" onclick="socket.emit('baslat')">Başlat</button>
			<button type="button" class="start green" data-bs-dismiss="modal">Çık</button>
		</div>
						<div class="header">
							<div class="top-left">
								<div class="hamburger" id="hamburger-icon" onclick="toggleMenu()">
									<div class="cizgi"></div>
									<div class="cizgi"></div>
									<div class="cizgi"></div>
								</div>
								<div class="nav-menu" id="nav-menu">
									<div id="kaydir">
										<a href="#" class="button green">Tab1</a>
										<a href="#" class="button green">Tab2</a>
										<a href="#" class="button green" onclick="popupGoster()"
										>Lobiye Dön</a
										>
									</div>
								</div>
								<div class="yorum">
									<img src="./img/yorum.png" />
								</div>
								<div class="para-hedef">
									<img src="./img/para.png" />
									<img style="width: 30%" src="./img/hedef.png" />
								</div>
								<div class="btn-group btn-group-lg d-none" role="group" aria-label="Basic example">
									bu kalsın bu burada hangi kullanıcı kaç ihale bilgisi vermiş o yazıyor.
									<button type="button" class="btn btn-primary ihalesayilari ihale-1">1</button>
									<button type="button" class="btn btn-primary ihalesayilari ihale-2">2</button>
									<button type="button" class="btn btn-primary ihalesayilari ihale-3">3</button>
									<button type="button" class="btn btn-primary ihalesayilari ihale-4">4</button>
								</div>
							</div>
							<div class="top-right">
								<div class="gold">
									<img src="./img/altin.png" />
								</div>
								<div class="tour">
									<img src="./img/sagust.png" />
									<div class="defter">
										<img style="width: 100%" src="./img/sagustdefter.png" />
									</div>
								</div>
							</div>
						</div>
						<div class="player-one sandalye1">
							<img src="./img/topkisi.png" />
							<div class="blackpoint">1453</div>
							<div class="comp2-result-container">0</div>
						</div>
						<div class="topkart computer2-hand">
							<img class="computer2-card" id="bir" src="./img/topkart.png" />
							<img class="computer2-card" id="iki" src="./img/topkart.png" />
							<img class="computer2-card" id="uc" src="./img/topkart.png" />
							<img class="computer2-card" id="dort" src="./img/topkart.png" />
							<img class="computer2-card" id="bes" src="./img/topkart.png" />
						</div>
						<div class="player-two sandalye2">
							<img src="./img/solkisi.png" />
							<div class="blackpoint">1453</div>
							<div class="comp3-result-container">0</div>
						</div>
						<div class="leftkart computer3-hand">
							<img class="computer3-card" id="bir" src="./img/kenarkart.png" />
							<img class="computer3-card" id="iki" src="./img/kenarkart.png" />
							<img class="computer3-card" id="uc" src="./img/kenarkart.png" />
							<img class="computer3-card" id="dort" src="./img/kenarkart.png" />
							<img class="computer3-card" id="bes" src="./img/kenarkart.png" />
						</div>
						<div class="player-three sandalye3">
							<img src="./img/sagkisi.png" />
							<div class="blackpoint">1453</div>
							<div class="comp1-result-container">0</div>
						</div>
						<div class="rightkart computer1-hand">
							<img class="computer1-card" id="bir" src="./img/kenarkart.png" />
							<img class="computer1-card" id="iki" src="./img/kenarkart.png" />
							<img class="computer1-card" id="uc" src="./img/kenarkart.png" />
							<img class="computer1-card" id="dort" src="./img/kenarkart.png" />
							<img class="computer1-card" id="bes" src="./img/kenarkart.png" />
						</div>
						<div class="player-four sandalye4">
							<img src="<?php echo $profilephoto;?>" />
							<div class="blackpoint"><?php echo $_SESSION["username"];?></div>
							<div class="player-result-container">0</div>
						</div>
						<div class="mykart player-hand sandalye11">
							<img class="player-card" id="bir" src="./img/altkart.png" />
							<img class="player-card" id="iki" src="./img/altkart.png" />
							<img class="player-card" id="uc" src="./img/altkart.png" />
							<img class="player-card" id="dort" src="./img/altkart.png" />
							<img class="player-card" id="bes" src="./img/altkart.png" />
						</div>
						<div class="koz" id="masakozbilgisi">
							<img src="./img/koz.png" />
						</div>
						<div class="kozlar">
							<img id="karo" src="./img/karo.png" />
							<img id="sinek" src="./img/sinek.png" />
							<img id="maca" src="./img/maca.png" />
							<img id="kupa" src="./img/kupa.png" />
						</div>
						<div class="atilan-kagit">
							<div class="ground-cards">
								<div class="ground-card" style="background: transparent;"></div>
								<div class="ground-card" style="background: transparent;"></div>
								<div class="ground-card" style="background: transparent;"></div>
								<div class="ground-card" style="background: transparent;"></div>
							</div>
						</div>
						<div class="total-result-screen" >
							<div class="total-results">
								<div class="total-results-wrapper">									
									<div class="total-comp1">
										<h3>Computer 1</h3>
										<p>3</p>
									</div>
									<div class="total-comp2">
										<h3>Computer 2</h3>
										<p>4</p>
									</div>
									<div class="total-comp3">
										<h3>Computer 3</h3>
										<p>4</p>
									</div>
									<div class="total-player">
										<h3>Player</h3>
										<p>2</p>
									</div>
								</div>
								<button id="again-btn">Kapat</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right-bottom-info">bilgiler buraya gelecek</div>
	</div>
</div>	
<div class="modal fade" id="kozsecmodal" tabindex="-1" aria-labelledby="kozsecmodal" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="kozsecmodal">Koz Seç</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
			</div>
			<div class="modal-body">
				<div class="row" style="height:400px">
					<div class="col-6 h-50 text-center p-3">
						<img class="h-100 kozsec" data-koz="S" data-kodadi="Maça" src="img/Cards/SZA.svg">
					</div>
					<div class="col-6 h-50 text-center p-3">
						<img class="h-100 kozsec" data-koz="H" data-kodadi="Kupa" src="img/Cards/HZA.svg">
					</div>
					<div class="col-6 h-50 text-center p-3">
						<img class="h-100 kozsec" data-koz="BD" data-kodadi="Karo" src="img/Cards/BDZA.svg">
					</div>
					<div class="col-6 h-50 text-center p-3">
						<img class="h-100 kozsec" data-koz="C" data-kodadi="Sinek" src="img/Cards/CZA.svg">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<audio id="msms" src="assets/sound/sms.mp3"></audio>
<script src="assets/js/batak/jquery.ui.touch-punch.min.js"></script>
<script>
	const socket_url = '<?php echo $socket_url; ?>';
</script>
<script src="assets/js/batak/script.js"></script>
<script>
	var kart = window.location.hash.substring(1);
	if (kart) {
		document.getElementById(kart).style.display = "block";
	}
</script>

<script src="assets/js/batak/game.js?v<?php echo rand(); ?>"></script>
<script src="assets/js/batak/fonksiyon.js?v<?php echo rand(); ?>"></script>
<script src="assets/js/batak/sapp.js?v<?php echo rand(); ?>"></script>
<script>
	document.querySelector('.change-size.minimise').addEventListener('click', function() {
		document.querySelector('.chatting').classList.toggle('minimised');
		let upIcon = document.querySelector('.up-icon');
		let downIcon = document.querySelector('.down-icon');
		let chatBox = document.querySelector('.chatting');
		let tabContent = document.querySelector('.tab-box .tabcontent.active');
		chatBox.classList.toggle('expanded');
		if (upIcon.style.display === 'none') {
			upIcon.style.display = 'inline-block';
			downIcon.style.display = 'none';
			} else {
			upIcon.style.display = 'none';
			downIcon.style.display = 'inline-block';
		}
		if (chatBox.classList.contains('expanded')) {
			tabContent.style.height = '100%';
			} else {
			tabContent.style.height = '9rem';
		}
	});
</script>
<script>
	const picker = document.querySelector('emoji-picker')
	const button = document.querySelector('.emoji-button')
	const mesaj = document.querySelector('#mesajtext')
	picker.style.visibility = 'hidden'
	button.addEventListener('click', () => {
		picker.style.visibility = picker.style.visibility === 'visible' ? 'hidden' : 'visible'
	})
	picker.addEventListener('emoji-click', event => {
		mesaj.value += event.detail.unicode
		picker.style.visibility = 'hidden'
	})
</script>
<script>
	document.getElementById('send').addEventListener('click', function() {
		var mesaj = document.getElementById('mesajtext').value;
		var nereden = document.querySelector('.tablinks.active').dataset.nereden;
		var data = { kanal: nereden, mesaj: mesaj };
		socket.emit('mesaj', data);
		// Mesaj gönderildikten sonra input alanını temizle
		document.getElementById('mesajtext').value = '';
		console.log("alındı");
		console.log(socket.connected);
	});
</script>

<script>
	$(document).ready(function(){
		// Başlangıçta tüm öğeleri gizle
		$('.items').hide();
		
		// Sayfa ilk yüklendiğinde sadece çip ile ilgili öğeleri göster
		$('[id^="cipal"]').show();
		
		// Çip al butonuna tıklandığında sadece çip ile ilgili öğeleri göster
		$('.left-side button:eq(0)').click(function(){
			$('.items').hide();
			$('[id^="cipal"]').show();
			$('.left-side button').removeClass('active');
			$(this).addClass('active');
		});
		
		// Elmas al butonuna tıklandığında sadece elmas ile ilgili öğeleri göster
		$('.left-side button:eq(1)').click(function(){
			$('.items').hide();
			$('[id^="elmas"]').show();
			$('.left-side button').removeClass('active');
			$(this).addClass('active');
		});
		
		// Gold VIP al butonuna tıklandığında sadece Gold VIP ile ilgili öğeleri göster
		$('.left-side button:eq(2)').click(function(){
			$('.items').hide();
			$('[id^="goldvip"]').show();
			$('.left-side button').removeClass('active');
			$(this).addClass('active');
		});
		
		// VIP al butonuna tıklandığında sadece VIP ile ilgili öğeleri göster
		$('.left-side button:eq(3)').click(function(){
			$('.items').hide();
			$('[id^="normalvip"]').show();
			$('.left-side button').removeClass('active');
			$(this).addClass('active');
		});
	});
</script>
<script>
	var maximizeButton = document.querySelector(".maximize-button");

maximizeButton.addEventListener("click", function() {
  var elem = document.documentElement; // Tam ekran yapmak istediğiniz öğe (genellikle <html> veya <body>)

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari ve Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // Internet Explorer
    elem.msRequestFullscreen();
  }
});

</script>

</body>   
</html>																		