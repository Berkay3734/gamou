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
		<title>Aktif Masalar</title>
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
													<th>Masa Adı</th>
													<th>SANDALYE 1</th>
													<th>SANDALYE 2</th>
													<th>SANDALYE 3</th>
													<th>SANDALYE 4</th>													
													<th>MASA PUANI</th>
													<th>Oyun Tipi</th>
													<th>Salon</th>													
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
		<!-- core:js -->
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
			var socket = io.connect('https://o.<?php echo $matches[0]?>', {
				transports: ['websocket'],
				upgrade: false, 
				'reconnection':true,   
				secure:true,
				query: {
					usertype:"admin",
					token:"<?php echo $_SESSION["USERKEYZ"];?>"
				}
			});  
			socket.on("masalar", function(data){
				var aktifler="";
				$.each( data.masalar, function( key, value ) {
					var oda = Object.values(data.salonlar).find(x => x.id === parseInt(value.salon));
					var birinci="success";
					var ikinci="success";
					var ucuncu="success";
					var dorduncu="success";
					if(value.san1tip==2){birinci="secondary"};
					if(value.san2tip==2){ikinci="secondary"};
					if(value.san3tip==2){ucuncu="secondary"};
					if(value.san4tip==2){dorduncu="secondary"};
					aktifler+='<tr class="odd">' 
					aktifler+='<td>'+value.masaadi+'</td>  '
					aktifler+='<td><span class="badge bg-'+birinci+'">'+value.san1adminadi+'</span></td>  '
					aktifler+='<td><span class="badge bg-'+ikinci+'">'+value.san2adminadi+'</span></td>  '
					aktifler+='<td><span class="badge bg-'+ucuncu+'">'+value.san3adminadi+'</span></td>  '
					aktifler+='<td><span class="badge bg-'+dorduncu+'">'+value.san4adminadi+'</span></td>  '
					aktifler+='<td>'+value.puan+'</td>                                              '
					aktifler+='<td>'+value.oyuntipi+'</td>                                              '
					aktifler+='<td>'+oda.ad+'</td>                                              '
					aktifler+='<td> '
					aktifler+='<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">'
					aktifler+='<button type="button" onclick="masayamesaj('+value.id+')" class="btn btn-primary">Mesaj Gönder</button>'
					aktifler+='<button type="button" onclick="masayikapat(\''+value.id+'\',\''+value.masaadi+'\')" class="btn btn-danger">Masayı Kapat</button>'
					aktifler+='</div>'
					aktifler+='</td>'
					aktifler+='</tr>                                                                                                     '
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
			function masayamesaj(id){
				Swal.fire({
					input: 'textarea',
					inputLabel: 'Oda Mesajı',
					inputPlaceholder: 'Oda mesajını girin...',
					showCancelButton: true,
					confirmButtonText: 'Gönder', 
					cancelButtonText: 'Vazgeç',					
					}).then((result) => {
					if (result.value) {
						socket.emit("admindenmesajvar",{mesaj:result.value,masa:"masa"+id});
					}	  
				});
			}
			function masayikapat(id,masaadi){
				Swal.fire({
					title: "<span class='text-danger'>"+masaadi+"</span> İsimli masa kapatılacak..",
					text:"Onaylıyor musun?",
					icon:'error',
					showCancelButton: true,
					confirmButtonText: 'Kapat',
					cancelButtonText: 'Vazgeç',
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						socket.emit("masakapat",{masa:id});
					} 
				})
			}
		</script>
		<!-- endinject -->
		<!-- Custom js for this page -->
		<!-- End custom js for this page -->
	</body>
</html>												