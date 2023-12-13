var oyunTuru;

function startAnimation() {
  var tableGameBtn = document.querySelector(".tablegame");
  var notableGameBtn = document.querySelector(".notablegame");
  var GameBtn = document.querySelector(".newgame");
  tableGameBtn.classList.add("move");
  notableGameBtn.classList.add("move");
  GameBtn.classList.add("move");
}
function startTable(tur) {
  oyunTuru = tur;
  var popupDiv = document.getElementById("popup");
  popupDiv.style.display = "block"; // Popup'ı görünür yap
  var kozDiv = document.getElementById("kozsec");
  setTimeout(function () {
    popupDiv.style.display = "none";
    kozDiv.style.display = "block";
  }, 2000);
}
function startNoTable(tur) {
  oyunTuru = tur;
  var popupDiv = document.getElementById("popup");
  popupDiv.style.display = "block"; // Popup'ı görünür yap
  var kozDiv = document.getElementById("kozsec");
  setTimeout(function () {
    popupDiv.style.display = "none";
    kozDiv.style.display = "block";
  }, 2000);
}
function showKart(kart) {
  window.location.href = oyunTuru + ".html#" + kart;
}
function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  menu.classList.toggle("nav-active");

  var kaydir = document.getElementById("kaydir");
  kaydir.querySelectorAll("a").forEach(function (link) {
    link.style.animation = "none";
    setTimeout(function () {
      link.style.animation = "";
    }, 10);
  });

  if (menu.classList.contains("nav-active")) {
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  var menu = document.getElementById("nav-menu");
  var hamburger = document.getElementById("hamburger-icon");
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.classList.remove("nav-active");
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

document
  .getElementById("hamburger-icon")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

function popupGoster() {
  // Pop-up penceresini oluştur
  var popup = document.createElement("div");
  popup.classList.add("popup");

  // Mesaj metnini oluştur
  var mesaj = document.createElement("p");
  mesaj.innerHTML = "Emin misin? Eğer Oyundan Şimdi Çıkarsan Ceza Alacaksın";

  // Evet butonunu oluştur
  var evetBtn = document.createElement("button");
  evetBtn.innerHTML = "Evet";
  evetBtn.classList.add("popup-btn");
  evetBtn.classList.add("popup-btn-yes");
  evetBtn.onclick = function () {
    window.location.href = "index.html";
    popup.style.display = "none";
  };

  // Hayır butonunu oluştur
  var hayirBtn = document.createElement("button");
  hayirBtn.innerHTML = "Hayır";
  hayirBtn.classList.add("popup-btn");
  hayirBtn.classList.add("popup-btn-no");
  hayirBtn.onclick = function () {
    popup.style.display = "none";
  };

  // Butonları pop-up penceresine ekle
  popup.appendChild(mesaj);
  popup.appendChild(evetBtn);
  popup.appendChild(hayirBtn);

  // Pop-up penceresini HTML sayfasına ekle
  document.body.appendChild(popup);
}
