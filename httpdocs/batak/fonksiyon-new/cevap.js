function _profil(data){
    hakkimda=data;
    var nickname    =   seviyeDetay(data.seviye);
    var nickpuan    =   puan(data.puan);
    puanim.html(nickpuan);
    ismim.html(data.adsoyad);
    lakabim.html(nickname);
    seviyeicon.html(data.seviye);
    totalseviye.html("%"+data.yuzdelik);
    //resmim.html("<img src='"+data.fbid+"' style='width:100%;height:100%;'>");
    seviyeuzat.animate({width:data.yuzdelik+"%"},2200);
}
function _seviyeHali(data){
    seviyeicon.html(data.seviye);
    totalseviye.html("%"+data.yuzdelik);
    seviyeuzat.animate({width:data.yuzdelik+"%"},2200);
}
function _puanguncelle(data,s,mi){
    var nickpuan    =   puan(data["san"+s+"puan"]);
    puanim.html(nickpuan);
    $("#p_1").html(puan(data.oyuncular["s1"].hesap_detaylari.puan));
    $("#s_1").html(puan(data.oyuncular["s1"].hesap_detaylari.puan));
    $("#p_2").html(puan(data.oyuncular["s2"].hesap_detaylari.puan));
    $("#s_2").html(puan(data.oyuncular["s2"].hesap_detaylari.puan));
    $("#p_3").html(puan(data.oyuncular["s3"].hesap_detaylari.puan));
    $("#s_3").html(puan(data.oyuncular["s3"].hesap_detaylari.puan));
    $("#p_4").html(puan(data.oyuncular["s4"].hesap_detaylari.puan));
    $("#s_4").html(puan(data.oyuncular["s4"].hesap_detaylari.puan));
}
function _kazan(data){
	var kazanansandalye=1
	var kazandimi="";
	var thtml="";
	thtml+='<div class="puantablosu">                                              '
	thtml+='<div class="table">                                                    '
	for (var index in data.masa.oyuncular) {
		kazandimi="";
		if(data.masa.oyuncular[index]){
			if(data.masa.oyuncular[index].sandalye==kazanansandalye){
				kazandimi="active"
			}
			thtml+='<div class="player '+kazandimi+'">                                                '
			thtml+='<img src="'+data.masa.oyuncular[index].hesap_detaylari.resim+'" alt="">                     '
			thtml+='<p>'+data.masa.oyuncular[index].hesap_detaylari.username+'</p>                                                        '
			thtml+='<div class="scores odd  d-none">                                    '
			thtml+='<div class="score first">                                           '
			thtml+='<p>5</p>                                                            '
			thtml+='</div>                                                              '
			thtml+='<div class="score second">                                          '
			thtml+='<p>4</p>                                                            '
			thtml+='</div>                                                              '
			thtml+='<div class="score third">                                           '
			thtml+='<p>4</p>                                                            '
			thtml+='</div>                                                              '
			thtml+='</div>                                                              '
			thtml+='</div>                                                              '
		}
	}
		thtml+='</div>                                                                   '
		thtml+='<div class="buttons">                                                    '
		thtml+='<button onclick="socket.emit(\'masadankalk\')">ÇIK</button>                       '
		thtml+='<button onclick="swal.close()">DEVAM ET</button>                         '
		thtml+='</div>                                                                   '
		thtml+='</div>                                                                   '
		Swal.fire({
			title: '',
			html:thtml,
		heightAuto:false,
		showCloseButton: false,
		showConfirmButton: false,
		allowOutsideClick: false,
		showCancelButton: false,
		focusConfirm: false,
		backdrop: 'rgb(0 111 123 / 48%)',
		background: 'transparent',
		width:"auto"
		})
		/*
		bukazandi.play();
		pencere.fadeIn(-1000);
		//$("#davet").modal("hide"); 
		//$("#oyunbitti").modal("show"); 
		$('.__puan1').css('background', '#DDD');
		$('.__puan2').css('background', '#DDD');
		$('.__puan3').css('background', '#DDD');
		$('.__puan4').css('background', '#DDD');
		$('.__puan'+m).css('background', 'gold');
		$(".__foto1").html("");
		$(".__foto2").html("");
		$(".__foto3").html("");
		$(".__foto4").html("");
		$(".__puan1").html("");
		$(".__puan2").html("");
		$(".__puan3").html("");
		$(".__puan4").html("");
		if(data.san1!=0){
			$(".__foto1").html("<img src='"+data.san1fb+"'>");
			$(".__puan1").html('<img src="images/puan.png">'+data.san1puan);
		}
		if(data.san2!=0){
			$(".__foto2").html("<img src='"+data.san2fb+"'>");
			$(".__puan2").html('<img src="images/puan.png">'+data.san2puan);
		}
		if(data.san3!=0){
			$(".__foto3").html("<img src='"+data.san3fb+"'>");
			$(".__puan3").html('<img src="images/puan.png">'+data.san3puan);
		}
		if(data.san4!=0){
			$(".__foto4").html("<img src='"+data.san4fb+"'>");
			$(".__puan4").html('<img src="images/puan.png">'+data.san4puan);
		}
		*/
}
Array.prototype.sortBy = function(p) {
	return this.slice(0).sort(function(a,b) {
		return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	});
}
function _oyuncular(data){
	if(hakkimda.yetkiler!=""&&hakkimda.yetkiler!=undefined){ 
		uyeislemleri(data);
	}
	var sortable = [];
	for (var index in data) {
		sortable.push({
			id:index, 
			siraadi:data[index].adminadi.toLowerCase(),
			adminadi:data[index].adminadi,
			yetki_sira:data[index].yetki_sira,
			adsoyad:data[index].adsoyad,
			puan:puan(data[index].puan),
			oda:data[index].oda,
			resim:data[index].resim,
			renk:data[index].renk
		});
	}
	salondakiler.html("");
	var aktifkullanicilar="";
	sortable.sortBy("yetki_sira").forEach(value => {
		if(value.oda==hesapbilgilerim.oda){
			var resim= value.resim;
			var masaadi="";
			if(value.resim=="null"||value.resim==""){ 
				resim="img/noneuserphoto.jpeg"
			}
			if(value.masa!=0){
				masaadi=value.masasira
			}
			aktifkullanicilar+='<div class="person salonda'+value.id+'"  tik="'+value.id+'" data-row-id="'+value.id+'">                                                                     '
			aktifkullanicilar+='		<div class="person__info">                                                       '
			aktifkullanicilar+='			<div class="person__info--img">                                              '
			aktifkullanicilar+='				<img id="person-pic" src="'+resim+'" alt="'+value.adsoyad+'">       '
			aktifkullanicilar+='				<div class="star-box">                                                   '
			aktifkullanicilar+='					<span class="star-number">'+value.seviye+'</span>                                  '
			aktifkullanicilar+='					<img src="../assets/icons/star.png" alt="Yildiz">                    '
			aktifkullanicilar+='				</div>                                                                   '
			aktifkullanicilar+='			</div>                                                                       '
			aktifkullanicilar+='			<div class="person__info--text">                                             '
			aktifkullanicilar+='				<span class="person__info--text-name">'+value.adsoyad+'</span>                    '
			aktifkullanicilar+='				<span class="person__info--text-money">'+value.puan+' $</span>                      '
			aktifkullanicilar+='			</div>                                                                       '
			aktifkullanicilar+='		</div>                                                                           '
			aktifkullanicilar+='		<div class="person__table masa-number">                                                      '
			aktifkullanicilar+='			                                                                         '
			aktifkullanicilar+='		</div>                                                                           '
			aktifkullanicilar+='	</div>                                                                               '
		}
		$('salonda'+value.id+' .status').find(".status").removeClass("offline").addClass("online");
		$(".ozel-mesaj-user-"+value.id).find(".status").removeClass("offline").addClass("online");
	});
	salondakiler.html(aktifkullanicilar);
}
function _gelen(data){
	var hangiOyuncular="";
	var masaadi="";
	var oyuncuPuanDuzenle=puan(data.puan);
	var resim= "img/noneuserphoto.jpeg";
	if(data.resim!=null){
		resim=data.resim
	}
	if(data.masa!=0){
		masaadi=data.masasira
	}
	/*
		hangiOyuncular+='<div class="user salonda'+data.id+'" tik="'+data.id+'">'
		hangiOyuncular+='<img src="'+resim+'">                                  '
		hangiOyuncular+='<div>                                                          '
		hangiOyuncular+='<p>'+data.adsoyad+'</p>                                           '
		hangiOyuncular+='<span>'+oyuncuPuanDuzenle+'</span><img src="src/images/coins.png">               '
		hangiOyuncular+='<p>'+masaadi+'</p>                                           '
		hangiOyuncular+='</div>                                                         '
		hangiOyuncular+='</div>                                                         ';  
	*/
	hangiOyuncular+='<div class="user salonda'+data.id+'" tik="'+data.id+'">'
	hangiOyuncular+='<div class="salondakiler-rutbe"><i style="color:'+data.renk+'" class="bi bi-star-fill" style="font-size:20px;"></i><i style="color:black !important; position:absolute; left:0; font-size:20px;" class="bi bi-star"></i></div>'
	hangiOyuncular+='<img src="'+resim+'">                                   '
	hangiOyuncular+='<div>                                                          '
	hangiOyuncular+='<p>'+data.adsoyad+'</p>                                           '
	hangiOyuncular+='<span>'+oyuncuPuanDuzenle+'</span><img src="src/images/coins.png">               '
	hangiOyuncular+='</div>                                                         '
	hangiOyuncular+='<button class="start-chat-with"><img src="images/start-chat.png"></button>'
	hangiOyuncular+='</div>                                                         ';
	//salondakiler.append(hangiOyuncular);
	var yetki="";
	if(data.yetki!=""){
		yetki=" ("+data.yetki+")";
	}
	$(".messages").append('<div class="message message-from-user"><span>'+data.adsoyad+''+yetki+'</span><p class="text-success">salona girdi..</p></div>');
}
function _diz(data,k){
	console.log(okeyControl__(data.masa.okey));
	terscevirilenler.filter(m => m.tersmi==true).forEach((ters, index) => {
		ters.tersmi=false;
	});
	$("#taslar").html("");
	elPrint=data.elim;
	for (var i=0;i < elPrint.length; i++){ 
		var resim=elPrint[i];
		if(elPrint[i]==okeyControl__(data.masa.okey)){
		resim="tasbg";
		}
		var tersvarmi=terscevirilenler.find(m => m.tik === elPrint[i]&&m.tersmi==false);
		if(tersvarmi){
			resim="tasbg";
			tersvarmi.tersmi=true;
		}
		if(elPrint[i]=="0"){
			if(i==13){
				taslar.prepend("<ul id='x_"+i+"' ></ul>");
				}else{
				taslar.prepend("<ul id='x_"+i+"' ></ul>").find("ul").droppable();
			}
			}else{
			taslar.prepend("<ul id='x_"+i+"'><img style='cursor:pointer;' tik="+elPrint[i]+" id='i_"+i+"' src='img/"+resim+".png'></ul>").find("img").draggable({containment: "body",revert: "invalid",stack: "img",zIndex:999
			});
		}
	}
}
function masaayarguncelle(){
	baglan.emit("masaayarguncelle",{
		masasohbeti:$("#icmasasohbeti").prop('checked'),
		izleyicisohbeti:$("#icizleyicisohbeti").prop('checked'),
		izleyicialma:$("#icizleyicialma").prop('checked')
	});
	//$("#masaayari").modal("hide");
} 
function _durum(data){	
	var masadakiaktifoyuncu=0;
	for (var i = 1; i < 5; i++) {
		if(data["san"+i]!=0){
			masadakiaktifoyuncu++;
		}  
	}
	var toplamkazanilacak=data.canakpuan;
	toplamkazanilacak=parseInt(toplamkazanilacak)+(parseInt(masadakiaktifoyuncu)*parseInt(data.bilgiler.cipmiktari));
	var kesinti=toplamkazanilacak/100*20;
	toplamkazanilacak=toplamkazanilacak-kesinti;
	$(".pot-box__text--pot-amount").html(toplamkazanilacak);
	$(".oyunubaslat").hide();
	$(".inviteOthers").hide();
	if(data.masasahibi==hesapbilgilerim.id&&masadakiaktifoyuncu>=data.bilgiler.oyuncusayisi){
		$(".oyunubaslat").show();
	}
	$('#icmasasohbeti').prop('checked', data.masasohbeti);
	$('#icizleyicisohbeti').prop('checked', data.izleyicisohbeti);
	$('#icizleyicialma').prop('checked', data.izleyicialma);
	if(data.masasahibi==hesapbilgilerim.id){
		$(".masaayari").show();
		}else{
		$(".masaayari").hide();
	}
	if(data["oyun"]==0){
		$("#__2").html(data.canakpuan);
		taslar.html("");
		if(data.masasahibi==hesapbilgilerim.id){
			if(masadakiaktifoyuncu<data.bilgiler.oyuncusayisi){
				$(".inviteOthers").show();
			}
		}
		var mk=0;
		}else{
		$(".oyunubaslat").hide();
	}
}
function _masalar(data){
	masalar.html("");
	var hangiMasalar="";
	$.each( data, function( key, value ) {
		if(value.salon==hesapbilgilerim.oda){
			var izleyicialma="Kapalı";
			var izleyicisohbeti="Kapalı";
			var masasohbeti="Kapalı";
			if(value.izleyicialma==true){
				izleyicialma="Açık";
			}
			if(value.izleyicisohbeti==true){
				izleyicisohbeti="Açık";
			}
			if(value.masasohbeti==true){
				masasohbeti="Açık";
			}
			if(value.san1fb==null){
				value.san1fb="img/noneuserphoto.jpeg";
			}
			if(value.san2fb==null){
				value.san2fb="img/noneuserphoto.jpeg";
			}
			if(value.san3fb==null){
				value.san3fb="img/noneuserphoto.jpeg";
			}
			if(value.san4fb==null){
				value.san4fb="img/noneuserphoto.jpeg";
			}
			if(value.san1!=0){
				var san1="<img src='"+value.san1fb+"' style='width:100%;height:100%;border-radius:100%;'>";
				}else{
				var san1="<img src='images/otur.png' style='border:2px solid red;'>";
			}
			if(value.san2!=0){
				var san2="<img src='"+value.san2fb+"' style='width:100%;height:100%;border-radius:100%;'>";
				}else{
				var san2="<img src='images/otur.png' style='border:2px solid red;'>";
			}
			if(value.san3!=0){
				var san3="<img src='"+value.san3fb+"' style='width:100%;height:100%;border-radius:100%;'>";
				}else{
				var san3="<img src='images/otur.png' style='border:2px solid red;'>";
			}
			if(value.san4!=0){
				var san4="<img src='"+value.san4fb+"' style='width:100%;height:100%;border-radius:100%;'>";
				}else{
				var san4="<img src='images/otur.png' style='border:2px solid red;'>";
			}
			hangiMasalar+='<div class="table widnow-1" id="masa'+value.id+'" tik="'+value.id+'">                                                  '
			hangiMasalar+='<span class="table-num">Masa '+value.id+'</span>                                         '
			hangiMasalar+='<div class="info">                                                            '
			hangiMasalar+='<div class="bet-info">                                                        '
			hangiMasalar+='<span class="bet">Bahis</span>                                                '
			hangiMasalar+='<span class="bet-amount">'+value.puan+'</span>                                         '
			hangiMasalar+='</div>                                                                        '
			hangiMasalar+='<div class="pot-info">                                                        '
			hangiMasalar+='<span class="pot">'+value.oyuntipi+'</span>                                                '
			hangiMasalar+='<span class="pot-amount">4000</span>                                          '
			hangiMasalar+='</div>                                                                        '
			hangiMasalar+='</div>                                                                        '
			hangiMasalar+='<button class="one-on-one-button">                                            '
			hangiMasalar+='<img src="../assets/icons/thunder.svg" alt="thunder">                         '
			hangiMasalar+='<div>                                                                         '
			hangiMasalar+='<span>TEK\'E</span>                                                            '
			hangiMasalar+='<span>TEK</span>                                                              '
			hangiMasalar+='</div>                                                                        '
			hangiMasalar+='</button>                                                                     '
			hangiMasalar+='<div class="sit">                                                             '
			hangiMasalar+='<button class="sit__button">otur</button>                                     '
			hangiMasalar+='</div>                                                                        '
			hangiMasalar+='<figure class="gamer gamer-3">                                                '
			hangiMasalar+='<img src="assets/images/ahmet.png" alt="Ahmet">                               '
			hangiMasalar+='<figcaption>Ahmet</figcaption>                                                '
			hangiMasalar+='</figure>                                                                     '
			hangiMasalar+='</div>                                                                        '
		}
	});
	if(hangiMasalar!=0){
		//masalar.html(hangiMasalar);
	}
}
function _yeniBirMasa(data){
	if(data.salon==hesapbilgilerim.oda){
		var izleyicialma="Kapalı";
		var izleyicisohbeti="Kapalı";
		var masasohbeti="Kapalı";
		if(data.izleyicialma==true){
			izleyicialma="Açık";
		}
		if(data.izleyicisohbeti==true){
			izleyicisohbeti="Açık";
		}
		if(data.masasohbeti==true){
			masasohbeti="Açık";
		}
		if(data.san1fb==null){
			data.san1fb="img/noneuserphoto.jpeg";
		}
		if(data.san2fb==null){
			data.san2fb="img/noneuserphoto.jpeg";
		}
		if(data.san3fb==null){
			data.san3fb="img/noneuserphoto.jpeg";
		}
		if(data.san4fb==null){
			data.san4fb="img/noneuserphoto.jpeg";
		}
		var hangiMasalar="";
		if(data.san1!=0){
			var san1="<img src='"+data.san1fb+"' style='width:44px;height:42px;border-radius:6px;'>";
			}else{
			var san1="<img src='images/otur.png' style='border:2px solid red;'>";
		}
		if(data.san2!=0){
			var san2="<img src='"+data.san2fb+"' style='width:44px;height:42px;border-radius:6px;'>";
			}else{
			var san2="<img src='images/otur.png' style='border:2px solid red;'>";
		}
		if(data.san3!=0){
			var san3="<img src='"+data.san3fb+"' style='width:44px;height:42px;border-radius:6px;'>";
			}else{
			var san3="<img src='images/otur.png' style='border:2px solid red;'>";
		}
		if(data.san4!=0){
			var san4="<img src='"+data.san4fb+"' style='width:44px;height:42px;border-radius:6px;'>";
			}else{
			var san4="<img src='images/otur.png' style='border:2px solid red;'>";
		}
		hangiMasalar+='<div class="table" id="masa'+data.id+'" tik="'+data.id+'">                                     '
		hangiMasalar+='<div class="table-content" >                             '
		hangiMasalar+='<button class="play-button-top kol1" tik="'+data.id+'"  id="ot'+data.id+'_1">'+san1+'</button>          '
		hangiMasalar+='<button class="play-button-left kol2" tik="'+data.id+'"  id="ot'+data.id+'_2">'+san2+'</button>           '
		hangiMasalar+='<button class="play-button-down kol3" tik="'+data.id+'"  id="ot'+data.id+'_3">'+san3+'</button>           '
		hangiMasalar+='<button class="play-button-right kol4" tik="'+data.id+'"  id="ot'+data.id+'_4">'+san4+'</button>           '
		hangiMasalar+='<div class="table-price">                               '
		hangiMasalar+='<span>'+data.puan+' <img src="src/images/coins.png"></span>       '
		hangiMasalar+='</div>                                                  '
		//hangiMasalar+='<div class="table-features">                            '
		hangiMasalar+='<div class="masa-adi"><h5 class="text-capitalize">Masa: '+data.masaadi+'</h5></div>                                            '
		hangiMasalar+='<div class="oyun-tipi"><h5>Oyun: '+data.oyuntipi+'</h5></div>                                       '
		hangiMasalar+='<div class="masa-no"> NO: '+data.id+'</div>'
		hangiMasalar+='<img src="images/buyutec.png" class="izleyici-alma">                                       '
		//hangiMasalar+='<h5>İzleyici Sohbeti : '+izleyicisohbeti+'</h5>                                       '
		//hangiMasalar+='<h5>Masa Sohbeti : '+masasohbeti+'</h5>                                       '
		//hangiMasalar+='</div>                                                  '
		hangiMasalar+='</div>                                                  '
		hangiMasalar+='</div>';
		masalar.prepend(hangiMasalar);
	}
} 
function _user(data){
	hakkinda=data;
	var resim="img/noneuserphoto.jpeg"
	if(data.resim!=null&&data.resim!=""){
		resim=data.resim;
	}
	pencere.fadeIn(-1000);
	var oyuncuPuanDuzenle=puan(data.puan);
	hakkinda.adsoyad=data.adsoyad;
	//ufoto.html("");
	uname.html(data.adsoyad);
	useviye.html(data.seviye);
	upuan.html(oyuncuPuanDuzenle);
	usk1.html(data.toplamoyun);
	usk2.html(data.kazandigi);
	usk3.html(data.kaybettigi);
	$(".profildetaylari").attr("data-alici",data.id).attr("data-aliciadi",data.adsoyad).attr("data-aliciresmi",resim);
	$(".rprofilcinsiyet").html(data.yetki);
	var yuzdeHesapla=eval(data.kazandigi) / eval(data.toplamoyun);
	var yuzdeHesapla2=eval(yuzdeHesapla) * eval(100);
	var yuzdelikciktisi=Math.floor(yuzdeHesapla2);
	if(yuzdeHesapla2){
		usk4.html("%"+yuzdelikciktisi);
		}else{
		usk4.html("%0");
	}
	tmhata.html("").fadeOut(-1000);
	$(".__foto").attr("src",resim);
	//$("#profilim").modal("show");
}
function _sira(data,koltuk){
	if(data["san"+hakkimda.sandalye+"c"]==0){
		//$(".ciftegit").fadeIn(-1000); 
		}else{
		//$(".ciftegit").fadeOut(-1000);
	}
	$("#__1").html(data.puan);
	$("#__2").html(data.canakpuan);
	tasgonder_.css("display","none");
	yerdencekici_.css("display","none");
	kontrolcu_.css("display","none");
	$(".tasyerim").css("display","none");
	konak=data; 
	y1.html("");
	y2.html("");
	y3.html("");
	y4.html("");
	$(".sira").stop().fadeOut(-1000).animate({height:"70",backgroundColor: "#7AA832"},0);
	$(".sira1-progress").stop().fadeOut(-1000).animate({width:"100%",backgroundColor: "#7AA832"},0);
	$(".sira-yeni").stop().fadeOut(-1000).animate({width:"100%",backgroundColor: "red"},0);
	$(".sandalyesira").removeClass("active");
	if(data.oyun==1){
		var sira=data.sira;
		$("#bitir").html("<img src='img/"+data.okey+".png'>");
		$(".kalantas").html(eval(data["bostakiler"].length)-eval(1));		
		if(sira==koltuk){
			if(data["refleks"]==0){
				// AT VEYA BİTİR
				tasgonder_.css("display","block");
				tasgonder_.droppable();
				kontrolcu_.css("display","block");
				kontrolcu_.droppable();
				}else{
				if(data["refleks"]==1){
					//oturdum.play();
					yerdencekici_.html("<img src='img/tasbg.png'>").find("img").draggable({  
						zIndex: 9999,
						stack: "img",
						appendTo: 'body',
						containment: "body",
						revert: "invalid",
						helper: 'clone',
						});
					yerdencekici_.css("display","block");
					$("#yerdencekalt").css("display","block");
					$("#yer4alt").css("display","block");
				}
			}
		}
		if(koltuk==1){
			if(data["san12"][0]!="0"){y1.prepend("<img src='img/"+data["san12"][0]+".png'>");}
			if(data["san12"][1]!="0"){y1.append("<img src='img/"+data["san12"][1]+".png'>");}
			if(data["san23"][0]!="0"){y2.prepend("<img src='img/"+data["san23"][0]+".png'>");}
			if(data["san23"][1]!="0"){y2.append("<img src='img/"+data["san23"][1]+".png'>");}
			if(data["san34"][0]!="0"){y3.prepend("<img src='img/"+data["san34"][0]+".png'>");}
			if(data["san34"][1]!="0"){y3.append("<img src='img/"+data["san34"][1]+".png'>");}
			if(data["san41"][0]!="0"){y4.prepend("<img src='img/"+data["san41"][0]+".png'>");}
			if(data["san41"][1]!="0"){if(data["sira"]==koltuk && data["refleks"]=="1"){y4.append("<img src='img/"+data["san41"][1]+".png' style='cursor:pointer;'>").find("img").draggable({  zIndex: 9999,appendTo: 'body',helper: 'clone',stack: "img",containment: "body",revert: "invalid"});}else{y4.append("<img src='img/"+data["san41"][1]+".png'>");}}
			if(sira==1){
				$("#ben").addClass("active");
				sirauyar($("#ben").find(".opponent-experience-level"),data.beklemesuresi);
			}
			if(sira==2){	
				$("#sagimdaki").addClass("active");
				sirauyar($("#sagimdaki").find(".opponent-experience-level"),data.beklemesuresi);
			}
			if(sira==3){
				$("#karsimdaki").addClass("active");
				sirauyar($("#karsimdaki").find(".opponent-experience-level"),data.beklemesuresi);
			}
			if(sira==4){
				$("#solumdaki").addClass("active");
				sirauyar($("#solumdaki").find(".opponent-experience-level"),data.beklemesuresi);
			}
			}else{
			if(koltuk==2){
				if(data["san12"][0]!="0"){y4.prepend("<img src='img/"+data["san12"][0]+".png'>");}
				if(data["san12"][1]!="0"){if(data["sira"]==koltuk && data["refleks"]=="1"){y4.append("<img src='img/"+data["san12"][1]+".png' style='cursor:pointer;'>").find("img").draggable({  zIndex: 9999,appendTo: 'body',helper: 'clone',containment: "body", stack: "img",revert: "invalid"});}else{y4.append("<img src='img/"+data["san12"][1]+".png'>");}}
				if(data["san23"][0]!="0"){y1.append("<img src='img/"+data["san23"][0]+".png'>");}
				if(data["san23"][1]!="0"){y1.append("<img src='img/"+data["san23"][1]+".png'>");}
				if(data["san34"][0]!="0"){y2.append("<img src='img/"+data["san34"][0]+".png'>");}
				if(data["san34"][1]!="0"){y2.append("<img src='img/"+data["san34"][1]+".png'>");}
				if(data["san41"][0]!="0"){y3.append("<img src='img/"+data["san41"][0]+".png'>");}
				if(data["san41"][1]!="0"){y3.append("<img src='img/"+data["san41"][1]+".png'>");}
				if(sira==2){
					$("#ben").addClass("active");
					sirauyar($("#ben").find(".opponent-experience-level"),data.beklemesuresi);
				}
				if(sira==3){
					$("#sagimdaki").addClass("active");
					sirauyar($("#sagimdaki").find(".opponent-experience-level"),data.beklemesuresi);
				}
				if(sira==4){
					$("#karsimdaki").addClass("active");
					sirauyar($("#karsimdaki").find(".opponent-experience-level"),data.beklemesuresi);
				}
				if(sira==1){
					$("#solumdaki").addClass("active");
					sirauyar($("#solumdaki").find(".opponent-experience-level"),data.beklemesuresi);
				}
				}else{
				if(koltuk==3){
					if(data["san34"][0]!="0"){y1.append("<img src='img/"+data["san34"][0]+".png'>");}
					if(data["san34"][1]!="0"){y1.append("<img src='img/"+data["san34"][1]+".png'>");}
					if(data["san23"][0]!="0"){y4.prepend("<img src='img/"+data["san23"][0]+".png'>");}
					if(data["san23"][1]!="0"){if(data["sira"]==koltuk && data["refleks"]=="1"){y4.append("<img src='img/"+data["san23"][1]+".png' style='cursor:pointer;'>").find("img").draggable({  zIndex: 9999,appendTo: 'body',helper: 'clone',containment:  "body",stack: "img",revert: "invalid"});}else{y4.append("<img src='img/"+data["san23"][1]+".png'>");}}
					if(data["san41"][0]!="0"){y2.append("<img src='img/"+data["san41"][0]+".png'>");}
					if(data["san41"][1]!="0"){y2.append("<img src='img/"+data["san41"][1]+".png'>");}
					if(data["san12"][0]!="0"){y3.append("<img src='img/"+data["san12"][0]+".png'>");}
					if(data["san12"][1]!="0"){y3.append("<img src='img/"+data["san12"][1]+".png'>");}
					if(sira==3){
						$("#ben").addClass("active");
						sirauyar($("#ben").find(".opponent-experience-level"),data.beklemesuresi);
					}
					if(sira==4){
						$("#sagimdaki").addClass("active");
						sirauyar($("#sagimdaki").find(".opponent-experience-level"),data.beklemesuresi);
					}
					if(sira==1){
						$("#karsimdaki").addClass("active");
						sirauyar($("#karsimdaki").find(".opponent-experience-level"),data.beklemesuresi);
					}
					if(sira==2){
						$("#solumdaki").addClass("active");
						sirauyar($("#solumdaki").find(".opponent-experience-level"),data.beklemesuresi);
					}
					}else{
					if(koltuk==4){ 
						if(data["san41"][0]!="0"){y1.append("<img src='img/"+data["san41"][0]+".png'>");}
						if(data["san41"][1]!="0"){y1.append("<img src='img/"+data["san41"][1]+".png'>");}
						if(data["san12"][0]!="0"){y2.append("<img src='img/"+data["san12"][0]+".png'>");}
						if(data["san12"][1]!="0"){y2.append("<img src='img/"+data["san12"][1]+".png'>");}
						if(data["san34"][0]!="0"){y4.prepend("<img src='img/"+data["san34"][0]+".png'>");}
						if(data["san34"][1]!="0"){if(data["sira"]==koltuk && data["refleks"]=="1"){y4.append("<img src='img/"+data["san34"][1]+".png' style='cursor:pointer;'>").find("img").draggable({   zIndex: 9999,appendTo: 'body',helper: 'clone',stack: "img",containment: "body",revert: "invalid"});}else{y4.append("<img src='img/"+data["san34"][1]+".png'>");}}
						if(data["san23"][0]!="0"){y3.append("<img src='img/"+data["san23"][0]+".png'>");}
						if(data["san23"][1]!="0"){y3.append("<img src='img/"+data["san23"][1]+".png'>");}
						if(sira==4){
							$("#ben").addClass("active");
							sirauyar($("#ben").find(".opponent-experience-level"),data.beklemesuresi);
						}
						if(sira==1){
							$("#sagimdaki").addClass("active");
							sirauyar($("#sagimdaki").find(".opponent-experience-level"),data.beklemesuresi);
						}
						if(sira==2){
							$("#karsimdaki").addClass("active");
							sirauyar($("#karsimdaki").find(".opponent-experience-level"),data.beklemesuresi);
						}
						if(sira==3){
							$("#solumdaki").addClass("active");
							sirauyar($("#solumdaki").find(".opponent-experience-level"),data.beklemesuresi);
						}
					}
				}
			}
		}
		}else{
		$("#bitir").html("<img src='img/tasbg.png'>");
		$(".kalantas").html("0");
	}
}
function _masaici(data,koltuk){
	//$("#davet").modal("hide");
	$(".sandalye").fadeOut(-1000);
	taslar.html(""); 
	if(koltuk==1){
		if(data["san2"]!=0){
			$("#sagimdaki").fadeIn(-1000);
			$("#sagimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
			$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
			$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
		}
		if(data["san3"]!=0){
			$("#karsimdaki").fadeIn(-1000);
			$("#karsimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
			$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
			$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
		}
		if(data["san4"]!=0){
			$("#solumdaki").fadeIn(-1000);
			$("#solumdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
			$("#solumdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
			$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
		}
		}else{
		if(koltuk==2){
			if(data["san3"]!=0){
				$("#sagimdaki").fadeIn(-1000);
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
			}
			if(data["san4"]!=0){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
			}
			if(data["san1"]!=0){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
			}
			}else{
			if(koltuk==3){
				if(data["san4"]!=0){
					$("#sagimdaki").fadeIn(-1000);
					$("#sagimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
					$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
					$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
				}
				if(data["san1"]!=0){
					$("#karsimdaki").fadeIn(-1000);
					$("#karsimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
					$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
					$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
				}
				if(data["san2"]!=0){
					$("#solumdaki").fadeIn(-1000);
					$("#solumdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
					$("#solumdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
					$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
				}
				}else{
				if(koltuk==4){
					if(data["san1"]!=0){
						$("#sagimdaki").fadeIn(-1000);
						$("#sagimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
						$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
						$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
					}
					if(data["san2"]!=0){
						$("#karsimdaki").fadeIn(-1000);
						$("#karsimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
						$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
						$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
					}
					if(data["san3"]!=0){
						$("#solumdaki").fadeIn(-1000);
						$("#solumdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
						$("#solumdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
						$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))						
					}
				}
			}
		}
	}
	_sira(data,koltuk);
}
function _masayagelen(data,okultuk,koltuk){
	var x = msms.play();
	if(koltuk==1){
		if(okultuk==2){
			$("#sagimdaki").fadeIn(-1000);
			$("#sagimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
			$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
			$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
		}
		if(okultuk==3){
			$("#karsimdaki").fadeIn(-1000);
			$("#karsimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
			$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
			$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
		}
		if(okultuk==4){
			$("#solumdaki").fadeIn(-1000);
			$("#solumdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
			$("#solumdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
			$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))						
		}
		}else{
		if(koltuk==2){
			if(okultuk==3){
				$("#sagimdaki").fadeIn(-1000);
				$("#sagimdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
				$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
				$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))
			}
			if(okultuk==4){
				$("#karsimdaki").fadeIn(-1000);
				$("#karsimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
				$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
				$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
			}
			if(okultuk==1){
				$("#solumdaki").fadeIn(-1000);
				$("#solumdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
				$("#solumdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
				$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))						
			}
			}else{
			if(koltuk==3){
				if(okultuk==4){
					$("#sagimdaki").fadeIn(-1000);
					$("#sagimdaki").find("img").attr("src",data.oyuncular["s4"].hesap_detaylari.resim)
					$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s4"].hesap_detaylari.username)
					$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s4"].hesap_detaylari.puan))
				}
				if(okultuk==1){
					$("#karsimdaki").fadeIn(-1000);
					$("#karsimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
					$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
					$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
				}
				if(okultuk==2){
					$("#solumdaki").fadeIn(-1000);
					$("#solumdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
					$("#solumdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
					$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))						
				}
				}else{
				if(koltuk==4){
					if(okultuk==1){
						$("#sagimdaki").fadeIn(-1000);
						$("#sagimdaki").find("img").attr("src",data.oyuncular["s1"].hesap_detaylari.resim)
						$("#sagimdaki").find(".opponent-name").html(data.oyuncular["s1"].hesap_detaylari.username)
						$("#sagimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s1"].hesap_detaylari.puan))
					}
					if(okultuk==2){
						$("#karsimdaki").fadeIn(-1000);
						$("#karsimdaki").find("img").attr("src",data.oyuncular["s2"].hesap_detaylari.resim)
						$("#karsimdaki").find(".opponent-name").html(data.oyuncular["s2"].hesap_detaylari.username)
						$("#karsimdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s2"].hesap_detaylari.puan))
					}
					if(okultuk==3){
						$("#solumdaki").fadeIn(-1000);
						$("#solumdaki").find("img").attr("src",data.oyuncular["s3"].hesap_detaylari.resim)
						$("#solumdaki").find(".opponent-name").html(data.oyuncular["s3"].hesap_detaylari.username)
						$("#solumdaki").find(".opponent-box__right__point--amount").html(puan(data.oyuncular["s3"].hesap_detaylari.puan))						
					}
				}
			}
		}
	}
} 
function _masayamesaj(o,data){
	var oyuncu=oyuncular[o];
	if(oyuncu){
		var x = msms.play();
		var m=smsdata(data);
		//yazilanlar2.append("<ul><b tik='"+oyuncu.id+"'>"+oyuncu.adsoyad+" : </b> "+m+"</ul>").animate({ scrollTop: eval($(document).height()) * eval($(document).height()) * eval(1000) }, 1);
		if(hakkimda.id!=oyuncu.id){
			$(".messages").append('<div class="message"><img src="'+oyuncu.fbid+'"><p>'+oyuncu.adsoyad+'</p><span>'+m+'</span></div>');
		}							
	}
	}
	function _hediyeat(s,d){
	if($("#he"+s)){
	var xx = hevar.play();
	$("#he"+s).html("<img src='"+d+"' class='animated bounceIn'>");
	$("#he"+s).show();
	}
	}																																																																					