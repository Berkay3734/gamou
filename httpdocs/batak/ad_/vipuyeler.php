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
		<title>Banlı Oyuncular</title>  
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
								<h6 class="card-title">Vip Üyeler</h6>
									<div class="table-responsive">
										<table id="dataTableExample3" class="table table-sm">
											<thead>
												<tr>
													<th>Ad Soyad</th>
													<th>Kullanıcı Kodu</th>
													<th>Onaylayan Kullanıcı</th>
													<th>Başlangıç</th>
													<th>Bitiş</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$users = $baglanti->query("SELECT oyuncular.*,gold_uyeler.start,gold_uyeler.end,(select username from oyuncular where id=gold_uyeler.onaylayan) as admin from gold_uyeler inner join oyuncular on oyuncular.id=gold_uyeler.user_id where end>now()");
													while ($user = $users->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr>
														<td><?php echo $user["adsoyad"];?></td>
														<td><?php echo $user["username"];?></td>
														<td><?php echo $user["admin"];?></td>
														<td><?php echo date('d-m-Y', strtotime($user["start"]));?></td>
														<td><?php echo date('d-m-Y', strtotime($user["end"]));?></td>
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
			var table3 =	$('#dataTableExample3').DataTable({
				"bStateSave": true,
				"ordering": false,
				"language": {
					search: "",
					"url":"//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
				}
			});
			var table3 =	$('#dataTableExample4').DataTable({
				"bStateSave": true,
				"ordering": false,
				"language": {
					search: "",
					"url":"//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
				}
			});
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,  
				showCloseButton:true,
				timer: 3000,
				timerProgressBar: true,
			});
			function bankaldir(id,nereden,salonid){
				Swal.fire({
					title: 'Üye Banı kalkacak..!!',
					html:"Onaylıyor musunuz ?",
					showDenyButton: false,
					icon: 'question',
					showCancelButton: true,
					allowOutsideClick: false,
					allowEscapeKey: false,
					confirmButtonText: 'Banı Kaldır',
					cancelButtonText: 'Vazgeç',
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						$.ajax({
							url: 'php/islemler.php',
							type: 'POST',
							dataType: 'json',
							data:{
								islem:"ban_kaldir",
								nereden:nereden,
								salonid:salonid,
								userid:id
							},
							success: function(data, textStatus, jqXHR)
							{
								if(data.durum=="success"){
									location.reload();
								}else{
								Toast.fire({icon: data.durum,title: data.mesaj})
								}
								}
								});
								} else if (result.isDenied) {
								}
								})
								}
								</script>
								<!-- endinject -->
								<!-- Custom js for this page -->
								<!-- End custom js for this page -->
								</body>
								</html>														