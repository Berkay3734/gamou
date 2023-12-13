function sifirla(){
	groundCards.forEach(cards => cards.style.background = "transparent")
	groundHand = [];
	while(document.querySelectorAll('.player-card').length > 0){
        document.querySelectorAll('.player-card')[0].parentNode.removeChild(document.querySelectorAll('.player-card')[0]);
	}
	while(document.getElementsByClassName('computer1-card').length > 0){
        document.getElementsByClassName('computer1-card')[0].parentNode.removeChild(document.getElementsByClassName('computer1-card')[0]);
	}
	while(document.getElementsByClassName('computer2-card').length > 0){
        document.getElementsByClassName('computer2-card')[0].parentNode.removeChild(document.getElementsByClassName('computer2-card')[0]);
	}
	while(document.getElementsByClassName('computer3-card').length > 0){
        document.getElementsByClassName('computer3-card')[0].parentNode.removeChild(document.getElementsByClassName('computer3-card')[0]);
	}
}
	$('body').on('hidden.bs.modal', '#masamodal', function () {
	socket.emit("masadankalk");
	sifirla()
})
$(document).on( "click",".kozsec", function() {
	var kozkodu=$(this).attr("data-koz");
	var kozadi=$(this).attr("data-kodadi");
	socket.emit("kozumbu",
		{ 
			kozkodu:kozkodu,
			kozadi:kozadi
		});
		$("#kozsecmodal").modal("hide");
});
$(document).on( "click","#again-btn", function() {
	$("#masamodal").modal("hide");
	$(".total-result-screen").css("display","none");
});
$(document).on( "click",".sit__button", function() {
	socket.emit("masayaotur",
		{ 
			masa:$(this).attr("data-masa"),
			sandalye:parseInt($(this).attr("data-sandalye")),
			username:hakkimda.hesap_detaylari.username,
		});
});
function aktifmasalar(data){
	var aktifmasalar="";
	var sandalyedeki="Otur";
	for (var key in data) {
		if(data[key].durum==0){
			var esli = "Tekli";
			var arttirmabilgisi = "Arttırmasız";
			if ( data[key].eslibilgisi==1 ) {
				esli = "Eşli";
			}
			if ( data[key].arttirmabilgisi==1 ) {
				arttirmabilgisi = "Arttırmalı";
			}
			var koltuklar = {
				koltuk1: '<button class="sit__button" data-sandalye="1" data-masa=' + key + '>Otur</button>',
				koltuk2: '<button class="sit__button" data-sandalye="2" data-masa=' + key + '>Otur</button>',
				koltuk3: '<button class="sit__button" data-sandalye="3" data-masa=' + key + '>Otur</button>',
				koltuk4: '<button class="sit__button" data-sandalye="4" data-masa=' + key + '>Otur</button>'
			};
			for ( let i = 1; i < 5; i++ ) {
				if (data[key].oyuncular[i].user!="") {
					var koltuk = "";
					koltuk += '<figure class="gamer gamer-3">';
					koltuk += '<figcaption>' +data[key].oyuncular[i].user + '</figcaption>';
					koltuk += '</figure>';
					koltuklar[ "koltuk" + i ] = koltuk;
				}
			}
			aktifmasalar += '<div class="table widnow-1" style="">                                        ';
			aktifmasalar += '<span class="table-num">Masa : ' + data[key].masasira + '</span>                               ';
			aktifmasalar += '<div class="info">                                                  ';
			aktifmasalar += '<div class="bet-info">                                              ';
			aktifmasalar += '<span class="bet p-0">El Sayısı : '+data[key].elsayisi+'</span>                                      ';
			aktifmasalar += '<span class="bet p-0">'+arttirmabilgisi+'</span>                                      ';
			aktifmasalar += '<span class="bet p-0">'+esli+'</span>                                      ';
			aktifmasalar += '<span class="bet p-0">'+data[key].oyuntipi+'</span>                                      ';
			aktifmasalar += '<span class="bet-amount"></span>                               ';
			aktifmasalar += '</div>                                                              ';
			aktifmasalar += '</div>                                                              ';
			aktifmasalar += '<button class="one-on-one-button">                                  ';
			aktifmasalar += '<img src="assets/icons/thunder.svg" alt="thunder">               ';
			aktifmasalar += '<div>                                                               ';
			aktifmasalar += '<span>bilgi gelecek</span>                                                  ';
			//aktifmasalar+='<span>TEK</span>                                                    '
			aktifmasalar += '</div>                                                              ';
			aktifmasalar += '</button>                                                           ';
			aktifmasalar += '<div class="sit">                                                   ';
			aktifmasalar += koltuklar.koltuk2;
			aktifmasalar += koltuklar.koltuk3;
			aktifmasalar += koltuklar.koltuk4;
			aktifmasalar += '</div>                                                              ';
			aktifmasalar += koltuklar.koltuk1;
			aktifmasalar += '</div>                                                              ';
		}
	}
	$( ".aktifmasalar" ).html( aktifmasalar );
}
function masayarat(){
	var eslibilgisi=0;
	var arttirmabilgisi=0;
	if($(".table-settings__accept-audience--activate--circle").hasClass("active")){
		eslibilgisi=1;
	}
	if($(".table-settings__audience-chat--activate--circle").hasClass("active")){
		arttirmabilgisi=1;
	}
	socket.emit("masayarat",
		{ 
			username:hakkimda.hesap_detaylari.username,
			oyuncusayisi:$("#oyuncusayisi").val(),
			arttirmabilgisi:arttirmabilgisi,
			eslibilgisi:eslibilgisi,
			oyuntipi:$("#oyuntipi").val(),
			elsayisi:$("#elsayisi").val()
		});
}
function elpuanlariniguncelle(data){
	if(sandalyem==1){
		$(".player-result-container").html(data.masa.oyuncular[1].results);
		$(".comp1-result-container").html(data.masa.oyuncular[2].results);
		$(".comp2-result-container").html(data.masa.oyuncular[3].results);
		$(".comp3-result-container").html(data.masa.oyuncular[4].results);
	}
	else if(sandalyem==2){
		$(".player-result-container").html(data.masa.oyuncular[2].results);
		$(".comp1-result-container").html(data.masa.oyuncular[3].results);
		$(".comp2-result-container").html(data.masa.oyuncular[4].results);
		$(".comp3-result-container").html(data.masa.oyuncular[1].results);
	}
	else if(sandalyem==3){
		$(".comp1-result-container").html(data.masa.oyuncular[4].results);
		$(".comp2-result-container").html(data.masa.oyuncular[1].results);
		$(".comp3-result-container").html(data.masa.oyuncular[2].results);
		$(".player-result-container").html(data.masa.oyuncular[3].results);
	}
	else if(sandalyem==4){
		$(".comp1-result-container").html(data.masa.oyuncular[1].results);
		$(".comp2-result-container").html(data.masa.oyuncular[2].results);
		$(".comp3-result-container").html(data.masa.oyuncular[3].results);
		$(".player-result-container").html(data.masa.oyuncular[4].results);
	}
}	
function kagitlariguncelle(data){
	computer1Cards = document.querySelector('.computer1-hand');
	computer2Cards = document.querySelector('.computer2-hand');
	computer3Cards = document.querySelector('.computer3-hand');
	if(sandalyem==1){
		if(data.sandalye==2){
			if (computer1Cards.hasChildNodes()) {
				computer1Cards.removeChild(computer1Cards.children[0]);
			}
		}
		if(data.sandalye==4){
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
		if(data.sandalye==3){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
			}
		}
	}
	else if(sandalyem==2){
		if(data.sandalye==3){
			if (computer1Cards.hasChildNodes()) {
				computer1Cards.removeChild(computer1Cards.children[0]);
			}
		}
		if(data.sandalye==4){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
			}
		}
		if(data.sandalye==1){
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
	}
	else if(sandalyem==3){
		if(data.sandalye==4){
			if (computer1Cards.hasChildNodes()) {
				computer1Cards.removeChild(computer1Cards.children[0]);
			}
		}
		if(data.sandalye==1){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
			}
		}
		if(data.sandalye==2){
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer3Cards.children[0]);
			}
		}
	}
	else if(sandalyem==4){
		if(data.sandalye==1){
			if (computer1Cards.hasChildNodes()) {
				computer1Cards.removeChild(computer1Cards.children[0]);
			}
		}
		if(data.sandalye==2){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
			}
		}
		if(data.sandalye==3){
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
	}
}
function ihalesayilariniguncelle(data){
	for (var oyuncu in data.masa.oyuncular) {
		var o=data.masa.oyuncular[oyuncu];
		var ihalen=o.user+" - "+o.ihale;
		$(".ihale-"+oyuncu).text(ihalen);
	}
}
$(function() {
	//$("#kozsecmodal").modal("show");
});
function elimiguncelle(masa){
	while(document.getElementsByClassName('player-card').length > 0){
		document.getElementsByClassName('player-card')[0].parentNode.removeChild(document.getElementsByClassName('player-card')[0]);
	}
	playerHand = masa.oyuncular[sandalyem].el;
	playerCardIndex = 0;	
	for (let i = 0; i < playerHand.length; i++) {		
		const node = document.createElement("div");
		node.className = "player-card";
		node.style.background = `url(img/Cards/${playerHand[playerCardIndex][0]}${playerHand[playerCardIndex][1]}.svg)`;
		node.style.backgroundSize = "90px 120px";		
		node.addEventListener('click', playerDropCard);
		document.querySelector('.player-hand').appendChild(node);
		playerCardIndex++ 
	}	
	playerCards = document.querySelectorAll('.player-card');
	playerCards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard);
	})
}
function esiminelinigoster(masa){
	while(document.getElementsByClassName('computer3-card').length > 0){
		document.getElementsByClassName('computer3-card')[0].parentNode.removeChild(document.getElementsByClassName('computer3-card')[0]);
	}
	var kiminelinigorecem=1;
	if(masa.ihalesahibi==1){
		kiminelinigorecem=3;
	}
	else if(masa.ihalesahibi==2){
		kiminelinigorecem=4;
	}
	else if(masa.ihalesahibi==3){
		kiminelinigorecem=1;
	}
	else if(masa.ihalesahibi==4){
		kiminelinigorecem=2;
	}
	esimineli=masa.oyuncular[kiminelinigorecem].el;
    playerCardIndex = 0;	
	if(sandalyem==kiminelinigorecem){
	}
	for (let i = 0; i < esimineli.length; i++) {		
		const node = document.createElement("div");
		node.className = "computer3-card";
		node.style.background = `url(img/Cards/${esimineli[playerCardIndex][0]}${esimineli[playerCardIndex][1]}.svg)`;
		node.style.backgroundSize = "90px 120px";		
		node.addEventListener('click', playerDropCard1);
		document.querySelector('.computer3-hand').appendChild(node);
		playerCardIndex++
	}	
	computer3Cards = document.querySelectorAll('.computer3-card');
	computer3Cards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard1);
	})
}
function sohbetlscrollindir () {
	$( ".tab-box .tabcontent" ).animate( { scrollTop: 1000000 }, "slow" );
}
function aktifkullanicilar ( data ) {
	var aktifkullanicilar = "";
	var davetedilebilecekler = "";
	$.each( data, function ( key, value ) {
		if ( value.oda == hesapbilgilerim.oda ) {
			if ( value.masa == "" ) {
				davetedilebilecekler += '<div class="person">                                 ';
				davetedilebilecekler += '<div class="title">                                  ';
				davetedilebilecekler += '<img src="' + value.hesap_detaylari.resim + '" alt="' + value.hesap_detaylari.username + '">            ';
				davetedilebilecekler += '<div class="nameBox">                                ';
				davetedilebilecekler += '<p class="name">' + value.hesap_detaylari.username + '</p>                            ';
				davetedilebilecekler += '<p class="puan">                                     ';
				davetedilebilecekler += '<img src="assets/icons/golden-coin.png" alt="">      ';
				davetedilebilecekler += '<span>' + puan( value.hesap_detaylari.puan ) + '</span>                                  ';
				davetedilebilecekler += '</p>                                                 ';
				davetedilebilecekler += '</div>                                               ';
				davetedilebilecekler += '</div>                                               ';
				davetedilebilecekler += '<div class="inviteHim">                              ';
				davetedilebilecekler += '<button class="davetet" data-username="' + value.hesap_detaylari.username + '" data-userid="' + value.hesap_detaylari.id + '">Davet et</button>                            ';
				davetedilebilecekler += '</div>                                               ';
				davetedilebilecekler += '</div>                                               ';
			}
			if ( hesapbilgilerim.id == value.hesap_detaylari.id ) {
				$( ".profilresmim" ).attr( "src", value.hesap_detaylari.resim );
				hesapbilgilerim.resim = value.hesap_detaylari.resim;
				$( ".puanim" ).html( puan( value.hesap_detaylari.puan ) );
				$( ".seviyem" ).html( puan( value.hesap_detaylari.seviye ) );
				$( ".kazandiklarim" ).html( puan( value.hesap_detaylari.kazandigi ) );
				$( ".toplamoyunlarim" ).html( puan( value.hesap_detaylari.toplamoyun ) );
			}
			aktifkullanicilar += '<div class="person" data-userid="' + value.hesap_detaylari.id + '">                                                                     ';
			aktifkullanicilar += '		<div class="person__info">                                                       ';
			aktifkullanicilar += '			<div class="person__info--img">                                              ';
			aktifkullanicilar += '				<img id="person-pic" src="' + value.hesap_detaylari.resim + '" alt="' + value.hesap_detaylari.username + '">       ';
			aktifkullanicilar += '				<div class="star-box">                                                   ';
			aktifkullanicilar += '					<span class="star-number">' + value.hesap_detaylari.seviye + '</span>                                  ';
			aktifkullanicilar += '					<img src="assets/icons/star.png" alt="Yildiz">                    ';
			aktifkullanicilar += '				</div>                                                                   ';
			aktifkullanicilar += '			</div>                                                                       ';
			aktifkullanicilar += '			<div class="person__info--text">                                             ';
			aktifkullanicilar += '				<span class="person__info--text-name">' + value.hesap_detaylari.username + '</span>                    ';
			aktifkullanicilar += '				<span class="person__info--text-money">' + puan( value.hesap_detaylari.puan ) + ' $</span>                      ';
			aktifkullanicilar += '			</div>                                                                       ';
			aktifkullanicilar += '		</div>                                                                           ';
			aktifkullanicilar += '		<div class="person__table">                                                      ';
			aktifkullanicilar += '			' + value.masasira + '                                                                            ';
			aktifkullanicilar += '		</div>                                                                           ';
			aktifkullanicilar += '	</div>                                                                               ';
		}
	} );
	$( ".aktifkullanicilar" ).html( aktifkullanicilar );
	$( ".inviteBox .salonBody" ).html( davetedilebilecekler );
}
function puan ( num ) {
	var data = num.toString();
	if ( data ) {
		if ( data.length <= 3 ) {
			return data;
		}
		if ( data.length == 4 ) {
			var x = data.substr( 0, 1 );
			var y = data.substr( 1 );
			return x + "." + y;
		}
		if ( data.length == 5 ) {
			var x = data.substr( 0, 2 );
			var y = data.substr( 2 );
			return x + "." + y;
		}
		if ( data.length == 6 ) {
			var x = data.substr( 0, 3 );
			var y = data.substr( 3 );
			return x + "." + y;
		}
		if ( data.length == 7 ) {
			var x1 = data.substr( 0, 1 );
			var x = data.substr( 1, 4 );
			var y = data.substr( 4 );
			return x1 + " M.";
		}
		if ( data.length == 8 ) {
			var x1 = data.substr( 0, 2 );
			var x = data.substr( 2, 5 );
			var y = data.substr( 5 );
			return x1 + " M.";
		}
		if ( data.length == 9 ) {
			var x1 = data.substr( 0, 3 );
			return x1 + " M.";
		}
		if ( data.length == 10 ) {
			var x1 = data.substr( 0, 1 );
			return x1 + " B.";
		}
		if ( data.length == 11 ) {
			var x1 = data.substr( 0, 2 );
			return x1 + " B.";
		}
		if ( data.length == 12 ) {
			var x1 = data.substr( 0, 3 );
			return x1 + " B.";
		}
		if ( data.length == 12 ) {
			var x1 = data.substr( 0, 1 );
			return x1 + " T.";
		}
		if ( data.length == 13 ) {
			var x1 = data.substr( 0, 2 );
			return x1 + " T.";
		}
		if ( data.length == 14 ) {
			var x1 = data.substr( 0, 3 );
			return x1 + " T.";
		}
		if ( data.length > 14 ) {
			return "Zengin";
		}
		} else {
		return "0";
	}
}							
function siragec(sira){
	$(".blackpoint").removeClass("active");
	if(sandalyem==1){	
		if(sira==1){
			$(".sandalye4").find(".blackpoint").addClass("active");
		}
		else if(sira==2){
			$(".sandalye3").find(".blackpoint").addClass("active");
		}
		else if(sira==3){
			$(".sandalye1").find(".blackpoint").addClass("active");
		}
		else if(sira==4){
			$(".sandalye2").find(".blackpoint").addClass("active");
		}
	}
	else if(sandalyem==2){
		if(sira==1){
			$(".sandalye2").find(".blackpoint").addClass("active");
		}
		else if(sira==2){
			$(".sandalye4").find(".blackpoint").addClass("active");
		}
		else if(sira==3){
			$(".sandalye3").find(".blackpoint").addClass("active");
		}
		else if(sira==4){
			$(".sandalye1").find(".blackpoint").addClass("active");
		}
	}
	else if(sandalyem==3){
		if(sira==1){
			$(".sandalye1").find(".blackpoint").addClass("active");
		}
		else if(sira==2){
			$(".sandalye2").find(".blackpoint").addClass("active");
		}
		else if(sira==3){
			$(".sandalye4").find(".blackpoint").addClass("active");
		}
		else if(sira==4){
			$(".sandalye3").find(".blackpoint").addClass("active");
		}
	}
	else if(sandalyem==4){
		if(sira==1){
			$(".sandalye3").find(".blackpoint").addClass("active");
		}
		else if(sira==2){
			$(".sandalye1").find(".blackpoint").addClass("active");
		}
		else if(sira==3){
			$(".sandalye2").find(".blackpoint").addClass("active");
		}
		else if(sira==4){
			$(".sandalye4").find(".blackpoint").addClass("active");
		}
	}
	
	
}