socket = io.connect('https://b.gamoyu.net', { 
	transports: ['websocket'],
	upgrade: false, 
	'reconnection':true,   
	secure:true,
	query: {
	}
});
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
$('#masamodal').on('hidden.bs.modal', function (e) {
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
$(document).on( "click",".masalar .btn", function() {
	if($("#adim").val()==""){
		alert("Kullanıcı adı girin");
		return false;
	}
	socket.emit("masayaotur",
		{ 
			masa:$(this).attr("data-masa"),
			sandalye:parseInt($(this).attr("data-sandalye")),
			username:$("#adim").val()
		});
});
function aktifmasalar(data){
	var masalar="";
	var sandalyedeki="Otur";
	for (var key in data) {
		masalar+='<div class="btn-group btn-group-lg " role="group" aria-label="Basic example">                                  '
		if(data[key].oyuncusayisi=="0"){
			if(data[key].oyuncular[1].user!=""){
				sandalyedeki=data[key].oyuncular[1].user;
			}
			masalar+='<button type="button" data-masa="'+key+'" data-sandalye="1" class="btn btn-primary">'+sandalyedeki+'</button>'
			sandalyedeki="Otur";
			if(data[key].oyuncular[3].user!=""){
				sandalyedeki=data[key].oyuncular[3].user;
			}
			masalar+='<button type="button" data-masa="'+key+'" data-sandalye="3" class="btn btn-primary">'+sandalyedeki+'</button>'
		}
		else{
			for (var key1 in data[key].oyuncular) {
				sandalyedeki="Otur";
				if(data[key].oyuncular[key1].user!=""){
					sandalyedeki=data[key].oyuncular[key1].user;
				}
				masalar+='<button type="button" data-masa="'+key+'" data-sandalye="'+key1+'" class="btn btn-primary">'+sandalyedeki+'</button>                       '
			}
		}
		masalar+='</div>                                                                                                         '
	}
	$(".masalar").html(masalar);
}
function masayarat(){
	if($("#adim").val()==""){
		alert("Kullanıcı adı girin");
		return false;
	}
	socket.emit("masayarat",
		{ 
			username:$("#adim").val(),
			oyuncusayisi:$("#oyuncusayisi").val(),
			arttirmabilgisi:$("#arttirmabilgisi").val(),
			eslibilgisi:$("#eslibilgisi").val(),
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
		if(data.sandalye==3){
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
		if(data.sandalye==4){
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
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
		if(data.sandalye==1){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
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
			if (computer2Cards.hasChildNodes()) {
				computer2Cards.removeChild(computer2Cards.children[0]);
			}
		}
		if(data.sandalye==2){
			if (computer3Cards.hasChildNodes()) {
				computer3Cards.removeChild(computer3Cards.children[0]);
			}
		}
	}
	else if(sandalyem==4){
		if(data.sandalye==1){
			if (computer1Cards.hasChildNodes()) {
				computer1Cards.removeChild(computer1Cards.children[0]);
			}
		}
		if(data.sandalye==21){
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
	
	while(document.getElementsByClassName('computer2-card').length > 0){
        document.getElementsByClassName('computer2-card')[0].parentNode.removeChild(document.getElementsByClassName('computer2-card')[0]);
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
		node.className = "computer2-card";
		node.style.background = `url(img/Cards/${esimineli[playerCardIndex][0]}${esimineli[playerCardIndex][1]}.svg)`;
        node.style.backgroundSize = "90px 120px";		
        node.addEventListener('click', playerDropCard1);
		document.querySelector('.computer2-hand').appendChild(node);
		playerCardIndex++
	}	
	computer2Cards = document.querySelectorAll('.computer2-card');
	computer2Cards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard1);
	})
}