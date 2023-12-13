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
		<title>Satınalma Geçmişi</title>
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
													<th>Kullanıcı</th>
													<th>Tutar (TL)</th>
													<th>Altın Miktarı</th>
													<th>Paket Adı</th>
													<th>Banka</th>
													<th>Tarih</th>
													<th>Onaylayan</th>
													<th>Onay Tarihi</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$datalar = $baglanti->query("SELECT satinalma_gecmisi.*,(select username from oyuncular where id=satinalma_gecmisi.userid) as adsoyad 
													,(select username from oyuncular where id=satinalma_gecmisi.onaylayan) as onaylayan_adi
													from satinalma_gecmisi where statu=1 order by tarih desc");
													while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
													?>
													<tr>
														<td><?php echo $data["adsoyad"];?></td>
														<td><?php echo $data["tutar"];?></td> 
														<td><?php echo $data["coin_miktari"];?></td> 
														<td><?php echo $data["paket_adi"];?></td> 
														<td><?php echo $data["banka"];?></td> 
														<td><?php echo date('d-m-Y H:i', strtotime($data["tarih"]));?></td> 
														<td><?php echo $data["onaylayan_adi"];?></td> 
														<td><?php echo date('d-m-Y H:i', strtotime($data["onay_tarihi"]));?></td> 
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