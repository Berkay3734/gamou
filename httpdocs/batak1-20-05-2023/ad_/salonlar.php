<?php
	include("baglan.php");
	ob_start();
	session_start();
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
	}
	$host = $_SERVER['HTTP_HOST'];
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Salonlar</title>
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
									<div class="text-end mb-3">
										<button type="button" onclick="herkesemesaj()" class="btn btn-warning btn-icon-text">
											<i class="btn-icon-prepend" data-feather="message-square"></i>
											Herkese Mesaj Gönder
										</button>
									</div>
									<div class="table-responsive">
										<table id="dataTableExample3" class="table table-sm">
											<thead>
												<tr>
													<th>Salon Adı</th>
													<th>Giriş limiti</th>
													<th>Masa açılış Alt limit</th>
													<th>Masa açılış Üst limit</th>
													<th>Salon Mesajı</th>													
													<th>İşlem</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$salonlar = $baglanti->query("SELECT * from salonlar where deleted=0 order by enaz ");
													while ($salon = $salonlar->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr>
														<td><?php echo $salon["ad"];?></td>
														<td><?php echo $salon["enaz"];?> Puan</td>
														<td><?php echo $salon["alt"];?> Puan</td>
														<td><?php echo $salon["ust"];?> Puan</td>
														<td><?php echo $salon["salonmesaji"];?></td>
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">  
																<button type="button" onclick="salonamesaj('<?php echo $salon["id"];?>','<?php echo $salon["ad"];?>')" class="btn btn-success btn-icon-text">
																	<i class="btn-icon-prepend" data-feather="message-square"></i>
																	Mesaj Gönder
																</button>
																<button type="button" onclick="salonmodal('<?php echo $salon["id"];?>','<?php echo $salon["ad"];?>','<?php echo $salon["enaz"];?>','<?php echo $salon["alt"];?>','<?php echo $salon["ust"];?>','<?php echo $salon["salonmesaji"];?>')" class="btn btn-primary">Güncelle</button>
																<button type="button" onclick="salonsil('<?php echo $salon["id"];?>','<?php echo $salon["ad"];?>')" class="btn btn-danger">Sil</button>
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
				<div class="modal fade" id="salonmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">  
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Salon Güncelle</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
							</div>
							<div class="modal-body">
								<input type="hidden" id="salonid">
								<input type="hidden" id="islem">
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Salon Adı</label>
									<input type="text" class="form-control" id="salonadi" autocomplete="off" placeholder="Salon Adı">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Giriş Limiti</label>
									<input type="text" class="form-control" id="girislimiti" autocomplete="off" placeholder="Giriş Limiti">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Alt Limit</label>
									<input type="text" class="form-control" id="altlimit" autocomplete="off" placeholder="Alt Limit">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Üst Limit</label>
									<input type="text" class="form-control" id="ustlimit" autocomplete="off" placeholder="Üst Limit">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Salon Mesajı</label>
									<textarea class="form-control" id="mesaj" rows="3"></textarea>		
								</div>	
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
								<button type="button" onclick="kaydet()" class="btn btn-primary">Kaydet</button>
							</div>
						</div>
					</div>
				</div>
				<div class="buy-now-wrapper">
					<a type="button" onclick="salonekle()" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Salon Ekle      
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
			function salonmodal(salonid,ad,giris,alt,ust,mesaj){
				$("#islem").val("guncelle");
				$("#salonid").val(salonid);
				$("#exampleModalLabel").html("Salon Güncelle");
				$("#salonadi").val(ad);
				$("#girislimiti").val(giris);
				$("#altlimit").val(alt);
				$("#ustlimit").val(ust);
				$("#mesaj").val(mesaj);
				$("#salonmodal").modal("show");
			}
			function kaydet(){
				if($("#islem").val()=="guncelle"){
					$.ajax({
						url: 'php/islemler.php',
						type: 'POST',
						dataType: 'json',
						data:{
							islem:"salonguncelle",
							salonid:$("#salonid").val(),
							salonadi:$("#salonadi").val(),
							girislimiti:$("#girislimiti").val(),	
							altlimit:$("#altlimit").val(),
							ustlimit:$("#ustlimit").val(),
							mesaj:$("#mesaj").val()
						},
						success: function (gelenveri) {
							if(gelenveri.durum=="success"){
								lobi.emit("salonislemleri",{
									islem:"salonguncelle",
									id:gelenveri.id,
									ad:$("#salonadi").val(),
									enaz:$("#girislimiti").val(),								
									alt:$("#altlimit").val(),
									ust:$("#ustlimit").val(),
									url:gelenveri.url,
									yeniurl:gelenveri.yeniurl
								});
								Toast.fire({icon: "success",title: $("#salonadi").val()+" Salonu güncellendi..!!"}).then((result) => {
									location.reload(); 
								})
								}else{
								Toast.fire({icon: "error",title: gelenveri.mesaj})
							}
						},
						error: function (hata) {
						}
					});
				}
				else if($("#islem").val()=="ekle"){
					$.ajax({
						url: 'php/islemler.php',
						type: 'POST',
						dataType: 'json',
						data:{
							islem:"salonekle",
							salonadi:$("#salonadi").val(),
							girislimiti:$("#girislimiti").val(),	
							altlimit:$("#altlimit").val(),
							ustlimit:$("#ustlimit").val(),
							mesaj:$("#mesaj").val()
						},
						success: function (gelenveri) {
							if(gelenveri.durum=="success"){
								lobi.emit("salonislemleri",{
									islem:"salonekle",
									id:gelenveri.id,
									ad:$("#salonadi").val(),
									enaz:$("#girislimiti").val(),
									salonportu:0,
									aktif:0,
									online:0,
									alt:$("#altlimit").val(),
									ust:$("#ustlimit").val()
								});
								Toast.fire({icon: "success",title: $("#salonadi").val()+" Salonu eklendi..!!"}).then((result) => {
									location.reload();
								})
								}else{
								Toast.fire({icon: "error",title: gelenveri.mesaj})
							}
						},
						error: function (hata) {
						}
					});
				}
			}
			function salonekle(){
				$("#salonid").val("");
				$("#exampleModalLabel").html("Salon Ekle");
				$("#islem").val("ekle");
				$("#salonadi").val("");
				$("#girislimiti").val("");
				$("#altlimit").val("");
				$("#ustlimit").val("");
				$("#mesaj").val("");
				$("#salonmodal").modal("show");
			}
			var lobi = io.connect('https://b.<?php echo $matches[0]?>', { 
				transports: ['websocket'],
				upgrade: false, 
				'reconnection':true,   
				secure:true,
				query: {
					usertype:"admin",
					token:"<?php echo $_SESSION["USERKEYZ"];?>"
				}
			});  
			function salonsil(id,ad){
				Swal.fire({
					icon:"error",
					title: ad+' İsimli Salon silinecek onaylıyor musun?',
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
								islem:"salonsil",
								salonid:id
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){ 
									lobi.emit("salonislemleri",{islem:"salonsil",oda:gelenveri.oda,yenioda:gelenveri.yenioda,yeniodaadi:gelenveri.yeniodaadi,id:gelenveri.id});
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
			function salonamesaj(id,salonadi){
				Swal.fire({
					input: 'textarea',
					title: salonadi+' İsimli Salon Mesajı',
					inputPlaceholder: 'Oda mesajını girin...',
					showCancelButton: true,
					confirmButtonText: 'Gönder', 
					cancelButtonText: 'Vazgeç',					
					}).then((result) => {
					if (result.value) {
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"salonamesajat",
								salonid:id
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){ 
									lobi.emit("admindenmesajvar",{mesaj:result.value,masa:id,kime:"salona"});
									}else{
									Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
								}
							},
							error: function (hata) {
							}
						});
					}	  
				});
			}
			function herkesemesaj(){
				Swal.fire({
					input: 'textarea',
					title: "Genel Mesaj",
					inputPlaceholder: 'Mesajınızı girin...',
					showCancelButton: true,
					confirmButtonText: 'Gönder', 
					cancelButtonText: 'Vazgeç',					
					}).then((result) => {
					if (result.value) {
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"herkesemesajat"
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){ 
									lobi.emit("admindenmesajvar",{mesaj:result.value,masa:"",kime:"herkese"}); 
									}else{
									Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj})
								}
							},
							error: function (hata) {
							}
						});
					}	  
				});
			}
		</script>
		<!-- endinject -->
		<!-- Custom js for this page -->
		<!-- End custom js for this page -->
	</body>
</html>															