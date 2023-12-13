<?php
	ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
	ob_start();
	session_start();
	if (!isset($_SESSION["adminLogin1"]) || !$_SESSION["adminLogin1"]) {
		header("Location: ".htmlspecialchars($_SERVER['HTTP_REFERER']));
	}
	include("baglan.php");
	try {
		$kullanicisayisi = $baglanti->query("SELECT  * from oyuncular where tip=0 and deleted=0")->rowCount();
		$toplamkesilen = $baglanti->query("SELECT  sum(masanin_kazandigi) as toplamkesilen from masa_gecmisi")->fetch(PDO::FETCH_ASSOC);
		$masasayisi = $baglanti->query("SELECT  * from masa_gecmisi")->rowCount();
		$banlikullanicisayisi = $baglanti->query("SELECT  * from oyuncular where tip=0 and deleted=0 and bandurumu=1")->rowCount();
		$hediyesayisi = $baglanti->query("SELECT  * from hediye_gecmisi")->rowCount();
		} catch (PDOException $ex) {
		die($ex->getMessage());
	}
	
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Ana Sayfa</title>
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
				</nav>
				<!-- partial -->
				<div class="page-content">
					<div class="row">
						<div class="col-12 col-xl-12 stretch-card">
							<div class="row flex-grow-1">
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="user-check"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Aktif Gerçek Kullanıcı Sayısı</h5>
											<h3 class="mt-3 mb-3 aktifkullanicisayisi">0</h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="box"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Aktif Masa Sayısı</h5>
											<h3 class="mt-3 mb-3 aktifmasasayisi">0</h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="users"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Kayıtlı Kullanıcı</h5>
											<h3 class="mt-3 mb-3"><?php echo $kullanicisayisi;?></h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="shield-off"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Banlı Kullanıcı Sayısı</h5>
											<h3 class="mt-3 mb-3"><?php echo $banlikullanicisayisi;?></h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="check-circle"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Açılan Masa Sayısı</h5>
											<h3 class="mt-3 mb-3"><?php echo $masasayisi;?></h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="scissors"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Toplam kesilen puan</h5>
											<h3 class="mt-3 mb-3"><?php echo $toplamkesilen["toplamkesilen"];?></h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
								<div class="col-6 col-md-3 grid-margin stretch-card">
									<div class="card">
										<div class="card-body">
											<div class="float-end text-primary">
												<i data-feather="box"></i>
											</div>
											<h5 class="text-muted fw-normal mt-0" title="Number of Customers">Gönderilen Hediye Sayısı</h5>
											<h3 class="mt-3 mb-3"><?php echo $hediyesayisi;?></h3>											
										</div> <!-- end card-body-->
									</div>
								</div>
							</div>
						</div>
					</div> <!-- row -->
					<div class="row">
						<div class="col-12 grid-margin stretch-card">
							<div class="card">
								<div class="card-body">
									<h6 class="card-title">Masa Açılışları</h6>
									<div id="apexBar"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 grid-margin stretch-card">
							<div class="card">
								<div class="card-body">
									<h6 class="card-title">Kullanıcı Açılışları</h6>
									<div id="userBar"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12 grid-margin stretch-card">
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">Top 10 Kullanıcılar</h4>									
									<div class="table-responsive">
										<table class="table table-striped table-sm">
											<thead>
												<tr>
													<th></th>
													<th>Ad Soyad</th>
													<th>Kullanıcı Kodu</th>
													<th>Mail</th>
													<th>Cinsiyet</th>
													<th>Puan</th>
													<th>Detay</th>
												</tr>
											</thead>
											<tbody>
												<?php 
													$datalar = $baglanti->query("SELECT * from oyuncular where tip=0 and deleted=0 order by puan desc limit 0,10");
													while ($data = $datalar->fetch(PDO::FETCH_ASSOC)) {
														$resim="../img/noneuserphoto.jpeg";
														if($data["resim"]!=null&&$data["resim"]!=""){
															$resim="../".$data["resim"];
														}
													?>
													<tr>
														<td class="py-1">
															<img src="<?php echo $resim?>" alt="<?php echo $data["adsoyad"]?>">
														</td>
														<td><?php echo $data["adsoyad"]?></td>
														<td><?php echo $data["username"];?></td>
														<td><?php echo $data["email"];?></td>
														<td><?php echo $data["cinsiyet"];?></td>
														<td><?php echo $data["puan"];?></td>
														<td ><a type="button" href="uyeguncelle.php?id=<?php echo $data["id"];?>" class="btn btn-xs btn-primary" >Detay</a></td>
													</tr>	
												<?php } ?>
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
		<script>
			var masaacilislari=[];
			var useracilislari=[];
		</script>
		<?php
			$nmeng = array('1','2','3','4','5','6','7','8','9','10','11','12');
			$nmtur = array('Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık');
			$masaacilislari = $baglanti->query("select count(*) as sayi,MONTH(tarih) as tarih from masa_gecmisi where tarih >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) GROUP by month(tarih)");
			$useracilislari = $baglanti->query("select count(*) as sayi,MONTH(created) as tarih from oyuncular where deleted=0 and created >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) and tip=0 GROUP by month(created)");
			while ($masaacilisi = $masaacilislari->fetch(PDO::FETCH_ASSOC)) {
				echo "<script>masaacilislari.push({sayi:'".$masaacilisi["sayi"]."',tarih:'".$masaacilisi["tarih"]."'});</script>";
			}
			while ($useracilisi = $useracilislari->fetch(PDO::FETCH_ASSOC)) {
				echo "<script>useracilislari.push({sayi:'".$useracilisi["sayi"]."',tarih:'".$useracilisi["tarih"]."'});</script>";
			}
		?>		
		
		<?php				
			include 'scripts.php';
		?>
		<script src="js/panel.js?v<?php echo rand();?>"></script>
		<script src="assets/vendors/apexcharts/apexcharts.min.js"></script>
		<script>
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
				var normaluser=0;
				var botuser=0;
				$.each( data.oyuncular, function( key, value ) {
					if(value.tip==2){
						botuser++;
						}else{
						normaluser++;
					}
				});
			$(".aktifkullanicisayisi").html(normaluser);
			});
			lobi.on("masalar", function(data){
			
			$(".aktifmasasayisi").html(Object.keys(data.masalar).length);
			});
			</script>
			</body>
			</html>							 																																																				