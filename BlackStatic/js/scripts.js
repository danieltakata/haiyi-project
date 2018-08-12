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
    }, 300);
  });
  $( "#startButton" ).trigger( "click" );

  initialize();


  function initialize() {
    populateCards();
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
      setColor();
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

var students = [
  {
    'admission': 1,
    'GRE-verbal': 32,
    'GRE-quantitative': 40,
    'GRE-writing': 4.5,
    'GPA': 3.6,
    'Major': 'Computer Science',
    'Institution-Rank': 193,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 192,
    'RL2': 'Top 10%',
    'RL2inst': 192,
    'RL3': 'Top 10%',
    'RL3inst': 179
  },
  {
    'admission': 0,
    'GRE-verbal': 13,
    'GRE-quantitative': 29,
    'GRE-writing': 2.5,
    'GPA': 3.59,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 167,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 193
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.81,
    'Major': 'Computer Science',
    'Institution-Rank': 186,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 189,
    'RL2': 'Top 10%',
    'RL2inst': 205,
    'RL3': 'Top 10%',
    'RL3inst': 192
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.42,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 205,
    'RL2': 'Top 10%',
    'RL2inst': 194,
    'RL3': 'Top 10%',
    'RL3inst': 206
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 34,
    'GRE-writing': 4,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 1,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 207,
    'RL2': 'Top 10%',
    'RL2inst': 209,
    'RL3': 'Top 10%',
    'RL3inst': 210
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 347,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 216,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 183
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 5,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 178,
    'RL2': 'Top 10%',
    'RL2inst': 193,
    'RL3': 'Top 10%',
    'RL3inst': 200
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.58,
    'Major': 'STEM',
    'Institution-Rank': 180,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 159,
    'RL2': 'Top 10%',
    'RL2inst': 180,
    'RL3': 'Top 10%',
    'RL3inst': 205
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 5,
    'RL1': 'Top 10%',
    'RL1inst': 198,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 176
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 200,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 2,
    'RL1': 'Top 10%',
    'RL1inst': 203,
    'RL2': 'Top 10%',
    'RL2inst': 196,
    'RL3': 'Top 10%',
    'RL3inst': 206
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.74,
    'Major': 'STEM',
    'Institution-Rank': 194,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 5%',
    'RL1inst': 1,
    'RL2': 'Top 10%',
    'RL2inst': 200,
    'RL3': 'Top 10%',
    'RL3inst': 208
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 202,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 494,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 212
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 196,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 206,
    'RL2': 'Top 5%',
    'RL2inst': 1,
    'RL3': 'Top 10%',
    'RL3inst': 224
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 185,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 189,
    'RL2': 'Top 50%',
    'RL2inst': 482,
    'RL3': 'Top 10%',
    'RL3inst': 213
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 162,
    'RL2': 'Top 10%',
    'RL2inst': 205,
    'RL3': 'Top 5%',
    'RL3inst': 1
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 4,
    'GPA': 3.71,
    'Major': 'STEM',
    'Institution-Rank': 199,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 198,
    'RL2': 'Top 10%',
    'RL2inst': 193,
    'RL3': 'Top 50%',
    'RL3inst': 464
  },
  {
    'admission': 1,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.71,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 192,
    'RL2': 'Top 10%',
    'RL2inst': 200,
    'RL3': 'Top 10%',
    'RL3inst': 204
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.49,
    'Major': 'Other',
    'Institution-Rank': 186,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 207,
    'RL2': 'Top 10%',
    'RL2inst': 197,
    'RL3': 'Top 10%',
    'RL3inst': 186
  }
];
