// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var sload = function() {
  $("a#pop").click(function() {
    $("td div input").each(function(index) {
      $(this).val($("p#sol").text().trim().charAt(index));
    });
  });

  // bind ajax events
  $("#sform").bind("ajax:beforeSend", function(evt, xhr, settings) {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
    $("#puzzle").val(puz);
  });
  $("#sform").bind("ajax:success", function(xhr, data, status) {
    $("td div input").each(function(index) {
      $(this).val(data.text().trim().charAt(index));
    });
  });
  $("#sform").bind("ajax:error", function(xhr, data, status) {
    $("sform").append("FUCK YOU!!");
  });
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
