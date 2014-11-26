// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript... NOT... in this file: http://coffeescript.org/
var aload = function() {
  $(".tile").css('cursor', 'pointer');
  $(".tile").click(function(){
     Turbolinks.visit($(this).find("a").attr("href"));
     return false;
});
};

$(document).ready(aload); // for regular page load
$(document).on('page:load', aload); // for turbolink
