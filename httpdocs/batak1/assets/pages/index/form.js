const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})
const signin_form = document.querySelector('.signin-form')
const have_account_button = document.querySelector('.have-account a')
const be_member_button = document.querySelector('.be-member')
const forget_password_button = document.querySelector('.forget-password a')
const signup_form = document.querySelector('.signup-form')
const forget_password_form = document.querySelector('.forget-password-form')
const logo_area = document.querySelector('.logo-area')
const back_to_signin_button = document.getElementById('back-to-signin')
have_account_button.addEventListener('click', e=>{
    signup_form.classList.add('signup-closing')
    signup_form.addEventListener('animationend', e=>{
        signup_form.classList.remove('signup-closing')
        signin_form.classList.add('signin-opening')
        signup_form.classList.add('de-active')
        signin_form.classList.remove('de-active')
	}, {once:true})
    signin_form.addEventListener('animationend', ev=>{
        signin_form.classList.remove('signin-opening')
	}, {once: true})
})
if (typeof(be_member_button) != 'undefined' && be_member_button != null)
{
	be_member_button.addEventListener('click',e=>{
		signin_form.classList.add('signin-closing')
		signin_form.addEventListener('animationend', e=>{
			signin_form.classList.remove('signin-closing')
			signup_form.classList.add('signup-opening')
			signin_form.classList.add('de-active')
			signup_form.classList.remove('de-active')
		}, {once:true})
		signup_form.addEventListener('animationend', ev=>{
			signup_form.classList.remove('signup-opening')
		}, {once:true})
	})
}
forget_password_button.addEventListener('click',e=>{
    signin_form.classList.add('signin-closing')
    signin_form.addEventListener('animationend', e=>{
        signin_form.classList.remove('signin-closing')
        forget_password_form.classList.add('forget-password-opening')
        signin_form.classList.add('de-active')
        forget_password_form.classList.remove('de-active')
	}, {once:true})
    forget_password_form.addEventListener('animationend', ev=>{
        forget_password_form.classList.remove('forget-password-opening')
	}, {once:true})
})
back_to_signin_button.addEventListener('click',e=>{
    e.preventDefault()
    forget_password_form.classList.add('forget-password-closing')
    forget_password_form.addEventListener('animationend', e=>{
        forget_password_form.classList.remove('forget-password-closing')
        signin_form.classList.add('signin-opening')
        forget_password_form.classList.add('de-active')
        signin_form.classList.remove('de-active')
	}, {once:true})
    signin_form.addEventListener('animationend', ev=>{
        signin_form.classList.remove('signin-opening')
	}, {once:true})
})
document.querySelectorAll('.newcomer').forEach(button=>{
    button.addEventListener('click',e=>{
        e.preventDefault()
	})
})
document.querySelector('.choose-room').addEventListener('click',e=>{
    e.preventDefault()
})
document.getElementById('submit').addEventListener('click',e=>{
    e.preventDefault()
})
document.querySelector('.send-code').addEventListener('click',e=>{
    e.preventDefault()
})
function girisyap() {
	$.ajax({
		url: 'login.php',
		type: 'POST',
		dataType: 'json',
		data: {
			giristipi:"user",
			kuladi: $("#kuladi").val(),
			sifre: $("#sifre").val(),
			remember: $('#authCheck').is(':checked'),
			aktifoda:aktifoda,  
			aktifodaadi:aktifodaadi
		},
		success: function(gelenveri) {
			if (gelenveri.durum == 0) {  
				localStorage.setItem("umail", $("#kuladi").val());
				window.location.href = "oyun.php?salon="+aktifoda;
				} else {
				Toast.fire({icon: 'error',title: gelenveri.mesaj})
			}
		},
		error: function(hata) {}
	});
}
function misafirgirisi() {
	if(userText.value != captchaText.innerHTML) {
		Toast.fire({icon: 'error',title: "Doğrulama kodu yanlış..!!"});
		return false;
	} 
	$.ajax({
		url: 'login.php',
		type: 'POST',
		dataType: 'json',
		data: {
			giristipi:"misafir",
			cinsiyet:$("input[name='misafircinsiyet']:checked").val(),
			aktifoda:aktifoda,  
			aktifodaadi:aktifodaadi
		},
		success: function(gelenveri) {
			if (gelenveri.durum == 0) {  
				localStorage.setItem("umail", $("#kuladi").val());
				window.location.href = "oyun.php?salon="+aktifoda;
				} else {
				Toast.fire({icon: 'error',title: gelenveri.mesaj})
			}
		},
		error: function(hata) {}
	});
}
let captchaText = document.querySelector('#captcha');
let userText = document.querySelector('#captchatextBox');
let alphaNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
for(let i = 1; i <= 1; i++) {
	emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
captchaText.innerHTML = emptyArr.join('');
function kayitol(){
	var kayitadi= $("#kayitname").val();
	var kayitadsoyad= "";
	var kayiteposta= $("#kayitemail").val();
	var kayitpassport= $("#kayitpassword").val();
	var kayittel= "";
	var cinsiyet=$('#gender option:selected').val();
	$.ajax({
		url: 'register.php',
		type: 'POST',
		dataType: 'json',
		data: { cinsiyet:cinsiyet,kayittel:kayittel,kayitadi: kayitadi, kayitadsoyad:kayitadsoyad,kayiteposta:kayiteposta,kayitpassport:kayitpassport,color:'#'+ Math.random().toString(16).substr(-6)},
		success: function (gelenveri) {
			if(gelenveri.durum==0)
			{
				Toast.fire({icon: 'success',title: "Kayıt başarılı.. Giriş sayfasına yönlendiriliyorsunuz.."}).then((result) => {
					location.reload();
				});
			}
			else{
				Toast.fire({icon: 'error',title: gelenveri.mesaj})
			}
		},
		error: function (hata) {
		}
	});
}
function sifremiunuttum(){
	$.ajax({
		url: 'sifremiunuttum.php',
		type: 'POST',
		dataType: 'json',
		data: { eposta:$("#sifremiunuttumemail").val() },
		success: function (gelenveri) {
			if(gelenveri.durum==0)
			{
				Toast.fire({icon: 'success',title: gelenveri.mesaj})	
				$("#kuladi").val($("#sifremiunuttumemail").val());
				$('#back-to-signin').click();
			}
			else{
				Toast.fire({icon: 'error',title: gelenveri.mesaj})
			}
		},
		error: function (hata) {
		}
		});
		}	
		$('.odasec').click(function(){
		aktifoda=$(this).attr("data-oda");
		aktifodaadi=$(this).attr("data-ad");
		$(".odasec").removeClass("active");
		$(this).addClass("active");
		$("#oda_sec_modal").modal("hide");
		});		