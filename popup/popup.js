var Page = function () {
};

Page.prototype.load = function () {
  var context = this;
  $(".images .column").remove();
  $.getJSON("https://lgtmoon.herokuapp.com/api/images/random?" + Math.random(), function (data) {
    var imageList = data.images
    $.each(imageList, function(){
      var div = $('<div class="column"></div>');
      var img = $('<img id="image border">');
      img.attr('src', this.url);
      img.appendTo(div)
      div.appendTo('.images')

      img.unbind().click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { image: "![LGTM](" + img.attr("src") + ")" }, function (response) { });
        });

        $(".message").show(500);
        setTimeout(function () { $(".message").hide(500) }, 1000);

        var clipboard = $("<input/>");
        $("body").append(clipboard);
        clipboard.val(img.attr("src")).select();
        document.execCommand('copy');
        clipboard.remove();
      });
    })
  });
};

$(document).ready(function () {
  var page = new Page();
  $("#reload").click(function () {
    page.load();
  });
  page.load();
});
