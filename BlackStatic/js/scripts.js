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
  $( "#startButton" ).trigger( "click" );



  function initialize() {
    populateCards();
    setColor();
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
    for (var i = 2; i <= students.length; i++) {
      var clone = $('#studentCard_1').clone();
      clone.attr('id', 'studentCard_' + i);
      clone.find('#chart_div_1').attr('id', 'chart_div_' + i);
      clone.find('#studentName').text('Student ' + i);
      for (var key in students[i - 1]) {
        if (key == 'GRE-verbal' || key == 'GRE-quantitative') {
          clone.find('#' + key).text(students[i - 1][key] + 130);
        } else if (key != 'admission') {
          clone.find('#' + key).text(students[i - 1][key]);
        }
      }

      //append clone on the end
      $('#myCarousel-container').append(clone);
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
