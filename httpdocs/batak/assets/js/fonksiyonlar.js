// messageButton.addEventListener("click",(e) => {
// 	if (document.getElementById('chatting').style.display == 'block') {
// 		document.getElementById('chatting').style.display = 'none'
// 	}else {document.getElementById('chatting').style.display = 'block'}
// })
document.addEventListener( 'DOMContentLoaded', function () {
	//----------------------------------------------
	//----------------------------------------------
	document.addEventListener( "click", ( e ) => {
		const t = e.target;
		const html = document.documentElement;
		const btns = document.querySelectorAll( '.tablinks' );
		const chats = document.querySelectorAll( '.chat' );
		//-----------Side Menu Opening-----------------------------------
		if ( t.closest( '.menu-init' ) ) {
			html.classList.toggle( 'menu-open' );
			} else if ( html.classList.contains( 'menu-open' ) && !t.closest( '.chatting' ) ) {
			html.classList.remove( 'menu-open' );
		}
		//-----------------Chatting open-close-----------------------------
		const chatting = document.querySelector( '.gamePage .chatting' );
		const addFn = () => {
			chatting.classList.add( 'open' );
			if ( chatting.classList.contains( 'close' ) ) {
				chatting.classList.remove( 'close' );
				} else if ( chatting.classList.contains( 'open' ) ) {
				chatting.classList.remove( 'open' );
				chatting.classList.add( 'close' );
			}
		};
		if ( t.closest( '.gamePage .change-size' ) ) {
			addFn();
		}
		//----------------------------------------------
		if ( t.closest( '.tablinks' ) ) {
			btns.forEach( btn => btn.classList.remove( 'active' ) );
			t.classList.add( 'active' );
		}
		//----------------------------------------------
		if ( t.closest( '.lobi-chat-button' ) ) {
			chats.forEach( chat => chat.classList.remove( 'active' ) );
			chats[ 0 ].classList.add( 'active' );
			} else if ( t.closest( '.masa-chat-button' ) ) {
			chats.forEach( chat => chat.classList.remove( 'active' ) );
			chats[ 1 ].classList.add( 'active' );
		}
	} );
} );
//=============================================
var siratimer;
function sirauyar ( div, sure ) {
	$( ".opponent-experience-level" ).css( "flex-basis", "100%" );
	$( ".opponent-experience-level" ).css( "background-color", "#08E220" );
	clearInterval( siratimer );
	var timer = sure / 1000;
	--timer;
	siratimer = setInterval( function () {
		$( div ).css( "flex-basis", ( timer * 100 / ( sure / 1000 ) ) + "%" );
		if ( timer < 3 ) {
			$( div ).css( "background-color", "red" );
		}
		if ( --timer < 0 ) {
			$( div ).css( "background-color", "#08E220" );
			$( div ).css( "flex-basis", "#08E220" );
			clearInterval( siratimer );
		}
	}, 1000 );
}
function okeyControl__ ( x ) {
	var o1 = x.substring( 2 ),
	o2 = x.substring( 0, 2 );
	if ( o1 == 13 ) {
		return o2 + 1;
		} else {
		var o3 = eval( o1 ) + eval( 1 );
		return o2 + o3;
	}
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
function aktifkullanicilar ( data ) {
	console.log("geldi");
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
			aktifkullanicilar += '					<img src="../assets/icons/star.png" alt="Yildiz">                    ';
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
function aktifsalonlar ( data ) {
	var salonlar = data.salonlar;
	var aktifsalonlar = "";
	var active = "";
	$.each( data.oyuncular, function ( key, value ) {
		salonlar[ value.oda ].online = parseInt( salonlar[ value.oda ].online ) + 1;
	} );
	$.each( salonlar, function ( key, value ) {
		active = "";
		if ( key == hesapbilgilerim.oda ) {
			active = "active";
		}
		aktifsalonlar += '<tr class="' + active + ' odasec" data-odaid="' + value.id + '" data-oda="' + value.url + '" data-ad="' + value.ad + '">';
		aktifsalonlar += '<td>                                                                                                                                                                                        ';
		aktifsalonlar += '<img src="../assets/icons/emoji_1.svg" alt="Emoji-1">                                                                                                                                       ';
		aktifsalonlar += '' + value.ad + '                                                                                                                                                                    ';
		aktifsalonlar += '</td>                                                                                                                                                                                       ';
		aktifsalonlar += '<td>' + value.online + '</td>                                                                                                                                                       ';
		aktifsalonlar += '<td>' + value.enaz + '</td>                                                                                                                                                         ';
		aktifsalonlar += '<td>' + value.alt + '-' + value.ust + '</td>                                                                                                                                ';
		aktifsalonlar += '</tr>                                                                                                                                                                                       ';
	} );
	$( ".salonlar" ).html( aktifsalonlar );
}
function aktifmasalar ( data ) {
	var masalar = [];
	$.each( data.masalar, function ( key, value ) {
		masalar.push( value );
	} );
	masalar = masalar.sort( ( a, b ) => {
		if ( a.masasira < b.masasira ) {
			return -1;
		}
	} );
	var aktifmasalar = "";
	masalar.filter( element => element.salon == hesapbilgilerim.oda && element.oyun == 0 ).forEach( ( masa ) => {
		var masarengi = "";
		var koltuklar = {
			koltuk1: '<button class="sit__button" data-sandalye="1" data-masa=' + masa.id + '>otur</button>',
			koltuk2: '<button class="sit__button" data-sandalye="2" data-masa=' + masa.id + '>otur</button>',
			koltuk3: '<button class="sit__button" data-sandalye="3" data-masa=' + masa.id + '>otur</button>',
			koltuk4: '<button class="sit__button" data-sandalye="4" data-masa=' + masa.id + '>otur</button>'
		};
		for ( let i = 1; i < 5; i++ ) {
			if ( masa.oyuncular[ "s" + i ] ) {
				if ( masa.oyuncular[ "s" + i ].hesap_detaylari.id == hesapbilgilerim.id ) {
					masarengi = "background-color:cyan";
				}
				var koltuk = "";
				koltuk += '<figure class="gamer gamer-3">';
				koltuk += '<img src="' + masa.oyuncular[ "s" + i ].hesap_detaylari.resim + '" alt="' + masa.oyuncular[ "s" + i ].hesap_detaylari.username + '">';
				koltuk += '<figcaption>' + masa.oyuncular[ "s" + i ].hesap_detaylari.username + '</figcaption>';
				koltuk += '</figure>';
				koltuklar[ "koltuk" + i ] = koltuk;
			}
			if ( i > masa.bilgiler.oyuncusayisi ) {
				koltuklar[ "koltuk" + i ] = "";
			}
		}
		var esli = "Tekli";
		var canakbilgisi = "";
		if ( masa.bilgiler.esli ) {
			esli = "Eşli";
		}
		if ( masa.bilgiler.canak ) {
			canakbilgisi += '<div class="pot-info">                                              ';
			canakbilgisi += '<span class="pot">Çanak</span>                                      ';
			canakbilgisi += '<span class="pot-amount">' + masa.canakpuan + '</span>                                ';
			canakbilgisi += '</div>                                                              ';
		}
		aktifmasalar += '<div class="table widnow-1" style="' + masarengi + '">                                        ';
		aktifmasalar += '<span class="table-num">Masa : ' + masa.masasira + '</span>                               ';
		aktifmasalar += '<div class="info">                                                  ';
		aktifmasalar += '<div class="bet-info">                                              ';
		aktifmasalar += '<span class="bet">Bahis</span>                                      ';
		aktifmasalar += '<span class="bet-amount">' + masa.bilgiler.cipmiktari + '</span>                               ';
		aktifmasalar += '</div>                                                              ';
		aktifmasalar += canakbilgisi;
		aktifmasalar += '</div>                                                              ';
		aktifmasalar += '<button class="one-on-one-button">                                  ';
		aktifmasalar += '<img src="../assets/icons/thunder.svg" alt="thunder">               ';
		aktifmasalar += '<div>                                                               ';
		aktifmasalar += '<span>' + esli + '</span>                                                  ';
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
	} );
	$( ".aktifmasalar" ).html( aktifmasalar );
}
function masayarat () {
	if ( $( "#table-name" ).val() == "" ) {
		Toast.fire( { icon: "error", title: "Masa Adı Giriniz..!!" } );
		return false;
	}
	if ( $( ".table-settings__table-gosterge--activate--circle" ).hasClass( "active" ) ) {
		//$("#gamer-amount").val(2);
	}
	socket.emit( "masayarat",
		{
			masaadi: $( "#table-name" ).val(),
			oyuncusayisi: parseInt( $( "#gamer-amount" ).val() ),
			cipmiktari: parseInt( $( "#table-chip-amount" ).val() ),
			masasohbeti: $( ".table-settings__table-chat--activate--circle" ).hasClass( "active" ),
			izleyicisohbeti: $( ".table-settings__audience-chat--activate--circle" ).hasClass( "active" ),
			masayaizleyicialma: $( ".table-settings__accept-audience--activate--circle" ).hasClass( "active" ),
			gosterge: $( ".table-settings__table-gosterge--activate--circle" ).hasClass( "active" ),
			esli: $( ".table-settings__table-esli--activate--circle" ).hasClass( "active" ),
			canak: $( ".table-settings__table-canak--activate--circle" ).hasClass( "active" ),
			beklemesuresi: parseInt( $( "#tasbeklemesuresi" ).val() ) * 1000
		} );
}
function sandalyeleriayarla ( data ) {
	$( ".sandalye" ).removeClass( "active" );
	$( ".oyunubaslat" ).hide();
	var sandalyem, sandalyeler;
	var aktifoyuncular = 0;
	$.each( data.oyuncular, function ( key, value ) {
		if ( value && value.sid == socket.id ) {
			sandalyem = value.sandalye;
			$( ".sandalye4" ).attr( "id", "sandalye-" + sandalyem );
			$( ".sandalye4" ).attr( "data-sira", sandalyem );
			$( ".yer4" ).attr( "id", "yer-" + sandalyem );
		}
		if ( value ) {
			aktifoyuncular++;
		}
	} );
	if ( sandalyem == 4 ) {
		var sandalyeler = [
			{ o: "s1", s: 3 },
			{ o: "s2", s: 2 },
			{ o: "s3", s: 1 },
		];
	}
	else if ( sandalyem == 3 ) {
		var sandalyeler = [
			{ o: "s4", s: 3 },
			{ o: "s1", s: 2 },
			{ o: "s2", s: 1 },
		];
	}
	else if ( sandalyem == 2 ) {
		var sandalyeler = [
			{ o: "s3", s: 3 },
			{ o: "s4", s: 2 },
			{ o: "s1", s: 1 },
		];
	}
	else if ( sandalyem == 1 ) {
		var sandalyeler = [
			{ o: "s2", s: 3 },
			{ o: "s3", s: 2 },
			{ o: "s4", s: 1 },
		];
	}
	$.each( sandalyeler, function ( key, value ) {
		if ( data.oyuncular[ value.o ] ) {
			$( ".sandalye" + value.s ).attr( "id", "sandalye-" + data.oyuncular[ value.o ].sandalye );
			$( ".sandalye" + value.s ).attr( "data-sira", data.oyuncular[ value.o ].sandalye );
			$( ".yer" + value.s ).attr( "id", "yer-" + data.oyuncular[ value.o ].sandalye );
			$( ".sandalye" + value.s ).find( "img" ).attr( "src", data.oyuncular[ value.o ].hesap_detaylari.resim );
			$( ".sandalye" + value.s ).find( ".opponent-name" ).html( data.oyuncular[ value.o ].hesap_detaylari.username + " - sira:" + data.oyuncular[ value.o ].sandalye );
			$( ".sandalye" + value.s ).find( ".opponent-box__right__point--amount" ).html( puan( data.oyuncular[ value.o ].hesap_detaylari.puan ) );
			} else {
			$( ".sandalye" + value.s ).attr( "id", "" );
			$( ".yer" + value.s ).attr( "id", "" );
			$( ".sandalye" + value.s ).find( "img" ).attr( "src", "img/noneuserphoto.jpeg" );
			$( ".sandalye" + value.s ).find( ".opponent-name" ).html( "" );
			$( ".sandalye" + value.s ).find( ".opponent-box__right__point--amount" ).html( "" );
		}
	} );
	if ( data.masasahibi == parseInt( hesapbilgilerim.id ) && aktifoyuncular > 1 ) {
		$( ".oyunubaslat" ).show();
	}
	$( "#homePage" ).hide();
	$( "#gamePage" ).show();
	sohbetlscrollindir();
}
function istakadiz ( data ) {
	var elPrint = data;
	$( "#taslar" ).html( "" );
	for ( var i = 0; i < elPrint.length; i++ ) {
		var resim = elPrint[ i ];
		if ( elPrint[ i ] == "0" ) {
			if ( i == 13 ) {
				$( "#taslar" ).prepend( "<ul id='x_" + i + "' ></ul>" );
				} else {
				$( "#taslar" ).prepend( "<ul id='x_" + i + "' ></ul>" ).find( "ul" ).droppable();
			}
			} else {
			$( "#taslar" ).prepend( "<ul id='x_" + i + "'><img style='cursor:pointer;' tik=" + elPrint[ i ] + " id='i_" + i + "' src='img/" + resim + ".png'></ul>" ).find( "img" ).draggable( { containment: ".gamePlay", revert: "invalid", stack: "img", zIndex: 99 } );
		}
	}
}
$( document ).on( "click", ".sit__button", function () {
	socket.emit( "masayaotur",
		{
			masa: $( this ).attr( "data-masa" ),
			sandalye: $( this ).attr( "data-sandalye" )
		} );
} );
$( document ).on( "click", ".oyunubaslat", function () {
	socket.emit( "oyunubaslat" );
} );
$( document ).on( "click", ".masadankalk", function () {
	socket.emit( "masadankalk" );
} );
$( document ).on( "click", ".selectEmoji", function ( e ) {
	var mesajid = $( this ).closest( ".emoji-box" ).attr( "data-mesajid" );
	var aliciid = $( ".messageBoxBody" ).attr( "data-aliciid" );
	var emoji = $( this ).attr( "class" );
	$( this ).closest( ".taken-message" ).find( ".emoji-box" ).addClass( "disable" );
	$( "#taken-message-" + mesajid ).find( ".emojitepki" ).html( '<i class="' + emoji + '"></i>' );
	socket.emit( "ozelmesajtepkiver", { gonderici: hesapbilgilerim.id, alici: aliciid, emoji: emoji, mesajid: mesajid } );
} );
$( document ).on( "click", ".sendEmoji", function () {
	$( ".emoji-box" ).addClass( "disable" );
	$( this ).closest( ".taken-message" ).find( ".emoji-box" ).removeClass( "disable" );
} );
$( document ).on( "click", ".special-userMessage", function () {
	$( ".messageBoxBody" ).html( "" );
	$.ajax( {
		url: 'php/islemler.php',
		type: 'POST',
		dataType: 'json',
		data: {
			islem: "sohbetgetir",
			alici: $( this ).attr( "data-aliciid" )
		},
		success: function ( data, textStatus, jqXHR ) {
			var mesajgovdesi = "";
			var aliciresim = "img/noneuserphoto.jpeg";
			if ( data.alici.resim != "" && data.alici.resim != null ) {
				aliciresim = data.alici.resim;
			}
			$( ".ozelmesajaliciresmi" ).attr( "src", aliciresim );
			var aliciusername = data.alici.username;
			if ( data.alici.tip == 2 ) {
				aliciusername = data.alici.adsoyad;
			}
			$( ".ozel-mesaj-isim" ).html( aliciusername );
			$( ".ozel-mesaj-user-" + data.alici.id ).find( ".ozel-mesaj-search-last-message" ).removeClass( "fw-bold" );
			$( ".messageBoxBody" ).attr( "data-aliciid", data.alici.id );
			$( "#userMessagelist-" + data.alici.id ).find( ".KalinYazi" ).removeClass( "KalinYazi" );
			data.ozelmesajlar.forEach( ( value, index ) => {
				if ( value.gonderici_id == hesapbilgilerim.id ) {
					mesajgovdesi += '<div class="send-message" id="send-message-' + value.id + '">                                                                         ';
					mesajgovdesi += '<img class="profilresmim" src="' + hesapbilgilerim.resim + '" alt="">                                                          ';
					mesajgovdesi += '<p class="text">' + value.mesaj + '</p>      ';
					mesajgovdesi += '</div>                                                                                             ';
					} else {
					mesajgovdesi += '<div class="taken-message" id="taken-message-' + value.id + '">                                                                                ';
					mesajgovdesi += '<img src="' + aliciresim + '" alt="">                                                                  ';
					mesajgovdesi += '<p class="text">' + value.mesaj + '</p>              ';
					mesajgovdesi += '<p class="emojitepki"></p>              ';
					mesajgovdesi += '<i class="fa-regular fa-face-laugh-squint sendEmoji"></i>                                                  ';
					mesajgovdesi += '<div class="emoji-box disable" data-mesajid="' + value.id + '">                                                                            ';
					mesajgovdesi += '<i class="selectEmoji">&#128514;</i>                                                ';
					mesajgovdesi += '<i class="selectEmoji">&#128150;</i>                                                ';
					mesajgovdesi += '<i class="selectEmoji">&#128077;</i>                                                ';
					mesajgovdesi += '<i class="selectEmoji">&#128549;</i>                                                ';
					mesajgovdesi += '<i class="sikayetet">&#10071;</i>                                              ';
					mesajgovdesi += '</div>                                                                                                     ';
					mesajgovdesi += '</div>                                                                                                     ';
				}
			} );
			$( ".messages-list" ).addClass( "dontshow" );
			$( ".speacial-userMessage-inside" ).removeClass( "dontshow" );
			$( ".changeIcon" ).removeClass( "fa-user" ).addClass( "fa-arrow-left" );
			$( ".messageBoxBody" ).html( mesajgovdesi );
			$( '.messageBoxBody' ).scrollTop( $( '.messageBoxBody' )[ 0 ].scrollHeight );
		}
	} );
} );
$( document ).on( "click", ".send-button", function () {
	var mesaj = $( this ).closest( ".message-box" ).find( "input[type=text]" );
	var nereden = $( this ).closest( ".chatting" ).find( ".tablinks.active" ).attr( "data-nereden" );
	mesajgonder( nereden, mesaj );
} );
$( ".chatting input[type=text]" ).keyup( function ( event ) {
	var mesaj = $( this );
	var nereden = $( this ).closest( ".chatting" ).find( ".tablinks.active" ).attr( "data-nereden" );
	if ( event.which === 13 ) {
		mesajgonder( nereden, mesaj );
	}
} );
function mesajgonder ( nereden, mesaj ) {
	if ( mesaj.val() == "" ) {
		Toast.fire( { icon: "error", title: "Lütfen mesaj giriniz..!!" } );
		return false;
	}
	socket.emit( "mesajgonder", { nereden: nereden, mesaj: mesaj.val() } );
	$( mesaj ).val( "" );
}
function sohbetlscrollindir () {
	$( ".tab-box .tabcontent" ).animate( { scrollTop: 1000000 }, "slow" );
}
function ozelmesajat () {
	if ( $( '.ozel-mesaj-input' ).val() == "" ) {
		Toast.fire( { icon: 'info', title: "Lütfen Mesajınızı girin.." } );
		return false;
	}
	$.ajax( {
		url: 'php/islemler.php',
		type: 'POST',
		dataType: 'json',
		data: {
			islem: "ozelmesajat",
			alici: $( ".messageBoxBody" ).attr( "data-aliciid" ),
			mesaj: $( '.ozel-mesaj-input' ).val()
		},
		success: function ( data, textStatus, jqXHR ) {
			if ( data.durum == "success" ) {
				var mesajgovdesi = '<div class="send-message" id="send-message-' + data.mesajid + '">                                                                         ';
				mesajgovdesi += '<img class="profilresmim" src="' + hesapbilgilerim.resim + '" alt="">                                                          ';
				mesajgovdesi += '<p class="text">' + data.mesaj + '</p>      ';
				mesajgovdesi += '<p class="emojitepki"></p>      ';
				mesajgovdesi += '</div>                                                                                             ';
				$( ".messageBoxBody" ).append( mesajgovdesi );
				$( ".ozel-mesaj-user-" + data.alici.id ).find( ".ozel-mesaj-search-last-message" ).html( data.mesaj );
				socket.emit( "ozelmesajat", { gonderici: hesapbilgilerim.id, alici: data.alici.id, mesaj: data.mesaj, mesajid: data.mesajid } );
				$( '.ozel-mesaj-input' ).val( "" );
				$( '.messageBoxBody' ).scrollTop( $( '.messageBoxBody' )[ 0 ].scrollHeight );
				} else {
				Toast.fire( { icon: 'error', title: data.mesaj } );
			}
		}
	} );
}
$( ".send-ozel-message" ).click( function () {
	ozelmesajat();
} );
$( '.ozel-mesaj-input' ).keypress( function ( event ) {
	var keycode = ( event.keyCode ? event.keyCode : event.which );
	if ( keycode == '13' ) {
		ozelmesajat();
	}
} );
$( document ).on( "click", ".specialMessageToPerson", function () {
	var userid = $( this ).closest( ".user-popup" ).attr( "data-userid" );
	var resim = $( this ).closest( ".user-popup" ).find( ".popup-img>img" ).attr( "src" );
	var username = $( this ).closest( ".user-popup" ).find( ".popup-name" ).text();
	specialMessageBody.classList.remove( "minimize" );
	$( ".user-popup" ).addClass( "disable" );
	$( ".messages-list" ).removeClass( "minimize" );
	if ( $( "#userMessagelist-" + userid ).length > 0 ) {
		$( "#userMessagelist-" + userid ).click();
	}
	else {
		var mesajgovdesi = '<div class="special-userMessage" id="userMessagelist-' + userid + '" data-aliciid="' + userid + '">               ';
		mesajgovdesi += '<div class="userphoto">                                                                    ';
		mesajgovdesi += '<img src="' + resim + '" alt="">                                               ';
		mesajgovdesi += '</div>                                                                                     ';
		mesajgovdesi += '<div class="nameSection">                                                                  ';
		mesajgovdesi += '<p>' + username + '</p>                                                                                   ';
		mesajgovdesi += '<span ></span>                                                                   ';
		mesajgovdesi += '</div>                                                                                     ';
		mesajgovdesi += '<div class="delete"><i class="fa-solid fa-trash-can"></i></div>                            ';
		mesajgovdesi += '</div>                                                                                     ';
		$( ".messages-list" ).append( mesajgovdesi );
		$( "#userMessagelist-" + userid ).click();
	}
} );
$( document ).on( "click", ".person", function () {
	$.ajax( {
		url: 'php/islemler.php',
		type: 'POST',
		dataType: 'json',
		data: {
			islem: "profilgetir",
			alici: $( this ).attr( "data-userid" )
		},
		success: function ( data, textStatus, jqXHR ) {
			if ( data.durum == "success" ) {
				if ( data.user.id != hesapbilgilerim.id && data.user ) {
					if ( data.user.resim == null ) {
						data.user.resim = "img/noneuserphoto.jpeg";
					}
					$( ".user-popup .popup-img>img" ).attr( "src", data.user.resim );
					$( ".user-popup .popup-name" ).html( data.user.username );
					$( ".user-popup" ).attr( "data-userid", data.user.id );
					$( ".user-popup" ).removeClass( "disable" );
				}
				} else {
				Toast.fire( { icon: 'error', title: data.mesaj } );
			}
		}
	} );
} );
$( document ).on( "click", ".messageBoxBody .sikayetet", function ( e ) {
	var mesajid = $( this ).closest( ".emoji-box" ).attr( "data-mesajid" );
	Swal.fire( {
		title: 'Aşağıdaki Mesajı Şikayet Et',
		showCancelButton: true,
		cancelButtonText: "Vazgeç",
		confirmButtonText: 'Gönder',
		html: $( this ).closest( ".taken-message" ).find( "p.text" ).text(),
		heightAuto: false,
		inputPlaceholder: 'Açıklama girmek ister misin..?',
		input: 'textarea'
		} ).then( function ( result ) {
		if ( result.isConfirmed ) {
			$.ajax( {
				url: 'php/islemler.php',
				type: 'POST',
				dataType: 'json',
				data: {
					islem: "sikayetler_ozelmesaj",
					aciklama: result.value,
					id: mesajid
				},
				success: function ( data, textStatus, jqXHR ) {
					if ( data.durum == "success" ) {
						Toast.fire( { icon: 'success', title: data.mesaj } ).then( ( result ) => {
						} );
						} else {
						Toast.fire( { icon: data.durum, title: data.mesaj } );
					}
				}
			} );
		}
	} );
} );
$( document ).on( "click", ".backToMessageList", function ( e ) {
	$( ".messages-list>.special-userMessage" ).each( function () {
		//console.log($(this).find("span").text());
	} );
} );
$( document ).on( "click", ".couple", function ( e ) {
	socket.emit( "cifte" );
} );
$( document ).on( "click", ".series-bottom", function ( e ) {
	socket.emit( "serigit" );
} );
$( document ).on( "click", ".messageBoxBody", function ( e ) {
	if ( !$( e.target ).hasClass( "emoji-box" ) && !$( e.target ).hasClass( "sendEmoji" ) ) {
		$( ".emoji-box" ).addClass( "disable" );
	}
} );
$( document ).on( "click", ".davetet", function ( e ) {
	var rakipid = $( this ).attr( "data-userid" );
	var rakipadi = $( this ).attr( "data-username" );
	if ( rakipid != "" ) {
		Toast.fire( { icon: 'success', title: rakipadi + " davet edildi.." } ).then( ( result ) => { } );
		$( this ).hide();
		socket.emit( "davetgonder", parseInt( rakipid ) );
	}
} );
$( document ).on( "click", ".odasec", function () {
	$.ajax( {
		url: 'php/islemler.php',
		type: 'POST',
		dataType: 'json',
		data: {
			islem: "odaya_git",
			id: $( this ).attr( "data-odaid" )
		},
		success: function ( data, textStatus, jqXHR ) {
			if ( data.durum == "success" ) {
				Toast.fire( { icon: 'success', title: data.mesaj } ).then( ( result ) => {
					const url = window.location.origin + window.location.pathname + "?salon=" + data.url;
					location.href = url;
				} );
				} else {
				Toast.fire( { icon: data.durum, title: data.mesaj } );
			}
		}
	} );
} );
$( '#taslar' ).on( 'drop', 'ul', function ( event ) {
	event.target.style.zIndex = '184';
	var mk = $( this ).attr( "id" );
	var mk2 = mk.split( "_" );
	buraya = mk2[ 1 ];
	if ( vuk == 0 ) {
		if ( elPrint[ buraya ] == 0 ) {
			elPrint[ buraya ] = tas;
			elPrint[ buradan ] = 0;
			socket.emit( "guncelle", buradan, buraya );
			$( "#i_" + buradan ).remove();
			$( "#x_" + buradan ).droppable();
			var resim = tas;
			if ( tas == okeyControl__( konak.okey ) ) {
				resim = "tasbg";
			}
			$( "#x_" + buraya ).html( "<img style='cursor:pointer;' tik=" + tas + " id='i_" + buraya + "' src='img/" + resim + ".png'>" ).find( "img" ).draggable( {
				containment: ".orta", revert: "invalid", stack: "img", zIndex: 99
			} );
			} else {
			$( "#i_" + buradan ).remove();
			var resim = tas;
			if ( tas == okeyControl__( konak.okey ) ) {
				resim = "tasbg";
			}
			$( "#x_" + buradan ).html( "<img style='cursor:pointer;' tik=" + tas + " id='i_" + buradan + "' src='img/" + resim + ".png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
		}
		} else {
		if ( vuk == 1 ) {
			//yandan çek
			if ( hakkimda.sandalye == 1 ) {
				var ilgiliConsol = konak[ "san41" ];
			}
			if ( hakkimda.sandalye == 2 ) {
				var ilgiliConsol = konak[ "san12" ];
			}
			if ( hakkimda.sandalye == 3 ) {
				var ilgiliConsol = konak[ "san23" ];
			}
			if ( hakkimda.sandalye == 4 ) {
				var ilgiliConsol = konak[ "san34" ];
			}
			if ( elPrint[ buraya ] == 0 && konak.sira == hakkimda.sandalye && konak.refleks == 1 ) {
				yerdencekici_.html( "" );
				yerdencekici_.css( "display", "none" );
				$( "#yerdencekalt" ).css( "display", "none" );
				$( "#yer4alt" ).css( "display", "none" );
				socket.emit( "yanimdakinden", buraya );
				elPrint[ buraya ] = ilgiliConsol[ 1 ];
				if ( ilgiliConsol[ 0 ] != 0 ) {
					y4.html( "<img src='img/" + ilgiliConsol[ 0 ] + ".png'>" );
					} else {
					y4.html( "" );
				}
				var resim = ilgiliConsol[ 1 ];
				if ( ilgiliConsol[ 1 ] == okeyControl__( konak.okey ) ) {
					resim = "tasbg";
				}
				$( "#x_" + buraya ).html( "<img style='cursor:pointer;' tik=" + ilgiliConsol[ 1 ] + " id='i_" + buraya + "' src='img/" + resim + ".png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
				} else {
				if ( ilgiliConsol[ 0 ] != 0 ) {
					if ( ilgiliConsol[ 1 ] != 0 ) {
						y4.html( "<img src='img/" + ilgiliConsol[ 0 ] + ".png' style='cursor:pointer;'><img src='img/" + ilgiliConsol[ 1 ] + ".png' style='cursor:pointer;'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
						} else {
						y4.html( "<img src='img/" + ilgiliConsol[ 0 ] + ".png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
					}
					} else {
					if ( ilgiliConsol[ 1 ] != 0 ) {
						y4.html( "<img src='img/" + ilgiliConsol[ 1 ] + ".png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
						} else {
						y4.html( "" );
					}
				}
			}
			} else {
			if ( vuk == 2 ) {
				//yerden çek
				if ( elPrint[ buraya ] == 0 && konak.sira == hakkimda.sandalye && konak.refleks == 1 ) {
					if ( hakkimda.sandalye == 1 ) {
						var ilgiliConsol = konak[ "san41" ];
					}
					if ( hakkimda.sandalye == 2 ) {
						var ilgiliConsol = konak[ "san12" ];
					}
					if ( hakkimda.sandalye == 3 ) {
						var ilgiliConsol = konak[ "san23" ];
					}
					if ( hakkimda.sandalye == 4 ) {
						var ilgiliConsol = konak[ "san34" ];
					}
					if ( ilgiliConsol[ 0 ] != 0 ) {
						if ( ilgiliConsol[ 1 ] != 0 ) {
							y4.html( "<img src='img/" + ilgiliConsol[ 0 ] + ".png' style='cursor:pointer;'><img src='img/" + ilgiliConsol[ 1 ] + ".png' style='cursor:pointer;'>" );
							} else {
							y4.html( "<img src='img/" + ilgiliConsol[ 0 ] + ".png'>" );
						}
						} else {
						if ( ilgiliConsol[ 1 ] != 0 ) {
							y4.html( "<img src='img/" + ilgiliConsol[ 1 ] + ".png'>" );
							} else {
							y4.html( "" );
						}
					}
					$( "#yerdencekalt" ).css( "display", "none" );
					$( "#yer4alt" ).css( "display", "none" );
					socket.emit( "yerdenal", buraya );
					yerdencekici_.html( "" );
					yerdencekici_.css( "display", "none" );
					var t = konak[ "bostakiler" ][ 0 ];
					var resim = t;
					elPrint[ buraya ] = t;
					if ( elPrint[ buraya ] == okeyControl__( konak.okey ) ) {
						resim = "tasbg";
					}
					$( "#x_" + buraya ).html( "<img style='cursor:pointer;' tik=" + t + " id='i_" + buraya + "' src='img/" + resim + ".png'>" ).find( "img" ).draggable( { containment: "body", revert: "invalid", stack: "img", zIndex: 99 } );
					} else {
					yerdencekici_.html( "<img src='img/tasbg.png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", zIndex: 99 } );
				}
			}
		}
	}
} );
$( '#taslar' ).on( 'drag', 'img', function ( event ) {
	event.target.style.zIndex = '185';
	var omk = $( this ).attr( "id" );
	var sontaskontrol = $( this ).attr( "tik" );
	if ( omk ) {
		var omk2 = omk.split( "_" );
		if ( omk2 ) {
			if ( omk2[ 1 ] ) {
				vuk = 0;
				buradan = omk2[ 1 ];
				tas = $( this ).attr( "tik" );
			}
		}
	}
} );
$( '#tasgonder' ).on( 'drop', function ( event ) {
	event.target.style.zIndex = '184';
	if ( konak.sira == hakkimda.sandalye && konak.refleks == 0 ) {
		elPrint[ buradan ] = 0;
		socket.emit( "tasgonder", buradan );
		$( "#i_" + buradan ).remove();
		kontrolcu_.css( "display", "none" );
		tasgonder_.css( "display", "none" );
		$( "#x_" + buradan ).droppable();
	}
} );
$( '#kontrolcu' ).on( 'drop', function () {
	socket.emit( "kontrol", { buradan: buradan, tas: tas } );
	$( "#i_" + buradan ).remove();
	$( "#x_" + buradan ).html( "<img style='cursor:pointer;' tik=" + tas + " id='i_" + buradan + "' src='img/" + tas + ".png'>" ).find( "img" ).draggable( { containment: ".orta", revert: "invalid", stack: "img", zIndex: 99 } );
} );
$( '#yerdencekici' ).on( 'drag', 'img', function () { vuk = 2; } );
$( '#yer4' ).on( 'drag', 'img', function () { vuk = 1; } );
function profilguncelle () {
	var cinsiyet = $( "#gender" ).val();
	var sifre = $( "#new-password" ).val();
	var myusername = $( "#new-myusername" ).val();
	var profilresmi = $( "#profilresmiinput" )[ 0 ].files[ 0 ];
	var formData = new FormData();
	formData.append( "cinsiyet", cinsiyet );
	formData.append( "sifre", sifre );
	formData.append( "profilresmi", profilresmi );
	formData.append( "myusername", myusername );
	$.ajax( {
		url: "php/profileupdate.php",
		type: "POST",
		data: formData,
		contentType: false,
		cache: false,
		processData: false,
		mimeType: "multipart/form-data",
		dataType: 'json',
		success: function ( data, textStatus, jqXHR ) {
			Toast.fire( { icon: data.durum, title: data.mesaj } );
			if ( data.durum == "success" ) {
				exitProfileBox();
				socket.emit( "profilimiguncelle", { cinsiyet: data.cinsiyet, resim: data.resim, username: data.username } );
			}
		}
	} );
}
var profilresmiguncelle = function ( event ) {
	var output = document.getElementById( 'profilresmi' );
	output.src = URL.createObjectURL( event.target.files[ 0 ] );
	output.onload = function () {
		URL.revokeObjectURL( output.src ); // free memory
	};
};
function contextekle() {	
	$.contextMenu( {
		selector: '.person',
		callback: function ( key, options ) {
			var contextuserid=$( this ).attr( "data-userid" );
			if ( key == "salondan_at" || key == "sistemden_at" || key == "sustur" ) {
				Swal.fire( {
					title: options.items[ key ].name,
					showCancelButton: true,
					cancelButtonText: "Vazgeç",
					confirmButtonText: options.items[ key ].name,
					html: $( this ).find( ".person__info--text-name" ).text() + ' isimli kullanıcı ' + options.items[ key ].mesaj + '..',
					heightAuto: false,
					inputPlaceholder: 'Açıklama girmek ister misin..?',
					input: 'textarea'
					} ).then( function ( result ) {
					if ( result.isConfirmed ) {
						socket.emit( "userislemleri",
							{
								kullanici: contextuserid,
								islem: key,
								aciklama:result.value
							} );
					}
				} );
			}
			if ( key == "salondan_banla" || key == "sistemden_banla" ) {
				const inputOptions = {
					'1 DAY': '1 Gün',
					'1 WEEK': '1 Hafta',
					'1 MONTH': '1 Ay',
					'3 MONTH': '3 Ay',
					'2 YEAR': '2 Yıl'
				};
				Swal.fire( {
					title: options.items[ key ].name,
					input: 'radio',
					width: '600px',
					icon: "question",
					showCancelButton: true,
					confirmButtonText: options.items[ key ].name,
					cancelButtonText: 'Vazgeç',
					heightAuto: false,
					html: $( this ).find( ".person__info--text-name" ).text() + ' isimli kullanıcı ' + options.items[ key ].mesaj + '..<br> <textarea placeholder="Açıklama girmek ister misin?" class="swal2-textarea" id="exampleFormControlTextarea2" rows="3"></textarea>',
					inputOptions: inputOptions,
					inputValidator: ( value ) => {
						if ( !value ) {
							return 'Süre Seçmelisiniz!';
							} else {
							socket.emit( "userislemleri",
								{
									kullanici: contextuserid,
									islem: key,
									aciklama: $( "#exampleFormControlTextarea2" ).val(),
									sure: value
								} );
						}
					}
				} );
			}
		},
		items: {
			"sustur": { name: "Sustur", icon: "fa-comment-slash", mesaj: "susturulacak" },
			"salondan_at": { name: "Salondan At", icon: "fa-right-from-bracket", mesaj: "Salondan atılacak" },
			"sistemden_at": { name: "Sistemden At", icon: "fa-right-from-bracket", mesaj: "Sistem atılacak" },
			"salondan_banla": { name: "Salondan Banla", icon: "fa-ban", mesaj: "Salondan banlanacak" },
			"sistemden_banla": { name: "Sistemden Banla", icon: "fa-ban", mesaj: "Sistemden banlanacak" },
			"quit": {
				name: "Kapat", icon: function () {
					return 'context-menu-icon context-menu-icon-quit';
				}
			}
		}
	} );
}