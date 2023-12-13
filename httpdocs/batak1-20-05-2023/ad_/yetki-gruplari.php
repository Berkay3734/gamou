<?php
	include("baglan.php");
	ob_start();
	session_start();
	if(!$_SESSION["adminLogin1"]){
		header("Location: ./");
	}
	$userbilgisi = $baglanti->query("SELECT * FROM oyuncular where id='".$_SESSION["adminid"]."'")->fetch(PDO::FETCH_ASSOC);
	
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Yetki Grupları</title>
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
													<th>Yetki Grubu</th>													
													<th>Sıra No</th>
													<th>Renk</th>
													<th>Detay</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$datalar = $baglanti->query("SELECT * from yetki_gruplari order by yetki_adi");
													while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr>
														<td><?php echo $data["yetki_adi"];?></td>
														<td><?php echo $data["sira"];?></td>
														<td class=""><h5><span class="badge" style="background-color:<?php echo $data["renk"];?>"><?php echo $data["renk"];?></span></h5></td>
														<td >
															<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
																<?php if (yetki_kontrol($userbilgisi["yetki_grubu"], 'yetki_goruntule')){?>
																	<button type="button" onclick="yetkigetir('<?php echo $data["id"];?>')" class="btn btn-primary">Güncelle</button>
																<?php }?>
																<?php if (yetki_kontrol($userbilgisi["yetki_grubu"], 'yetkigrubu_sil')){?>
																	<button type="button" onclick="yetkigrubusil('<?php echo $data["id"];?>','<?php echo $data["yetki_adi"];?>')" class="btn btn-danger">Sil</button>
																<?php }?>
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
				<?php if (yetki_kontrol($userbilgisi["yetki_grubu"], 'yetkigrubu_ekle')){?>
					<div class="buy-now-wrapper">
						<a type="button" data-bs-toggle="modal" data-bs-target="#yetkigrubueklemodal" class="btn btn-primary text-white fw-bolder btn-icon-text"> 
							<i data-feather="plus"></i> Yetki Grubu Ekle      
						</a>     
					</div>
					<div class="modal fade" id="yetkigrubueklemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="">Yetki Grubu Ekle</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
								</div>
								<div class="modal-body" >
									<div class="row p-2" id="yetkiekleradios">
										<div class="mb-3 p-0 row">
											<div class="col-6">
												<label for="exampleInputUsername1" class="form-label">Yetki Grubu Adı</label>
												<input type="text" class="form-control" id="yetkigrubuadi" autocomplete="off" placeholder="">
											</div>
											<div class="col-2">
												<label for="yetkigrubusira" class="form-label">Sıra No</label>
												<input type="number" class="form-control" id="yetkigrubusira" autocomplete="off" placeholder="">
											</div>
											<div class="col-4">
												<label for="yeniyetkirengi" class="form-label">Yetki Grubu Rengi</label>
												<input type="color" class="form-control form-control-color" id="yeniyetkirengi" value="#563d7c" title="Choose your color">
											</div>
										</div>
										<?php 
											$datalar = $baglanti->query("SELECT * FROM yetkiler order by yetki_adi");
											while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
											?>
											<div class="form-check mb-2 col-4">
												<input type="checkbox" value="<?php echo $data["yetki"]?>" class="form-check-input" id="ekle-<?php echo $data["yetki"]?>">
												<label class="form-check-label" for="ekle-<?php echo $data["yetki"]?>">
													<?php echo $data["yetki_adi"]?>
												</label>
											</div>
										<?php }?>
									</div>
								</div>
								<hr class="m-0 p-0">
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
									<button type="button" onclick="yetkigrubuekle()" class="btn btn-primary">Ekle</button>
								</div>
							</div>
						</div>
					</div>
					<script>
						document.getElementById('yetkigrubueklemodal').addEventListener('show.bs.modal', function (event) {
							$("#yetkigrubuadi").val("");
							$("#yetkiekleradios input:checkbox:checked").each(function () {
								$(this).prop('checked',false);
							});
						})
					</script>
				<?php }?>
				<!-- partial:../../partials/_footer.html -->
				<footer class="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small ">
					<p class="text-muted mb-1 mb-md-0 ">Copyright © 2022 <a href="https://dogunetajans.com" target="_blank ">Doğunet Ajans</a>.</p>
					<p class="text-muted">erdemf@yandex.com</p>  
				</footer>
				<!-- partial -->
			</div>
		</div>
		<div class="modal fade" id="yetkimodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
					</div>
					<div class="modal-body" >
						<div class="mb-3 p-0 row">
							<div class="col-6">
								<input type="hidden" id="guncelyetkiid" value="">
								<label for="exampleInputUsername1" class="form-label">Yetki Grubu Adı</label>
								<input type="text" class="form-control" id="guncelyetkigrubuadi" autocomplete="off" placeholder="">
							</div>
							<div class="col-2">
								<input type="hidden" id="guncelyetkiid" value="">
								<label for="exampleInputUsername1" class="form-label">Yetki Grubu Sıra</label>
								<input type="text" class="form-control" id="guncelyetkigrubusira" autocomplete="off" placeholder="">
							</div>
							<div class="col-4">
								<label for="guncelyetkirengi" class="form-label">Yetki Grubu Rengi</label>
								<input type="color" class="form-control form-control-color" id="guncelyetkirengi" value="#563d7c" title="Choose your color">
							</div>
						</div>
						<div class="row p-2" id="yetkiheader">
						</div>
					</div>
					<hr class="m-0 p-0">
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
						<button type="button" onclick="yetkigrubuguncelle()" class="btn btn-primary">Güncelle</button>
					</div>
				</div>
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
			function yetkigrubusil(id,ad){
				Swal.fire({
					icon:"error",
					title: ad+' ',
					text:'Yetki Grubu silinecek..Onaylıyor musun?',
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
								islem:"yetkigrubu_sil",
								id:id
							},
							success: function (gelenveri) {
								if(gelenveri.durum=="success"){
									location.reload();
									}else{
									Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj});
								}
							},
							error: function (hata) {
							}
						});
					} 
				})
			}
			function yetkigrubuguncelle(){
				var yetkiler="";
				$("#yetkiheader input:checkbox:checked").each(function () {
					yetkiler+=$(this).val()+",";
				});
				if($("#guncelyetkigrubuadi").val()==""){
					Toast.fire({icon: "error",title: "Yetki Grubu adı girin"});
					return false;  
				}
				if($("#guncelyetkigrubusira").val()==""){
					Toast.fire({icon: "error",title: "Yetki Grubu sıra girin"});
					return false;  
				}
				/*
				if(yetkiler==""){
					Toast.fire({icon: "error",title: "Yetki Seçiniz"});
					return false;  
				} 
				*/
				$.ajax({   
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
						id:$("#guncelyetkiid").val(),
						islem:"yetkigrubu_guncelle",
						yetkiler:yetkiler,
						renk:$("#guncelyetkirengi").val(),
						grup_adi:$("#guncelyetkigrubuadi").val(),
						sira:$("#guncelyetkigrubusira").val()
					},
					success: function (gelenveri) {
						if(gelenveri.durum=="success"){
							location.reload();
							}else{
							Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj});
						}
					},
					error: function (hata) {
					}
				});
			}
			function yetkigrubuekle(){
				var yetkiler="";
				$("#yetkiekleradios input:checkbox:checked").each(function () {
					yetkiler+=$(this).val()+",";
				});
				if($("#yetkigrubuadi").val()==""){
					Toast.fire({icon: "error",title: "Yetki Grubu adı girin"});
					return false;  
				}
				if($("#yetkigrubusira").val()==""){
					Toast.fire({icon: "error",title: "Yetki Grubu sıra no girin"});
					return false;  
				}
				if(yetkiler==""){
					Toast.fire({icon: "error",title: "Yetki Seçiniz"});
					return false;  
				} 
				$.ajax({   
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
						islem:"yetkigrubu_ekle",
						yetkiler:yetkiler,
						renk:$("#yeniyetkirengi").val(),
						grup_adi:$("#yetkigrubuadi").val(),
						sira:$("#yetkigrubusira").val()
					},
					success: function (gelenveri) {
						if(gelenveri.durum=="success"){
							location.reload();
							}else{
							Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj});
						}
					},
					error: function (hata) {
					}
				});
			}
			function yetkigetir(id){
				$.ajax({   
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
					islem:"yetki_goruntule",
					id:id
					},
					success: function (gelenveri) {
					if(gelenveri.durum=="success"){
					$("#guncelyetkiid").val(id);
					
					$("#exampleModalLabel").html(gelenveri.yetkigrubu.yetki_adi+" Grubu Yetkileri");
					$("#guncelyetkirengi").val(gelenveri.yetkigrubu.renk);
					$("#guncelyetkigrubuadi").val(gelenveri.yetkigrubu.yetki_adi);
					$("#guncelyetkigrubusira").val(gelenveri.yetkigrubu.sira);
					var form="";
					var rutbeyetkileri=gelenveri.yetkigrubu.yetkiler.split(",");
					gelenveri.yetkiler.forEach(function(value, index) {
					var checkstatus="";
					if(rutbeyetkileri.find(m => m === value.yetki)){
					checkstatus="checked";
					}
					form+='<div class="form-check col-4">                           '
					form+=' <input type="checkbox" '+checkstatus+' class="form-check-input" value="'+value.yetki+'" id="'+value.yetki+'">             '
					form+='						<label class="form-check-label" for="'+value.yetki+'">      '
					form+='							'+value.yetki_adi+'                                    '
					form+='						</label>                                                '
					form+='					</div>                                                    '
					});
					$("#yetkiheader").html(form);
					$("#yetkimodal").modal("show");
					}else{
					Toast.fire({icon: gelenveri.durum,title: gelenveri.mesaj});
					}
					},
					error: function (hata) {
					}
					});
					}
					</script>
					</body>
					</html>																													