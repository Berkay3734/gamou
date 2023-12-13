var sandalyem="";
var username="";
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
socket.on("girencikan", function(data){
		console.log("asad");
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