var baglan;
function panel(){
    
    $(function(){
        
        var bekle   =$(".load");
        var login   =$(".login");
        var zemin   =$(".zemin");
        var ifade   =$(".ifade");
        var hangisi ="0";
        
        $('#baglan').click(function(){
            
            ifade.html("<img src='./img/5.png'>");
            var kimlik  =$("#kullaniciadi").val();
            var parola  =$("#parola").val();
            
            login.fadeOut(-1000);
            bekle.fadeIn(-1000);
            bekle.html("<br><b>Bağlanıyor, lütfen bekleyin.</b><br><br><img src='./img/loading.gif'>");
            setTimeout(function(){
                $.post("./php/giris.php", {k:kimlik,p:parola}, function(result){
					if(result=="none"){
						ifade.html("<img src='./img/3.png'>");
						bekle.html("<br><b>Giriş başarısız</b>");
						alert("Tamam!");
						setTimeout(function(){
							ifade.html("<img src='./img/1.png'>");
                            bekle.fadeOut(-1000);
                            login.fadeIn(-1000);
						}, 2000);
						}else{
						ifade.html("<img src='./img/4.png'>");

						setTimeout(function(){
							window.location.href = "./panel.php";
						}, 1500);
					}
				});
			}, 2000);
            
		});
        
        $('#kullaniciadi').click(function(){
            ifade.html("<img src='./img/2.png'>");
		});
        
        $('#parola').click(function(){
            ifade.html("<img src='./img/2.png'>");
		});
        
        $('#sirabelirle').change(function(){
            var value = $(this).val();
            if(value > 0){
                $.post("./php/sesionla.php?mode=oyuncusirala", {v:value}, function(result){
                    if(result=="ok"){
                        window.location.href = "./oyuncular.php";
					}
				});
			}
		});
        
        $('.guncelle').click(function(){
            var value = $("#kredisi").val();
            var value2 = $("#yetkisi").val();
            var value3 = $("#seviyesi").val();
            console.log(i,value,value2,value3);
            $.post("./php/profil.php?mode=upla", {o:i,k:value,y:value2,s:value3}, function(result){
                if(result=="ok"){
                    window.location.href = "./uyeguncelle.php?id="+i;
				}
			});
		});
        
        $('.salonguncelle').click(function(){
            var v1 = $("#d1").val();
            var v2 = $("#d2").val();
            var v3 = $("#d3").val();
            var v4 = $("#d4").val();
            var v5 = $("#d5").val();
            $.post("./php/profil.php?mode=upla2", {o:i,k1:v1,k2:v2,k3:v3,k4:v4,k5:v5}, function(result){
                if(result=="ok"){
                    window.location.href = "./salonduzenle.php?id="+i;
				}
			});
		});
        
        $('.paketguncelle').click(function(){
            var v1 = $("#d1").val();
            var v2 = $("#d2").val();
            $.post("./php/profil.php?mode=upla3", {o:i,k1:v1,k2:v2}, function(result){
                if(result=="ok"){
                    window.location.href = "./krediduzenle.php?id="+i;
				}
			});
		});
        $('.salonkaydet').click(function(){
            var v1 = $("#d1").val();
            var v2 = $("#d2").val();
            var v3 = $("#d3").val();
            var v4 = $("#d4").val();
            var v5 = $("#d5").val();
            $.post("./php/profil.php?mode=salonkaydet", {k1:v1,k2:v2,k3:v3,k4:v4,k5:v5}, function(result){
                if(result=="ok"){
                    window.location.href = "./salonlar.php";
				}
			});
		});
        $('.botkaydet').click(function(){
            var v1 = $("#d1").val();
            var v2 = $("#d2").val();
            var v3 = $("#d3").val();
            $.post("./php/profil.php?mode=botkaydet", {k1:v1,k2:v2,k3:v3}, function(result){
                if(result=="ok"){
                    window.location.href = "./botoyuncular.php";
				}
			});
		});
        $('.kredikaydet').click(function(){
            var v1 = $("#d1").val();
            var v2 = $("#d2").val();
            $.post("./php/profil.php?mode=kredikaydet", {k1:v1,k2:v2}, function(result){
                if(result=="ok"){
                    window.location.href = "./kredi.php";
				}
			});
		});
        
        $('.sil').click(function(){
            $.post("./php/profil.php?mode=sil", {o:i}, function(result){
                if(result=="ok"){
                    window.location.href = "./oyuncular.php";
				}
			});
		});
        
        $('.ban').click(function(){
            $.post("./php/profil.php?mode=ban", {o:i,ban:b}, function(result){
                if(result=="ok"){
                    window.location.href = "./uyeguncelle.php?id="+i;
				}
			});
		});
        
        $('.yukle').click(function(){
            $(".kapla").fadeOut(-1000);
            var bunuyukle=$("#kackredi").val();
            $.post("./php/liste.php?mode=onayla", {v:hangisi,k:bunuyukle}, function(result){
                if(result=="ok"){
                    $("#lik"+hangisi).fadeOut(-1000);
                    hangisi="0";
					}else{
                    $("#lik"+hangisi).css('background', 'white');
                    hangisi="0";
				}
			});
		});
        
        $('.iptal').click(function(){
            $(".kapla").fadeOut(-1000);
		});
        
        $('.sifirla').click(function(){
            $.post("./php/liste.php?mode=reset", {v:"x"}, function(result){
                if(result=="ok"){
                    window.location.href = "./obildirimler.php";
				}
			});
		});
        
        $('.silici').click(function(){
            var clickedID = this.id;
            $("#lik"+clickedID).css('background', 'khaki');
            $.post("./php/liste.php?mode=sil", {v:clickedID}, function(result){
                if(result=="ok"){
                    $("#lik"+clickedID).fadeOut(-1000);
					}else{
                    $("#lik"+clickedID).css('background', 'white').css('color', 'black');
				}
			});
		});
        $('.bildirisilici').click(function(){
            var clickedID = this.id;
            $("#lik"+clickedID).css('background', 'khaki');
            $.post("./php/liste.php?mode=bildirisil", {v:clickedID}, function(result){
                if(result=="ok"){
                    $("#lik"+clickedID).fadeOut(-1000);
					}else{
                    $("#lik"+clickedID).css('background', 'white').css('color', 'black');
				}
			});
		});
        $('.sikayetsilici').click(function(){
            var clickedID = this.id;
            $("#lik"+clickedID).css('background', 'khaki');
            $.post("./php/liste.php?mode=sikayetsil", {v:clickedID}, function(result){
                if(result=="ok"){
                    $("#lik"+clickedID).fadeOut(-1000);
					}else{
                    $("#lik"+clickedID).css('background', 'white').css('color', 'black');
				}
			});
		});
        $('.paketsilici').click(function(){
            var clickedID = this.id;
            $("#lik"+clickedID).css('background', 'khaki');
            $.post("./php/liste.php?mode=paketsil", {v:clickedID}, function(result){
                if(result=="ok"){
                    $("#lik"+clickedID).fadeOut(-1000);
					}else{
                    $("#lik"+clickedID).css('background', 'white').css('color', 'black');
				}
			});
		});
        
        $('.red').click(function(){
            var clickedID = this.id;
            $("#lik"+clickedID).css('background', 'khaki');
            $.post("./php/liste.php?mode=red", {v:clickedID}, function(result){
                if(result=="ok"){
                    $("#lik"+clickedID).fadeOut(-1000);
					}else{
                    $("#lik"+clickedID).css('background', 'white').css('color', 'black');
				}
			});
		});
	});
}
panel();
var aylar=[
	{tarih:'1',ad:'Ocak'},
	{tarih:'2',ad:'Şubat'},
	{tarih:'3',ad:'Mart'},
	{tarih:'4',ad:'Nisan'},
	{tarih:'5',ad:'Mayıs'},
	{tarih:'6',ad:'Haziran'},
	{tarih:'7',ad:'Temmuz'},
	{tarih:'8',ad:'Ağustos'},
	{tarih:'9',ad:'Eylül'},
	{tarih:'10',ad:'Ekim'},
	{tarih:'11',ad:'Kasım'},
	{tarih:'12',ad:'Aralık'},
];	
var yenitarih=[];
var yenich=[];
var useryenitarih=[];
var useryenich=[];
aylar.forEach((ay,index) => {
	if(masaacilislari.filter(m => m.tarih == ay.tarih)[0]){
		var veri=masaacilislari.filter(m => m.tarih == ay.tarih)[0];
		yenitarih.push(ay.ad);
		yenich.push(veri.sayi);
	}
	else{
		yenitarih.push(ay.ad);
		yenich.push(0);
	}
});
aylar.forEach((ay,index) => {
	if(useracilislari.filter(m => m.tarih == ay.tarih)[0]){
		var veri=useracilislari.filter(m => m.tarih == ay.tarih)[0];
		useryenitarih.push(ay.ad);
		useryenich.push(veri.sayi);
	}
	else{
		useryenitarih.push(ay.ad);
		useryenich.push(0);
	}
});
$(function() {
	'use strict';
	var colors = {
		primary        : "#6571ff",
		secondary      : "#7987a1",
		success        : "#05a34a",
		info           : "#66d1d1",
		warning        : "#fbbc06",
		danger         : "#ff3366",
		light          : "#e9ecef",
		dark           : "#060c17",
		muted          : "#7987a1",
		gridBorder     : "rgba(77, 138, 240, .15)",
		bodyColor      : "#000",
		cardBg         : "#fff"
	}
	var fontFamily = "'Roboto', Helvetica, sans-serif"
	// Apex Bar chart start
	if ($('#apexBar').length) {
		var options = {
			chart: {
				type: 'bar',
				height: '220',
				parentHeightOffset: 0,
				foreColor: colors.bodyColor,
				background: colors.cardBg,
				toolbar: {
					show: false
				},
			},
			theme: {
				mode: 'light'
			},
			tooltip: {
				theme: 'light'
			},
			colors: [colors.primary],    
			grid: {
				padding: {
					bottom: -4
				},
				borderColor: colors.gridBorder,
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			series: [{
				name: 'Masa',
				data: yenich//[30,40,45,50,49,60,70,91,125]
			}],
			xaxis: {
				categories: yenitarih,//['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999'],
				axisBorder: {
					color: colors.gridBorder,
				},
				axisTicks: {
					color: colors.gridBorder,
				},
			},
			legend: {
				show: true,
				position: "top",
				horizontalAlign: 'center',
				fontFamily: fontFamily,
				itemMargin: {
					horizontal: 8,
					vertical: 0
				},
			},
			stroke: {
				width: 0
			},
			plotOptions: {
				bar: {
					borderRadius: 4
				}
			}
		}
		var apexBarChart = new ApexCharts(document.querySelector("#apexBar"), options);
		apexBarChart.render();
	}
	if ($('#userBar').length) {
		var options = {
			chart: {
				type: 'bar',
				height: '220',
				parentHeightOffset: 0,
				foreColor: colors.bodyColor,
				background: colors.cardBg,
				toolbar: {
					show: false
				},
			},
			theme: {
				mode: 'light'
			},
			tooltip: {
				theme: 'light'
			},
			colors: [colors.primary],    
			grid: {
				padding: {
					bottom: -4
				},
				borderColor: colors.gridBorder,
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			series: [{
				name: 'Kullanıcı',
				data: useryenich//[30,40,45,50,49,60,70,91,125]
			}],
			xaxis: {
				categories: useryenitarih,//['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999'],
				axisBorder: {
					color: colors.gridBorder,
				},
				axisTicks: {
					color: colors.gridBorder,
				},
			},
			legend: {
				show: true,
				position: "top",
				horizontalAlign: 'center',
				fontFamily: fontFamily,
				itemMargin: {
					horizontal: 8,
					vertical: 0
				},
			},
			stroke: {
				width: 0
			},
			plotOptions: {
				bar: {
					borderRadius: 4
				}
			}
		}
		var apexBarChart = new ApexCharts(document.querySelector("#userBar"), options);
		apexBarChart.render();
	}
	// Apex Bar chart end
});	