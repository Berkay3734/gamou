function client(){
	baglan = io.connect('https://t.'+site_linki, { 
		transports: ['websocket'],
		upgrade: false, 
		'reconnection':true,   
		secure:true,
		query: {
			oda:hesapbilgilerim.oda,
			token:hesapbilgilerim.token,
			usertype:hesapbilgilerim.usertype, 
			//cinsiyet:cinsiyet
		}
	});  
	ke=localStorage.getItem("USERKEYZ");
	var aktifoyun = JSON.parse(localStorage.getItem('aktifoyun'));
	baglan.emit("giris",{aktifoyun:aktifoyun}, function (data1,data2,data3,data4,re,a,us,eniyiler){});
	baglan.on("masalardakioyuncular", function(data){
		$(".masa-number").html("-");
		$.each( data.masalar, function( key, value ) {
			/*
				if(value.san1!=0){
				$(".salonda"+value.san1).find(".masa-number").html(value.masaadi);
				}
				if(value.san2!=0){
				$(".salonda"+value.san2).find(".masa-number").html(value.masaadi);
				}
				if(value.san3!=0){
				$(".salonda"+value.san3).find(".masa-number").html(value.masaadi);
				}
				if(value.san4!=0){
				$(".salonda"+value.san4).find(".masa-number").html(value.masaadi);
				}
			*/
			$(".salonda"+value.san1).find(".masa-number").html(value.id);
			$(".salonda"+value.san2).find(".masa-number").html(value.id);
			$(".salonda"+value.san3).find(".masa-number").html(value.id);
			$(".salonda"+value.san4).find(".masa-number").html(value.id);  
		});
	});
	baglan.on("masalar", function(data){
		_masalar(data.masalar);
	});
	baglan.on("hediye-puan-gonderildi", function(data){
		Toast.fire({icon: "success",title: "<span class='text-success text-bold'>"+data.gonderici+"</span> Sana "+data.puan+" puan gönderdi..!!"}).then(function() {
		});	
	});
	baglan.on("anlikuyeislemleri", function(data){
		if(data.islem=="uyeyisistemdenat"){
			Toast.fire({icon: "error",title: "Sistemden atıldınız..!!"}).then(function() {
				location.href = "logout.php";
			});	
		}
		else if(data.islem=="uyeyisalondanat"){
			Toast.fire({icon: "error",title: "Salondan atıldınız..!!"}).then(function() {
				location.href = "logout.php";
			});	
		}
		else if(data.islem=="salondanbanla"){
			Toast.fire({icon: "error",title: '<span class="text-danger">'+data.data.banlayan+"</span> Tarafından Salondan Banlandınız..!!<br>Ban Sebebi : "+data.data.aciklama}).then(function() {
				location.href = "logout.php";
			});	
		}
		else if(data.islem=="sistemdenbanla"){
			Toast.fire({icon: "error",title: '<span class="text-danger">'+data.data.banlayan+"</span> Tarafından Sistemden Banlandınız..!!<br>Ban Sebebi : "+data.data.aciklama}).then(function() {
				location.href = "logout.php";
			});	
		}
	});
	baglan.on("giris", function(data){
        if(data.durum=="success"){
			salondakiler.html("");  
			var hangiOyuncular=0;			
			altlimit=data.altlimit;
			ustlimit=data.ustlimit;
			var x4 = _totaloyuncu(data.online);
			var x2 = _oyuncular(data.oyuncular);
			var x1 = _profil(data.post);
			if(hakkimda.yetkiler!=""&&hakkimda.yetkiler!=undefined){ 
				uyeislemleri(data.oyuncular);
				}else{
				$("#adminislemmenu").hide();
			}
			var x0 = _masalar(data.masalar);
			oyuncular = data.oyuncular;
			if(data.post.yfoto==1){
				$(".__tm3").fadeIn(-1000);
				}else{
				$(".__tm3").fadeOut(-1000);
			}
			Swal.close();
			//setTimeout("Swal.close()", 1600);
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj});	
		}
	});
	baglan.on("lisanserror", function(data){
		Swal.fire({
			icon: 'error',
			title: 'Lisans Hatası..',
			text: data.mesaj,
			confirmButtonText: 'Kapat'
		})
	});
	baglan.on("arkadasolalim", function(data){
		if(data.islem=="ekle"){
			Swal.fire({
				title: data.teklifeden,
				text: "İsimli Kullanıcı arkadaşlık isteği gönderdi.. Onaylıyor musunuz?",
				showDenyButton: true,
				//icon: 'question',
				customClass: 'swal-wide',
				imageUrl: data.teklifedenresim,
				imageWidth: 300,
				imageHeight: 300,
				showCancelButton: false,
				confirmButtonText: 'Kabul Et',
				denyButtonText: 'Reddet'
				}).then((result) => {
				if (result.isConfirmed) {
					$.ajax({
						url: 'php/islemler.php',
						type: 'POST',
						dataType: 'json',
						data:{
							islem:"arkadas_islemleri",
							neolacak:"kabul_et",
							id:data.teklifedenid	
						},
						success: function(data1, textStatus, jqXHR)
						{
							if(data1.durum=="success"){
								Toast.fire({icon: 'success',title: "Kabul edildi.."});	
								baglan.emit("arkadasolalim",{islem:"success",cevaplayan:hakkimda.adsoyad,alici:data.teklifedenid});
								}else{
								Toast.fire({icon: data1.durum,title: data1.mesaj});	
							}
						}
					});
					}else if (result.isDenied) {
					$.ajax({
						url: 'php/islemler.php',
						type: 'POST',
						dataType: 'json',
						data:{
							islem:"arkadas_islemleri",
							neolacak:"reddet",
							id:data.teklifedenid	
						},
						success: function(data1, textStatus, jqXHR)
						{
							if(data1.durum=="success"){
								Toast.fire({icon: "info",title: "Reddedildi.."});	
								baglan.emit("arkadasolalim",{islem:"error",cevaplayan:hakkimda.adsoyad,alici:data.teklifedenid});
							}
						}
					});
				}
			})
			}else if(data.islem=="error"){
			Toast.fire({icon: "error",title: data.cevaplayan+" arkadaşlık isteğini reddetti.."});	
			}else if(data.islem=="success"){
			Toast.fire({icon: "success",title: data.cevaplayan+" arkadaşlık isteğini kabul etti.."});	
		}
	});
	baglan.on("oyuncu-guncelle", function(data){
		if(data.alici.id==hakkimda.id){
			_profil(data.alici);
			}else if(data.gonderici.id==hakkimda.id){
			_profil(data.gonderici);
		}
		_oyuncular(data.oyuncular);
		oyuncular = data.oyuncular;
	});
	baglan.on("gunceluyeler", function(data){
		_oyuncular(data.oyuncular);
		oyuncular = data.oyuncular;
		if(data.gunceluye.id==hakkimda.id){
			_profil(data.gunceluye);
		}
	});
	baglan.on("banlandin", function(data){
		_oyuncular(data.oyuncular);
		oyuncular = data.oyuncular;
		Toast.fire({icon: 'warning',title: "Banlandın. Oturumdan çıkılıyor..!!"}).then((result) => {
			window.location.href = "logout.php";
		})
	});
	baglan.on("masaayarguncelle", function(data){
		if(data.masasohbeti==false){
			$(".chat").addClass("d-none");
			}else {
			$(".chat").removeClass("d-none");
		}
	});
	baglan.on("salonlar", function(data){
		const counts = {};
		oyuncular=data.oyuncular;
		$.each( oyuncular, function( key, value ) {
			counts[value["oda"]] = (counts[value["oda"]] || 0) + 1;
		});
		var test=[];
		$.each( data.salonlar, function( key, value ) {
			var online=0;
			if(counts[value.id]){
				online=counts[value.id];
			}
			test.push({
				id:value.id,
				enaz:value.enaz,
				ad:value.ad,
				online:online,
				alt:value.alt,
				ust:value.ust
			});
		});
		test.sort(function(a,b) {
			return a.enaz - b.enaz;
		});
		$(".salonlar").html("");
		var hangiSalonlar='<div class="oda oda-title"><h3>Oda</h3><h3>Oynayan</h3><h3>Min. Giriş</h3><h3>Bahis Aralığı</h3></div>';
		test.forEach((value, index) => {
			var pn1    =   puan(value.enaz);
			var pn2    =   puan(value.alt);
			var pn3    =   puan(value.ust);
			hangiSalonlar+='<ul class="oda" tik="'+value.id+'"><h3>'+value.ad+'</h3><p>'+value.online+' <img src="images/users.png"></p><p>'+pn1+'</p><p>'+pn2+' - '+pn3+' ÇİP</p></ul>';
		});
		$(".salonlar").html(hangiSalonlar);
	});
	baglan.on("erdem", function(data){
		console.log(data);
	});
	baglan.io.on("reconnect", () => {
		//setTimeout(function (){
		swal.close();
		var aktifoyun = JSON.parse(localStorage.getItem('aktifoyun'));
		baglan.emit("gerigeldim",{serial:localStorage.getItem("umail"),aktifoyun:aktifoyun}, function (){});
		//}, 10000);
	});
	baglan.on("gerigeldim", function(data){
		baglan.emit("Giris",{serial:localStorage.getItem("umail"),aktifoyun:aktifoyun}, function (data1,data2,data3,data4,re,a,us,eniyiler){
			if(data1 && data2 && data3 && data4){
				salondakiler.html("");  
				var hangiOyuncular=0;
				$.each( eniyiler, function( key, value2 ) {
					var oyuncuPuanDuzenle=puan(value2.puan);
					var resim=value2.resim;
					if(value2.resim==""){
						resim="img/noneuserphoto.jpeg"
					}
					if(hangiOyuncular==0){
						hangiOyuncular ='<tr class="salonda'+value2.id+'" tik="'+value2.tik+'"><td><p><img src="'+resim+'">'+value2.adsoyad+'</p></td><td><p class="fiyat">'+value2.seviye+'</p></td><td><button class="buy-button">'+oyuncuPuanDuzenle+'</button></td></tr>';
						}else{
						hangiOyuncular +='<tr class="salonda'+value2.id+'" tik="'+value2.tik+'"><td><p><img src="'+resim+'">'+value2.adsoyad+'</p></td><td><p class="fiyat">'+value2.seviye+'</p></td><td><button class="buy-button">'+oyuncuPuanDuzenle+'</button></td></tr>';
						//hangiOyuncular ="<ul class='salonda"+value2.id+"' tik='"+value2.tik+"'><li class='listefotosu'><img src='"+resim+"' style='width:35px;height:35px;'></li><div class='liststart'>"+value2.seviye+"</div><li class='listenicki'><div class='miniin'>"+value2.adsoyad+"</div></li><li class='listeicon'><div class='miniin'><img src='./img/minibonus.png'></div></li><li class='listepuani'><div class='miniin'>"+oyuncuPuanDuzenle+"</div></li></ul>" + hangiOyuncular;
					}
				});
				$("#eniyilist").html(hangiOyuncular);
				altlimit=a;
				ustlimit=us;
				var x4 = _totaloyuncu(data4);
				var x2 = _oyuncular(data2);
				var x1 = _profil(data1);
				var x0 = _masalar(data3);
				oyuncular = data2;
				if(data1.yfoto==1){
					$(".__tm3").fadeIn(-1000);
					}else{
					$(".__tm3").fadeOut(-1000);
				}
				}else{
				Toast.fire({icon: 'warning',title: re});		
			}
		});	
	});
	baglan.on("sohbetitemizle", function(data){
		if(data.durum=="success"){
			$(".messages").html("");
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj});		
		}
	});
	baglan.on("ozelmesajat", function(data){
		if ( $(".ozel-mesaj-user-"+data.gonderici).length){
			$(".ozel-mesaj-user-"+data.gonderici).find(".ozel-mesaj-search-last-message").html(data.mesaj);
			if (!$(".ozel-mesaj-container.ozel-mesaj-user-"+data.gonderici).length){
				$(".ozel-mesaj-user-"+data.gonderici).find(".ozel-mesaj-search-last-message").addClass("fw-bold");
				}else{
				$.ajax({
					url: 'php/islemler.php',
					type: 'POST',
					dataType: 'json',
					data:{
						islem:"okunduyap",
						gonderici:data.gonderici,
						alici:hakkimda.id
					}
				});
			}
			var gondericiresmi="img/noneuserphoto.jpeg";
			if(data.gondericiresmi!="" && data.gondericiresmi!=null){
				gondericiresmi=data.gondericiresmi;
			}
			$(".ozel-mesaj-container.ozel-mesaj-user-"+data.gonderici).append('<div class="ozel-mesaj mesaj-from-other"><img src="'+gondericiresmi+'"><span>'+data.mesaj+'</span></div>');
			$('.ozel-mesaj-container').scrollTop($('.ozel-mesaj-container')[0].scrollHeight);
			}else{
			var sohbetekle="";
			sohbetekle+='<div class="ozel-mesaj-user ozel-mesaj-user-'+data.gonderici+'" data-aliciid="'+data.gonderici+'"> '
			sohbetekle+='<div>                                                                                                              '
			sohbetekle+='<img class="" src="'+data.gondericiresmi+'">                                                               '
			sohbetekle+='</div>                                                                                                             '
			sohbetekle+='<div>                                                                                                              '
			sohbetekle+='<p class="ozel-mesaj-search-isim">'+data.gondericiadi+'</p>                                     '
			sohbetekle+='<p class="ozel-mesaj-search-last-message fw-bold">'+data.mesaj+'</p>                                         '
			sohbetekle+='</div>                                                                                                             '
			sohbetekle+='<div>                                                                                                              '
			sohbetekle+='<i class="bi bi-circle-fill online status"></i>                                                                   '
			sohbetekle+='</div>                                                                                                             '
			sohbetekle+='</div>                                                                                                             '
			$(".ozel-mesaj-search").append(sohbetekle);
			$(".ozel-mesaj-user-"+$(this).attr("data-alici")).click();
		}
	});
	baglan.on("aktifoyun", function(data){
		Swal.fire({
			title: 'Yarım kalan oyunun var devam etmek ister misin?',
			showDenyButton: true,
			showCancelButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText: 'Devam Et',
			denyButtonText: 'Vazgeç',
			}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				baglan.emit("oturmatalebi",data.masaid,data.sandalye);
				} else if (result.isDenied) {
				localStorage.removeItem("aktifoyun");
			}
		})
	});
	baglan.on("davetal", function(data,e,y){
		deden=e;
		dyer=y;
		//$(".davetvar").fadeIn(-1000).addClass('animated bounceIn');
		//$("#davetvar").modal("show");
		$(".davetbilgileri").html("<b>"+e+" davet ediyor</b><br>Masaya katılmak istermisin?");
		hevar.play();
	});
	baglan.on("oyuncuekle", function(data){
		console.log(data);
		//oyuncular[data.id]=data;
	});
	baglan.on("sayfayenile", function(data){
		Toast.fire({icon: 'warning',title: "Başka bir sayfada oturumunuz açık. Oturumdan çıkılıyor..!!"}).then((result) => {
			window.location.href = "logout.php";
		})
	});
	/*
		baglan.on("yft", function(data){
		if(data==hakkimda.id){
		location.reload();
		}
		});
	*/
	baglan.on("anlikuyebildirimi", function(data){
		if(data.durum=="success"){
			if(data.islem=="uyeyisalondanat"||data.islem=="uyeyisistemdenat"){
				$(".messages").append('<div class="message message-from-user"><span class="text-danger">'+data.data.banlanan+'</span><p >nickli kullanıcı <span class="text-success">'+data.data.banlayan+'</span> <span class="text-danger">tarafından atıldı..</span></p></div>');
				}else if(data.islem=="salondanbanla"||data.islem=="sistemdenbanla"){
				$(".messages").append('<div class="message message-from-user"><span class="text-danger">'+data.data.banlanan+'</span><p >nickli kullanıcı <span class="text-success">'+data.data.banlayan+'</span> <span class="text-danger">tarafından '+data.data.aciklama+' sebebiyle banlandı..</span></p></div>');
			}
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj})
		}
	});
	baglan.on("yetkired", function(data,online,oyuncular){
		Toast.fire({icon: data.durum,title: data.mesaj})
	});
	baglan.on("sohbetackapa", function(data){
		if(data.islem==true){
			$(".messages").append('<div class="message message-from-user"><span class="text-danger">'+data.yapan+'</span><p >sohbeti açtı..</p></div>');
			}else{
			$(".messages").append('<div class="message message-from-user"><span class="text-danger">'+data.yapan+'</span><p >sohbeti kapattı..</p></div>');
			
		}
	});
	baglan.on("giren", function(data,online,oyuncular){
		_gelen(data);
		_totaloyuncu(online);
		_oyuncular(oyuncular);
		$(".ozel-mesaj-user-"+data.id).find(".status").removeClass("offline").addClass("online");
	});
	baglan.on("cikan", function(data,online,masa,oyuncular){
		$(".ozel-mesaj-user-"+data).find(".status").removeClass("online").addClass("offline");
		if($(".salonda"+data)){$(".salonda"+data).remove();}
		r2=_totaloyuncu(online);
		if(oyuncular[data]){
			var yetki="";
			if(oyuncular[data].yetki!=""){
				yetki=yetki=" ("+oyuncular[data].yetki+")";
			}
			$(".messages").append('<div class="message message-from-user"><span>'+oyuncular[data].adsoyad+''+yetki+'</span><p class="text-danger">salondan ayrıldı..</p></div>');
			delete oyuncular[data];
		}
	});
	baglan.on("hediyevar", function(s,d,b,o){
		$(".messages").append("<ul style='color:white;'>"+b+", "+o+" için hediye ("+d.adi+") aldı.</ul>").animate({ scrollTop: eval($(document).height()) * eval($(document).height()) }, 10);
		var rx0 = _hediyeat(s,d.resim);
		if(hakkimda.id==s){
			Toast.fire({icon: "success",title: "<span class='text-success text-bold'>"+b+"</span> Sana "+d.adi+" isimli hediyeyi gönderdi..!!"}).then(function() {});	
		}
	});
	baglan.on('sira_', function (data){ 
		var vt=_sira(data,hakkimda.sandalye);  
	});
	baglan.on('girilemez', function (data){
		var zk = _girilemez(data);
	});
	baglan.on('girilemez2', function (data){
		var zk = _girilemez2(data);
	});
	baglan.on('ciftred', function (){
		//$(".messages").append("<ul style='color:#D1214E;'>Oyun başlamadan çifte gidemezsiniz..</ul>").animate({ scrollTop: eval($(document).height()) * eval($(document).height()) }, 10);
		//$(".ciftegit").fadeIn(-1000);
		Toast.fire({icon: 'warning',title: "Oyun başlamadan çifte gidemezsiniz.."});
	});
	baglan.on('ciftok', function (c,data,yeniel){ 
		var h1 = _diz(yeniel,hakkimda.sandalye);
		//Toast.fire({icon: 'success',title: data+" Çifte gidiyor"});
	});
	baglan.on('seriok', function (c,data,yeniel){   
		var h1 = _diz(yeniel,hakkimda.sandalye);
		//Toast.fire({icon: 'success',title: data+" Seri gidiyor"});
	});
	baglan.on('serired', function (){
		//$(".messages").append("<ul style='color:#D1214E;'>Oyun başlamadan çifte gidemezsiniz..</ul>").animate({ scrollTop: eval($(document).height()) * eval($(document).height()) }, 10);
		//$(".ciftegit").fadeIn(-1000);
		Toast.fire({icon: 'warning',title: "Oyun başlamadan seri gidemezsiniz.."});
	});
	baglan.on('user', function (data){ 
		var o1 = _user(data);
	});
	baglan.on('kuery', function (data,ftip){
		localStorage.setItem('aktifoyun', JSON.stringify({oyunid:data.id,sandalye:hakkimda.sandalye}));	
		//terscevirilenler=[];
		var v1 = _durum(data);
		var h1 = _diz(data,hakkimda.sandalye);
		var mm = _sira(data,hakkimda.sandalye);
		if(ftip==1){
			var w0_ = _puanguncelle(data,hakkimda.sandalye);
		}
		oyunbasladi.play();
	});
	baglan.on('elgun', function (e,data){
		if(e==hakkimda.sandalye){
			var h1 = _diz(data,hakkimda.sandalye);
		}
	});
	baglan.on('elgunsira', function (e,data){
		if(e==hakkimda.sandalye){
			var ha = _diz(data,hakkimda.sandalye);
		}
		var va=_sira(data,hakkimda.sandalye);
	});
	baglan.on('birmasa', function (data){
		var g1 = _yeniBirMasa(data);
	});
	baglan.on('oyundurumu', function (data){
		var v1 = _durum(data);
	});
	baglan.on('mesajred', function (data){ 
		Toast.fire({icon: data.durum,title: data.mesaj});
	});
	baglan.on('masagiris', function (data){
		if(data.durum=="success"){
			exitTableFeatures();
			$("#homePage").hide();
			$("#gamePage").show();
			$(".players-in-game").fadeIn(-1000);
			//$("#davet").modal("show"); 
			hakkimda.sandalye=data.koltuk;
			hakkimda.masa=data.masa.id;
			vuk=0,buradan=0,buraya=0;
			var tr = _masaici(data.masa,data.koltuk);
			var fv = _diz(data.masa,data.koltuk);
			var v1 = _durum(data.masa);
			$(".messages").html(""); 			
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj});
		}
	});
	baglan.on('masadankalk', function (data1,data2,oyuncu){
		hakkimda.masa=0;
		hakkimda.sandalye=0;
		elPrint=false;
		$(".sagalan").fadeIn(-1000);
		$(".solalan").fadeIn(-1000);
		sayfa2.fadeOut(-1000);
		$(".players-in-game").fadeOut(-1000);
		//$("#davet").modal("hide");
		sayfa1.fadeIn(-1000);	
		localStorage.removeItem("aktifoyun");
		var x2_ = _oyuncular(data1);
		var x0_ = _masalar(data2);		
		$(".messages").html(""); 
	});
	baglan.on('masaguncelle', function (data){
		var x0_ = _masalar(data.masalar);
	});
	baglan.on('mesaj', function (b,d){
	var w0_ = _masayamesaj(b,d);
	});
	baglan.on('kazanan', function (m,data,mi,sontas,okey,okeyim,nasilbitti,canakvarmı){
	if(canakvarmı==1){ 
	Toast.fire({icon: 'success',title: "Tebrikler..!! Çanak Kırıldı :D"});
	} 
	//var w0_ = _puanguncelle(data,hakkimda.sandalye);
	var wx_ = _kazan(m,data);
	var v1  = _durum(data);
	if(m==hakkimda.sandalye){
	var c2  = _seviyeHali(mi);
	}
	//$("#davet").modal("hide"); 
	});
	baglan.on('puanguncelle', function (d){
	var w0_ = _puanguncelle(d,hakkimda.sandalye);
	});
	baglan.on('_masayagelen', function (d,ok,oyuncu){
	var f0_ = _masayagelen(d,ok,hakkimda.sandalye);
	var v1 = _durum(d); 
	$(".messages").append('<div class="message message-from-user"><span>'+oyuncu.adsoyad+'</span><p class="text-success">masaya girdi..</p></div>');
	});
	baglan.on('yeryok', function (){
	klick.play();
	pencere.fadeIn(-1000);
	_p5.fadeIn(-1000).addClass('animated zoomIn');
	$("#puandegeri").val("Min: "+altlimit+" Max: "+ustlimit);
	});
	baglan.on('gitti', function (k,i,data,oyuncu){
	var v1 = _durum(data);
	$("#mbildiri"+i).remove();
	if(hakkimda.sandalye==1){
	if(k==2){$("#sagimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==3){$("#karsimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==4){$("#solumdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	}
	if(hakkimda.sandalye==2){
	if(k==3){$("#sagimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==4){$("#karsimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==1){$("#solumdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	}
	if(hakkimda.sandalye==3){
	if(k==4){$("#sagimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==1){$("#karsimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==2){$("#solumdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	}
	if(hakkimda.sandalye==4){            
	if(k==1){$("#sagimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==2){$("#karsimdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	if(k==3){$("#solumdaki").html('<img class="fotograf" fototik="'+data["san"+k]+'" src="'+data["san"+k+"fb"]+'"><div><span>'+data["san"+k+"ad"]+'</span><span class="score">'+data["san"+k+"puan"]+'</span><div class="oturanhediye" id="he'+data["san"+k+"hediye"]+'"><img src="'+data["san"+k+"hediye"]+'"></div></div>');}
	}
	$(".messages").append('<div class="message message-from-user"><span>'+oyuncu.adsoyad+'</span><p class="text-danger">masadan ayrıldı..</p></div>');
	});
	baglan.on('salonakalkti', function (m,s){
	$("#ot"+m+"_"+s).html("<img src='images/otur.png' style='border:2px solid red;'>");
	});
	baglan.on('yetersizpuan', function (s){
	if(hakkimda.sandalye==s){
	location.reload();
	}
	});
	baglan.on('salonaoturdu', function (m,s,d){
	if(d.fbid==null){
	d.fbid="img/noneuserphoto.jpeg";
	}
	$("#ot"+m+"_"+s).html("<img src='"+d.fbid+"' style='width:44px;height:42px;border-radius:6px;' id='oturuyor"+d.id+"'>");
	});
	baglan.on("disconnect", function(){
	Swal.fire({
	title: 'Bağlantınız Koptu.. Lütfen bağlantınızı kontrol edin!',
	icon: 'warning',
	showConfirmButton: false,
	allowOutsideClick: false,
	allowEscapeKey: false
	})
	setTimeout(function(){
	//location.reload();
	},1500);
	});
	baglan.on('lobi', function (){
	$(".sagalan").fadeOut(-1000);
	$(".solalan").fadeOut(-1000);
	$(".sayfa2").fadeOut(-1000);
	$(".sayfa1").fadeIn(-1000);
	});
	baglan.on('admindenmesajvar', function (data){
	Toast.fire({icon: 'info',title: data.mesaj});  
	});
	baglan.on('masakapat', function (data){
	Toast.fire({icon: 'error',title: data.mesaj}).then((result) => {
	location.reload();
	});
	});
	baglan.on("salonislemleri", function(data){
	if(data.islem=="salonsil"){
	Toast.fire({icon: "warning",title: data.oda+" Silindi..!! "+data.yeniodaadi+" Salonuna yönlendiriliyorsunuz..!!"}).then((result) => {
	window.location.href = "./oyun.php?salon="+data.yenioda; 
	})
	}
	});
	baglan.on("salonagir", function(data){
	if(data.durum=="success"){
	Toast.fire({icon: data.durum,title: data.mesaj+" Salonuna yönlendiriliyorsunuz..!!"})
	//setTimeout(window.location.href = "./oyun.php?salon="+data.url , 2000);  
	setTimeout(function(){window.top.location="./oyun.php?salon="+data.url} , 2000);
	}else{
	if(data.yonlendir){
	Toast.fire({icon: data.durum,title: data.mesaj+" "+data.yonlendir.ad+" Salonuna yönlendiriliyorsunuz..!!"}).then((result) => {
	window.location.href = "./oyun.php?salon="+data.yonlendir.url; 
	})
	}else{
	Toast.fire({icon: data.durum,title: data.mesaj})  
	}
	}
	});
	baglan.on("salonislemleri", function(data){
	Toast.fire({icon: "error",title: "Bu salon silinmiştir.. "+data.yeniodaadi+" Salonuna yönlendiriliyorsunuz..!!"}).then((result) => {
	window.location.href = "./oyun.php?salon="+data.yenioda; 
	})
	});
	}
	window.onload = client;			 																																																																																												