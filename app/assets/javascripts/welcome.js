var homeLoad = function() {
  // handlers for modals
  $("#calcOverlay").click(function() {
    $(".coverlay").fadeIn(200);
    $(".cmodal").fadeIn(200);
  });

  $("#sudokuOverlay").click(function() {
    $(".coverlay").fadeIn(200);
    $(".smodal").fadeIn(200);
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top - 50
    }, 800);
  });

  $(".coverlay").click(function() {
    $(".coverlay").fadeOut(200);
    $(".cmodal").fadeOut(200);
    $(".smodal").fadeOut(200);
  });

  // smooth scroll
  $("#stotop").click(function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 800);
  });  

  $("#stoabt").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 800);
  });

  $("#stoport").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top - 50
    }, 800);
  });

  $("#stocont").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact").offset().top - 50
    }, 800);
  });
};

$(document).ready(homeLoad); // for regular page load
$(document).on('page:load', homeLoad); // for turbolink
