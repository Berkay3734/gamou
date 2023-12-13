<?php
	include("baglan.php");
	ob_start();
	session_start();
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Oyuncular</title>
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
				<div class="page-content ">
					<div class="row">
						<div class="col-md-12 grid-margin stretch-card p-0">
							<div class="card">
								<div class="card-body">									
									<div class="table-responsive">
										<table id="dataTableExample3" class="table table-sm">
											<thead>
												<tr>
													<th>Ad Soyad</th>
													<th>Cinsiyet</th>
													<th>Mail</th>
													<th>Kullanıcı Kodu</th>
													<th>Puan</th>
													<th>Altın</th>
													<th>Resim</th>
													<th>Detay</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$users = $baglanti->query("SELECT * from oyuncular where deleted=0 and tip in('0','1') order by adsoyad");
													while ($user = $users->fetch(PDO::FETCH_ASSOC)) {
														$resim="../img/noneuserphoto.jpeg";
														if($user["resim"]!=null&&$user["resim"]!=""){
															$resim="../".$user["resim"];
														}
													?>
													<tr>
														<td><?php echo $user["adsoyad"];?></td>
														<td><?php echo $user["cinsiyet"];?></td>
														<td><?php echo $user["email"];?></td>
														<td><?php echo $user["username"];?></td>
														<td><?php echo $user["puan"];?></td>
														<td><?php echo $user["altin"];?></td>
														<td><img src="<?php echo $resim;?>" alt="<?php echo $user["adsoyad"];?>"></img></td>
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
																<a type="button" href="uyeguncelle.php?id=<?php echo $user["id"];?>" class="btn btn-xs btn-primary" >Detay</a>
																<button type="button" onclick="botsil('<?php echo $user["id"];?>','<?php echo $user["adsoyad"];?>')" class="btn btn-xs btn-danger">Sil</button>
															</div>
														</td>
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
			var table3 =	$('#dataTableExample3').DataTable({
				"bStateSave": true,
				"ordering": false,
				"language": {
					search: "",
					"url":"//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
				}
			});
			function botsil(id,adi){
				Swal.fire({
					title: '"'+adi+'" İsimli kullanıcı silinecek onaylıyor musun?',
					showCancelButton: true,
					confirmButtonText: 'Sil',
					cancelButtonText: 'Vazgeç',
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"uyesil",  
								botid:id
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){
									location.reload();
									}else{
									Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
								}
							},
							error: function (hata) {
							}
						});
					} 
				})
			}
		</script>
		<!-- endinject -->
		<!-- Custom js for this page -->
		<!-- End custom js for this page -->
	</body>
</html>																