// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// function to populate grid with the given string representing the puzzle
var populate = function(puzzle) {
  $("td div input").each(function(index) {
    if (puzzle.charAt(index) == '.') {
      $(this).val('');
    } else {
      $(this).val(puzzle.charAt(index));
    }
  });
};

var sload = function() {
  // puzzle buttons
  $("#ez").click(function() {
    var ezp = ".....4...3.6.21..54..5.628..97.4.5626.......1124.6.73..382.9..49..43.1.7...6.....";
    populate(ezp);
  });

  $("#df").click(function() {
    var dfp = "1...8.4.5.9...2..1...61.8.....8......52...67......3.....6.94...4..2...3.2.5.3...4";
    populate(dfp);
  });

  $("#ec").click(function() {
    var ecp = "..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9";
    populate(ecp);
  });

  $("#cg").click(function() {
    var emp = ".................................................................................";
    populate(emp);
  });

  // bind ajax events for sudoku puzzle's Solve ajax call
  // before ajax call, puzzle input by user will be converted to string
  $("#sform").bind("ajax:before", function(evt, xhr, settings) {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
    $("#puzzle").val(puz); // add to hidden input field
  });

  // on ajax success, solved puzzle will be populated into UI grid
  $("#sform").bind("ajax:success", function(xhr, data, status) {
    $("#puzzle").val(data["sl"]); // retrieve from hidden input field
    $("td div input").each(function(index) {
      $(this).val($("#puzzle").val().trim().charAt(index));
    });
  });

  // on ajax error, display error message to user
  $("#sform").bind("ajax:error", function(xhr, data, status) {
    alert("Something went wrong! Please make sure the puzzle you have entered is valid.");
  });
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
