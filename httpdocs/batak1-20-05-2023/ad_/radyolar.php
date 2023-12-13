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
		<title>Radyolar</title>
		<?php				
			include 'head.php';
		?>
		<style>
			#player-container #play-pause {
			cursor: pointer;
			text-indent: -999999px;
			height:40px;
			width: 40px;
			padding: 12px 18px;
			z-index: 2;
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAyNHYtMjRsMjAgMTItMjAgMTJ6Ii8+PC9zdmc+);
			background-repeat: no-repeat!important;
			background-position: center;
			background-size: 16px;
			background-repeat:no-repeat;
			background-position:center;
			background-size:20px;
			background-color: gainsboro;
			}
			.play {
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAyNHYtMjRsMjAgMTItMjAgMTJ6Ii8+PC9zdmc+);
			}
			.pause {
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMjRoLTZ2LTI0aDZ2MjR6bTEwLTI0aC02djI0aDZ2LTI0eiIvPjwvc3ZnPg==)!important;
			}
		</style>
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
													<th>Radyo Adı</th>
													<th>Link</th>													
													<th>İşlem</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$datalar = $baglanti->query("SELECT * from radyolar order by adi");
													while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr> 
														<td><?php echo $data["adi"];?></td>
														<td><?php echo $data["link"];?></td>
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
																<button type="button" onclick="radyomodal('<?php echo $data["id"];?>','<?php echo $data["adi"];?>','<?php echo $data["link"];?>')" class="btn btn-primary">Güncelle</button>
																<button type="button" onclick="radyosil('<?php echo $data["id"];?>')" class="btn btn-danger">Sil</button>
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
				<div class="modal fade" id="radyomodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">  
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Radyo Güncelle</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
							</div>
							<div class="modal-body">
								<input type="hidden" id="rid">
								<input type="hidden" id="islem">
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Radyo Adı</label>
									<input type="text" class="form-control" id="radi" autocomplete="off" placeholder="Radyo Adı">
								</div>	
								<div class="mb-3">
									<label for="exampleInputUsername1" class="form-label">Link</label>
									<input type="text" class="form-control" id="rurl" autocomplete="off" placeholder="Link">
								</div>	
								<div class="mb-3" style="position:relative;height74px;">
									<div id="player-container">
										<div id="play-pause" class="play">Play</div>
									</div>
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
					<a type="button" onclick="radyoekle()" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
						<i data-feather="plus"></i> Radyo Ekle      
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
		<audio id="track">
			<source id="radiourl" src="https://cldup.com/qR72ozoaiQ.mp3" type="audio/mpeg" />
		</audio>
		<?php				
			include 'scripts.php';
		?>		
		<script>
			var track = document.getElementById('track');
			var controlBtn = document.getElementById('play-pause');
			function playPause() {
				$("#radiourl").attr("src",$("#rurl").val().trim())
				if (track.paused) {		
					track.load();
					track.play();
					//controlBtn.textContent = "Pause";
					controlBtn.className = "pause";
					} else { 
					track.pause();
					//controlBtn.textContent = "Play";
					controlBtn.className = "play";
				}
			}
			controlBtn.addEventListener("click", playPause);
			track.addEventListener("ended", function() {
				controlBtn.className = "play";
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
			function radyomodal(rid,radi,rurl){
				$("#rid").val(rid);
				$("#islem").val("guncelle");
				$("#radi").val(radi);
				$("#rurl").val(rurl);				
				$("#radyomodal").modal("show");
			}
			function radyoekle(){
				$("#rid").val("");
				$("#islem").val("ekle");
				$("#radi").val("");
				$("#rurl").val("");
				$("#radyomodal").modal("show");
			}
			function guncelle(){
				if($("#islem").val()=="guncelle"){
					if($("#rurl").val()!=""&&$("#radi").val()!=""){
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"radyoguncelle",
								url:$("#rurl").val(),
								adi:$("#radi").val().trim(),
								id:$("#rid").val()
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){
									Toast.fire({icon: "success",title: "Radyo Güncellendi.."}).then((result) => {
										location.reload(); 
									})
									}else{
									Toast.fire({icon: "error",title: gelenveri.mesaj})
								}
							},
							error: function (hata) {
								Toast.fire({icon: "error",title: "Bir Hata oluştu.."})
							}
						});
						}else{
						Toast.fire({icon: 'warning',title: "Bilgileri Eksik Girdiniz..!!"});
					}
				}
				else if($("#islem").val()=="ekle"){
					if($("#rurl").val()!=""&&$("#radi").val()!=""){
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"radyoekle",
								url:$("#rurl").val(),
								adi:$("#radi").val().trim()
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){
									Toast.fire({icon: "success",title: "Radyo Eklendi.."}).then((result) => {
										location.reload(); 
									})
									}else{
									Toast.fire({icon: "error",title: gelenveri.mesaj})
								}
							},
							error: function (hata) {
								Toast.fire({icon: "error",title: "Bir Hata oluştu.."})
							}
						});
						}else{
						Toast.fire({icon: 'warning',title: "Bilgileri Eksik Girdiniz..!!"});
					}
				}
			}
			$('#radyomodal').on('hidden.bs.modal', function () {
				if (!track.paused) {
					track.pause();
					controlBtn.className = "play";
				}
			});
			function radyosil(id){
				Swal.fire({
					title: 'Radyo silinecek onaylıyor musun?',
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
								islem:"radyosil",
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