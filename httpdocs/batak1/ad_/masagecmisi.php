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
		<title>Masa Geçmişi</title>
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
													<th>Masa Adı</th>
													<th>Sandalye 1</th>
													<th>Sandalye 2</th>
													<th>Sandalye 3</th>
													<th>Sandalye 4</th>
													<th>Masa Puanı</th>
													<th>Oyun Tipi</th>
													<th>Kazanan</th>
													<th>Masanın Kazandığı</th>
													<th>Oyun Statüsü</th>
													<th>Salon Adı</th>
													<th>Tarih</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$datalar = $baglanti->query("SELECT masa_gecmisi.*
													,(select adsoyad from oyuncular where id=masa_gecmisi.s1) as s1ad
													,(select adsoyad from oyuncular where id=masa_gecmisi.s2) as s2ad
													,(select adsoyad from oyuncular where id=masa_gecmisi.s3) as s3ad
													,(select adsoyad from oyuncular where id=masa_gecmisi.s4) as s4ad
													,(select adsoyad from oyuncular where id=masa_gecmisi.kazanan) as kazananad
													,(select ad from salonlar where id=masa_gecmisi.salon_id) as salonadi
													from masa_gecmisi order by tarih desc");
													while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
														$statu='<span class="badge bg-info">Masa Açıldı</span>';
														if($data["statu"]==2){
															$statu='<span class="badge bg-success">Oyun Bitti</span>';
															}else if($data["statu"]==1){
															$statu='<span class="badge bg-warning">Oyun Başladı</span>';
															}else if($data["statu"]==3){
															$statu='<span class="badge bg-danger">İptal Edildi</span>';
														}
														
													?>
													<tr>
														<td><?php echo $data["masaadi"];?></td>	
														<td><?php echo $data["s1ad"];?></td>
														<td><?php echo $data["s2ad"];?></td> 
														<td><?php echo $data["s3ad"];?></td> 
														<td><?php echo $data["s4ad"];?></td> 
														<td><?php echo $data["puan"];?></td> 
														<td class="text-capitalize"><?php echo $data["oyuntipi"];?></td> 
														<td><span class="badge bg-success"><?php echo $data["kazananad"];?></span></td>
														<td><?php echo $data["masanin_kazandigi"];?></td>
														<td><?php echo $statu;?></td>
														<td><?php echo $data["salonadi"];?></td>
														<td><?php echo date('H:i d-m-Y', strtotime($data["tarih"]));?></td> 
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
		</script>
	</body>
</html>					