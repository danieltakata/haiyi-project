$(function() {
  $('#nextStepButton').click(function() {
    window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // if (confirm("Are you sure you are ready to move on to the next step? You will not be able to go back.")) {
    //   window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // } else {}
  });

  $('#landing-page').fadeIn();
  $('.landingcontent').fadeIn();


  $('#startButton').on('click', function() {
    $('.landingcontent').fadeOut();

    setTimeout(function() {
      $('#landing-page').fadeOut();
    }, 500);

    setTimeout(function() {
      $('#main-page').fadeIn();
      $('.maincontent').fadeIn(300);
      initialize();
    }, 300);
  });
  // $("#startButton").trigger("click");

  // $('#myCarousel').on('slid.bs.carousel', function(e) {
  //   var $e = $(e.relatedTarget);
  //   var idx = $e.index();
  //   var itemsPerSlide = 3;
  //   var totalItems = $('.carousel-item').length;
  //
  //   if (idx >= totalItems - (itemsPerSlide - 1)) {
  //     var it = itemsPerSlide - (totalItems - idx);
  //     for (var i = 0; i < it; i++) {
  //       // append slides to end
  //       if (e.direction == 'left') {
  //         $('.carousel-item')
  //         .eq(i)
  //         .appendTo('.carousel-inner');
  //       } else {
  //         $('.carousel-item')
  //         .eq(0)
  //         .appendTo($(this).find('.carousel-inner'));
  //       }
  //     }
  //   }
  // });


  function initialize() {
    populateCards();
    // setColor();
  }

  function setColor() {
    $(".greV-label").css('background-color', barcolors[0]);
    $(".greQ-label").css('background-color', barcolors[1]);
    $(".greW-label").css('background-color', barcolors[2]);
    $(".gpa-label").css('background-color', barcolors[3]);
    $(".major-label").css('background-color', barcolors[5]);
    $(".institution-label").css('background-color', barcolors[4]);
    $(".ctry-label").css('background-color', barcolors[6]);
    $(".ps-label").css('background-color', barcolors[7]);
    $(".diver-label").css('background-color', barcolors[8]);
    $(".rec1-label").css('background-color', barcolors[9]);
    $(".rec2-label").css('background-color', barcolors[10]);
    $(".rec3-label").css('background-color', barcolors[11]);
    $(".mystery1-label").css('background-color', barcolors[12]);
    $(".mystery2-label").css('background-color', barcolors[13]);
    $(".mystery3-label").css('background-color', barcolors[14]);
  }

  function populateCards() {

    // populate the cards
    for (var i = 0; i < students.length; i++) {
      if (i == 0) {
        var card = $('#studentCard_1');
      } else {
        var card = $('#studentCard_1').clone();
      }
      card.attr('id', 'studentCard_' + (i + 1));
      card.find('#chart_div_1').attr('id', 'chart_div_' + (i + 1));
      card.find('#card-border').removeClass("border-success border-danger");


      card.find('#studentName').text('Student ' + (i + 1));
      for (var key in students[i]) {
        if (key == 'GRE-verbal' || key == 'GRE-quantitative') {
          card.find('#' + key).text(students[i][key] + 130);
        } else if (key == 'LinearRegression') {
          // Check student accept/ reject
          let totalScore = students[i][key];
          console.log(totalScore);
          if (totalScore >= high_threshold) {
            card.find('#result').text("Very likely to be accepted");
            card.find('#result').css("color", "green");
            card.find('#studentName').css("color", "green");
            card.find('#card-border').addClass("border-success");
          } else if (totalScore >= mid_threshold && totalScore < high_threshold) {
            card.find('#result').text("Somewhat likely to be accepted");
            card.find('#result').css("color", "LimeGreen ");
            card.find('#studentName').css("color", "LimeGreen");
            card.find('#card-border').addClass("border-success");
          } else if (totalScore >= low_threshold && totalScore < mid_threshold) {
            card.find('#result').text("Somewhat likely to be rejected");
            card.find('#result').css("color", "crimson ");
            card.find('#studentName').css("color", "crimson");
            card.find('#card-border').addClass("border-danger");
          } else {
            card.find('#result').text("Very likely to be rejected");
            card.find('#result').css("color", "red");
            card.find('#studentName').css("color", "red");
            card.find('#card-border').addClass("border-danger");
          }
        } else {
          card.find('#' + key).text(students[i][key]);
        }
      }
      if (i > 0) {
        //append clone on the end
        $('#myCarousel-container').append(card);
      }
    }
    $('#studentCard_1').addClass('active');
  }



});

var barcolors = [
  '#af7ba0' // GRE-verb
  , '#c191b3' // GRE-quant
  , '#d3a7c7' // GRE-write
  , '#f08d39' // GPA
  , '#9D7562' // Inst-Rank
  , '#f7a55d' // Major
  , '#B99483' // Country of origin
  , '#df585c' // Personal Statement
  , '#fd9d9b' // Diversity score
  , '#5ca053' // Recommendation letter 1
  , '#4d9794' // Recommendation letter 2
  , '#5079a5' // Recommendation letter 3
  , '#74b869' // mystery1
  , '#6baaa5' // mystery2
  , '#77a2c6' // mystery3
];

var constant = -67.3342; //Constant term for linear regression
var negative_offset = 0.4228 + 4.596 + 2.2719 + 1.7803 + 100 * 1.7543 + 100 * 0.0382; // for offsetting the negative value, to be added to decision boundary (negative dummy variables + negative cont. variables)
var low_threshold = 50 + negative_offset - constant; // Threshold + negative offset
var mid_threshold = 150 + negative_offset - constant; // Threshold + negative offset
var high_threshold = 250 + negative_offset - constant; // Threshold + negative offset
