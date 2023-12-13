const menu_bar = document.querySelector(".menu-bar");
const sidebar_desktop = document.querySelector(".sidebar-desktop");
const sidebar_top = document.querySelector(".sidebar-top");
const body_section__left = document.querySelector(".body-section__left");
const exit_sidebar = document.querySelector(".sidebar-exit-button");
const tables = document.querySelector(".tables");
const change_chat_size = document.querySelector('.change-size');
const chat_box = document.querySelectorAll('.tabcontent')
const tables_container = document.querySelector(".tables-container");
const halls_button = document.querySelector(".halls-button");
const hall_section = document.querySelector(".hall-section");
const leave_halls_button = document.getElementById("exit-hall");
const animation_background = document.querySelector(".animation-background");
const profile_button = document.querySelector(".profile-button");
const profile_box = document.querySelector(".profile-box");
const exit_profile_box = document.querySelector(".exit-profile-box");
const edit_profile_button = document.querySelector(".edit-profile-box");
const profile_content = document.querySelector(".profile-box__content");
const profile_edit = document.querySelector(".profile-box__edit");
const back_to_profile_content = document.querySelector(
  ".back-to-profile-content"
);
const friends_button = document.querySelector('.your-friends')
const friends_box = document.querySelector('.friends-box')
const exit_friends_box = document.querySelector('.friends-box__menu--button')
const manager_button = document.querySelector(".managers");
const manager_box = document.querySelector(".manager-box");
const exit_manager_box = document.querySelector(".manager-box__menu--button");
const notification_button = document.querySelector(".messages-button");
const notification_box = document.querySelector(".notification-box");
const exit_notification_box = document.querySelector(
  ".notification-box__menu--button"
);
const support_button = document.getElementById('communication')
const support_box = document.querySelector('main .support')
const exit_support_box = document.querySelector('main .support .header img')
const input = document.getElementById("imgInput");
const preview = document.getElementById("preview");
const removeBtn = document.getElementById("removeBtn");
const fontSelect = document.getElementById("fontSelect");
const nickColorInput = document.getElementById("nickColorInput");
const tableChat_activate = document.querySelector(
  ".table-settings__table-chat--activate"
);
const audienceChat_activate = document.querySelector(
  ".table-settings__audience-chat--activate"
);
const gosterge_activate = document.querySelector(
  ".table-settings__table-gosterge--activate"
);
const canak_activate = document.querySelector(
  ".table-settings__table-canak--activate"
);
const accept_audience_activate = document.querySelector(
  ".table-settings__accept-audience--activate"
);
const activate_buttons = [
 
  audienceChat_activate,
  accept_audience_activate,
];
const chipRangeInput = document.getElementById("table-chip-amount");
const decreaseChip = document.querySelector(".decrease-chip");
const increaseChip = document.querySelector(".increase-chip");
const displayChipRange = document.querySelector(
  ".table-features__chip-amount--amount"
);
const leaveTableFeatures = document.querySelector(
  ".table-features__menu--button"
);
const tableCancel = document.querySelector(".table-cancel");
const tableFeatures = document.querySelector(".table-features");
const tableFeaturesButton = document.querySelector(".open-table-button");
const authority_container = document.querySelector('.yetki-talep-container')
const authorityButton = document.querySelector('.new-demand-button')
const leaveAuthority = document.querySelector('.leave-authority')
const vip_container = document.querySelector('.vip-container')
const vipButton = document.querySelector('.vip-membership-button')
const exitVipButton = document.getElementById('exitVipButton')
const prize_container = document.querySelector('.prize-container')
const prizeButton = document.querySelector('.hourly-money-button')
const exitPrizeButton = document.querySelector('.exit-prize')
const wheelButton = document.querySelector('.fortune-wheel')
const wheel_container = document.querySelector('.wheel-container')
// wheel spin
const wheel_circle_box = document.querySelector('.wheel-circle-box')
const spin_wheel = document.querySelector('.spin-wheel')
let number = Math.ceil(Math.random() * 10000)
// Pages
const homePage = document.getElementById("homePage");
const theBest_button = document.querySelector(".theBest-button");
const transition_tile_box = document.querySelector(".transition-tile-box");
const first_tile = document.querySelector(".tile-1");
const last_tile = document.querySelector(".tile-7");
const popular_playersPage = document.querySelector(".popular-players");
const leavePopularPlayersButton = document.querySelector(
  ".tab-box__leave .leave-button"
);
const tab_box_button_box = document.querySelector(".tab-box__buttons");
const tab_box_buttons = Array.from(tab_box_button_box.children);
const tab_box_container = document.querySelector(".tab-box__container");
const tab_boxes = Array.from(tab_box_container.children);

function pageOrientation(){
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
pageOrientation()
window.addEventListener('resize', e=>{
  pageOrientation()
})

menu_bar.addEventListener("click", (e) => {
  sidebar_desktop.classList.add("open");
  animation_background.classList.remove("deactive");
  animation_background.classList.add("coming");
  animation_background.addEventListener(
    "animationend",
    (e) => {
      animation_background.classList.remove("coming");
      animation_background.classList.remove("deactive");
    },
    { once: true }
  );
});

spin_wheel.addEventListener('click', e=>{
  wheel_circle_box.style.transform = "rotate(" + number + "deg)"
  number += Math.ceil(Math.random() * 10000)
})

function exitSidebar() {
  sidebar_desktop.classList.remove("open");
  animation_background.classList.add("leaving");
  animation_background.addEventListener(
    "animationend",
    (e) => {
      animation_background.classList.remove("leaving");
      animation_background.classList.add("deactive");
    },
    { once: true }
  );
}
exit_sidebar.addEventListener("click", (e) => {
  exitSidebar();
});

change_chat_size.addEventListener("click", (e) => {
  // chat_box.classList.toggle("maximise");
  chat_box.forEach(chat=>{
    chat.classList.toggle("maximise");
  })
  tables_container.classList.toggle("minimise");
  if (change_chat_size.classList.contains("maximise")) {
    change_chat_size.classList.remove("maximise");
    change_chat_size.classList.add("minimise");
  } else {
    change_chat_size.classList.add("maximise");
    change_chat_size.classList.remove("minimise");
    chat_box.forEach(chat=>{
      // chat.style.height = (window.innerHeight * 0.01) + 'rem';
      // chat.style.height = `calc(var(${window.innerHeight * 0.01}, 1vh) * 100)`
      // console.log((window.innerHeight * 0.01) + 'rem')
      // var(--vh, 1vh) * 100
    })
  }
});

halls_button.addEventListener("click", (e) => {
  hall_section.classList.remove("deactive");
  hall_section.classList.add("coming");
  animation_background.classList.remove("deactive");
  animation_background.classList.add("coming");
  hall_section.addEventListener(
    "animationend",
    (e) => {
      hall_section.classList.remove("coming");
      animation_background.classList.remove("coming");
    },
    { once: true }
  );
});

function leaveHalls() {
  hall_section.classList.add("leaving");
  animation_background.classList.add("leaving");
  hall_section.addEventListener(
    "animationend",
    (e) => {
      hall_section.classList.remove("leaving");
      hall_section.classList.add("deactive");
      animation_background.classList.remove("leaving");
      animation_background.classList.add("deactive");
    },
    { once: true }
  );
}

leave_halls_button.addEventListener("click", (e) => {
  leaveHalls();
});

if (hesapbilgilerim.userlogin) {
  profile_button.addEventListener("click", () => {
    sidebar_desktop.style.zIndex = "9";
    profile_box.classList.remove("deactive");
    profile_box.classList.add("coming");
    animation_background.classList.remove("deactive");
    animation_background.classList.add("coming");
    profile_box.addEventListener(
      "animationend",
      () => {
        profile_box.classList.remove("coming");
        animation_background.classList.remove("coming");
      },
      { once: true }
    );
  });
}

function exitProfileBox() {
  sidebar_desktop.style.zIndex = "";
  animation_background.classList.add("leaving");
  profile_box.classList.add("leaving");
  profile_box.addEventListener(
    "animationend",
    () => {
      animation_background.classList.add("deactive");
      animation_background.classList.remove("leaving");
      profile_box.classList.remove("leaving");
      profile_box.classList.add("deactive");
    },
    { once: true }
  );
}

if (hesapbilgilerim.userlogin) {
  exit_profile_box.addEventListener("click", () => {
    exitProfileBox();
  });
}
notification_button.addEventListener("click", () => {
  sidebar_desktop.style.zIndex = "9";
  notification_box.classList.remove("deactive");
  notification_box.classList.add("coming");
  animation_background.classList.remove("deactive");
  animation_background.classList.add("coming");
  notification_box.addEventListener(
    "animationend",
    () => {
      notification_box.classList.remove("coming");
      animation_background.classList.remove("coming");
    },
    { once: true }
  );
});

function exitNotificationBox() {
  sidebar_desktop.style.zIndex = "";
  animation_background.classList.add("leaving");
  notification_box.classList.add("leaving");
  notification_box.addEventListener(
    "animationend",
    () => {
      animation_background.classList.add("deactive");
      animation_background.classList.remove("leaving");
      notification_box.classList.remove("leaving");
      notification_box.classList.add("deactive");
    },
    { once: true }
  );
}

exit_notification_box.addEventListener("click", () => {
  exitNotificationBox();
});

manager_button.addEventListener("click", () => {
  sidebar_desktop.style.zIndex = "9";
  manager_box.classList.remove("deactive");
  manager_box.classList.add("coming");
  animation_background.classList.remove("deactive");
  animation_background.classList.add("coming");
  manager_box.addEventListener(
    "animationend",
    () => {
      manager_box.classList.remove("coming");
      animation_background.classList.remove("coming");
    },
    { once: true }
  );
});

function exitManagerBox() {
  sidebar_desktop.style.zIndex = "";
  animation_background.classList.add("leaving");
  manager_box.classList.add("leaving");
  manager_box.addEventListener(
    "animationend",
    () => {
      animation_background.classList.add("deactive");
      animation_background.classList.remove("leaving");
      manager_box.classList.remove("leaving");
      manager_box.classList.add("deactive");
    },
    { once: true }
  );
}

exit_manager_box.addEventListener("click", () => {
  exitManagerBox();
});

if (hesapbilgilerim.userlogin) {
  friends_button.addEventListener("click", (e) => {
    sidebar_desktop.style.zIndex = "9";
    friends_box.classList.remove("deactive");
    friends_box.classList.add("coming");
    animation_background.classList.remove("deactive");
    animation_background.classList.add("coming");
    sidebar_desktop.classList.remove("open");
    friends_box.addEventListener(
      "animationend",
      () => {
        friends_box.classList.remove("coming");
        animation_background.classList.remove("coming");
      },
      { once: true }
    );
  });
}
function exitFriendsBox() {
  sidebar_desktop.style.zIndex = "";
  animation_background.classList.add("leaving");
  friends_box.classList.add("leaving");
  friends_box.addEventListener(
    "animationend",
    () => {
      animation_background.classList.add("deactive");
      animation_background.classList.remove("leaving");
      friends_box.classList.remove("leaving");
      friends_box.classList.add("deactive");
    },
    { once: true }
  );
}
if (hesapbilgilerim.userlogin) {
  exit_friends_box.addEventListener("click", (e) => {
    exitFriendsBox();
  });
}
tableFeaturesButton.addEventListener("click", (e) => {
  sidebar_desktop.style.zIndex = "9";
  tableFeatures.classList.remove("deactive");
  tableFeatures.classList.add("coming");
  animation_background.classList.remove("deactive");
  animation_background.classList.add("coming");
  sidebar_desktop.classList.remove("open");
  tableFeatures.addEventListener(
    "animationend",
    () => {
      tableFeatures.classList.remove("coming");
      animation_background.classList.remove("coming");
    },
    { once: true }
  );
});

function exitTableFeatures() {
  sidebar_desktop.style.zIndex = "";
  animation_background.classList.add("leaving");
  tableFeatures.classList.add("leaving");
  tableFeatures.addEventListener(
    "animationend",
    () => {
      animation_background.classList.add("deactive");
      animation_background.classList.remove("leaving");
      tableFeatures.classList.remove("leaving");
      tableFeatures.classList.add("deactive");
    },
    { once: true }
  );
}

[leaveTableFeatures, tableCancel].forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    exitTableFeatures();
  });
});
authorityButton.addEventListener('click', ()=>{
  sidebar_desktop.style.zIndex = '9'
  sidebar_desktop.classList.remove('open')
  authority_container.classList.remove('deactive')
  authority_container.classList.add('coming')
  animation_background.classList.remove('deactive')
  animation_background.classList.add('coming')
  authority_container.addEventListener('animationend', ()=>{
      authority_container.classList.remove('coming')
      animation_background.classList.remove('coming')
  }, {once:true})
})

function exitAuthorityContainer() {
  sidebar_desktop.style.zIndex = ''
  animation_background.classList.add('leaving')
  authority_container.classList.add('leaving')
  authority_container.addEventListener('animationend', ()=>{
      animation_background.classList.add('deactive')
      animation_background.classList.remove('leaving')
      authority_container.classList.remove('leaving')
      authority_container.classList.add('deactive')
  }, {once:true})
}

leaveAuthority.addEventListener('click', ()=>{
  exitAuthorityContainer()
})

support_button.addEventListener('click', ()=>{
  sidebar_desktop.style.zIndex = '9'
  sidebar_desktop.classList.remove('open')
  support_box.classList.remove('deactive')
  support_box.classList.add('coming')
  animation_background.classList.remove('deactive')
  animation_background.classList.add('coming')
  console.log('coming')
  support_box.addEventListener('animationend', ()=>{
    console.log('end')
    support_box.classList.remove('coming')
    animation_background.classList.remove('coming')
  }, {once:true})
})

function exitSupportBox() {
  sidebar_desktop.style.zIndex = ''
  animation_background.classList.add('leaving')
  support_box.classList.add('leaving')
  support_box.addEventListener('animationend', ()=>{
      animation_background.classList.add('deactive')
      animation_background.classList.remove('leaving')
      support_box.classList.remove('leaving')
      support_box.classList.add('deactive')
  }, {once:true})
}

exit_support_box.addEventListener('click', ()=>{
  exitSupportBox()
})

vipButton.addEventListener('click', ()=>{
  sidebar_desktop.style.zIndex = '9'
  vip_container.classList.remove('deactive')
  vip_container.classList.add('coming')
  animation_background.classList.remove('deactive')
  animation_background.classList.add('coming')
  vip_container.addEventListener('animationend', ()=>{
      vip_container.classList.remove('coming')
      animation_background.classList.remove('coming')
  }, {once:true})
})

function exitVipContainer() {
  sidebar_desktop.style.zIndex = ''
  animation_background.classList.add('leaving')
  vip_container.classList.add('leaving')
  vip_container.addEventListener('animationend', ()=>{
      animation_background.classList.add('deactive')
      animation_background.classList.remove('leaving')
      vip_container.classList.remove('leaving')
      vip_container.classList.add('deactive')
  }, {once:true})
}

exitVipButton.addEventListener('click', ()=>{
  exitVipContainer()
})

prizeButton.addEventListener('click', ()=>{
  sidebar_desktop.style.zIndex = '9'
  prize_container.classList.remove('deactive')
  prize_container.classList.add('coming')
  animation_background.classList.remove('deactive')
  animation_background.classList.add('coming')
  prize_container.addEventListener('animationend', ()=>{
      prize_container.classList.remove('coming')
      animation_background.classList.remove('coming')
  }, {once:true})
})

function exitPrizeContainer() {
  sidebar_desktop.style.zIndex = ''
  animation_background.classList.add('leaving')
  prize_container.classList.add('leaving')
  prize_container.addEventListener('animationend', ()=>{
      animation_background.classList.add('deactive')
      animation_background.classList.remove('leaving')
      prize_container.classList.remove('leaving')
      prize_container.classList.add('deactive')
  }, {once:true})
}

exitPrizeButton.addEventListener('click', ()=>{
  exitPrizeContainer()
})

wheelButton.addEventListener('click', ()=>{
  sidebar_desktop.style.zIndex = '9'
  wheel_container.classList.remove('deactive')
  wheel_container.classList.add('coming')
  animation_background.classList.remove('deactive')
  animation_background.classList.add('coming')
  wheel_container.addEventListener('animationend', ()=>{
      wheel_container.classList.remove('coming')
      animation_background.classList.remove('coming')
  }, {once:true})
})

function exitWheelContainer() {
  sidebar_desktop.style.zIndex = ''
  animation_background.classList.add('leaving')
  wheel_container.classList.add('leaving')
  wheel_container.addEventListener('animationend', ()=>{
      animation_background.classList.add('deactive')
      animation_background.classList.remove('leaving')
      wheel_container.classList.remove('leaving')
      wheel_container.classList.add('deactive')
  }, {once:true})
}
animation_background.addEventListener("click", (e) => {
  if (window.getComputedStyle(hall_section).display !== "none") {
    leaveHalls();
  } else if (window.getComputedStyle(profile_box).display !== "none") {
    exitProfileBox();
  } else if (window.getComputedStyle(sidebar_top).display !== "none") {
    exitSidebar();
  } else if (window.getComputedStyle(friends_box).display !== "none") {
    exitFriendsBox();
  } else if (window.getComputedStyle(manager_box).display !== "none") {
    exitManagerBox();
  } else if (window.getComputedStyle(notification_box).display !== "none") {
    exitNotificationBox();
  } else if (window.getComputedStyle(tableFeatures).display !== "none") {
    exitTableFeatures();
  }
  else if(window.getComputedStyle(authority_container).display !=='none'){
    exitAuthorityContainer()
  }
  else if(window.getComputedStyle(vip_container).display !=='none'){
      exitVipContainer()
  }
  else if(window.getComputedStyle(prize_container).display !=='none'){
      exitPrizeContainer()
  }
  else if(window.getComputedStyle(wheel_container).display !=='none'){
      exitWheelContainer()
  }
  else if(window.getComputedStyle(support_box).display !=='none'){
      exitSupportBox()
  }
});
if (hesapbilgilerim.userlogin) {
  edit_profile_button.addEventListener("click", (e) => {
    profile_content.classList.add("leaving");
    profile_content.addEventListener(
      "animationend",
      () => {
        profile_content.classList.remove("leaving");
        profile_content.classList.add("deactive");
        profile_edit.classList.remove("deactive");
        profile_edit.classList.add("coming");
      },
      { once: true }
    );
    profile_edit.addEventListener(
      "animationend",
      () => {
        profile_edit.classList.remove("coming");
      },
      { once: true }
    );
  });

  back_to_profile_content.addEventListener("click", () => {
    profile_edit.classList.remove("coming");
    profile_edit.classList.add("leaving");
    profile_edit.addEventListener(
      "animationend",
      () => {
        profile_content.classList.add("coming");
        profile_edit.classList.remove("leaving");
        profile_edit.classList.add("deactive");
        profile_content.classList.remove("deactive");
      },
      { once: true }
    );
    profile_content.addEventListener(
      "animationend",
      () => {
        profile_content.classList.remove("coming");
      },
      { once: true }
    );
  });

  input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function () {
      preview.src = reader.result;
      preview.style.display = "block";
      removeBtn.style.display = "inline-block";
      input.previousElementSibling.innerHTML = input.files[0].name;
    };
    reader.readAsDataURL(input.files[0]);
  });

  removeBtn.addEventListener("click", function () {
    preview.src = "#";
    preview.style.display = "none";
    removeBtn.style.display = "none";
    input.value = "";
    input.previousElementSibling.innerHTML = "Choose File";
  });

  fontSelect.addEventListener("change", function () {
    preview.style.fontFamily = fontSelect.value;
  });

  nickColorInput.addEventListener("change", function () {
    preview.style.color = nickColorInput.value;
  });
}

// Pages

// friends

theBest_button.addEventListener("click", (e) => {
  homePage.classList.add("leaving");
  transition_tile_box.classList.remove("deactive");
  transition_tile_box.classList.add("coming");
  last_tile.addEventListener(
    "animationend",
    (e) => {
      transition_tile_box.classList.remove("coming");
      transition_tile_box.classList.add("leaving");
      homePage.classList.remove("leaving");
      homePage.classList.add("deactive");
      popular_playersPage.classList.remove("deactive");
      last_tile.addEventListener(
        "animationend",
        (e) => {
          transition_tile_box.classList.remove("leaving");
          transition_tile_box.classList.add("deactive");
        },
        { once: true }
      );
    },
    { once: true }
  );
});

leavePopularPlayersButton.addEventListener("click", (e) => {
  transition_tile_box.classList.remove("deactive");
  transition_tile_box.classList.add("coming");
  last_tile.addEventListener(
    "animationend",
    (e) => {
      popular_playersPage.classList.add("deactive");
      homePage.classList.remove("deactive");
      transition_tile_box.classList.remove("coming");
      transition_tile_box.classList.add("leaving");
      last_tile.addEventListener(
        "animationend",
        (e) => {
          transition_tile_box.classList.remove("leaving");
          transition_tile_box.classList.add("deactive");
        },
        { once: true }
      );
    },
    { once: true }
  );
});

// arrenging popular players tab

tab_box_buttons.forEach((button, buttonIndex) => {
  button.addEventListener("click", (e) => {
    tab_box_buttons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");
    tab_boxes.forEach((box) => {
      box.classList.remove("active");
    });
    tab_boxes.forEach((box, boxIndex) => {
      if (buttonIndex === boxIndex) {
        box.classList.add("active");
        box.style.left = "0";
      } else if (boxIndex < buttonIndex) {
        box.style.left = -((buttonIndex - boxIndex) * 100) + "%";
      } else {
        box.style.left = (boxIndex - buttonIndex) * 100 + "%";
      }
    });
  });
});

activate_buttons.forEach((button) => {
  button.addEventListener("click", (el) => {
    button.firstElementChild.classList.toggle("active");
  });
});
chipRangeInput.addEventListener("input", (event) => {
  displayChipRange.textContent = event.target.value;
});

increaseChip.addEventListener("click", (e) => {
  e.preventDefault();
  chipRangeInput.value++;
  displayChipRange.textContent = chipRangeInput.value;
});
decreaseChip.addEventListener("click", (e) => {
  e.preventDefault();
  chipRangeInput.value--;
  displayChipRange.textContent = chipRangeInput.value;
});

const persons = document.querySelectorAll(".people");
const userPopup = document.querySelector(".user-popup");
const closeUserPopup = document.querySelector(".exit-user-popup");
const specialMessageBox = document.querySelector(".specialMessageBox")
const specialMessageMinimize = document.querySelector(".messageSectionMinimize")
const specialMessageBody = document.querySelector(".messages-list")
const specialUserMessage = document.querySelectorAll(".special-userMessage")
const specialUserMessageBox = document.querySelector(".speacial-userMessage-inside")
const backToMessageList = document.querySelector(".backToMessageList")
const sendMessageToPerson = document.querySelector(".specialMessageToPerson")
const changeIcon = document.querySelector(".changeIcon")
const changeIconMinimize = document.querySelector(".changeIconMinimize")

/*
persons.forEach((person) =>
  person.addEventListener("click", (e) => userPopup.classList.remove("disable"))
);
*/
closeUserPopup.addEventListener("click", e => userPopup.classList.add("disable"))





specialMessageMinimize.addEventListener("click", e => {
 if(specialMessageBody.classList.value.search("minimize") === -1 || specialMessageBody.classList.value.search("dotshow") !== -1){
  specialMessageBody.classList.add("minimize")
  specialMessageBody.classList.remove("dontshow")
  specialUserMessageBox.classList.add("dontshow")
  changeIconMinimize.classList.remove("fa-minus")
  changeIconMinimize.classList.add("fa-plus")
 }
 else{
 $(".messageNotification").text("0").hide();
  specialMessageBody.classList.remove("minimize")
  changeIconMinimize.classList.add("fa-minus")
  changeIconMinimize.classList.remove("fa-plus")
 } 
})


specialUserMessage.forEach(message => message.addEventListener("click", e => {
  specialMessageBody.classList.add("dontshow")
  specialUserMessageBox.classList.remove("dontshow")
  changeIcon.classList.remove("fa-user")
  changeIcon.classList.add("fa-arrow-left")
}))

backToMessageList.addEventListener("click",e=>{
  specialMessageBody.classList.remove("dontshow")
  specialUserMessageBox.classList.add("dontshow")
  changeIcon.classList.add("fa-user")
  changeIcon.classList.remove("fa-arrow-left")
})

sendMessageToPerson.addEventListener("click", e => {
  /*
  specialMessageBody.classList.remove("minimize")
  userPopup.classList.add("disable")
  */
})





const tableChatActive = document.querySelector(".masa-chat-button")
const tableChat = document.querySelector(".masa-chat")
const lobbyChatActive = document.querySelector(".lobi-chat-button")
const lobbyChat = document.querySelector(".lobi-chat")

// $(document).on( "click",".tab>button.tablinks", function() {
// 	$(".tab>button.tablinks").removeClass("active");
// 	$(".tab-box .tabcontent").removeClass("active");
// 	if($(this).text()=="Lobi Chat"){
// 		$(".tablinks.lobi-chat-button").addClass("active");
// 		$(".lobi-chat.tabcontent").addClass("active");
// 		}else{
// 		$(".tablinks.masa-chat-button").addClass("active");
// 		$(".masa-chat.tabcontent").addClass("active");
// 	}
// });
/*
tableChatActive.addEventListener("click", e => {	
  if(tableChatActive.classList.value.search("active") === -1){
  lobbyChatActive.classList.remove("active")
  tableChatActive.classList.add("active")
  lobbyChat.classList.remove("active")
  tableChat.classList.add("active")
  }

})

lobbyChatActive.addEventListener("click", e => {
  if(lobbyChatActive.classList.value.search("active") === -1){
  tableChatActive.classList.remove("active")
  lobbyChatActive.classList.add("active")
  tableChat.classList.remove("active")
  lobbyChat.classList.add("active")

  }

})
*/


const sendEmoji = document.querySelectorAll(".sendEmoji")
const selectEmoji = document.querySelectorAll(".selectEmoji")
const emojiBox = document.querySelectorAll(".emoji-box")

sendEmoji.forEach(emoji => emoji.addEventListener("click", e => {
  if(emoji.nextElementSibling.classList.value.search("disable") === -1){
    emoji.nextElementSibling.classList.add("disable")
  }
  else{
    emoji.nextElementSibling.classList.remove("disable")
  }
}))


selectEmoji.forEach(emoji => emoji.addEventListener("click", e => {
  
  selectEmoji.forEach(emoji => emoji.classList.remove("selected"))

  emoji.classList.add("selected")
  emojiBox.forEach(box => {
    if(box.classList.value.search("disable") === -1){
      box.classList.add("disable")
    }
  })

  
}))
