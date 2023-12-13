var sandalyem="";
var username="";
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
	siragec(data.sira);
});
socket.on("esimeelgec", function(data){
	computer3Cards =  document.querySelectorAll('.computer3-card');
	groundCards.forEach(cards => cards.style.background = "transparent")
	groundHand = [];
	if(sandalyem!=data.sira){
		computer3Cards.forEach(card => {
			card.style.filter = "brightness(0.5)";
			card.removeEventListener('click', playerDropCard1);
		})
		}else{
		computer3Cards.forEach(card => card.style.filter = 'none')
		computer3Cards.forEach(card => card.addEventListener('click', playerDropCard1))
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
	console.log("sıra bende değil");
	}
	else{
		console.log("sıra bende");
		playableCards(data.koz,data.ilkelmi);
	}	
	siragec(data.sira);
});
socket.on("ihalever", function(data){
	ihalesayilariniguncelle(data);
	if(sandalyem==data.sira){
		Swal.fire({
			position: 'top',
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
		if(data.oyuntipi=="Koz Maça"){
			socket.emit("kozumbu",
				{ 
					kozkodu:"S",
					kozadi:"Maça"
				});
		}
		else{
			$("#kozsecmodal").modal("show");
		}
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
		$(".table-features__menu--button").click();
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
		$(".player-three>.blackpoint").html(data.masa.oyuncular[2].user);
		$(".player-one>.blackpoint").html(data.masa.oyuncular[3].user);
		$(".player-two>.blackpoint").html(data.masa.oyuncular[4].user);
	}
	else if(sandalyem==2){
		$(".player-three>.blackpoint").html(data.masa.oyuncular[3].user);
		$(".player-one>.blackpoint").html(data.masa.oyuncular[4].user);
		$(".player-two>.blackpoint").html(data.masa.oyuncular[1].user);
	}
	else if(sandalyem==3){
		$(".player-three>.blackpoint").html(data.masa.oyuncular[4].user);
		$(".player-one>.blackpoint").html(data.masa.oyuncular[1].user);
		$(".player-two>.blackpoint").html(data.masa.oyuncular[2].user);
	}
	else if(sandalyem==4){
		$(".player-three>.blackpoint").html(data.masa.oyuncular[1].user);
		$(".player-one>.blackpoint").html(data.masa.oyuncular[2].user);
		$(".player-two>.blackpoint").html(data.masa.oyuncular[3].user);
	}
});
socket.on("aktifler", function(data){
	aktifmasalar(data.masalar);
	aktifkullanicilar(data.oyuncular);
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
		haberne+='<img src="assets/images/duyuru.png" alt="Haberci">              '
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
	socket.on("giris", function(data){
	hakkimda=data.bilgilerim;
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
	if(hakkimda.yetki_durumu){
	//contextekle();
	}
	}
	});							