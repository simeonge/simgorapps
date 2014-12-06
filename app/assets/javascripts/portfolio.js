// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var sload = function() {
  $("a#slv").click(function() {
    var puz = "";
    $("td div input").each(function() {
      puz = puz.concat(this.value == "" ? "." : this.value);
    });
  });
};

$(document).ready(sload); // for regular page load
$(document).on('page:load', sload); // for turbolink
