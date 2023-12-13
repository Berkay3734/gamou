$(function() {    
	socket = io.connect(socket_url, { 
		transports: ['websocket'],
		upgrade: false, 
		'reconnection':true,   
		secure:true,
		query: {
			oda:hesapbilgilerim.oda,
			token:hesapbilgilerim.token
		}
	}); 
	var aktifoyun = JSON.parse(localStorage.getItem('aktifoyun'));
	socket.emit("giris",{aktifoyun:aktifoyun});
	socket.io.on("reconnect", () => { 
		socket.emit("giris",{aktifoyun:aktifoyun});
	});	
	socket.on("userislemleri", function(data){
		if(data.durum=="error"){
			Toast.fire({icon: 'error',title: data.mesaj}).then((result) => {
				//location.href="./";
			});
		}
		else{
			let timerInterval
			Swal.fire({
				title: 'Dikkat!',
				html: 'Yönetim tarafından <b>'+data.omesaj+'</b><br>Açıklama : <b>'+data.aciklama+'</b>',
				showConfirmButton:true,
				heightAuto:false,
				confirmButtonText: 'Tamam',
				backdrop: 'rgba(0,0,123,0.4)',
				allowOutsideClick:false,
				}).then((result) => {
			})
		}
	});
	socket.on("giris", function(data){
		if(data.durum=="error"){
			$.ajax({
				url: 'logout.php',
				type: 'POST'
			});
			Toast.fire({icon: 'error',title: data.mesaj}).then((result) => {
				location.href="./";
			});
		}
		else if(data.durum=="info"){
			Toast.fire({icon: 'info',title: data.mesaj}).then((result) => {});
		}
		else if(data.durum=="warning"){
			Swal.fire({
				icon: 'error',
				title: 'Dikkat...',
				text: data.mesaj,
				showConfirmButton:false,
				heightAuto:false,
				backdrop: 'rgba(0,0,123,0.4)',
				allowOutsideClick:false
			})
		}
		else{
			$(".profilresmim").attr("src",data.bilgilerim.hesap_detaylari.resim);
			$(".puanim").html(puan(data.bilgilerim.hesap_detaylari.puan));
			$(".seviyem").html(puan(data.bilgilerim.hesap_detaylari.seviye));
			$(".kazandiklarim").html(puan(data.bilgilerim.hesap_detaylari.kazandigi));
			$(".toplamoyunlarim").html(puan(data.bilgilerim.hesap_detaylari.toplamoyun));
			hakkimda=data.bilgilerim;
			if(hakkimda.yetki_durumu){
				contextekle();
			}
		}
	});
	socket.on("ozelmesajtepkiver", function(data){
		$("#send-message-"+data.mesajid).find(".emojitepki").html('<i class="'+data.emoji+'"></i>');
		$("#msms").trigger("play");
	});
	socket.on("ozelmesajat", function(data){
		if($(".messages-list").hasClass( "minimize" )){
			var okunmamismesaj=parseInt($(".messageNotification").text())+1;
			if(okunmamismesaj>0){
				$(".messageNotification").text(okunmamismesaj);
				$(".messageNotification").show();
			}
		}
		if($(".messageBoxBody").attr("data-aliciid")==data.data.gonderici&&!$(".speacial-userMessage-inside").hasClass( "dontshow" )){
			var mesajgovdesi='<div class="taken-message" id="taken-message-'+data.data.mesajid+'">                                                                                '
			mesajgovdesi+='<img src="'+data.gonderen.hesap_detaylari.resim+'" alt="">                                                                  '
			mesajgovdesi+='<p class="text">'+data.data.mesaj+'</p>               ' //bu p nin içine
			mesajgovdesi+='<p class="emojitepki"></p>              ' // bu p ye gerek yok abi bunun içine gelecek olan i bir üstteki p nin içine gelecek
			mesajgovdesi+='<i class="fa-regular fa-face-laugh-squint sendEmoji"></i>                                                  '
			mesajgovdesi+='<div class="emoji-box disable" data-mesajid="'+data.data.mesajid+'">                                                                            '
			mesajgovdesi+='<i class="selectEmoji">&#128514;</i>                                                 '
			mesajgovdesi+='<i class="selectEmoji">&#128150;</i>                                                 '
			mesajgovdesi+='<i class="selectEmoji">&#128077;</i>                                                 '
			mesajgovdesi+='<i class="selectEmoji">&#128549;</i>                                                 '
			mesajgovdesi+='<i class="sikayetet">&#10071;</i>                                               '
			mesajgovdesi+='</div>                                                                                                     '
			mesajgovdesi+='</div>                                                                                                     '
			$(".messageBoxBody").append(mesajgovdesi);
			$("#userMessagelist-"+data.data.gonderici+" .nameSection span").html(data.data.mesaj);
		}
		else if($("#userMessagelist-"+data.data.gonderici).length>0){
			$("#userMessagelist-"+data.data.gonderici+" .nameSection span").html(data.data.mesaj).addClass("KalinYazi");
		}
		else{
			var mesajgovdesi='<div class="special-userMessage" id="userMessagelist-'+data.data.gonderici+'" data-aliciid="'+data.data.gonderici+'">               '
			mesajgovdesi+='<div class="userphoto">                                                                    '
			mesajgovdesi+='<img src="'+data.gonderen.hesap_detaylari.resim+'" alt="">                                               '
			mesajgovdesi+='</div>                                                                                     '
			mesajgovdesi+='<div class="nameSection">                                                                  '
			mesajgovdesi+='<p>'+data.gonderen.hesap_detaylari.username+'</p>                                                                                   '
			mesajgovdesi+='<span class="KalinYazi">'+data.data.mesaj+'</span>                                                                   '
			mesajgovdesi+='</div>                                                                                     '
			mesajgovdesi+='<div class="delete"><i class="fa-solid fa-trash-can"></i></div>                            '
			mesajgovdesi+='</div>                                                                                     '
			$(".messages-list").append(mesajgovdesi);
		}
		$('.messageBoxBody').scrollTop($('.messageBoxBody')[0].scrollHeight);
		$("#msms").trigger("play");
	});
	socket.on("aktifler", function(data){
		aktifkullanicilar(data);
		aktifsalonlar(data);
		aktifmasalar(data);
	});
	socket.on('_masayagelen', function (d,ok,oyuncu){
		var f0_ = _masayagelen(d,ok,hakkimda.sandalye);
		var v1 = _durum(d); 
	});
	socket.on('ciftok', function (data){   
		var h1 = _diz(data,hakkimda.sandalye);
	});
	socket.on('seriok', function (data){   
		var h1 = _diz(data,hakkimda.sandalye);
	});
	socket.on("girencikan", function(data){
		if(data.oyuncu){
			var haberne="";
			var gckullanici=data.oyuncu.hesap_detaylari.username;
			if(data.oyuncu.yetki_durumu){
				gckullanici=gckullanici+" ("+data.oyuncu.yetki_durumu.yetki_adi+")";
			}
			haberne+='<div class="message">                                           '
			haberne+='<span class="name">                                             '
			haberne+='<img src="../assets/images/duyuru.png" alt="Haberci">              '
			haberne+='<span>Haberci:</span>                                           '
			haberne+='</span>                                                         '
			haberne+='<span class="word" style="color:'+data.durum+'">'+gckullanici+data.mesaj+'</span>                               '
			haberne+='</div>		                                                  '
			$("."+data.nereden+"-chat").append(haberne);
		}
		if(data.nereden=="masa"){
			//sandalyeleriayarla(data.masa);
		}
		sohbetlscrollindir();
	});
	socket.on("oyunubaslat", function(data){
		if(data.durum=="success"){
			kontrolcu_.html('<img src="img/'+data.masa.okey+'.png">');
			yerdencekici_.html('<img class="yerdencek" src="img/tasbg.png">');
		}
	});
	socket.on("davetal", function(data){
		let timerInterval
		Swal.fire({
			title: 'Masa\'ya katılma daveti.!',
			html: '<span class="text-bold text-red">'+data.daveteden.username+'</span> Sizi masaya davet ediyor. Onaylıyor musun ?',
			timer: 10000,
			imageUrl: data.daveteden.resim,
			imageHeight: 200,
			customClass: {image:"rounded-circle"},
			timerProgressBar: true,
			showCancelButton: true,
			showConfirmButton: true,
			cancelButtonText: 'Reddet',
			confirmButtonText: 'Kabul Et',
			allowOutsideClick: false,
			heightAuto:false,
			backdrop: 'rgba(0,0,123,0.4)',
			didOpen: () => { 
				timerInterval = setInterval(() => {
					const content = Swal.getHtmlContainer()
					if (content) {
						const b = content.querySelector('b')
						if (b) {
							b.textContent =(Swal.getTimerLeft() / 1000).toFixed(0)
						}
					}
				}, 1000)
			},
			willClose: () => {
			clearInterval(timerInterval)		}
			}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {	
				Toast.fire({
					icon: 'warning',
					title: 'İstek zaman aşımına uğradı..!!'
				})
			}
			else if (result.isConfirmed) {
				socket.emit("davetekatil",data.masa.id);
				swal.close()
			} 
		})
	});
	socket.on("sira_", function(data){
		_sira(data,hakkimda.sandalye);  
	})
	socket.on("elgunsira", function(data){
		_diz(data,hakkimda.sandalye);
		_sira(data.masa,hakkimda.sandalye);
	});
	socket.on('elgun', function (data){
		_diz(data,hakkimda.sandalye);
	});
	socket.on('davetekatil', function (data){
		Toast.fire({icon: data.durum,title: data.mesaj});
	});
	socket.on("elinbu", function(data){		
		_durum(data.masa);
		_diz(data,hakkimda.sandalye);
		_sira(data.masa,hakkimda.sandalye);
	});
	socket.on('gitti', function (k,i,data,oyuncu){
		var v1 = _durum(data);
		$("#mbildiri"+i).remove();
		if(hakkimda.sandalye==1){
			if(k==2){
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
			}
			if(k==3){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
			}
			if(k==4){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))				
			}
		}
		if(hakkimda.sandalye==2){
			if(k==3){
				$("#sagimdaki").fadeIn(-1000);
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
			}
			if(k==4){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
			}
			if(k==1){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))	
			}
		}
		if(hakkimda.sandalye==3){
			if(k==4){
				$("#sagimdaki").fadeIn(-1000);
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
			}
			if(k==1){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
			}
			if(k==2){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))	
			}
		}
		if(hakkimda.sandalye==4){            
			if(k==1){
				$("#sagimdaki").fadeIn(-1000);
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
			}
			if(k==2){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
			}
			if(k==3){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))					
			}
		}
		$(".messages").append('<div class="message message-from-user"><span>'+oyuncu.adsoyad+'</span><p class="text-danger">masadan ayrıldı..</p></div>');
	});
	socket.on("masayarat", function(data){
		if(data.durum=="success"){
			hakkimda.sandalye=data.koltuk;
			hakkimda.masa=data.masa.id;
			$(".table-features__menu--button").click();
			vuk=0,buradan=0,buraya=0;
			var tr = _masaici(data.masa,data.koltuk);
			var fv = _diz(data,data.koltuk);
			var v1 = _durum(data.masa);
			$(".sandalyesira").removeClass("active");
			$(".opponent-experience-level").css("flex-basis","100%");
			$(".opponent-experience-level").css("background-color","#08E220");
			$("#homePage").hide();
			$("#gamePage").show();
			$(".masa-chat").html("");
			$(".masa-chat-button").click();
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj});	
		}
	});		
	socket.on("masadankalk", function(data){
		if(data.durum=="success"){
			swal.close();
			$("#gamePage").hide();
			$("#homePage").show();
			$(".masa-chat").html("");
			$(".lobi-chat-button").click();
			sohbetlscrollindir();
		}
	});	
	socket.on("mesajgonder", function(data){
		if(data.durum=="success"){
			var haberne="";
			var gckullanici=data.oyuncu.hesap_detaylari.username;
			if(data.oyuncu.yetki_durumu){
				gckullanici=gckullanici+" ("+data.oyuncu.yetki_durumu.yetki_adi+")";
			}
			haberne+='<div class="message">                                           '
			haberne+='<span class="name">                                             '
			haberne+='<img src="'+data.oyuncu.hesap_detaylari.resim+'" alt="Haberci">              '
			haberne+='<span>'+gckullanici+':</span>                                           '
			haberne+='</span>                                                         '
			haberne+='<span class="word" style="color:'+data.durum+'">'+data.mesaj+'</span>           '                 
			haberne+='<div class="emoji-box disable" data-mesajid="'+data.mesajid+'">                               '
			haberne+='<i class="selectEmoji">&#128514;</i>                                            '
			haberne+='<i class="selectEmoji">&#128150;</i>                                            '
			haberne+='<i class="selectEmoji">&#128077;</i>                                            '
			haberne+='<i class="selectEmoji">&#128549;</i>                                            '
			haberne+='<i class="sikayetet">&#10071;</i>                                               '
			haberne+='</div>                                                                          '
			haberne+='</div>		                                                  '
			$("."+data.nereden+"-chat").append(haberne);
			sohbetlscrollindir();
			$("#msms").trigger("play");
		}
		else{
			Toast.fire({icon: data.durum,title: data.mesaj});
		}
	});
	socket.on('kazanan', function (data){
		if(data.canakvarmı==1){ 
			Toast.fire({icon: 'success',title: "Tebrikler..!! Çanak Kırıldı :D"});
		} 
		console.log(data);
		//var w0_ = _puanguncelle(data,hakkimda.sandalye);
		var wx_ = _kazan(data);
		_masaici(data.masa,hakkimda.sandalye)
		var v1  = _durum(data.masa);
	});
	socket.on("masayaotur", function(data){
		if(data.durum=="success"){
			hakkimda.sandalye=data.koltuk;
			hakkimda.masa=data.masa.id;
			vuk=0,buradan=0,buraya=0;
			var tr = _masaici(data.masa,data.koltuk);
			var fv = _diz(data,data.koltuk);
			var v1 = _durum(data.masa);
			$(".sandalyesira").removeClass("active");
			$(".opponent-experience-level").css("flex-basis","100%");
			$(".opponent-experience-level").css("background-color","#08E220");
			$("#homePage").hide();
			$("#gamePage").show();
			$(".masa-chat").html("");
			$(".masa-chat-button").click();
			}else{
			Toast.fire({icon: data.durum,title: data.mesaj});	
		}
	});		
});																