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
		<title>Kredi Paketleri</title>
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
				<div class="page-content">
					<div class="row">
						<div class="col-md-12 grid-margin stretch-card p-0">
							<div class="card">
								<div class="card-body">									
									<div class="table-responsive">
										<table id="dataTableExample3" class="table table-sm">
											<thead>
												<tr>
													<th>Paket Adı</th>
													<th>Paket Değeri</th>
													<th>Paket Tutarı (TL)</th>
													<th>İşlem</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$paketler = $baglanti->query("SELECT * from paketler where deleted=0 and tip='altin' order by deger desc");
													while ($paket = $paketler->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr> 
														<td><?php echo $paket["adi"];?></td>
														<td><?php echo $paket["deger"];?></td>
														<td><?php echo $paket["tutar"];?></td> 
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
																<button type="button" onclick="paketmodal('<?php echo $paket["id"];?>','<?php echo $paket["deger"];?>','<?php echo $paket["tutar"];?>','<?php echo $paket["adi"];?>')" class="btn btn-primary">Güncelle</button>
																<button type="button" onclick="paketsil('<?php echo $paket["id"];?>')" class="btn btn-danger">Sil</button>
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
				<div class="modal fade" id="paketmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">  
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Kredi Paketi Güncelle</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
							</div>
							<div class="modal-body">
								<input type="hidden" id="paketid">
								<input type="hidden" id="islem">
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Paket Degeri</label>
									<input type="text" class="form-control" id="padi" autocomplete="off" placeholder="Paket Adı">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Paket Degeri</label>
									<input type="text" class="form-control" id="pdegeri" autocomplete="off" placeholder="Paket Degeri">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Paket Tutarı</label>
									<input type="text" class="form-control" id="ptutari" autocomplete="off" placeholder="Paket Tutarı">
								</div>	
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
								<button type="button" onclick="guncelle()" class="btn btn-primary">Kaydet</button>
							</div>
						</div>
					</div>
				</div>
				<div class="buy-now-wrapper">
					<a type="button" onclick="paketekle()" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Paket Ekle      
					</a>     
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
			function paketmodal(paketid,pdegeri,ptutari,padi){
				$("#paketid").val(paketid);
				$("#islem").val("guncelle");
				$("#pdegeri").val(pdegeri);
				$("#padi").val(padi);
				$("#ptutari").val(ptutari);
				$("#paketmodal").modal("show");
			}
			function paketekle(){
				$("#paketid").val("");
				$("#islem").val("ekle");
				$("#padi").val("");
				$("#pdegeri").val("");
				$("#ptutari").val("");
				$("#paketmodal").modal("show");
			}
			function guncelle(){
				if($("#islem").val()=="guncelle"){
					$.ajax({
						url: 'php/islemler.php',
						type: 'POST',
						dataType: 'json',
						data:{
							islem:"paketguncelle",
							paketid:$("#paketid").val(),
							pdegeri:$("#pdegeri").val(),
							ptutari:$("#ptutari").val(),
							padi:$("#padi").val()
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
				else if($("#islem").val()=="ekle"){
					if($("#pdegeri").val()!=""&&$("#ptutari").val()!=""){
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"paketekle",
								pdegeri:$("#pdegeri").val(),
								ptutari:$("#ptutari").val()
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
						}else{
						Toast.fire({icon: 'warning',title: "Bilgileri Eksik Girdiniz..!!"});
					}
				}
			}
			function paketsil(id){
				Swal.fire({
					title: 'Paket silinecek onaylıyor musun?',
					showCancelButton: true,
					confirmButtonText: 'Sil',
					cancelButtonText: 'Vazgeç',
					icon: 'error',
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"paketsil",
								paketid:id
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