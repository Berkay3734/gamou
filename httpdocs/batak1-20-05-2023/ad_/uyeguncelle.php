<?php
	include("baglan.php");
	ob_start();
	session_start();
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
	}
	if($_GET["id"]){
		$bu=$_GET["id"];
		$uyesorgu = $baglanti->query('SELECT * FROM oyuncular where id="'.$bu.'" limit 1');
		$uye = $uyesorgu->fetch(PDO::FETCH_ASSOC);
		$uyesorgu_count = $uyesorgu->rowCount();
		if($uyesorgu_count>0){
			}else {
			header("Location:oyuncular.php");
		}
		}  else {
        header("Location:oyuncular.php");
	}
	// Sorgu 
	date_default_timezone_set('Europe/Istanbul'); 
	$host = $_SERVER['HTTP_HOST'];
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title><?php echo $uye["adsoyad"];?></title>
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
					</div>
				</nav>
				<!-- partial -->
				<div class="page-content">
					<div class="row">
						<div class="col-12 grid-margin">
							<div class="card">
								<div class="position-relative">
									<figure class="overflow-hidden mb-0 d-flex justify-content-center">
										<img src="https://dummyimage.com/1560x370"class="rounded-top" alt="profile cover">
									</figure>
									<div class="d-flex justify-content-between align-items-center position-absolute top-90 w-100 px-2 px-md-4 mt-n4">
										<div>
											<?php 
												$uyeresim="../".$uye["resim"];
												if($uye["resim"]==""){
													$uyeresim="../img/noneuserphoto.jpeg";
												}
											?>
											<img class="wd-70 rounded-circle" src="<?php echo $uyeresim;?>" alt="profile">
											<span class="h4 ms-3 text-dark"><?php echo $uye["adsoyad"];?></span>
										</div>
										<div class="">
											<button class="btn btn-primary btn-icon-text" onclick="kaydet('<?php echo $uye["id"];?>')">
												<i data-feather="save" class="btn-icon-prepend"></i> Kaydet
											</button>
										</div>
									</div>
								</div>
								<div class="d-flex justify-content-center p-3 rounded-bottom d-none">
									<ul class="d-flex align-items-center m-0 p-0">
										<li class="d-flex align-items-center active">
											<i class="me-1 icon-md text-primary" data-feather="columns"></i>
											<a class="pt-1px d-none d-md-block text-primary" href="#">Timeline</a>
										</li>
										<li class="ms-3 ps-3 border-start d-flex align-items-center">
											<i class="me-1 icon-md" data-feather="user"></i>
											<a class="pt-1px d-none d-md-block text-body" href="#">About</a>
										</li>
										<li class="ms-3 ps-3 border-start d-flex align-items-center">
											<i class="me-1 icon-md" data-feather="users"></i>
											<a class="pt-1px d-none d-md-block text-body" href="#">Friends <span class="text-muted tx-12">3,765</span></a>
										</li>
										<li class="ms-3 ps-3 border-start d-flex align-items-center">
											<i class="me-1 icon-md" data-feather="image"></i>
											<a class="pt-1px d-none d-md-block text-body" href="#">Photos</a>
										</li>
										<li class="ms-3 ps-3 border-start d-flex align-items-center">
											<i class="me-1 icon-md" data-feather="video"></i>
											<a class="pt-1px d-none d-md-block text-body" href="#">Videos</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="row profile-body">
						<!-- left wrapper start -->
						<div class="col-md-4 col-xl-3 left-wrapper mb-3">
							<div class="card rounded">
								<div class="card-body">
									<div class="d-flex align-items-center justify-content-between mb-2">
										<h6 class="card-title mb-0">Hakkında</h6>										
									</div>
									<div class="mt-3 d-none">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Ad Soyad:</label>
										<p class="text-muted"><?php echo $uye["adsoyad"];?></p>
									</div>								
									<div class="mt-3"> 
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Username:</label>
										<p class="text-muted"><?php echo $uye["username"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Şifre:</label>
										<p class="text-muted"><?php echo $uye["pass"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Telefon:</label>
										<p class="text-muted"><input type="text" class="form-control" id="tel" value="<?php echo $uye["tel"];?>"></p>
									</div> 
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Cinsiyet:</label>
										<p class="text-muted"><?php echo $uye["cinsiyet"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Email:</label>
										<p class="text-muted"><?php echo $uye["email"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Puan:</label>
										<p class="text-muted"><input type="number" class="form-control" id="puan" value="<?php echo $uye["puan"];?>"></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Altın:</label>
										<p class="text-muted"><input type="number" class="form-control" id="altin" value="<?php echo $uye["altin"];?>"></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Kazandığı:</label>
										<p class="text-muted"><?php echo $uye["kazandigi"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Kaybettiği:</label>
										<p class="text-muted"><?php echo $uye["kaybettigi"];?></p>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Toplam Oyun:</label>
										<p class="text-muted"><?php echo $uye["toplamoyun"];?></p>
									</div>
									<div class="mt-3 d-none">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Admin Panele Giriş Yetkisi:</label>
										<select class="form-select" id="yetki">
											<option value="0" <?php if($uye["is_admin"]==0){echo "selected";}?>>Yok</option>
											<option value="1" <?php if($uye["is_admin"]==1){echo "selected";}?>>Var</option>
										</select>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Yetki Grubu:</label>
										<select class="form-select" id="yetkigrubu">
										<option value="0">Yetkisiz</option>
											<?php 
												$yetkiler = $baglanti->query("SELECT * from yetki_gruplari order by yetki_adi");
												while ($yetki = $yetkiler->fetch(PDO::FETCH_ASSOC)) {
												?>
												<option value="<?php echo $yetki["id"]?>" <?php if($uye["yetki_grubu"]==$yetki["id"]){echo "selected";}?>><?php echo $yetki["yetki_adi"]?></option>
											<?php }?>
										</select>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Ban:</label>
										<select class="form-select" id="ban">											
											<option value="0" <?php if($uye["bandurumu"]==0){echo "selected";}?>>Hayır</option>
											<option value="1" <?php if($uye["bandurumu"]<>0){echo "selected";}?>>Evet</option>
										</select>
									</div>
									<div class="mt-3">
										<label class="tx-11 fw-bolder mb-0 text-uppercase">Silindi:</label>
										<select class="form-select" id="silindi">											
											<option value="0" <?php if($uye["deleted"]==0){echo "selected";}?>>Hayır</option>
											<option value="1" <?php if($uye["deleted"]<>0){echo "selected";}?>>Evet</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<!-- left wrapper end -->
						<!-- middle wrapper start -->
						<div class="col-md-8 col-xl-9 middle-wrapper">
							<div class="row m-0">
								<div class="card">
									<div class="card-body">									
										<div class="table-responsive">
											<table id="dataTableExample3" class="table table-sm">
												<thead>
													<tr>		
														<th>Kazanan</th>
														<th>Masa Puanı</th>
														<th>Oyun Tipi</th>
														<th>Masanın Kazandığı</th>
														<th>Tarih</th>
													</tr>
													</thead>
													<tbody>
													<?php 
														$gecmisoyunlar = $baglanti->query("SELECT * from user_gecmisi where user_id='".$uye["id"]."' order by tarih desc");
														while ($oyun = $gecmisoyunlar->fetch(PDO::FETCH_ASSOC)) {
															$masa = $baglanti->query("SELECT  masa_gecmisi.*,(select adsoyad from oyuncular where id=masa_gecmisi.kazanan) as kazananadi from masa_gecmisi where id='".$oyun["masa_id"]."'")->fetch(PDO::FETCH_ASSOC);
														?>
														<tr>
															<td><?php echo $masa["kazananadi"];?></td>
															<td><?php echo $masa["puan"];?></td>
															<td class="text-capitalize"><?php echo $masa["oyuntipi"];?></td>
															<td><?php echo $masa["masanin_kazandigi"];?></td>
															<td><?php echo date('d-m-Y - h:i', strtotime($masa["tarih"]))?></td>
														</tr>
													<?php  }?>
												</tbody>
											</table>
										</div>
									</div>
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
			var lobi = io.connect('https://o.<?php echo $matches[0]?>', {
				transports: ['websocket'],
				upgrade: false, 
				'reconnection':true,   
				secure:true,
				query: {
					usertype:"admin",
					token:"<?php echo $_SESSION["USERKEYZ"];?>"
				}
			});  
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
			var table3 =	$('#dataTableExample3').DataTable({
				"bStateSave": true,
				"ordering": false,
				"language": {
					search: "",
					"url":"//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
				}
			});
			function kaydet(userid){
				$.ajax({
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
						islem:"uyeguncelle",
						userid:userid,
						ban:$("#ban").val(),
						silindi:$("#silindi").val(),
						yetki:$("#yetki").val(),	
						puan:$("#puan").val(),	
						altin:$("#altin").val(),	
						tel:$("#tel").val(),	
						yetkigrubu:$("#yetkigrubu").val(),	
					},
					success: function (gelenveri) {
						
						if(gelenveri.durum=="success"){
							Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
							lobi.emit("uyeguncelle",{userid:userid,puan:$("#puan").val(),altin:$("#altin").val()});
							if($("#ban").val()==1){
								lobi.emit("uyebanla",{userid:userid});
							}
						}else{
						Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
						}
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