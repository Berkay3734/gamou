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
		<title>Aktif Oyuncular</title>
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
													<th>Kullanıcı Kodu</th>
													<th>Puan</th>
													<th>Resim</th>
													<th>Salon</th>
													<th>Kullanıcı Tipi</th>													
													<th>Detay</th>
												</tr>
											</thead>
											<tbody id="aktifler">
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
			var lobi = io.connect('https://o.<?php echo $matches[0]?>', {
				transports: ['websocket'],
				upgrade: false, 
				'reconnection':true,   
				secure:true,
				query: {
					usertype:"admin",
					token:"<?php echo $_SESSION["USERKEYZ"];?>"
				}
			});  
			lobi.on("aktifler", function(data){
				
				var aktifler="";
				$.each( data.oyuncular, function( key, value ) {
					if(value.tip!=2){
						aktifler+='<tr class="odd">'
						aktifler+='<td>'+value.adminadi+'</td>                                                                                        '
						aktifler+='<td>'+value.cinsiyet+'</td>                                                                                        '
						aktifler+='<td>'+value.adsoyad+'</td>                                                                                       '
						aktifler+='<td>'+value.puan+'</td>                                                                                          '
						aktifler+='<td><img src="../'+value.resim+'" alt="'+value.adminadi+'"></td>                                              '
						aktifler+='<td>'+value.odaadi+'</td>                                              '
						if(value.tip==2){
							aktifler+='<td><span class="badge bg-secondary">Bot Oyuncu</span></td>                                              ';
							}else{
							aktifler+='<td><span class="badge bg-success">Normal Oyuncu</span></td>                                              ';
						}
						aktifler+='<td><a type="button" href="uyeguncelle.php?id='+value.id+'" class="btn btn-xs btn-primary">Detay</a></td>   '
						aktifler+='</tr>                                                                                                     '
					}
				});         
				table3.destroy();
				$("#aktifler").html(aktifler);
				table3 =	$('#dataTableExample3').DataTable({
					"bStateSave": true,
					"ordering": false,
					"language": {
						search: "",
						"url":"//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
					}
				});
			});
			</script>
		<!-- endinject -->
		<!-- Custom js for this page -->
		<!-- End custom js for this page -->
	</body>
</html>