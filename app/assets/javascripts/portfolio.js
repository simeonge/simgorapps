// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var sload = function() {
  $("a#pop").click(function() {
    console.log($("p#sol").text().trim().charAt(0));
    $("td div input").each(function(index) {
      this.val($("p#sol").text().trim().charAt(index));
    });
  });

  $("a#slv").click(function() {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
    $("#puzzle").val(puz);

    // submit to controller via ajax
/*
    $.ajax({
            url: '/portfolio/sudoku',
             type: "POST",
             dataType: 'json',
             puzzle: {mypuz: puz},
             processData: false,
            success: function (msg)
            {
	      alert("success!");
            },
            error: function (xhr, status)
            {
	      alert("error!");
            }
    });*/

  });
};

var tempload = function() {
  
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
