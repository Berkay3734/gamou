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
		<title>Bot Oyuncular</title> 
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
													<th>Detay</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$users = $baglanti->query("SELECT * from oyuncular where deleted=0 and tip=2 order by adsoyad");
													while ($user = $users->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr>
														<td><?php echo $user["adsoyad"];?></td>
														<td><?php echo $user["cinsiyet"];?></td>
														<td><?php echo $user["email"];?></td>
														<td><?php echo $user["username"];?></td>
														<td><?php echo $user["puan"];?></td>
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
				<div class="buy-now-wrapper">
					<a type="button" onclick="botekle()" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Bot Ekle      
					</a>   
					<a type="button" onclick="toplubotekle()" class="btn btn-secondary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Toplu Bot Ekle      
					</a>    
				</div>
				<div class="modal fade" id="paketmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">  
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Bot Ekle</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
							</div>
							<div class="modal-body">								
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Ad Soyad</label>
									<input type="text" class="form-control" id="adsoyad" autocomplete="off" >
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Puan</label>
									<input type="number" class="form-control" id="puan" autocomplete="off" >
								</div>	
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
								<button type="button" onclick="kaydet()" class="btn btn-primary">Kaydet</button>
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
			$string = file_get_contents("assets/json/isimlistesi.json");
			$json_a = json_decode($string, true);
		?>	  
		<script>
			var randonusers=<?php echo $string;?>;
			
			
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
			function toplubotekle(){	
				Swal.fire({
					input: 'number',
					title: "Toplu Bot Ekleme",
					inputPlaceholder: 'Eklenecek adedi girin...',
					showCancelButton: true,
					confirmButtonText: 'Gönder', 
					cancelButtonText: 'Vazgeç',					
					}).then((result) => {
					if (result.value) {
						var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
						
						for (let i = 0; i < result.value; i++) {
							var isim=randonusers[Math.floor(Math.random()*randonusers.length)].name+" "+characters.charAt(Math.floor(Math.random() * characters.length))
							var puan=Math.floor(Math.random() * 1000) + 1;							
							
							$.ajax({
								url: 'php/islemler.php',
								type: 'POST',
								dataType: 'json',
								data:{
									islem:"botekle",
									adi:isim,
									puan:puan
								}
							});
						}
						Toast.fire({icon: "success",title: "Botlar Eklendi"}).then((result) => {
							location.reload();
						});
					}	  
				});
			}
			function botekle(){			
				$("#paketmodal").modal("show");
			}
			function kaydet(){
				if($("#adsoyad").val()=="" || $("#puan").val()==""){
					Toast.fire({icon: "warning",title: "Bilgileri eksik girdiniz."})
					return false;
				}
				$.ajax({
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
						islem:"botekle",
						adi:$("#adsoyad").val(),
						puan:$("#puan").val()
					},
					success: function (gelenveri) {
						//location.reload();
						Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj}).then((result) => {
							// Reload the Page
							location.reload();
						});
					},
					error: function (hata) {
					}
				});
			}
			function botsil(id,adi){
				Swal.fire({
					title: '"'+adi+'" İsimli Bot silinecek onaylıyor musun?',
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