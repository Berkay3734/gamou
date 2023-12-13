<?php
	include("baglan.php");
	ob_start();
	session_start();
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
	}
	$ayarlar = $baglanti->query('SELECT * FROM ayarlar')->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Site Ayarları</title>
		<?php				
			include 'head.php';
		?>
	</head>
	<body>
		<div class="main-wrapper">
			<!-- partial:../../partials/_sidebar.html -->
			<?php				
				include 'sidebar.php';
			?>
			<!-- partial -->
			<div class="page-wrapper">
				<!-- partial:../../partials/_navbar.html -->
				<nav class="navbar">
					<a href="#" class="sidebar-toggler">
						<i data-feather="menu"></i>
					</a>
					<div class="navbar-content">						
						<ul class="navbar-nav">
						</ul>
					</div>
				</nav>
				<!-- partial -->
				<div class="page-content p-3">
					<div class="row">
						<div class="col-12 grid-margin stretch-card">
							<div class="card">
								<div class="card-body">									
									<ul class="nav nav-tabs" id="myTab" role="tablist">
										<li class="nav-item">
											<a class="nav-link active" id="genelayarlar-tab" data-bs-toggle="tab" href="#genelayarlar" role="tab" aria-controls="home" aria-selected="true">Genel Ayarlar</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="yenikayitayarlari-tab" data-bs-toggle="tab" href="#yenikayitayarlari" role="tab" aria-controls="contact" aria-selected="false">Yeni Kayıt Ayarları</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="mailayarlari-tab" data-bs-toggle="tab" href="#mailayarlari" role="tab" aria-controls="profile" aria-selected="false">Mail Ayarları</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="smsayarlari-tab" data-bs-toggle="tab" href="#smsayarlari" role="tab" aria-controls="contact" aria-selected="false">Sms Ayarları</a>
										</li>
									</ul>
									<div class="tab-content border border-top-0 p-3" id="myTabContent">
										<div class="tab-pane fade show active" id="genelayarlar" role="tabpanel" aria-labelledby="genelayarlar-tab">
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Üye Resmi</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="uyeresmi" id="uyeresmiaktif" <?php if($ayarlar["uyeresmi"]==1){echo "checked";}?>>
															<label class="form-check-label" for="uyeresmiaktif">
																Göster
															</label>
														</div>
														<div class="form-check form-check-inline">
															<input type="radio" value="0" class="form-check-input" name="uyeresmi" id="uyeresmipasif" <?php if($ayarlar["uyeresmi"]==0){echo "checked";}?>>
															<label class="form-check-label" for="uyeresmipasif">
																Gizle
															</label>
														</div>
													</div>
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Üye Adı</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="uyeadi" id="uyeadiaktif" <?php if($ayarlar["uyeadi"]==1){echo "checked";}?>>
															<label class="form-check-label" for="uyeadiaktif">
																Göster
															</label> 
														</div>
														<div class="form-check form-check-inline"> 
															<input type="radio" value="0" class="form-check-input" name="uyeadi" id="uyeadipasif" <?php if($ayarlar["uyeadi"]==0){echo "checked";}?>>
															<label class="form-check-label" for="uyeadipasif">
																Gizle
															</label>
														</div>
													</div>
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Sohbet</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="sohbet" id="sohbetaktif" <?php if($ayarlar["sohbet"]==1){echo "checked";}?>>
															<label class="form-check-label" for="sohbetaktif">
																Açık
															</label>
														</div>
														<div class="form-check form-check-inline">
															<input type="radio" value="0" class="form-check-input" name="sohbet" id="sohbetpasif" <?php if($ayarlar["sohbet"]==0){echo "checked";}?>>
															<label class="form-check-label" for="sohbetpasif">
																Kapalı
															</label>
														</div>
													</div>
												</div>
											</div>	
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Misafir Girişi</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="misafirgirisi" id="misafirgirisiaktif" <?php if($ayarlar["misafir_girisi"]==1){echo "checked";}?>>
															<label class="form-check-label" for="misafirgirisiaktif">
																Açık
															</label>
														</div>
														<div class="form-check form-check-inline">
															<input type="radio" value="0" class="form-check-input" name="misafirgirisi" id="misafirgirisipasif" <?php if($ayarlar["misafir_girisi"]==0){echo "checked";}?>>
															<label class="form-check-label" for="misafirgirisipasif">
																Kapalı
															</label>
														</div>
													</div>
												</div>
											</div>	
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Varsayılan Üye Rengi</label>
												<div class="col-sm-6">
													<div>
														<input type="color" class="form-control form-control-color" id="yeniyetkirengi" value="<?php echo $ayarlar["uye_renk"];?>" title="Choose your color">
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="yenikayitayarlari" role="tabpanel" aria-labelledby="yenikayitayarlari-tab">
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Üye Kayıtta Cep Telefonu</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="yenikayitcepistegi" id="yenikayitcepistegiaktif" <?php if($ayarlar["cepkayit"]==1){echo "checked";}?>>
															<label class="form-check-label" for="yenikayitcepistegiaktif">
																İste
															</label>
														</div>
														<div class="form-check form-check-inline">
															<input type="radio" value="0" class="form-check-input" name="yenikayitcepistegi" id="yenikayitcepistegipasif" <?php if($ayarlar["cepkayit"]==0){echo "checked";}?>>
															<label class="form-check-label" for="yenikayitcepistegipasif">
																İsteme
															</label>
														</div>
													</div>
												</div>
											</div>
											<div class="row mb-0"> 
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Yeni Kayıtta eklenecek çip miktarı</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="yenikayitcip" value="<?php echo $ayarlar["yenikayitcip"];?>" placeholder="">
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="mailayarlari" role="tabpanel" aria-labelledby="mailayarlari-tab">
											<div class="row mb-3"> 
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Mail host adresi</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="mail_host" value="<?php echo $ayarlar["mail_host"];?>" placeholder="Mail host adresi">
												</div>
											</div>
											<div class="row mb-3"> 
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Şifre hatırlatma gönderici maili</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="gonderici_maili" value="<?php echo $ayarlar["gonderici_maili"];?>" placeholder="Şifre hatırlatma gönderici maili">
												</div>
											</div>
											<div class="row mb-3"> 
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Şifre hatırlatma gönderici şifresi</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="gonderici_sifresi" value="<?php echo $ayarlar["gonderici_sifresi"];?>" placeholder="Şifre hatırlatma gönderici şifresi">
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="smsayarlari" role="tabpanel" aria-labelledby="smsayarlari-tab">
											<div class="row mb-3">
												<div class="alert alert-warning alert-dismissible fade show" role="alert">
													<p class="text-muted ">Sms göndermek için <a href="https://www.vatansms.com/" target="_blank"> Vatan Sms </a>firmasından hizmet almanız gerekmektedir.</p>
													<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close"></button>
												</div>
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Şifre Hatırlatırken Sms</label>
												<div class="col-sm-6">
													<div>
														<div class="form-check form-check-inline">
															<input type="radio" value="1" class="form-check-input" name="sms_sifrehatirlat" id="sms_sifrehatirlataktif" <?php if($ayarlar["sms_sifrehatirlat"]==1){echo "checked";}?>>
															<label class="form-check-label" for="uyeadiaktif">
																Gönder
															</label> 
														</div>
														<div class="form-check form-check-inline"> 
															<input type="radio" value="0" class="form-check-input" name="sms_sifrehatirlat" id="sms_sifrehatirlatpasif" <?php if($ayarlar["sms_sifrehatirlat"]==0){echo "checked";}?>>
															<label class="form-check-label" for="uyeadipasif">
																Gönderme
															</label>
														</div>
													</div>
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Sms Kullanıcı Adı</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="sms_username" value="<?php echo $ayarlar["sms_username"];?>" placeholder="Sms Kullanıcı Adı">
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Sms Şifre</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="sms_password" value="<?php echo $ayarlar["sms_password"];?>" placeholder="Sms Şifre">
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Sms Müşteri Kodu</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="sms_mkodu" value="<?php echo $ayarlar["sms_mkodu"];?>" placeholder="Sms Müşteri Kodu">
												</div>
											</div>
											<div class="row mb-3">
												<label for="exampleInputUsername2" class="col-sm-6 col-form-label">Sms Gönderici Adı</label> 
												<div class="col-sm-6">
													<input type="text" class="form-control" id="sms_gondericiadi" value="<?php echo $ayarlar["sms_gondericiadi"];?>" placeholder="Sms Gönderici Adı">
												</div>
											</div>
										</div>
									</div>
									<button type="button" onclick="kaydet()" class="btn btn-primary me-2 mt-3">Kaydet</button>
								</div>
							</div>
						</div>  
					</div>
				</div>
				<!-- partial:../../partials/_footer.html -->
				<footer class="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small ">
					<p class="text-muted mb-1 mb-md-0 ">Copyright © 2022 <a href="https://dogunetajans.com" target="_blank ">Doğunet Ajans</a>.</p>
					<p class="text-muted">erdemf@yandex.com</p>  
				</footer>
				<!-- partial -->
			</div>
		</div>
		<?php				
			include 'scripts.php';
		?>
		<script>
			const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
			})
			function kaydet(){
			$.ajax({
			url: 'php/islemler.php',
			type: 'POST',
			dataType: 'json',
			data:{
			islem:"ayarkaydet",
			uyeresmi:$('input[name=uyeresmi]:checked').val(),
			yenikayitcepistegi:$('input[name=yenikayitcepistegi]:checked').val(),
			uyeadi:$('input[name=uyeadi]:checked').val(),
			sohbet:$('input[name=sohbet]:checked').val(),
			misafir_girisi:$('input[name=misafirgirisi]:checked').val(),
			yenikayitcip:$('#yenikayitcip').val(),
			gonderici_maili:$('#gonderici_maili').val(),
			gonderici_sifresi:$('#gonderici_sifresi').val(),
			mail_host:$('#mail_host').val(),
			sms_username:$('#sms_username').val(),
			sms_username:$('#sms_username').val(),
			sms_password:$('#sms_password').val(),
			sms_mkodu:$('#sms_mkodu').val(),
			uye_renk:$('#yeniyetkirengi').val(),
			sms_gondericiadi:$('#sms_gondericiadi').val(),
			sms_sifrehatirlat:$('input[name=sms_sifrehatirlat]:checked').val(),
			},
			success: function (gelenveri) {
			Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
			},
			error: function (hata) {
			}
			});
			}
			</script>
			<!-- endinject -->
			<!-- Custom js for this page -->
			<!-- End custom js for this page -->
			</body>
			</html>																																																																																																																