$(function() {
  $(".landingcontent").hide();

  $('#nextStepButton').click(function() {
    window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // if (confirm("Are you sure you are ready to move on to the next step? You will not be able to go back.")) {
    //   window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // } else {}
  });
});

// Load Google Charts first
google.charts.load('current', {
  packages: ['corechart', 'bar']
});
// Only starts running after google charts is loaded
google.charts.setOnLoadCallback(function() {

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
      $('[data-toggle="tooltip"]').tooltip();
      updateResult()
      drawStacked()
    }, 300);
  });

  var constant = -67.3342 ; //Constant term for linear regression

  var negative_offset= 0.4228 + 4.596 + 2.2719 + 1.7803 + 100*1.7543 + 100*0.0382 ;// for offsetting the negative value, to be added to decision boundary (negative dummy variables + negative cont. variables)

  // Original threshold (previous code)
  // var original_threshold = 42.962524 - 130 * weights[0] - 130 * weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[13] - weights[14] //threshold needs to minus weight of PS/ diversity?

  var low_threshold = 50 + negative_offset; // Threshold + negative offset

  var mid_threshold = 150 + negative_offset; // Threshold + negative offset

  var high_threshold = 250 + negative_offset; // Threshold + negative offset

  // weights for categorical variables
  var
    // Institution Rank weights
    tier1Wt = 7.0613,
    tier2Wt = 2.8189,
    tier3Wt = 0,
    // major weights
    engineeringWt = 	3.4903,
    naturalscienceWt = 3.8394,
    humanitiesWt = 6.0665,
    socialscienceWt = 0,
    businessWt = 	8.0240,
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
      12             // GRE-verb - 130
      ,10            // GRE-quant - 130
      ,3             // GRE-write
      ,3.2           // GPA
      ,1           // 1000 - Inst-Rank
      ,1.5594831748  // Major
      ,0             // Country of origin
      ,2             // Personal Statement - 1
      ,1             // Diversity score - 1
      ,0.87623872879 // Recommendation letter 1
      ,0.44907150816 // Recommendation letter 2
      ,0.27703027917 // Recommendation letter 3
      ,50             // Mystery 1
      ,50             // Mystery 2
      ,50             // Mystery 3
    ];


    var studentData = [
      ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Major', 'Country', 'PS', 'Diversity', 'Rec1', 'Rec2', 'Rec3', 'Additional1', 'Additional2', 'Additional3'],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (var i = 0; i < studentData[1].length-1; i++) {
      studentData[1][i + 1] = vals[i] * weights[i];
    }


  // var barcolors = ['#F01010', '#FB0074', '#C82CCC', '#006DFF', '#0089FF', '#90A0E0', '#00BF70', '#00BF70', '#009F00', '#009F00', '#5BE500', '#5BE500', '#FFA500', '#E05050', '#FF90B0']

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


  // $("#greV-input").change(function() {
  //   $("#greV-slider").slider("value", $("#greV-input").val() - 130);
  //   updateResult();
  // });
  // $("#greV-input").val(vals[0] + 130);


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
    slide: function(event, ui) {
      $("#greV-data").text((ui.value + 130))
      studentData[1][1] = ui.value * weights[0]; //greV
      drawStacked();
      updateResult();
	  
    },
    change: function(event, ui) {
      studentData[1][1] = ui.value * weights[0]; //greV
      drawStacked();
      updateResult();
    }
  });
  $("#greV-slider .ui-slider-range").css('background', barcolors[0]);

  // $("#greQ-input").change(function() {
  //   $("#greQ-slider").slider("value", $("#greQ-input").val() - 130);
  //   updateResult();
  // });
  // $("#greQ-input").val(vals[1] + 130);


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
    slide: function(event, ui) {
      $("#greQ-data").text((ui.value + 130))
    },
    change: function(event, ui) {
      studentData[1][2] = ui.value * weights[1]; //greQ
      drawStacked();
      updateResult();
    }
  });
  $("#greQ-slider .ui-slider-range").css('background', barcolors[1]);

  // $("#greW-input").change(function() {
  //   $("#greW-slider").slider("value", $("#greW-input").val());
  //   updateResult();
  // });
  // $("#greW-input").val(vals[2]);

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
    slide: function(event, ui) {
      $("#greW-data").text(ui.value)
    },
    change: function(event, ui) {
      studentData[1][3] = ui.value * weights[2]; //greW
      drawStacked();
      updateResult();
    }
  });
  $("#greW-slider .ui-slider-range").css('background', barcolors[2]);

  // $("#gpa-input").change(function() {
  //   $("#gpa-slider").slider("value", $("#gpa-input").val());
  //   updateResult();
  // });
  // $("#gpa-input").val(vals[3]);

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
    slide: function(event, ui) {
      $("#gpa-data").text(ui.value)
    },
    change: function(event, ui) {
      studentData[1][4] = ui.value * weights[3];
      //      adjustedData[3] = (ui.value-studentData[2][4])*gpaWt
      drawStacked();
      updateResult();
    }
  });
  $("#gpa-slider .ui-slider-range").css('background', barcolors[3]);

  // $("#rank-input").change(function() {
  //   $("#rank-slider").slider("value", 1000 - $("#rank-input").val());
  //   updateResult();
  // });
  // $("#rank-input").val(1000 - vals[4])

  $("#institution-dropdown").selectmenu({
    change: function(event, ui) {
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
      drawStacked();
      updateResult();
    }
  });


  $("#major-dropdown").selectmenu({
    change: function(event, ui) {
      let majorWt = 0;
      switch ($("#major-dropdown").val()) {
        case 'engineering':
          majorWt = engineeringWt;
          break;
        case 'humanities':
          majorWt = humanitiesWt;
          break;
        case 'socialscience':
          majorWt = socialscienceWt;
          break;
        case 'naturalscience':
          majorWt = naturalscienceWt;
          break;
        case 'business':
          majorWt = businessWt;
          break;
      }
      studentData[1][6] = majorWt * weights[5];
      drawStacked();
      updateResult();
    }
  });

  $("#ctry-dropdown").selectmenu({
    change: function(event, ui) {
      let countryWt = 0;
      switch ($("#ctry-dropdown").val()) {
        case 'usa':
          countryWt = usaWt;
          break;
        case 'canada':
          countryWt = canadaWt;
          break;
        case 'asia':
          countryWt = asiaWt;
          break;
        case 'euro':
          countryWt = europeWt;
          break;
        case 'other':
          countryWt = elseWt;
          break;
      }
      studentData[1][7] = countryWt * weights[6];
      drawStacked();
      updateResult();
    }
  });

  $("#rec1-dropdown").selectmenu({
    change: function(event, ui) {
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
      drawStacked();
      updateResult();
    }
  });

  $("#rec2-dropdown").selectmenu({
    change: function(event, ui) {
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
      drawStacked();
      updateResult();
    }
  });

  $("#rec3-dropdown").selectmenu({
    change: function(event, ui) {
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
      drawStacked();
      updateResult();
    }
  });

  // $("#rec1rank-input").change(function() {
  //   $("#rec1rank-slider").slider("value", 1000 - $("#rec1rank-input").val());
  //   updateResult();
  // });
  // $("#rec1rank-input").val(1000 - vals[8]);

  $("#mystery1-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#mystery1-data").text((ui.value))
    },
    range: "min",
    min: 0,
    max: 100,
    value: vals[11],
    step: 1,
    change: function(event, ui) {
      studentData[1][13] = (100-ui.value) * weights[12];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#mystery1-slider .ui-slider-range").css('background', barcolors[12]);

  // $("#rec2rank-input").change(function() {
  //   $("#rec2rank-slider").slider("value", 1000 - $("#rec2rank-input").val());
  //   updateResult();
  // });
  // $("#rec2rank-input").val(1000 - vals[10]);

  $("#mystery2-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#mystery2-data").text((ui.value))
    },
    range: "min",
    min: 0,
    max: 100,
    value: vals[11],
    step: 1,
    change: function(event, ui) {
      studentData[1][14] = ui.value * weights[13];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#mystery2-slider .ui-slider-range").css('background', barcolors[13]);



  // $("#rec3rank-input").change(function() {
  //   $("#rec3rank-slider").slider("value", 1000 - $("#rec3rank-input").val());
  //   updateResult();
  // });
  // $("#rec3rank-input").val(1000 - vals[12]);

  $("#mystery3-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#mystery3-data").text((ui.value))
    },
    range: "min",
    min: 0,
    max: 100,
    value: vals[12],
    step: 1,
    change: function(event, ui) {
      studentData[1][15] = (100-ui.value) * weights[14];
      drawStacked();
      updateResult();
    }
  });
  $("#mystery3-slider .ui-slider-range").css('background', barcolors[14]);

  // $("#ps-input").change(function() {
  //   $("#ps-slider").slider("value", $("#ps-input").val() - 1);
  //   updateResult();
  // });
  // $("#ps-input").val(vals[13] + 1)


  $("#ps-slider").slider({
    // options
    range: "min",
    value: vals[13],
    min: 0,
    max: 4,
    step: 0.5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#ps-data").text((ui.value + 1))
    },
    change: function(event, ui) {
      studentData[1][8] = ui.value * weights[7];
      drawStacked();
      updateResult();
    }
  });
  $("#ps-slider .ui-slider-range").css('background', barcolors[7]);

  // $("#diver-input").change(function() {
  //   $("#diver-slider").slider("value", $("#diver-input").val() - 1);
  //   updateResult();
  // });
  // $("#diver-input").val(vals[14] + 1);

  $("#diver-slider").slider({
    // options
    range: "min",
    value: vals[14],
    min: 0,
    max: 4,
    step: 0.5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#diver-data").text((ui.value + 1))
    },
    change: function(event, ui) {
      studentData[1][9] = ui.value * weights[8];
      drawStacked();
      updateResult();
    }
  });
  $("#diver-slider .ui-slider-range").css('background', barcolors[8]);




  function updateResult() {
    // var totalScore = studentData[1][1] + studentData[1][2] + studentData[1][3] + studentData[1][4] + studentData[1][5] + studentData[1][6] + studentData[1][7] + studentData[1][8] + studentData[1][9] + studentData[1][10] + studentData[1][11];
    var totalScore = 0;
    for (var i = 1; i < studentData[1].length; i++) {
      totalScore += studentData[1][i];
    }
    console.log(totalScore);

    // Loading animation
    $("#result").css('opacity', 1).animate({
      opacity: 0
    }, 0.1, function() {
      $(".loader").css('visibility', 'visible');
      setTimeout(function() {
        $(".loader").css('visibility', 'hidden');
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

  function drawStacked() {

    var donutRangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'GPA'
      }
    });

    var dataTable = $.extend(true, [], studentData);
    var numFeatures = dataTable[0].length;
    for (var i = 0; i < numFeatures; i++) {
      dataTable[0].splice(i * 2 + 1, 0, {
        type: 'string',
        role: 'tooltip'
      })
      dataTable[1].splice(i * 2 + 1, 0, dataTable[0][i * 2])
    }
    var data = google.visualization.arrayToDataTable(dataTable);

    var options = {
      title: 'Admission Result',
      chartArea: {
        width: '70%'
      },
      isStacked: true,
      legend: {
        position: 'none'
      },
      hAxis: {
        title: '',
        minValue: 0,
        maxValue: 400 + negative_offset,
        gridlines: {
          color: "black",
        },
        ticks: [{
          v: low_threshold,
          f: ""
        }, {
          v: mid_threshold,
          f: "Decision\nboundary"
        }, {
          v: high_threshold,
          f: ""
        }]
      },
      vAxis: {
        title: ''
      },
      colors: barcolors
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

});
