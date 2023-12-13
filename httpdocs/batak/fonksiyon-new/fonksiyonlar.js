function puan(num) {
    var data = num.toString();
    if (data) {
        if (data.length <= 3) {
            return data;
        }
        if (data.length == 4) {
            var x = data.substr(0, 1);
            var y = data.substr(1);
            return x + "." + y;
        }
        if (data.length == 5) {
            var x = data.substr(0, 2);
            var y = data.substr(2);
            return x + "." + y;
        }
        if (data.length == 6) {
            var x = data.substr(0, 3);
            var y = data.substr(3);
            return x + "." + y;
        }
        if (data.length == 7) {
            var x1 = data.substr(0, 1);
            var x = data.substr(1, 4);
            var y = data.substr(4);
            return x1 + " M.";
        }
        if (data.length == 8) {
            var x1 = data.substr(0, 2);
            var x = data.substr(2, 5);
            var y = data.substr(5);
            return x1 + " M.";
        }
        if (data.length == 9) {
            var x1 = data.substr(0, 3);
            return x1 + " M.";
        }
        if (data.length == 10) {
            var x1 = data.substr(0, 1);
            return x1 + " B.";
        }
        if (data.length == 11) {
            var x1 = data.substr(0, 2);
            return x1 + " B.";
        }
        if (data.length == 12) {
            var x1 = data.substr(0, 3);
            return x1 + " B.";
        }
        if (data.length == 12) {
            var x1 = data.substr(0, 1);
            return x1 + " T.";
        }
        if (data.length == 13) {
            var x1 = data.substr(0, 2);
            return x1 + " T.";
        }
        if (data.length == 14) {
            var x1 = data.substr(0, 3);
            return x1 + " T.";
        }
        if (data.length > 14) {
            return "Zengin";
        }
    } else {
        return "0";
    }
}
function seviyeDetay(data) {
    if (data < 6) {
        return "Acemi";
    } else {
        if (data > 5 && data < 10) {
            return "Kovboy";
        } else {
            if (data > 10 && data < 18) {
                return "Araştırmacı";
            } else {
                if (data > 18 && data < 25) {
                    return "Usta";
                } else {
                    if (data > 25 && data < 35) {
                        return "Defineci";
                    } else {
                        if (data > 35) {
                            return "Profesyonel";
                        }
                    }
                }
            }
        }
    }
}
function smsdata(data) {
    var deger = data;
    var yeniDeger = '';
    var harf;
    var buz = 0;
    deger = deger.split("");
    for (var i = 0; i < deger.length; i++) {
        buz += 1;
        if (harf == " ") {
            buz = 0;
        }
        if (buz == 30 || buz == 60 || buz == 90) { buz = 0; yeniDeger += " "; }
        if (harf == ":") {
            if (deger[i] == ")") {
                yeniDeger += "<img src='img/s1.png' style='position:relative;top:6px;'>";
            } else {
                if (deger[i] == "(") {
                    yeniDeger += "<img src='img/s2.png' style='position:relative;top:6px;'>";
                } else {
                    if (deger[i] == "d" || deger[i] == "D") {
                        yeniDeger += "<img src='img/s3.png' style='position:relative;top:6px;'>";
                    } else {
                        if (deger[i] == "q" || deger[i] == "Q") {
                            yeniDeger += "<img src='img/s4.png' style='position:relative;top:6px;'>";
                        } else {
                            if (deger[i] == "3") {
                                yeniDeger += "<img src='img/s5.png' style='position:relative;top:6px;'>";
                            } else {
                                if (deger[i] == "n") {
                                    yeniDeger += "<img src='img/s6.png' style='position:relative;top:6px;'>";
                                } else {
                                    if (deger[i] == "s") {
                                        yeniDeger += "<img src='img/s7.png' style='position:relative;top:6px;'>";
                                    } else {
                                        if (deger[i] == "o") {
                                            yeniDeger += "<img src='img/s8.png' style='position:relative;top:6px;'>";
                                        } else {
                                            if (deger[i] == "m") {
                                                yeniDeger += "<img src='img/s9.png' style='position:relative;top:6px;'>";
                                            } else {
                                                if (deger[i] == "p" || deger[i] == "P") {
                                                    yeniDeger += "<img src='img/s10.png' style='position:relative;top:6px;'>";
                                                } else {
                                                    yeniDeger += deger[i];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (deger[i] != ":") {
                yeniDeger += deger[i];
            }
        }
        harf = deger[i];
    }
    return yeniDeger;
}
$(".salonlar").delegate('ul', 'click', function () {
    var tiklanan = $(this).attr("tik");
    if (tiklanan != 0) {
        baglan.emit("salonagir", { odaid: tiklanan });
    } else {
        Toast.fire({ icon: 'warning', title: "Bu salon şuan kapalı" });
    }
});

function masadankalk(){
	socket.emit("kalk");
}
