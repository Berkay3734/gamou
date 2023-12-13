$(function() {
    //var io = io();
    //const ioClient = require("socket.io-client");
	//console.log(ioClient);
	//console.log("ioclient sonrası");
	// var lobi= io.connect('https://lobi.dogunetajans.com',{secure:true,'reconnect': true,transports: ["polling"]});
    //var lobi = io;
	//console.log(window.location.hostname);
	//console.log(window.location.host);
	var lobi = io.connect('https://lobi.'+siteadi, {
		transports: ['polling'],
		upgrade: false, 
		'reconnection':true,   
		secure:true
	});  
	
	//lobi.on('connect', function () { alert('Socket is connected.'); }); lobi.on('disconnect', function () { alert('Socket is disconnected.'); });
	lobi.on("uyeguncelle", function(data){
		baglan.emit("uyeguncelle",data);
	});
	lobi.on("uyebanla", function(data){
		baglan.emit("uyebanla",data);
	});
	lobi.on("salonlar", function(data2){
        salonlar.html("");
        var hangiSalonlar=0;
		salonlar.append('<div class="oda oda-title"><h3>Oda</h3><h3>Oynayan</h3><h3>Min. Giriş</h3><h3>Bahis Aralığı</h3></div>');
        $.each( data2, function( key, value ) {
            var pn1    =   puan(value.enaz);
            var pn2    =   puan(value.alt);
            var pn3    =   puan(value.ust);
     		salonlar.append('<ul class="oda" tik="'+value.id+'"><h3>'+value.ad+'</h3><p>'+value.online+' <img src="images/users.png"></p><p>'+pn1+'</p><p>'+pn2+' - '+pn3+' ÇİP</p></ul>');
		});
	});
    lobi.on("ok", function(data){
        if(data==0){
            $(".girilemez").html("Bu salon şuan kapalı").fadeIn(-1000).addClass('animated fadeInUp');
            var x = setTimeout(function (){
                $(".girilemez").fadeOut(-1000);
			},2000);
			}else{
		window.location.href = "./oyun.php?po="+data; 
		}
		});
		lobi.on("red", function(){
        $(".girilemez").html("Puanınız bu salon için yetersiz").fadeIn(-1000).addClass('animated fadeInUp');
		Toast.fire({icon: 'warning',title: "Puanınız bu salon için yetersiz"});
        var x = setTimeout(function (){
		$(".girilemez").fadeOut(-1000);
		},2000);
		});
		lobi.on("resed", function(data){
        location.reload();
		});
		lobi.on("user", function(data){
        pencere.fadeIn(-1000);
        var oyuncuPuanDuzenle=puan(data.puan);
		var resim="img/noneuserphoto.jpeg";
		if(data.resim!=null&&data.resim!=""){
		resim=data.resim;
		}
        ufoto.html("");
        uname.html(data.adsoyad);
        useviye.html(data.seviye);
        upuan.html(oyuncuPuanDuzenle);
        usk1.html(data.toplamoyun);
        usk2.html(data.kazandigi);
        usk3.html(data.kaybettigi);
        var yuzdeHesapla=eval(data.kazandigi) / eval(data.toplamoyun);
        var yuzdeHesapla2=eval(yuzdeHesapla) * eval(100);
        var yuzdelikciktisi=Math.floor(yuzdeHesapla2);
        if(yuzdeHesapla2){
		usk4.html("%"+yuzdelikciktisi);
		}else{
		usk4.html("%0");
		}
        tmhata.html("").fadeOut(-1000);
        _p1.fadeIn(-1000).addClass('animated zoomIn');
		ufoto.html("<img src='"+resim+"' style='width:100px;height:100px;'>");
		});
		ke=localStorage.getItem("USERKEYZ");
		/*
		lobi.on('Giris', function(data) {
		var nickname    =   seviyeDetay(data.post.seviye);
		var nickpuan    =   puan(data.post.puan);
		puanim.html(nickpuan);
		ismim.html(data.post.adsoyad);
		lakabim.html(nickname);
		seviyeicon.html(data.post.seviye);
		totalseviye.html("%"+data.post.yuzdelik);
		//resmim.html("<img src='//graph.facebook.com/"+data.post.fbid+"/picture?width=180&height=180' style='width:50px;height:50px;'>");
		seviyeuzat.animate({width:data.post.yuzdelik+"%"},2200);
		salonlar.html("");
		var hangiSalonlar=0;
		salonlar.append('<div class="oda oda-title"><h3>Oda</h3><h3>Oynayan</h3><h3>Min. Giriş</h3><h3>Bahis Aralığı</h3></div>');
		$.each( data.salonlar, function( key, value ) {
		var pn1    =   puan(value.enaz);
		var pn2    =   puan(value.alt);
		var pn3    =   puan(value.ust);
		salonlar.append('<ul class="oda" tik="'+value.id+'"><h3>'+value.ad+'</h3><p>'+value.online+' <img src="images/users.png"></p><p>'+pn1+'</p><p>'+pn2+' - '+pn3+' ÇİP</p></ul>');
		});
		salondakiler.html("");  
		var hangiOyuncular=0;
		$.each( data.eniyiler, function( key, value2 ) {
		var oyuncuPuanDuzenle=puan(value2.puan);
		var resim=value2.resim;
		if(value2.resim==""){
		resim="img/noneuserphoto.jpeg"
		}
		if(hangiOyuncular==0){
		hangiOyuncular ="<ul class='salonda"+value2.id+"' tik='"+value2.tik+"'><li class='listefotosu'><img src='"+resim+"' style='width:35px;height:35px;'></li><div class='liststart'>"+value2.seviye+"</div><li class='listenicki'><div class='miniin'>"+value2.adsoyad+"</div></li><li class='listeicon'><div class='miniin'><img src='./img/minibonus.png'></div></li><li class='listepuani'><div class='miniin'>"+oyuncuPuanDuzenle+"</div></li></ul>";
		}else{
		hangiOyuncular ="<ul class='salonda"+value2.id+"' tik='"+value2.tik+"'><li class='listefotosu'><img src='"+resim+"' style='width:35px;height:35px;'></li><div class='liststart'>"+value2.seviye+"</div><li class='listenicki'><div class='miniin'>"+value2.adsoyad+"</div></li><li class='listeicon'><div class='miniin'><img src='./img/minibonus.png'></div></li><li class='listepuani'><div class='miniin'>"+oyuncuPuanDuzenle+"</div></li></ul>" + hangiOyuncular;
		}
		});
		//salondakiler.html(hangiOyuncular);
		});
		*/
		$(function(){
		$(".cipal").click(function(){
		$(".pencere").fadeIn(-1000);
		$("#pcip").fadeIn(-1000);
		});
		$(".pencerekapat").click(function(){
		$(".pencere").fadeOut(-1000);
		$(".acilanPencere").fadeOut(-1000);
		});
		$(".salonlar").delegate('ul','click',function(){
		var tiklanan=$(this).attr("tik");
		if(tiklanan!=0){
		lobi.emit("salonagir",tiklanan);
		}else{
		$(".girilemez").html("Bu salon şuan kapalı").fadeIn(-1000).addClass('animated fadeInUp');
		Toast.fire({icon: 'warning',title: "Bu salon şuan kapalı"});
		var x = setTimeout(function (){ 
		$(".girilemez").fadeOut(-1000);
		},2000);
		}
		});
		$("#islem2").click(function(){
		$(".girilemez").html("Öncelikle bir salona giriniz.").fadeIn(-1000).addClass('animated fadeInUp'); 
		var x = setTimeout(function (){
		$(".girilemez").fadeOut(-1000);
		},2000);
		});
		$("#islem1").click(function(){
		$(".girilemez").html("Öncelikle bir salona giriniz.").fadeIn(-1000).addClass('animated fadeInUp');
		var x = setTimeout(function (){
		$(".girilemez").fadeOut(-1000);
		},2000);
		});
		$("#islem3").click(function(){
		//FacebookInviteFriends();
		});
		salondakiler.delegate('ul','click',function(){
		var tiklanilanOyuncu=$(this).attr("tik");
		lobi.emit("profilgetir",tiklanilanOyuncu);
		});
		});
		lobi.emit("Giris",{serial:umail,salon:po});
		});
		//window.onload =client;			