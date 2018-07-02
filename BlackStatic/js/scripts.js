$(function() {


$("#landing-page").fadeIn();
$(".landingcontent").fadeIn();


$("#startButton").on("click", function() {
      $(".landingcontent").fadeOut();

      setTimeout(function() {
          $("#landing-page").fadeOut();
      }, 500);

      setTimeout(function() {
      // $("#main-page").animateRotate(0, 0);
      // $("#main-page").css("height", "25px");
      // $("#main-page").css("width", "375px");
          $("#main-page").fadeIn();
          $(".maincontent").fadeIn(300);
          drawStacked();
      }, 1000);
  });
});
