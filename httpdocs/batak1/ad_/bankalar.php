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
		<title>Bankalar</title>
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
													<th>Banka Adı</th>
													<th>IBAN</th>													
													<th>İşlem</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$bankalar = $baglanti->query("SELECT * from bankalar where deleted=0 order by adi");
													while ($banka = $bankalar->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr> 
														<td><?php echo $banka["adi"];?></td>
														<td><?php echo $banka["iban"];?></td>
														<td><img src="../<?php echo $banka["resim"];?>" alt="<?php echo $banka["adi"];?>"></img></td>
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
																<button type="button" onclick="bankamodal('<?php echo $banka["id"];?>','<?php echo $banka["adi"];?>','<?php echo $banka["iban"];?>')" class="btn btn-primary">Güncelle</button>
																<button type="button" onclick="bankasil('<?php echo $banka["id"];?>')" class="btn btn-danger">Sil</button>
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
				<div class="modal fade" id="bankamodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">  
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">İban Güncelle</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
							</div>
							<div class="modal-body">
								<input type="hidden" id="bid">
								<input type="hidden" id="islem">
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Banka Adı</label>
									<input type="text" class="form-control" id="badi" autocomplete="off" placeholder="Banka Adı">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">İban</label>
									<input type="text" class="form-control" id="biban" autocomplete="off" placeholder="İban">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Resim</label>
									<input class="form-control" type="file" id="formFile" accept="image/png, image/gif, image/jpeg">
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
					<a type="button" onclick="bankaekle()" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Banka Ekle      
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
			function bankamodal(bid,badi,biban){
				$("#bid").val(bid);
				$("#islem").val("guncelle");
				$("#badi").val(badi);
				$("#biban").val(biban);				
				$("#bankamodal").modal("show");
			}
			function bankaekle(){
				$("#bid").val("");
				$("#islem").val("ekle");
				$("#badi").val("");
				$("#biban").val("");
				$("#bankamodal").modal("show");
			}
			function guncelle(){
				if($("#islem").val()=="guncelle"){
					var formData = new FormData();
					formData.append('islem', "bankaguncelle");
					formData.append('id', $("#bid").val()); 	
					formData.append('iban', $("#biban").val()); 
					formData.append('adi', $("#badi").val()); 	
					formData.append('bankafoto', $('#formFile')[0].files[0]); 
					$.ajax({
						url: 'php/islemler.php',
						type: "POST",
						data: formData,
						contentType: false,
						cache: false,
						processData:false,
						mimeType: "multipart/form-data", 
						dataType: 'json' ,
						success: function (gelenveri) {
							if(gelenveri.durum=="success"){ 
								location.reload();
								}else{
								Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
							}
						}
					})
				}
				else if($("#islem").val()=="ekle"){
					if($("#biban").val()!=""&&$("#ptutari").val()!=""){
						if($('#formFile')[0].files.length==0){
							Toast.fire({icon: "warning",title: "Lütfen banka resmi seçin..!!"});
							return false;
						}
						var formData = new FormData();
						formData.append('islem', "bankaekle");
 						formData.append('iban', $("#biban").val()); 	
						formData.append('adi', $("#badi").val()); 	
						formData.append('bankafoto', $('#formFile')[0].files[0]); 	
						$.ajax({
							url: 'php/islemler.php',
							type: "POST",
							data: formData,
							contentType: false,
							cache: false,
							processData:false,
							mimeType: "multipart/form-data", 
							dataType: 'json' ,
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){ 
									location.reload();
									}else{
									Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
								}
							}
						})
						}else{
						Toast.fire({icon: 'warning',title: "Bilgileri Eksik Girdiniz..!!"});
					}
				}
			}
			function bankasil(id){
				Swal.fire({
					title: 'Banka silinecek onaylıyor musun?',
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
								islem:"bankasil",
								id:id
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