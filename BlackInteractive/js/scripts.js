$(function() {
  $('#nextStepButton').click(function() {
    window.open('https://goo.gl/forms/r6JOaUa1oDpxOrG92', '_blank');
    // window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // if (confirm("Are you sure you are ready to move on to the next step? You will not be able to go back.")) {
    //   window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // } else {}
  });

  $("#landing-page").fadeIn();
  $(".landingcontent").fadeIn();

  $("#startButton").on("click", function() {
    $(".landingcontent").fadeOut();

    setTimeout(function() {
      $("#landing-page").fadeOut();
    }, 500);

    setTimeout(function() {
      $("#main-page").fadeIn();
      $(".maincontent").fadeIn(300);
      $('[data-toggle="tooltip"]').tooltip();
      initialize();
      updateResult()
    }, 300);
  });

  // $( "#startButton" ).trigger( "click" );


  function initialize() {
    initializeSliders();

    $("#greV-data").text((vals[0] + 130));
    $("#greQ-data").text((vals[1] + 130));
    $("#greW-data").text(vals[2]);
    $("#gpa-data").text(vals[3]);
    $("#ps-data").text((vals[7]))
    $("#diver-data").text((vals[8]))
    $("#mystery1-data").text((vals[12]))
    $("#mystery2-data").text((vals[13]))
    $("#mystery3-data").text((vals[14]))

    for (var i = 0; i < studentData[1].length - 1; i++) {
      studentData[1][i + 1] = vals[i] * weights[i];
    }

    updateMajor();
    updateCountry();
    updateRecLetter();
    updateInstitution();
    // setColor();
  }

  function setColor() {
    $("#greV-label").css('background-color', barcolors[0]);
    $("#greQ-label").css('background-color', barcolors[1]);
    $("#greW-label").css('background-color', barcolors[2]);
    $("#gpa-label").css('background-color', barcolors[3]);
    $("#major-label").css('background-color', barcolors[5]);
    $("#institution-label").css('background-color', barcolors[4]);
    $("#ctry-label").css('background-color', barcolors[6]);
    $("#ps-label").css('background-color', barcolors[7]);
    $("#diver-label").css('background-color', barcolors[8]);
    $("#rec1-label").css('background-color', barcolors[9]);
    $("#rec2-label").css('background-color', barcolors[10]);
    $("#rec3-label").css('background-color', barcolors[11]);
    $("#mystery1-label").css('background-color', barcolors[12]);
    $("#mystery2-label").css('background-color', barcolors[13]);
    $("#mystery3-label").css('background-color', barcolors[14]);
  }

  function initializeSliders() {

    $("#greV-slider").slider({
      // options
      range: "min",
      value: vals[0],
      min: 0,
      max: 40,
      step: 1,
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#greV-data").text((ui.value + 130))
        studentData[1][1] = ui.value * weights[0]; //greV
        updateResult();

      },
      change: function(event, ui) {
        studentData[1][1] = ui.value * weights[0]; //greV
        updateResult();
      }
    });


    $("#greQ-slider").slider({
      // options
      range: "min",
      value: vals[1],
      min: 0,
      max: 40,
      step: 1,
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#greQ-data").text((ui.value + 130))
      },
      change: function(event, ui) {
        studentData[1][2] = ui.value * weights[1]; //greQ
        updateResult();
      }
    });


    $("#greW-slider").slider({
      // options
      range: "min",
      value: vals[2],
      min: 0,
      max: 6,
      step: 0.5,
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#greW-data").text(ui.value)
      },
      change: function(event, ui) {
        studentData[1][3] = ui.value * weights[2]; //greW
        updateResult();
      }
    });

    $("#gpa-slider").slider({
      // options
      range: "min",
      value: vals[3],
      min: 0.0,
      max: 4.0,
      step: 0.01,
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#gpa-data").text(ui.value)
      },
      change: function(event, ui) {
        studentData[1][4] = ui.value * weights[3];
        updateResult();
      }
    });

    $("#institution-dropdown").change(function() {
        updateInstitution();
        updateResult();
      });

    $("#major-dropdown").change(function() {
        updateMajor();
        updateResult();
      });

    $("#ctry-dropdown").change(function() {
        updateCountry();
        updateResult();
    });


      $("#ps-slider").slider({
        // options
        range: "min",
        value: vals[7],
        min: 1,
        max: 5,
        step: 0.5,
        start: function(event, ui) {
          // code
        },
        stop: function(event, ui) {
          $("#ps-data").text((ui.value))
        },
        change: function(event, ui) {
          studentData[1][8] = ui.value * weights[7];
          updateResult();
        }
      });

      $("#diver-slider").slider({
        // options
        range: "min",
        value: vals[8],
        min: 1,
        max: 5,
        step: 0.5,
        start: function(event, ui) {
          // code
        },
        stop: function(event, ui) {
          $("#diver-data").text((ui.value))
        },
        change: function(event, ui) {
          studentData[1][9] = ui.value * weights[8];
          updateResult();
        }
      });


    $("#rec1-dropdown").change(function() {
        updateRecLetter();
        updateResult();
    });

    $("#rec2-dropdown").change(function() {
        updateRecLetter();
        updateResult();
    });

    $("#rec3-dropdown").change(function() {
        updateRecLetter();
        updateResult();
    });


    $("#mystery1-slider").slider({
      // options
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#mystery1-data").text((ui.value))
      },
      range: "min",
      min: 0,
      max: 100,
      value: vals[12],
      step: 1,
      change: function(event, ui) {
        studentData[1][13] = (100 - ui.value) * weights[12];
        //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
        updateResult();
      }
    });

    $("#mystery2-slider").slider({
      // options
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#mystery2-data").text((ui.value))
      },
      range: "min",
      min: 0,
      max: 100,
      value: vals[13],
      step: 1,
      change: function(event, ui) {
        studentData[1][14] = ui.value * weights[13];
        //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
        updateResult();
      }
    });


    $("#mystery3-slider").slider({
      // options
      start: function(event, ui) {
        // code
      },
      stop: function(event, ui) {
        $("#mystery3-data").text((ui.value))
      },
      range: "min",
      min: 0,
      max: 100,
      value: vals[14],
      step: 1,
      change: function(event, ui) {
        studentData[1][15] = (100 - ui.value) * weights[14];
        updateResult();
      }
    });
  }

  function updateRecLetter() {
    let rec1Wt = 0;
    switch ($("#rec1-dropdown").val()) {
      case 'rec1strong':
        rec1Wt = rec1strong;
        break;
      case 'rec1average':
        rec1Wt = rec1average;
        break;
      case 'rec1weak':
        rec1Wt = rec1weak;
        break;
    }
    studentData[1][10] = rec1Wt * weights[9];

    let rec2Wt = 0;
    switch ($("#rec2-dropdown").val()) {
      case 'rec2strong':
        rec2Wt = rec2strong;
        break;
      case 'rec2average':
        rec2Wt = rec2average;
        break;
      case 'rec2weak':
        rec2Wt = rec2weak;
        break;
    }
    studentData[1][11] = rec2Wt * weights[10];

    let rec3Wt = 0;
    switch ($("#rec3-dropdown").val()) {
      case 'rec3strong':
        rec3Wt = rec3strong;
        break;
      case 'rec3average':
        rec3Wt = rec3average;
        break;
      case 'rec3weak':
        rec3Wt = rec3weak;
        break;
    }
    studentData[1][12] = rec3Wt * weights[11];
  }


  function updateMajor() {
    let majorWt = 0;
    switch ($("#major-dropdown").val()) {
      case 'engineering':
        majorWt = engineeringWt;
        break;
      case 'humanities':
        majorWt = humanitiesWt;
        break;
      case 'social_science':
        majorWt = socialscienceWt;
        break;
      case 'natural_science':
        majorWt = naturalscienceWt;
        break;
      case 'business':
        majorWt = businessWt;
        break;
    }
    studentData[1][6] = majorWt * weights[5];
  }

  function updateCountry() {
    let countryWt = 0;
    switch ($("#ctry-dropdown").val()) {
      case 'usa':
        countryWt = usaWt;
        break;
      case 'china':
        countryWt = chinaWt;
        break;
      case 'europe':
        countryWt = europeWt;
        break;
      case 'india':
        countryWt = indiaWt;
        break;
    }
    studentData[1][7] = countryWt * weights[6];
  }

  function updateInstitution() {
    let institutionWt = 0;
    switch ($("#institution-dropdown").val()) {
      case 'tier1':
        institutionWt = tier1Wt;
        break;
      case 'tier2':
        institutionWt = tier2Wt;
        break;
      case 'tier3':
        institutionWt = tier3Wt;
        break;
    }
    studentData[1][5] = institutionWt * weights[4];
  }

  function updateResult() {
    var totalScore = 0;
    for (var i = 1; i < studentData[1].length; i++) {
      totalScore += studentData[1][i];
    }
    // console.log(studentData[1]);
    // console.log(totalScore);

    // Loading animation
    $("#result").css('opacity', 1).animate({
      opacity: 0
    }, 0.1, function() {
      $(".loader").css('display', 'block');
      setTimeout(function() {
        $(".loader").css('display', 'none');
        if (totalScore >= high_threshold) {
          $("#result").text("Very likely to be accepted");
          $("#result").css("color", "green");
        } else if (totalScore >= mid_threshold && totalScore < high_threshold){
          $("#result").text("Somewhat likely to be accepted");
          $("#result").css("color", "LimeGreen ");
        } else if (totalScore >= low_threshold && totalScore < mid_threshold){
          $("#result").text("Somewhat likely to be rejected");
          $("#result").css("color", "crimson ");
        } else {
          $("#result").text("Very likely to be rejected");
          $("#result").css("color", "red");
        }
        $("#result").css('opacity', 0).animate({
          opacity: 1
        }, 200);
      }, 500);
    });

  }

});

var constant = -67.3342; //Constant term for linear regression

var negative_offset = 0.4228 + 4.596 + 2.2719 + 1.7803 + 100 * 1.7543 + 100 * 0.0382; // for offsetting the negative value, to be added to decision boundary (negative dummy variables + negative cont. variables)

var low_threshold = 50 + negative_offset - constant; // Threshold + negative offset
var mid_threshold = 150 + negative_offset - constant; // Threshold + negative offset
var high_threshold = 250 + negative_offset - constant; // Threshold + negative offset

// weights for categorical variables
var
  // Institution Rank weights
  tier1Wt = 7.0613,
  tier2Wt = 2.8189,
  tier3Wt = 0,
  // major weights
  engineeringWt = 3.4903,
  naturalscienceWt = 3.8394,
  humanitiesWt = 6.0665,
  socialscienceWt = 0,
  businessWt = 8.0240,
  // country weights
  usaWt = 15.8596,
  chinaWt = 4.3393,
  indiaWt = 0,
  europeWt = 0.4228,
  // recommendation weights
  rec1strong = 2.2719,
  rec1average = 4.596,
  rec1weak = 6.8679,
  rec2strong = 10.9469,
  rec2average = 5.8508,
  rec2weak = 0,
  rec3strong = 3.4996,
  rec3average = 5.2799,
  rec3weak = 1.7803

var weights = [
  0.1238 // GRE-verb
  , 0.8923 // GRE-quant
  , 0.3635 // GRE-write
  , 39.87 // GPA
  , 1 // Inst-Tier
  , 1 // Major
  , 1 // Country of origin
  , 5.1267 // Personal Statement
  , 1.1396 // Diversity score
  , 1 // Recommendation letter 1
  , 1 // Recommendation letter 2
  , 1 // Recommendation letter 3
  , 0.0382 // Mystery 1
  , 1.6931 // Mystery 2
  , 1.7543 // Mystery 3
];
// inital values
var vals = [
  12 // 0 GRE-verb - 130
  , 10 // 1 GRE-quant - 130
  , 3 // 2 GRE-write
  , 3.2 // 3 GPA
  , 1 // 4 Inst-Rank
  , 1 // 5 Major
  , 1 // 6 Country of origin
  , 3 // 7 Personal Statement - 1
  , 3 // 8 Diversity score - 1
  , 1 // 9 Recommendation letter 1
  , 1 // 10 Recommendation letter 2
  , 1 // 11 Recommendation letter 3
  , 50 // 12 Mystery 1
  , 50 // 13 Mystery 2
  , 50 // 14 Mystery 3
];


var studentData = [
  ['Total Score', 'GRE-Verbal', 'GRE-Quant', 'GRE-Writing', 'GPA', 'Institution-Rank', 'Major', 'Country', 'Personal Statement', 'Diversity Statement', 'Letter of Recommendation #1', 'Letter of Recommendation #2', 'Letter of Recommendation #3', 'Additional Attribute 1', 'Additional Attribute 2', 'Additional Attribute 3'],
  ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var barcolors = [
  '#af7ba0' // GRE-verb
  , '#c191b3' // GRE-quant
  , '#d3a7c7' // GRE-write
  , '#f08d39' // GPA
  , '#f7a55d' // Inst-Rank
  , '#9D7562' // Major
  , '#B99483' // Country of origin
  , '#df585c' // Personal Statement
  , '#fd9d9b' // Diversity score
  , '#5ca053' // Recommendation letter 1
  , '#74b869' // Recommendation letter 2
  , '#4d9794' // Recommendation letter 3
  , '#3cb7cc' // mystery1
  , '#aec7e8' // mystery2
  , '#1f77b4' // mystery3
];
