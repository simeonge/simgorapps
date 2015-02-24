var homeLoad = function() {
  $("#calcOverlay").click(function() {
    $(".coverlay").fadeIn(200);
    $(".cmodal").fadeIn(200);
  });

  $("#sudokuOverlay").click(function() {
    $(".coverlay").fadeIn(200);
    $(".smodal").fadeIn(200);
  });

  $(".coverlay").click(function() {
    $(".coverlay").fadeOut(200);
    $(".cmodal").fadeOut(200);
    $(".smodal").fadeOut(200);
  });
};

$(document).ready(homeLoad); // for regular page load
$(document).on('page:load', homeLoad); // for turbolink
