$(function () {
  var $browserAlert = $("#browserAlert");
  $browserAlert.hide();

  $.ajax({
    url: "https://cdn.rawgit.com/arasatasaygin/is.js/master/is.min.js",
    dataType: "script",
    success: function () {
      if (is.edge() || is.ie()) {
        $browserAlert.find("span").text("View on Chrome/Firefox.");
        $browserAlert.show();
        $browserAlert.addClass("active");
      }
    },
  });

  var $btn = $("button.btnSubmit");
  var $loaderTemplate = $("svg.loader");
  var $checkmarkTemplate = $("svg.checkmark");

  $btn.on("click", function () {
    if ($(this).hasClass("clicked")) return;
    $(this).addClass("clicked");
    var self = $(this);
    var timeout1 = 600,
      timeout2 = 1500,
      timeout3 = 2000;
    setTimeout(function () {
      self.append($loaderTemplate.clone());
      self.find("svg").removeClass("svg--template");
      self.find("svg").css("display", "initial");
    }, timeout1);
    setTimeout(function () {
      self.text("");
      self.find("svg").remove();
      self.append($checkmarkTemplate.clone());
      self.find("svg").css("display", "initial");
      self.find("svg").removeClass("svg--template");
      self.addClass("done");
    }, timeout1 + timeout2);
    setTimeout(function () {
      self.find("svg").remove();
      self.text("Üye Ol");
      self.removeClass("clicked");
      self.removeClass("done");
    }, timeout1 + timeout2 + timeout3);
  });
});
