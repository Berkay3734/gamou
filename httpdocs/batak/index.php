<?php
	ob_start();
	session_start();	
	include("php/fonksiyonlar.php");
	include("./php/baglanti.php"); 
	$ilksalon = $baglanti->query("SELECT * from salonlar order by enaz limit 1")->fetch(PDO::FETCH_ASSOC);	
	if (isset($_COOKIE['authToken'])&&loginkontrol($_COOKIE['authToken'])==true){  
		header("Location: oyun.php?salon=".$ilksalon["url"]);	
	}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<link rel="stylesheet" href="assets/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/pages/index/style.css?v<?php echo rand();?>">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
		<script>
			var aktifoda="<?php echo $ilksalon["url"];?>";
			var aktifodaadi="<?php echo $ilksalon["ad"];?>";
		</script>
		<script src="assets/js/bootstrap.min.js"></script>
		<script defer src="assets/pages/index/form.js?v<?php echo rand();?>"></script>
		<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
		<script src="../js/btnscript.js"></script>
		<title>Form</title>
	</head>
	<body>
		<section class="container">
			<div class="forget-password-form de-active">
				<form action="GET">
					<button id="back-to-signin">
						<i class="fa-solid fa-backward-step"></i>
					</button>
					<div class="buttons-left">
						<button>Masaüstüne indir</button>
						<button>Galeri</button>
					</div>
					<div class="logo-1-mobile">
						<img src="assets/images/logo_1.png" alt="Okey">
					</div>
					<div class="buttons-right">
						<button>Blog</button>
						<button>İletişim</button>
					</div>
					<div class="form-tools">
						<h2>Parolayı mı unuttun?</h2>
						<div class="email-box">
							<label for="email">
								<div class="icon-box user-icon-box">
									<i class="fa-regular fa-envelope"></i>
								</div>
								<input type="email" placeholder="Email" id="sifremiunuttumemail">
							</label>
						</div>
						<button class="send-code"onclick="sifremiunuttum()">Kod gönder</button>
						<div class="mobile-links-mobile">
							<a >
								<svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M41.6596 55.673C38.4289 58.7337 34.9015 58.2504 31.506 56.8006C27.9127 55.3186 24.6161 55.2541 20.825 56.8006C16.0778 58.7981 13.5724 58.2182 10.7373 55.673C-5.35015 39.4672 -2.97658 14.7881 15.2867 13.886C19.7371 14.1116 22.8359 16.2702 25.4402 16.4635C29.3302 15.6902 33.0554 13.4672 37.2091 13.7572C42.187 14.1438 45.9452 16.0769 48.4176 19.5564C38.1322 25.5812 40.5717 38.8229 50 42.528C48.1209 47.3607 45.6814 52.1612 41.6266 55.7052L41.6596 55.673ZM25.1106 13.6927C24.6161 6.50807 30.5829 0.579927 37.4399 0C38.3959 8.31228 29.7258 14.4982 25.1106 13.6927Z" fill="white"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">App Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
							<a >
								<svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M38.3485 36.6463C44.9223 33.0186 49.9428 30.2477 50.3995 29.9953C51.7618 29.2435 53.189 27.325 50.3995 25.7915C49.5029 25.2976 44.6174 22.6117 38.3408 19.1592L29.7081 27.9298L38.3485 36.6463Z" fill="#FFE300"/>
									<path d="M29.7081 27.9298L2.0968 55.9809C2.72034 56.0607 3.47029 55.8942 4.33292 55.4181C6.1188 54.4326 25.2978 43.8487 38.3485 36.6463L29.7081 27.9298Z" fill="#FF4E54"/>
									<path d="M29.7081 27.9298L38.3408 19.1592C38.3408 19.1592 6.25382 1.50898 4.33291 0.452372C3.59456 0.0461178 2.78956 -0.0956593 2.07701 0.0643277L29.7081 27.9298Z" fill="#00F085"/>
									<path d="M29.7081 27.9298L2.07701 0.0643277C0.935733 0.321001 0 1.31735 0 3.31913V52.6376C0 54.5228 0.736212 55.8486 2.0968 55.9809L29.7081 27.9298Z" fill="#00E0FF"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">Play Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
						</div>
					</div>
					<div class="logo-2-mobile">
						<img src="assets/images/canvas 1.png" alt="Community">
					</div>
				</form>
			</div>
			<div class="signin-form">
				<form >
					<div class="buttons-left">
						<button>Masaüstüne indir</button>
						<button>Galeri</button>
					</div>
					<div class="logo-1-mobile">
						<img src="assets/images/logo_1.png" alt="Okey">
					</div>
					<div class="buttons-right">
						<button>Blog</button>
						<button>İletişim</button>
					</div>
					<div class="form-tools">
						<h2>Giriş yap!</h2>
						<div class="signin-inputs">
							<label for="name">
								<div class="icon-box user-icon-box">
									<i class="fa-solid fa-user"></i>
								</div>
								<input type="text" placeholder="Kullanıcı adı / Email" id="kuladi">
							</label>
							<label for="password">
								<div class="icon-box password-icon-box">
									<i class="fa-solid fa-lock"></i>
								</div>
								<input type="password" placeholder="Parola" id="sifre">
							</label>
						</div>
						<span class="forget-password">
							<a >Parolayı mı unuttun?</a>
						</span>
						<button type="button" onclick="girisyap()" id="submit">
							Giriş yap
						</button>
						<button class="choose-room" data-bs-toggle="modal" data-bs-target="#oda_sec_modal">Oda seç</button>
						<div class="newcomer">
							<?php if(ayargetir("misafir_girisi")=="true"){?>
								<button data-bs-toggle="modal" data-bs-target="#misafirgirisi" type="button" value="Misafir Olarak Katıl">Misafir</button>
							<?php }?>
							
							<?php if(ayargetir("yeni_kayit")=="true"){?>
								<button type="button" class="be-member">Üye Ol</button>
							<?php }?>
						</div>
						<div class="mobile-links-mobile">
							<a >
								<svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M41.6596 55.673C38.4289 58.7337 34.9015 58.2504 31.506 56.8006C27.9127 55.3186 24.6161 55.2541 20.825 56.8006C16.0778 58.7981 13.5724 58.2182 10.7373 55.673C-5.35015 39.4672 -2.97658 14.7881 15.2867 13.886C19.7371 14.1116 22.8359 16.2702 25.4402 16.4635C29.3302 15.6902 33.0554 13.4672 37.2091 13.7572C42.187 14.1438 45.9452 16.0769 48.4176 19.5564C38.1322 25.5812 40.5717 38.8229 50 42.528C48.1209 47.3607 45.6814 52.1612 41.6266 55.7052L41.6596 55.673ZM25.1106 13.6927C24.6161 6.50807 30.5829 0.579927 37.4399 0C38.3959 8.31228 29.7258 14.4982 25.1106 13.6927Z" fill="white"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">App Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
							<a >
								<svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M38.3485 36.6463C44.9223 33.0186 49.9428 30.2477 50.3995 29.9953C51.7618 29.2435 53.189 27.325 50.3995 25.7915C49.5029 25.2976 44.6174 22.6117 38.3408 19.1592L29.7081 27.9298L38.3485 36.6463Z" fill="#FFE300"/>
									<path d="M29.7081 27.9298L2.0968 55.9809C2.72034 56.0607 3.47029 55.8942 4.33292 55.4181C6.1188 54.4326 25.2978 43.8487 38.3485 36.6463L29.7081 27.9298Z" fill="#FF4E54"/>
									<path d="M29.7081 27.9298L38.3408 19.1592C38.3408 19.1592 6.25382 1.50898 4.33291 0.452372C3.59456 0.0461178 2.78956 -0.0956593 2.07701 0.0643277L29.7081 27.9298Z" fill="#00F085"/>
									<path d="M29.7081 27.9298L2.07701 0.0643277C0.935733 0.321001 0 1.31735 0 3.31913V52.6376C0 54.5228 0.736212 55.8486 2.0968 55.9809L29.7081 27.9298Z" fill="#00E0FF"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">Play Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
						</div>
					</div>
					<div class="reklamAlani">
						<div class="reklam-box">Reklam alanıdır. Buraya reklam verebilirsiniz.</div>
					</div>
					<div class="logo-2-mobile">
						<img src="assets/images/canvas 1.png" alt="Community">
					</div>
				</form>
			</div>
			<div class="signup-form de-active">
				<form>
					<div class="buttons-left">
						<button>Masaüstüne indir</button>
						<button>Galeri</button>
					</div>
					<div class="logo-1-mobile">
						<img src="assets/images/logo_1.png" alt="Okey">
					</div>
					<div class="buttons-right">
						<button>Blog</button>
						<button>İletişim</button>
					</div>
					<div class="form-tools">
						<h2>Üye ol!</h2>
						<div class="signup-inputs">
							<label for="name">
								<div class="icon-box user-icon-box">
									<i class="fa-solid fa-user"></i>
								</div>
								<input type="text" placeholder="Kullanıcı adı" id="kayitname">
							</label>
							<label for="email">
								<div class="icon-box email-icon-box">
									<i class="fa-regular fa-envelope"></i>
								</div>
								<input type="email" placeholder="Email" id="kayitemail">
							</label>
							<label for="gender">
								<div class="icon-box gender-icon-box">
									<i class="fa-solid fa-venus-mars"></i>
								</div>
								<select id="gender" name="genders">
									<option value="">Cinsiyet seçimi</option>
									<option value="kadın">Kadın</option>
									<option value="erkek">Erkek</option>
									<option value="belirmek-istenmedi">Belirtmek istemiyorum</option>
								</select>
							</label>
							<label for="password">
								<div class="icon-box password-icon-box">
									<i class="fa-solid fa-lock"></i>
								</div>
								<input type="password" placeholder="Parola" id="kayitpassword">
							</label>
						</div>
						<span class="have-account">
							<a >Mevcut hesabınız var mı?</a>
						</span>
						<div class="newcomer">
						<svg class="svg--template loader">
          <circle
            class="circle1"
            stroke="none"
            stroke-width="4"
            fill="none"
            r="25"
            cx="25"
            cy="25"
          />
        </svg>
        <svg class="svg--template checkmark" viewBox="0 0 50 50">
          <g class="checkmark1">
            <path
              class="line1"
              d="M20.8,36l-4,4c-0.7,0.7-1.7,0.7-2.4,0L0.8,26.4c-0.7-0.7-0.7-1.7,0-2.4l4-4c0.7-0.7,1.7-0.7,2.4,0l13.6,13.6
					  C21.5,34.3,21.5,35.4,20.8,36z"
            />
            <path
              class="line2"
              d="M14.5,39.9l-4-4c-0.7-0.7-0.7-1.7,0-2.4L43.4,0.6c0.7-0.7,1.7-0.7,2.4,0l4,4c0.7,0.7,0.7,1.7,0,2.4L16.9,39.9
					  C16.3,40.6,15.2,40.6,14.5,39.9z"
            />
          </g>
        </svg>

        <svg
          class="svg--template"
          viewBox="0 0 304 305"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <symbol id="shadow--logo-dribbble">
            <path
              id="SVGID_1_"
              d="M152,298.2C73,298.2,8.7,234,8.7,155.1C8.7,76.2,73,12,152,12c79,0,143.3,64.2,143.3,143.1
							  C295.3,234,231,298.2,152,298.2L152,298.2z M272.8,174.7c-4.2-1.3-37.9-11.4-76.2-5.2c16,43.9,22.5,79.7,23.8,87.1
							  C247.8,238.1,267.4,208.7,272.8,174.7L272.8,174.7z M199.8,267.8c-1.8-10.7-8.9-48.1-26.1-92.7c-0.3,0.1-0.5,0.2-0.8,0.3
							  c-69,24-93.8,71.8-96,76.3c20.8,16.2,46.8,25.8,75.1,25.8C168.9,277.5,185.1,274.1,199.8,267.8L199.8,267.8z M61.1,237
							  c2.8-4.7,36.4-60.3,99.5-80.7c1.6-0.5,3.2-1,4.8-1.5c-3.1-6.9-6.4-13.9-9.9-20.7C94.3,152.4,35,151.7,29.7,151.6
							  c0,1.2-0.1,2.5-0.1,3.7C29.6,186.7,41.5,215.4,61.1,237L61.1,237z M32.2,130.3c5.5,0.1,55.9,0.3,113.1-14.9
							  c-20.3-36-42.1-66.3-45.4-70.7C65.7,60.8,40.1,92.3,32.2,130.3L32.2,130.3z M123.3,36.5c3.4,4.5,25.6,34.8,45.7,71.5
							  c43.5-16.3,61.9-41,64.1-44.1c-21.6-19.1-50-30.8-81.1-30.8C142.1,33.1,132.5,34.3,123.3,36.5L123.3,36.5z M246.7,78
							  c-2.6,3.5-23.1,29.7-68.3,48.2c2.8,5.8,5.6,11.7,8.1,17.7c0.9,2.1,1.8,4.2,2.6,6.3c40.7-5.1,81.2,3.1,85.2,3.9
							  C274.1,125.3,263.8,98.8,246.7,78L246.7,78z"
            />
          </symbol>
        </svg>
        <main>
          <button class="btnSubmit" onclick="kayitol()">Üye Ol</button>
        </main>							
							
						</div>
						<div class="mobile-links-mobile">
							<a >
								<svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M41.6596 55.673C38.4289 58.7337 34.9015 58.2504 31.506 56.8006C27.9127 55.3186 24.6161 55.2541 20.825 56.8006C16.0778 58.7981 13.5724 58.2182 10.7373 55.673C-5.35015 39.4672 -2.97658 14.7881 15.2867 13.886C19.7371 14.1116 22.8359 16.2702 25.4402 16.4635C29.3302 15.6902 33.0554 13.4672 37.2091 13.7572C42.187 14.1438 45.9452 16.0769 48.4176 19.5564C38.1322 25.5812 40.5717 38.8229 50 42.528C48.1209 47.3607 45.6814 52.1612 41.6266 55.7052L41.6596 55.673ZM25.1106 13.6927C24.6161 6.50807 30.5829 0.579927 37.4399 0C38.3959 8.31228 29.7258 14.4982 25.1106 13.6927Z" fill="white"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">App Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
							<a >
								<svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M38.3485 36.6463C44.9223 33.0186 49.9428 30.2477 50.3995 29.9953C51.7618 29.2435 53.189 27.325 50.3995 25.7915C49.5029 25.2976 44.6174 22.6117 38.3408 19.1592L29.7081 27.9298L38.3485 36.6463Z" fill="#FFE300"/>
									<path d="M29.7081 27.9298L2.0968 55.9809C2.72034 56.0607 3.47029 55.8942 4.33292 55.4181C6.1188 54.4326 25.2978 43.8487 38.3485 36.6463L29.7081 27.9298Z" fill="#FF4E54"/>
									<path d="M29.7081 27.9298L38.3408 19.1592C38.3408 19.1592 6.25382 1.50898 4.33291 0.452372C3.59456 0.0461178 2.78956 -0.0956593 2.07701 0.0643277L29.7081 27.9298Z" fill="#00F085"/>
									<path d="M29.7081 27.9298L2.07701 0.0643277C0.935733 0.321001 0 1.31735 0 3.31913V52.6376C0 54.5228 0.736212 55.8486 2.0968 55.9809L29.7081 27.9298Z" fill="#00E0FF"/>
								</svg>
								<div class="mobile-link-text">
									<span class="mobile-link-text__top">Play Store</span>
									<span class="mobile-link-text__bottom">üzerinden indir</span>
								</div>
							</a>
						</div>
					</div>
					<div class="logo-2-mobile">
						<img src="assets/images/canvas 1.png" alt="Community">
					</div>
				</form>
			</div>
			<div class="logo-area">
				<div class="buttons-left">
					<button>Masaüstüne indir</button>
					<button>Galeri</button>
				</div>
				<div class="logo-1-desktop">
					<img src="assets/images/logo_1.png" alt="Okey">
				</div>
				<div class="buttons-right">
					<button>Blog</button>
					<button>İletişim</button>
				</div>
				<div class="description">
					<p>
						Kolayca okey ve çanak oyununu bilgisayar ve tüm cihazlarda oyna! Özel hesap açmadan, hızlıca Okey Oyna! Sohbet et, hediyeler kazan  ve arkadaşlarınla oyun oynamanın keyfini yaşa!
					</p>
				</div>
				<div class="mobile-links-desktop">
					<a >
						<svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M41.6596 55.673C38.4289 58.7337 34.9015 58.2504 31.506 56.8006C27.9127 55.3186 24.6161 55.2541 20.825 56.8006C16.0778 58.7981 13.5724 58.2182 10.7373 55.673C-5.35015 39.4672 -2.97658 14.7881 15.2867 13.886C19.7371 14.1116 22.8359 16.2702 25.4402 16.4635C29.3302 15.6902 33.0554 13.4672 37.2091 13.7572C42.187 14.1438 45.9452 16.0769 48.4176 19.5564C38.1322 25.5812 40.5717 38.8229 50 42.528C48.1209 47.3607 45.6814 52.1612 41.6266 55.7052L41.6596 55.673ZM25.1106 13.6927C24.6161 6.50807 30.5829 0.579927 37.4399 0C38.3959 8.31228 29.7258 14.4982 25.1106 13.6927Z" fill="white"/>
						</svg>
						<div class="mobile-link-text">
							<span class="mobile-link-text__top">App Store</span>
							<span class="mobile-link-text__bottom">üzerinden indir</span>
						</div>
					</a>
					<a >
						<svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M38.3485 36.6463C44.9223 33.0186 49.9428 30.2477 50.3995 29.9953C51.7618 29.2435 53.189 27.325 50.3995 25.7915C49.5029 25.2976 44.6174 22.6117 38.3408 19.1592L29.7081 27.9298L38.3485 36.6463Z" fill="#FFE300"/>
							<path d="M29.7081 27.9298L2.0968 55.9809C2.72034 56.0607 3.47029 55.8942 4.33292 55.4181C6.1188 54.4326 25.2978 43.8487 38.3485 36.6463L29.7081 27.9298Z" fill="#FF4E54"/>
							<path d="M29.7081 27.9298L38.3408 19.1592C38.3408 19.1592 6.25382 1.50898 4.33291 0.452372C3.59456 0.0461178 2.78956 -0.0956593 2.07701 0.0643277L29.7081 27.9298Z" fill="#00F085"/>
							<path d="M29.7081 27.9298L2.07701 0.0643277C0.935733 0.321001 0 1.31735 0 3.31913V52.6376C0 54.5228 0.736212 55.8486 2.0968 55.9809L29.7081 27.9298Z" fill="#00E0FF"/>
						</svg>
						<div class="mobile-link-text">
							<span class="mobile-link-text__top">Play Store</span>
							<span class="mobile-link-text__bottom">üzerinden indir</span>
						</div>
					</a>
				</div>
				<div class="logo-2-desktop">
					<img src="assets/images/canvas 1.png" alt="Community">
				</div>
			</div>
		</section>
		<div class="modal" tabindex="-1" id="oda_sec_modal">
			<div class="modal-dialog modal-xl modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body p-0">
						<section class="hall-section p-2">
							<div class="hall-container">
								<header>
									<h2>Salon listesi</h2>
									<button data-bs-dismiss="modal" aria-label="Close">X</button>
								</header>
								<div class="hall-table-box">
									<table>
										<thead>
											<tr>
												<th>Salon adı</th>
												<th>Oyuncu sayısı</th>
												<th>
													<img src="../assets/icons/money_sign.svg" alt="Money sign">
													Katılım
												</th>
												<th>
													<img src="../assets/icons/money_sign.svg" alt="Money sign">
													Bahis
												</th>
											</tr>
										</thead>
										<tbody>
											<?php 
												$i=0;
												$datalar = $baglanti->query("SELECT * from salonlar where deleted=0 order by enaz");
												while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
												?>
												<tr class="<?php if($i==0){echo "active";}?> odasec" data-odaid="<?php echo $data["id"]?>" data-oda="<?php echo $data["url"]?>" data-ad="<?php echo $data["ad"]?>">
													<td>
														<img src="../assets/icons/emoji_1.svg" alt="Emoji-1">
														<?php echo $data["ad"]?>
													</td>
													<td><?php echo $data["online"]?></td>
													<td><?php echo $data["enaz"]?></td>
													<td><?php echo $data["alt"]?>-<?php echo $data["ust"]?></td>
												</tr>
												<?php 
												$i++;}
											?>
										</tbody>
									</table>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
		<div class="modal" id="misafirgirisi" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" wfd-invisible="true" aria-modal="true" role="dialog">
			<div class="modal-dialog modal-sm modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
						<div class="text-center">
							<h3>Misafir Girişi</h3>
						</div>
						<div class="row">
							<div class="col-auto">
								<label for="exampleInputUsername2" class="col-12 col-form-label fw-bold">Cinsiyetiniz :</label>
							</div>
							<div class="col-auto p-2">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="misafircinsiyet" id="inlineRadio1" value="Bay" checked>
									<label class="form-check-label" for="inlineRadio1">Bay</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="misafircinsiyet" id="inlineRadio2" value="Bayan">
									<label class="form-check-label" for="inlineRadio2">Bayan</label>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-9 p-2">
								<input id="captchatextBox" class="form-control" placeholder="Yandaki Kodu Giriniz.." type="text" name="text">
							</div>
							<div class="col-sm-3 p-2">
								<h3><span class="badge bg-primary" id="captcha"></span></h3>
							</div>
						</div>
					</div>
					<div class="modal-footer justify-content-center">
					<button type="button" onclick="misafirgirisi()" class="btn btn-primary">Tamam</button>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Vazgeç</button>
					</div>
					</div>
					</div>
					</div>
					</body>
					</html>																																					