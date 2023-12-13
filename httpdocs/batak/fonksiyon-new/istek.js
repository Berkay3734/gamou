$(function(){
    $(".davetlistesi").delegate('div','click',function(){
        var tiklanilanOyuncu=$(this).attr("tik");
        $("#pop"+tiklanilanOyuncu).fadeOut(-1000);
        baglan.emit("davetgonder",tiklanilanOyuncu);
	});
    $('#taslar').delegate('ul>img','dblclick',function(){
		//$(this).attr("src","img/tasbg.png");
		var src = ($(this).attr('src') === 'img/tasbg.png')
		? 'img/'+$(this).attr("tik")+'.png'
		: 'img/tasbg.png';
		//$(this).attr('src', src);
		var tertevarmi=terscevirilenler.find(m => m.tik === $(this).attr("tik"));
		if(tertevarmi){
			for (var i = terscevirilenler.length - 1; i >= 0; i--) {
				if (terscevirilenler[i].tik === $(this).attr("tik")) {
					$(this).attr('src','img/'+$(this).attr("tik")+'.png');
					terscevirilenler.splice(i, 1);
					break;
				}
			}
			}else{
			$(this).attr('src','img/tasbg.png');
			terscevirilenler.push({tik:$(this).attr("tik"),id:$(this).attr("id"),tersmi:false});
		} 
	});
    salondakiler.delegate('.user','click',function(){
        var tiklanilanOyuncu=$(this).attr("tik");
        baglan.emit("profilgetir",tiklanilanOyuncu);
        //klick.play();
	});
    pkapat.click(function(){
        pencere.fadeOut(-1000);
        pencereler.fadeOut(-1000);
        tmhata.html("").fadeOut(-1000);
        hakkinda=false;
        //klick.play();
	});
    $("#onof").click(function(){
        pencere.fadeOut(-1000);
        pencereler.fadeOut(-1000);
        tmhata.html("").fadeOut(-1000);
        //klick.play();
	});
    $("#kazanankapat").click(function(){
        pencere.fadeOut(-1000);
       // $("#oyunbitti").modal("hide");  
		//$("#davet").modal("show"); 
        //klick.play();
	});
    $(".katilmakistemiyorum").click(function(){
        deden=0,dyer=0;
        //$(".davetvar").fadeOut(-1000);
		//$("#davetvar").modal("hide");
	});
    $(".katilmakistiyorum").click(function(){
        if(dyer > 0){
            //$(".davetvar").fadeOut(-1000);
			//$("#davetvar").modal("hide");
            baglan.emit("davetekatil",dyer);
            deden=0,dyer=0;
		}
	});
    $(".ogren").click(function(){
        $(".sayfa").fadeOut(-1000);
        $(".egitici").fadeIn(-1000);
        //klick.play();
	});
    $("#anladim").click(function(){
        $(".egitici").fadeOut(-1000);
        $(".sayfa").fadeIn(-1000);
        //klick.play();
	});
    $(".cipal").click(function(){
        pencere.fadeIn(-1000);
        $("#pcip").fadeIn(-1000);
        //klick.play();
	});
	/*
		$("#islem3-old").click(function(){
        pencere.fadeIn(-1000);
        $("#profilim").fadeIn(-1000);
        //klick.play();
		});
	*/
    $(".oyna").click(function(){
        $(".egitici").fadeOut(-1000);
        $(".sayfa").fadeIn(-1000);
        baglan.emit("hemenoyna");
        //klick.play();
	});
    $("#islem2").click(function(){
        pencere.fadeIn(-1000);
        $("#pradyo").fadeIn(-1000);
        //klick.play();
	});
    $("#islem1").click(function(){
        pencere.fadeIn(-1000);
        $("#payarlarim").fadeIn(-1000);
        //klick.play();
	});
    $(".__tm3").click(function(){
        baglan.emit("yfoto",hakkinda.id);
        pencere.fadeOut(-1000);
        pencereler.fadeOut(-1000);
        tmhata.html("").fadeOut(-1000);
        hakkinda=false;
        //klick.play();
	});
    $(".istek1").click(function(){
        $(".istek1").fadeOut(-1000);
        $(".istek2").fadeIn(-1000);
        baglan.emit("davetayarlarim",2);
	});
    $(".istek2").click(function(){
        $(".istek2").fadeOut(-1000);
        $(".istek1").fadeIn(-1000);
        baglan.emit("davetayarlarim",1);
	});
    $(".salondancik").click(function(){
        window.location.href = "./salon.php";
	});
    hediyegonder.click(function(){
		if($(this).attr("data-alici")==hakkimda.id){
			return false;
		}
        if(hakkimda){
            if(hakkinda){
                if(hakkimda.masa==hakkinda.masa && hakkimda.masa!=0){
					pencereler.fadeOut(-1000);
					//klick.play();
					pencere.fadeIn(-1000);
					//$("#profilim").modal("hide");
					//$("#phediye").modal("show");
					}else{
					Toast.fire({icon: 'warning',title: "Sadece, sizinle aynı masadaki oyunculara hediye gönderebilirsiniz."});
				}
				}else{
				Toast.fire({icon: 'warning',title: "Birazdan tekrar deneyin"});
			}
			}else{
			Toast.fire({icon: 'warning',title: "Birazdan tekrar deneyin"});
		}
        //klick.play();
	});
    tmhata.click(function(){
        tmhata.fadeOut(-1000);
	});
    $(".hediye").click(function(){
        pencere.fadeOut(-1000);
        pencereler.fadeOut(-1000);
		//$("#profilim").modal("hide");
		//$("#phediye").modal("hide");
        var tiklananHediye=$(this).attr("id");
		var hediyeid=$(this).attr("data-id");
        if(tiklananHediye!=0){ 
            baglan.emit("hediye",hakkinda.sandalye,tiklananHediye,hediyeid);
		}
	});
    $(".playicon").click(function(){
        if(rdurum==1){
            $(".stopicon").fadeOut(-1000);
            var tikradyo=$(this).attr("tik");
            $("#ro"+tikradyo+"s").fadeIn(-1000);
            radyo = document.getElementById("ro"+tikradyo+"o");
            radyo.play();
            rdurum=2;
			}else{
            if(rdurum==2){
                radyo.pause();
                $(".stopicon").fadeOut(-1000);
                var tikradyo=$(this).attr("tik");
                $("#ro"+tikradyo+"s").fadeIn(-1000);
                radyo = document.getElementById("ro"+tikradyo+"o");
                radyo.play();
				rdurum=2;
			}
		}
	});
	$(".stopicon").click(function(){
		if(rdurum==2){
            $(".stopicon").fadeOut(-1000);
            $(".playicon").fadeIn(-1000);
            radyo.pause();
            rdurum=1;
		}
	});
	sikayetet.click(function(){
		if(hakkinda){
            pencereler.fadeOut(-1000);
            sikayettitle.val(hakkinda.adsoyad+" hakkında şikayet");
            sikayetdetay.val("");
            _p2.fadeIn(-1000).addClass('animated zoomIn');
            tmhata.html("").fadeOut(-1000);
			}else{
            tmhata.html("Birazdan tekrar deneyin").fadeIn(-1000);
		}
		//klick.play();
	});
	sikayetbildir.click(function(){
		tmhata.html("").fadeOut(-1000);
		var sbaslik = sikayettitle.val();
		var sdetay  = sikayetdetay.val();
		if(sbaslik.length > 2){
            if(sdetay.length > 6){
				if(hakkinda){
					baglan.emit("sikayet",hakkinda.id,sbaslik,sdetay);
					sikayettitle.val("");
					sikayetdetay.val("");
					tmhata.html("<b>Teşekkürker</b> şikayetiniz iletildi").fadeIn(-1000);
					}else{
					tmhata.html("Birazdan tekrar deneyin").fadeIn(-1000);
				}
				}else{
				tmhata.html("Şikayetinizi belirtiniz").fadeIn(-1000);
			}
			}else{
            tmhata.html("Şikayet için başlık belirtiniz").fadeIn(-1000);
		}
		//klick.play();
	});
	vazgec.click(function(){
		pencere.fadeOut(-1000);
		pencereler.fadeOut(-1000);
		tmhata.html("").fadeOut(-1000);
		hakkinda=false;
		//klick.play();
	});
	yenimasa.click(function(){
		pencere.fadeIn(-1000);
		_p5.fadeIn(-1000).addClass('animated zoomIn');
		//$("#puandegeri").attr("placeholder", "Min: "+altlimit+" Max: "+ustlimit);
		//klick.play();
	});
	$(".lobiye-bak").click(function(){
		sayfa1.fadeIn(-1000);
		sayfa2.fadeOut(-1000);
		$(".masaya-gec").removeClass("d-none");
		baglan.emit("lobiyegec",{});
	});
	$(".masaya-gec").click(function(){
		sayfa2.fadeIn(-1000);
		sayfa1.fadeOut(-1000);
		$(".masaya-gec").addClass("d-none");
		baglan.emit("masayagec",{});
	});
	$("#onon").click(function(){
		if(hakkimda.tip){
			Toast.fire({icon: 'info',title: "Masaya açmak için üye girişi yapmalısınız.."});
			return false;
		}
		var pdeger = $("#table-chip-amount").val();
		if($("#table-name").val()==""){
			Toast.fire({icon: "error",title: "Masa Adı Giriniz..!!"});	
			return false;
		}
		if($(".table-settings__table-gosterge--activate--circle").hasClass("active")){
			$("#gamer-amount").val(2);
		}
		if(pdeger <= hakkimda.puan){
			if(pdeger > 0){
				if(pdeger >= altlimit){
					if(pdeger <= ustlimit){
						var oyunt="Okey";
						if($(".table-settings__table-canak--activate--circle").hasClass("active")){
						oyunt="Çanak";
						}
						baglan.emit("masayarat",{
							
							masaadi:$("#table-name").val(),
							oyuncusayisi:$("#gamer-amount").val(),
							chipmiktari:$("#table-chip-amount").val(),
							masasohbeti:$(".table-settings__table-chat--activate--circle").hasClass("active"),
							izleyicisohbeti:$(".table-settings__audience-chat--activate--circle").hasClass("active"),
							izleyicialma:$(".table-settings__accept-audience--activate--circle").hasClass("active"),
							gosterge:$(".table-settings__table-gosterge--activate--circle").hasClass("active"),
							esli:$(".table-settings__table-esli--activate--circle").hasClass("active"),
							oyuntipi:oyunt, 
							beklemesuresi:"20"
						});
						localStorage.removeItem("aktifoyun");
						
						pencere.fadeOut(-1000);
						pencereler.fadeOut(-1000);
						//$("#create-lobby").modal("hide");
						//$("#masaismi").val("");  
						}else{
						Toast.fire({icon: 'warning',title: "En az <b>"+altlimit+"</b> En çok <b>"+ustlimit+"</b> puan olmalı"});
					}
					}else{
					Toast.fire({icon: 'warning',title: "En az <b>"+altlimit+"</b> En çok <b>"+ustlimit+"</b> puan olmalı"});
				}
				}else{
				Toast.fire({icon: 'warning',title: "Geçerli bir puan belirleyin"});
			}
			}else{
			Toast.fire({icon: 'warning',title: "Masa puanı uygun değil"});
		}
		//klick.play();
	});
	masalar.delegate('.kol1','click',function(){
		var tiklananMasa=$(this).attr("tik");
		var tiklananKoltuk=1;
		baglan.emit("oturmatalebi",tiklananMasa,tiklananKoltuk);
		//klick.play();
	});
	masalar.delegate('.kol2','click',function(){
		var tiklananMasa=$(this).attr("tik");
		var tiklananKoltuk=2;
		baglan.emit("oturmatalebi",tiklananMasa,tiklananKoltuk);
		//klick.play();
	});
	masalar.delegate('.kol3','click',function(){
		var tiklananMasa=$(this).attr("tik");
		var tiklananKoltuk=3;
		baglan.emit("oturmatalebi",tiklananMasa,tiklananKoltuk);
		//klick.play();
	});
	masalar.delegate('.kol4','click',function(){
	var tiklananMasa=$(this).attr("tik");
	var tiklananKoltuk=4;
	baglan.emit("oturmatalebi",tiklananMasa,tiklananKoltuk);
	//klick.play();
	});
	$(".sandalye").delegate('.fotograf','click',function(){
	var tiklananSahis=$(this).attr("fototik");
	baglan.emit("profilgetir",tiklananSahis);
	//klick.play();
	});
	$("#penceredengit").click(function(){
	baglan.emit("kalk");
	pencere.fadeOut(-1000);
	//$("#oyunbitti").modal("hide");
	pencereler.fadeOut(-1000);
	//klick.play();
	});
	$(".kalk").click(function(){
	baglan.emit("kalk");
	//klick.play();
	});
	$(".penceredenkalk").click(function(){
	baglan.emit("kalk",{nerden:"masadan"});
	//klick.play();
	});
	$(".oyundankalk").click(function(){
	console.log(hakkimda);
	Swal.fire({
	title: 'Oyunu yarım bırakıyorsun..!!',
	html: 'Yarım bırakırsan hesabın <span class="fw-bold text-danger">2 saat banlanır..</span>',
	icon: 'question',
	showDenyButton: true,
	showCancelButton: false,
	allowOutsideClick: false,
	allowEscapeKey: false,
	confirmButtonText: 'Devam Et',
	denyButtonText: 'Vazgeç',
	}).then((result) => {
	if (result.isConfirmed) {
	$.ajax({
	url: 'php/islemler.php',
	type: 'POST',
	dataType: 'json',
	data:{
	islem:"kendinibanla"
	
	},
	success: function(data, textStatus, jqXHR)
	{
	if(data.durum=="success"){
	Toast.fire({icon: 'warning',title: "Banlandın. Oturumdan çıkılıyor..!!"}).then((result) => {
	window.location.href = "logout.php";
	})
	}
	//Toast.fire({icon: data.durum,title: data.mesaj});	
	}
	});
	
	} 
	})
	
	});
	$(".ciftegit").click(function(){
	//$(".ciftegit").fadeOut(-1000);
	baglan.emit("cifte");
	//klick.play();
	});
	$(".seri-git").click(function(){
	//$(".ciftegit").fadeOut(-1000);
	baglan.emit("serigit");
	//klick.play();
	});
	$(".simdibaslat").click(function(){
	baglan.emit("baslat");
	//klick.play();
	});
	$(".smiley").click(function(){
	if(simtik==0){
	simtik=1;
	$(".smileys").fadeIn(-1000);
	}else{
	simtik=0;
	$(".smileys").fadeOut(-1000);
	}
	});
	$("#lol1").click(function(){
	var veri=$("#mesaj").val()+" :)";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol2").click(function(){
	var veri=$("#mesaj").val()+" :(";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol3").click(function(){
	var veri=$("#mesaj").val()+" :D";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol4").click(function(){
	var veri=$("#mesaj").val()+" :Q";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol5").click(function(){
	var veri=$("#mesaj").val()+" :3";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol6").click(function(){
	var veri=$("#mesaj").val()+" :n";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol7").click(function(){
	var veri=$("#mesaj").val()+" :s";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol8").click(function(){
	var veri=$("#mesaj").val()+" :o";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol9").click(function(){
	var veri=$("#mesaj").val()+" :m";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#lol10").click(function(){
	var veri=$("#mesaj").val()+" :p";
	$("#mesaj").val(veri);
	simtik=0;
	$(".smileys").css("display","none");
	});
	$("#mesaj").click(function(){
	simtik=0;
	$(".smileys").fadeOut(-1000);
	});
	$("#mesajgonder").click(function(){
	simtik=0; 
	$(".smileys").fadeOut(-1000);
	var syazi = $('#mesaj').val();
	return false;
	if(syazi!="" || syazi!=null){
	if(syazi.length > 1){
	baglan.emit("mesaj",syazi);
	$('#mesaj').val("");
	}
	}
	//klick.play();
	});
	$(".messages").delegate('b','click',function(){
	var tiklananSahis=$(this).attr("tik");
	baglan.emit("profilgetir",tiklananSahis);
	//klick.play();
	});
	$(".masadaolanlar2").delegate('ul','click',function(){
	var tiklananSahis=$(this).attr("tik");
	baglan.emit("profilgetir",tiklananSahis);
	//klick.play();
	});
	$("#mesaj").on("keyup", function (event) {
	simtik=0;
	$(".smileys").fadeOut(-1000);
	if (event.keyCode==13) {
	var syazi = $('#mesaj').val();
	if(syazi!="" || syazi!=null){
	if(syazi.length > 1){
	baglan.emit("mesaj",syazi);
	$('#mesaj').val("");
	}
	}
	}
	});
	
	$('#taslar').on('drop', 'ul', function(event) {
	var mk=$(this).attr("id");
	var mk2=mk.split("_");
	buraya=mk2[1];
	if(vuk==0){
	if(elPrint[buraya]==0){
	elPrint[buraya]=tas;
	elPrint[buradan]=0;
	baglan.emit("guncelle",buradan,buraya);
	$("#i_"+buradan).remove();
	$("#x_"+buradan).droppable();
	$("#x_"+buraya).html("<img style='cursor:pointer;' tik="+tas+" id='i_"+buraya+"' src='img/"+tas+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999
	/*,helper: function(){
	var omk=$(this).attr("id");
	var sontaskontrol=$(this).attr("tik");
	if(omk){
	$("#taslar>ul").removeClass("selected");
	var omk2=omk.split("_");
	if(omk2){
	if(omk2[1]){
	vuk=0;
	for (let i = omk2[1]; i < 27; i++) {
	if (!$("#x_"+i+">img").length) { break; }
	$("#x_"+i).addClass("selected"); 
	}
	}
	}
	}
	var selected = $('#taslar .selected');					
	if (selected.length === 0) {
	selected = $(this);
	}
	var container = $('<div/>').attr('id', 'draggingContainer');
	container.append(selected.clone());
	return container; 
	}*/
	});
	}else{
	$("#i_"+buradan).remove();
	$("#x_"+buradan).html("<img style='cursor:pointer;' tik="+tas+" id='i_"+buradan+"' src='img/"+tas+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}
	}else{
	if(vuk==1){
	//yandan çek
	if(hakkimda.sandalye==1){
	var ilgiliConsol = konak["san41"];
	}
	if(hakkimda.sandalye==2){
	var ilgiliConsol = konak["san12"];
	}
	if(hakkimda.sandalye==3){
	var ilgiliConsol = konak["san23"];
	}
	if(hakkimda.sandalye==4){
	var ilgiliConsol = konak["san34"];
	}
	if(elPrint[buraya]==0 && konak.sira==hakkimda.sandalye && konak.refleks==1){
	yerdencekici_.html("");
	yerdencekici_.css("display","none");
	$("#yerdencekalt").css("display","none");
	$("#yer4alt").css("display","none");
	baglan.emit("yanimdakinden",buraya);
	elPrint[buraya]=ilgiliConsol[1];
	if(ilgiliConsol[0]!=0){
	y4.html("<img src='img/"+ilgiliConsol[0]+".png'>");
	}else{
	y4.html("");
	}
	$("#x_"+buraya).html("<img style='cursor:pointer;' tik="+ilgiliConsol[1]+" id='i_"+buraya+"' src='img/"+ilgiliConsol[1]+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}else{
	if(ilgiliConsol[0]!=0){
	if(ilgiliConsol[1]!=0){
	y4.html("<img src='img/"+ilgiliConsol[0]+".png' style='cursor:pointer;'><img src='img/"+ilgiliConsol[1]+".png' style='cursor:pointer;'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}else{
	y4.html("<img src='img/"+ilgiliConsol[0]+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}
	}else{
	if(ilgiliConsol[1]!=0){
	y4.html("<img src='img/"+ilgiliConsol[1]+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}else{
	y4.html("");
	}
	}
	}
	}else{
	if(vuk==2){
	//yerden çek
	if(elPrint[buraya]==0 && konak.sira==hakkimda.sandalye && konak.refleks==1){
	if(hakkimda.sandalye==1){
	var ilgiliConsol = konak["san41"];
	}
	if(hakkimda.sandalye==2){
	var ilgiliConsol = konak["san12"];
	}
	if(hakkimda.sandalye==3){
	var ilgiliConsol = konak["san23"];
	}
	if(hakkimda.sandalye==4){
	var ilgiliConsol = konak["san34"];
	}
	if(ilgiliConsol[0]!=0){
	if(ilgiliConsol[1]!=0){
	y4.html("<img src='img/"+ilgiliConsol[0]+".png' style='cursor:pointer;'><img src='img/"+ilgiliConsol[1]+".png' style='cursor:pointer;'>");
	}else{
	y4.html("<img src='img/"+ilgiliConsol[0]+".png'>");
	}
	}else{
	if(ilgiliConsol[1]!=0){
	y4.html("<img src='img/"+ilgiliConsol[1]+".png'>");
	}else{
	y4.html("");
	}
	}
	$("#yerdencekalt").css("display","none");
	$("#yer4alt").css("display","none");
	baglan.emit("yerdenal",buraya);
	yerdencekici_.html("");
	yerdencekici_.css("display","none");
	var t = konak["bostakiler"][0];
	elPrint[buraya]=t;
	$("#x_"+buraya).html("<img style='cursor:pointer;' tik="+t+" id='i_"+buraya+"' src='img/"+t+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	}else{
	yerdencekici_.html("<img src='img/tasbg.png'>").find("img").draggable({  containment: ".orta",revert: "invalid",zIndex:999});
	}
	}
	}
	}
	});
	$('#taslar').on('drag', 'img', function(event) {		
	var omk=$(this).attr("id");
	var sontaskontrol=$(this).attr("tik");
	if(omk){
	var omk2=omk.split("_");
	if(omk2){
	if(omk2[1]){
	vuk=0;
	buradan=omk2[1];
	tas=$(this).attr("tik");					
	}
	}
	}
	});
	$('#tasgonder').on('drop', function(){
	if(konak.sira==hakkimda.sandalye && konak.refleks==0){
	elPrint[buradan]=0;
	baglan.emit("tasgonder",buradan);
	$("#i_"+buradan).remove();
	kontrolcu_.css("display","none");
	tasgonder_.css("display","none");
	$("#x_"+buradan).droppable();
	}
	});
	$('#kontrolcu').on('drop', function() {  
	baglan.emit("kontrol",{buradan:buradan,tas:tas});
	$("#i_"+buradan).remove();
	$("#x_"+buradan).html("<img style='cursor:pointer;' tik="+tas+" id='i_"+buradan+"' src='img/"+tas+".png'>").find("img").draggable({containment: ".orta",revert: "invalid",stack: "img",zIndex:999});
	});
	$('#yerdencek').on('drag', 'img', function() {vuk=2;});
	$('#yer4').on('drag', 'img', function() {vuk=1;});
	});																																							