var sandalyem="";
var username="";
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
	
	socket.on("aktifler", function(data){
		aktifkullanicilar(data);
		aktifsalonlar(data);
		aktifmasalar(data);
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
	
	socket.on("masayaotur", function(data){
		if(data.durum=="success"){
			$(".player-hand-container>.user").html($("#adim").val());
			$("#masamodal").modal("show");
			sandalyem=data.sandalyem;
			username=data.username;
		}
		else{
			alert(data.mesaj);
		}
	});	
	
	socket.on("lisanserror", function(data){
	alert(data.mesaj);
});
socket.on("yereat", function(data){
	kagitlariguncelle(data);
	cardToGround(data.kart,data.sandalye,data.yereatilanlar);
	elimiguncelle(data.masa);
	if(data.masa.eslibilgisi&&data.masa.ihalesahibi==sandalyem){
		esiminelinigoster(data.masa);
	}
});
socket.on("oyunbitti", function(data){
	var sonuclar="";
	for (var oyuncu in data.masa.oyuncular) {
		if(data.masa.oyuncular[oyuncu].user!=""){
			sonuclar+='<div class="total-comp1"><h3>'+data.masa.oyuncular[oyuncu].user+'</h3>';
			for (var skor in data.masa.skorlar) {
				sonuclar+='<p>'+data.masa.skorlar[skor][oyuncu]+'</p>';
			}
			sonuclar+='</div>';
		}
	}
	$(".total-results-wrapper").html(sonuclar);
	$("#again-btn").show();
	$(".total-result-screen").css("display","grid");
});
socket.on("elbitti", function(data){
	groundCards.forEach(cards => cards.style.background = "transparent")
	groundHand = [];
	var sonuclar="";
	for (var oyuncu in data.masa.oyuncular) {
		if(data.masa.oyuncular[oyuncu].user!=""){
			sonuclar+='<div class="total-comp1"><h3>'+data.masa.oyuncular[oyuncu].user+'</h3>';
			for (var skor in data.masa.skorlar) {
				sonuclar+='<p>'+data.masa.skorlar[skor][oyuncu]+'</p>';
			}
			sonuclar+='</div>';
		}
	}
	$(".total-results-wrapper").html(sonuclar);
	$("#again-btn").hide();
	$(".total-result-screen").css("display","grid");
	elpuanlariniguncelle(data);
});
socket.on("yenielbaslat", function(data){
	$(".total-result-screen").css("display","none");	
	dealCards(data.masa.oyuncular[sandalyem].el);	
	ihalesayilariniguncelle(data);
});
socket.on("elgec", function(data){
	groundCards.forEach(cards => cards.style.background = "transparent")
	groundHand = [];
	if(sandalyem!=data.sira){
		playerCards.forEach(card => {
			card.style.filter = "brightness(0.5)";
			card.removeEventListener('click', playerDropCard);
		})
		}else{
		playerCards.forEach(card => card.style.filter = 'none')
		playerCards.forEach(card => card.addEventListener('click', playerDropCard))
	}
	elpuanlariniguncelle(data);
});
socket.on("esimeelgec", function(data){
	computer2Cards =  document.querySelectorAll('.computer2-card');
	groundCards.forEach(cards => cards.style.background = "transparent")
	groundHand = [];
	if(sandalyem!=data.sira){
		computer2Cards.forEach(card => {
			card.style.filter = "brightness(0.5)";
			card.removeEventListener('click', playerDropCard1);
		})
		}else{
		computer2Cards.forEach(card => card.style.filter = 'none')
		computer2Cards.forEach(card => card.addEventListener('click', playerDropCard1))
	}
	elpuanlariniguncelle(data);
});
socket.on("esininyerineoyna", function(data){
	if(data.masa.eslibilgisi&&data.masa.ihalesahibi==sandalyem){
	esiminsirasi=data.sira;
	playableCardses(data.koz,data.masa.oyuncular[esiminsirasi].el,esiminsirasi);
	}
});
socket.on("sirakimde", function(data){
	if(sandalyem!=data.sira){
		playerCards.forEach(card => {
			card.style.filter = "brightness(0.5)";
			card.removeEventListener('click', playerDropCard);
		})
		}else{
		playableCards(data.koz);
	}
});
socket.on("ihalever", function(data){
	ihalesayilariniguncelle(data);
	if(sandalyem==data.sira){
		Swal.fire({
			title: 'İhaleye girecek misin?',
			icon: 'question',
			input: 'range',
			inputLabel: 'İhale Sayısı',
			confirmButtonText:'İhaleye gir',
			showCancelButton: true,
			cancelButtonText:"Pas Geç",
			allowOutsideClick:false,
			inputAttributes: {
				min: data.masa.minihale,
				max: 13,
				step: 1
			},
			inputValue: data.masa.minihale,
			}).then(function (result) {
			if (result.isConfirmed) {
				socket.emit("ihalever",{ihale:result.value});
			}
			else {
				socket.emit("ihalever",{ihale:0});
			}
		})
	}
});
socket.on("ihalekimde", function(data){
	if(sandalyem==data.sira){
		$("#kozsecmodal").modal("show");
	}
});
socket.on("kozumbu", function(data){
	if(data.masa.eslibilgisi&&data.masa.ihalesahibi==sandalyem){
		esiminelinigoster(data.masa);
	}
});
socket.on("oyunbasladi", function(data){
	dealCards(data.masa.oyuncular[sandalyem].el);
	ihalesayilariniguncelle(data);
});
socket.on("masayarat", function(data){	
	if(data.durum=="success"){	
		$("#masayaratmodal").modal("hide");
		$(".player-hand-container>.user").html($("#adim").val());
		$("#masamodal").modal("show");
		sandalyem=data.sandalyem;
		username=data.username;
	}
	else{
		alert(data.mesaj);
	}
});	
socket.on("masaguncelle", function(data){
	if(sandalyem==1){		
		$(".computer1-hand-container>.user").html(data.masa.oyuncular[2].user);
		$(".computer2-hand-container>.user").html(data.masa.oyuncular[3].user);
		$(".computer3-hand-container>.user").html(data.masa.oyuncular[4].user);
	}
	else if(sandalyem==2){
		$(".computer1-hand-container>.user").html(data.masa.oyuncular[3].user);
		$(".computer2-hand-container>.user").html(data.masa.oyuncular[4].user);
		$(".computer3-hand-container>.user").html(data.masa.oyuncular[1].user);
	}
	else if(sandalyem==3){
		$(".computer1-hand-container>.user").html(data.masa.oyuncular[4].user);
		$(".computer2-hand-container>.user").html(data.masa.oyuncular[1].user);
		$(".computer3-hand-container>.user").html(data.masa.oyuncular[2].user);
	}
	else if(sandalyem==4){
		$(".computer1-hand-container>.user").html(data.masa.oyuncular[1].user);
		$(".computer2-hand-container>.user").html(data.masa.oyuncular[2].user);
		$(".computer3-hand-container>.user").html(data.masa.oyuncular[3].user);
	}
});
socket.on("aktifler", function(data){
	aktifmasalar(data.masalar);
});									
	
	
	
	
	
	
	
	
	
});						