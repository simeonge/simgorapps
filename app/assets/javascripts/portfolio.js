// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var sload = function() {
  // bind ajax events for sudoku puzzle's Solve ajax call
  // before ajax call, puzzle input by user will be converted to string
  $("#sform").bind("ajax:before", function(evt, xhr, settings) {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
    $("#puzzle").val(puz); // add to hidden input field
  });

  // upon ajax success, solved puzzle will be populated into UI grid
  $("#sform").bind("ajax:success", function(xhr, data, status) {
    $("#puzzle").val(data["sl"]); // retrieve from hidden input field
    $("td div input").each(function(index) {
      $(this).val($("#puzzle").val().trim().charAt(index));
    });
  });

  // TODO on ajax error, display error message to user
  $("#sform").bind("ajax:error", function(xhr, data, status) {
    console.log("Error occurred!");
  });
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
