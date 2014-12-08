// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var sload = function() {
  $("a#pop").click(function() {
    $("td div input").each(function(index) {
      $(this).val($("p#sol").text().trim().charAt(index));
    });
  });

  $("a#slv").click(function() {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
    $("#puzzle").val(puz);

    // bind ajax events
    $("#sform").bind("ajax:success", function(xhr, data, status) {
      $("#sform").append(status);
    });
    $("#sform").bind("ajax:error", function(xhr, data, status) {
      $("sform").append(data);
    });

  });
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
