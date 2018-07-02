$(function() {
  $(".landingcontent").hide();
});

// Load Google Charts first
google.charts.load('current', {
  packages: ['corechart', 'bar']
});
// Only starts running after google charts is loaded
google.charts.setOnLoadCallback(function(){

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
            updateResult()
            drawStacked()
        }, 300);
    });


  // weights
  var weights = [
	0.114911184251    // GRE-verb
    ,0.0880320310069  // GRE-quant
    ,0.2926697271     // GRE-write
    ,1.584509831      // GPA
    ,0.00294640714041 // Inst-Rank
    ,1                // Major
    ,1                // Recommendation letter 1
	,0.00643092126893 // Rec1 inst
    ,1                // Recommendation letter 2
	,0.00163152813703 // Rec2 inst
    ,1                // Recommendation letter 3
	,0.00109465199226 // Rec3 inst
    ,0.756277254266   // Personal Statement
    ,0.317935719456   // Diversity score
	,1                // Country of origin
	];
  // inital values
  var vals = [
    5              // GRE-verb - 130
    ,8             // GRE-quant - 130
    ,2             // GRE-write
    ,2.2           // GPA
    ,69            // 1000 - Inst-Rank
    ,1.5594831748  // Major
    ,2.00627220247 // Recommendation letter 1
	,156           // 1000 - Rec1 inst rank
    ,1.52087808051 // Recommendation letter 2
	,89            // 1000 - Rec2 inst rank
    ,1.51416715224 // Recommendation letter 3
	,212           // 1000 - Rec3 inst rank
    ,1             // Personal Statement - 1
    ,1             // Diversity score - 1
	,0             // Country of origin
	];

  var studentData = [
    ['Total Score'
	, 'GRE-verb'
	, 'GRE-quant'
	, 'GRE-write'
	, 'GPA'
	, 'Inst-Rank'
	, 'Major'
	, 'Rec1'
	, 'Rec1 Rank'
	, 'Rec2'
	, 'Rec2 Rank'
	, 'Rec3'
	, 'Rec3 Rank'
	, 'PS'
	, 'Diversity'
	, 'Country'
	],
    ['',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  for ( var i=0; i<15; i++) {
	  studentData[1][i+1] = vals[i]*weights[i];
  }

  var threshold = 42.962524 - 130*weights[0] - 130*weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[12] - weights[13]

  var barcolors = ['#F01010', '#FB0074', '#C82CCC', '#006DFF', '#0089FF', '#90A0E0', '#00BF70', '#00BF70', '#009F00', '#009F00', '#5BE500', '#5BE500', '#FFA500', '#E05050', '#FF90B0']

  /*  var importantIndex = 4
    var dummy = 999
    var adjustedData = [(greVerVal-studentData[2][1])*greVerWt, (greQuanVal-studentData[2][2])*greQuanWt,
                        (greWriVal-studentData[2][3])*greWriWt, (gpaVal-studentData[2][4])*gpaWt,
                        (rankVal-studentData[2][5])*rankWt, (degVal-studentData[2][6])*degWt,
  					  (rec1-studentData[2][7])*recWt, (rec2-studentData[2][8])*recWt,
  					  (rec3-studentData[2][9])*recWt, (psVal-studentData[2][10])*psWt]
    var i */

  $("#greV-input").change(function() {
    $("#greV-slider").slider("value", $("#greV-input").val() - 130);
    updateResult();
  });
  $("#greV-input").val(vals[0] + 130);


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
      $("#greV-input").val(ui.value + 130)
    },
    change: function(event, ui) {
      studentData[1][1] = ui.value * weights[0];
      drawStacked();
      updateResult();
    }
  });
  $("#greV-slider .ui-slider-range").css('background', barcolors[0]);

  $("#greQ-input").change(function() {
    $("#greQ-slider").slider("value", $("#greQ-input").val() - 130);
    updateResult();
  });
  $("#greQ-input").val(vals[1] + 130);


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
      $("#greQ-input").val(ui.value + 130)
    },
    change: function(event, ui) {
      studentData[1][2] = ui.value * weights[1];
      //    adjustedData[1] = (ui.value-studentData[2][2])*greQuanWt
      drawStacked();
      updateResult();
    }
  });
  $("#greQ-slider .ui-slider-range").css('background', barcolors[1]);

  $("#greW-input").change(function() {
    $("#greW-slider").slider("value", $("#greW-input").val());
    updateResult();
  });
  $("#greW-input").val(vals[2]);

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
      $("#greW-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][3] = ui.value * weights[2];
      //  adjustedData[2] = (ui.value-studentData[2][3])*greWriWt
      drawStacked();
      updateResult();
    }
  });
  $("#greW-slider .ui-slider-range").css('background', barcolors[2]);

  $("#gpa-input").change(function() {
    $("#gpa-slider").slider("value", $("#gpa-input").val());
    updateResult();
  });
  $("#gpa-input").val(vals[3]);

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
      $("#gpa-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][4] = ui.value * weights[3];
      //      adjustedData[3] = (ui.value-studentData[2][4])*gpaWt
      drawStacked();
      updateResult();
    }
  });
  $("#gpa-slider .ui-slider-range").css('background', barcolors[3]);

  $("#rank-input").change(function() {
    $("#rank-slider").slider("value", 1000 - $("#rank-input").val());
    updateResult();
  });
  $("#rank-input").val(1000 - vals[4])

  $("#rank-slider").slider({
    // options
    range: "min",
    value: vals[4],
    min: 0,
    max: 999,
    step: 1,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rank-input").val(1000 - ui.value)
    },
    change: function(event, ui) {
      studentData[1][5] = ui.value * weights[4];
      //      adjustedData[4] = (ui.value-studentData[2][5])*rankWt;
      drawStacked();
      updateResult();
    }
  });
  $("#rank-slider .ui-slider-range").css('background', barcolors[4]);

  $("#maj-dropdown").selectmenu({
    change: function(event, ui) {
      studentData[1][6] = $("#maj-dropdown").val() * weights[5];
      drawStacked();
      updateResult();
    }
  });

  $("#rec1-dropdown").selectmenu({
    change: function(event, ui) {
      studentData[1][7] = $("#rec1-dropdown").val() * weights[6];
      drawStacked();
      updateResult();
    }
  });

  $("#rec1rank-input").change(function() {
    $("#rec1rank-slider").slider("value", 1000 - $("#rec1rank-input").val());
    updateResult();
  });
  $("#rec1rank-input").val(1000 - vals[7]);

  $("#rec1rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec1rank-input").val(1000 - ui.value)
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[7],
    step: 1,
    change: function(event, ui) {
      studentData[1][8] = ui.value * weights[7];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#rec1rank-slider .ui-slider-range").css('background', barcolors[7]);

  $("#rec2-dropdown").selectmenu({
    change: function(event, ui) {
      studentData[1][9] = $("#rec2-dropdown").val() * weights[8];
      drawStacked();
      updateResult();
    }
  });

  $("#rec2rank-input").change(function() {
    $("#rec2rank-slider").slider("value", 1000 - $("#rec2rank-input").val());
    updateResult();
  });
  $("#rec2rank-input").val(1000 - vals[9]);

  $("#rec2rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec2rank-input").val(1000 - ui.value)
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[9],
    step: 1,
    change: function(event, ui) {
      studentData[1][10] = ui.value * weights[9];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#rec2rank-slider .ui-slider-range").css('background', barcolors[9]);

  $("#rec3-dropdown").selectmenu({
    change: function(event, ui) {
      studentData[1][11] = $("#rec3-dropdown").val() * weights[10];
      drawStacked();
      updateResult();
    }
  });

  $("#rec3rank-input").change(function() {
    $("#rec3rank-slider").slider("value", 1000 - $("#rec3rank-input").val());
    updateResult();
  });
  $("#rec3rank-input").val(1000 - vals[11]);

  $("#rec3rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec3rank-input").val(1000 - ui.value)
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[11],
    step: 1,
    change: function(event, ui) {
      studentData[1][12] = ui.value * weights[11];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#rec3rank-slider .ui-slider-range").css('background', barcolors[11]);

  $("#ps-input").change(function() {
    $("#ps-slider").slider("value", $("#ps-input").val() - 1);
    updateResult();
  });
  $("#ps-input").val(vals[12] + 1)


  $("#ps-slider").slider({
    // options
    range: "min",
    value: vals[12],
    min: 0,
    max: 4,
    step: 0.5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#ps-input").val(ui.value + 1)
    },
    change: function(event, ui) {
      studentData[1][13] = ui.value * weights[12];
      //  adjustedData[9] = (ui.value-studentData[2][10])*psWt
      drawStacked();
      updateResult();
    }
  });
  $("#ps-slider .ui-slider-range").css('background', barcolors[12]);

  $("#diver-input").change(function() {
    $("#diver-slider").slider("value", $("#diver-input").val() - 1);
    updateResult();
  });
  $("#diver-input").val(vals[13] + 1);

  $("#diver-slider").slider({
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
      $("#diver-input").val(ui.value + 1)
    },
    change: function(event, ui) {
      studentData[1][14] = ui.value * weights[13];
      drawStacked();
      updateResult();
    }
  });
  $("#diver-slider .ui-slider-range").css('background', barcolors[13]);

  $("#country-dropdown").selectmenu({
    change: function(event, ui) {
      studentData[1][15] = $("#country-dropdown").val() * weights[14];
      drawStacked();
      updateResult();
    }
  });


  function updateResult() {
    var totalScore = studentData[1][1] + studentData[1][2] + studentData[1][3] + studentData[1][4] + studentData[1][5] +
	  studentData[1][6] + studentData[1][7] + studentData[1][8] + studentData[1][9] + studentData[1][10] +
	  studentData[1][11] + studentData[1][12] + studentData[1][13] + studentData[1][14];


    // Loading animation
    $(".result").css('opacity',1).animate({opacity:0}
      , 200, function () {
        $(".loader").css('visibility','visible');
        setTimeout(function() {
          $(".loader").css('visibility','hidden');
          if (totalScore >= threshold) {
            $("#result").text("Admission accepted.");
            $("#result").css("color", "green");
          } else {
            $("#result").text("Admission rejected.");
            $("#result").css("color", "red");
          }
          $(".result").css('opacity',0).animate({opacity:1}, 200);
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

    var data = google.visualization.arrayToDataTable(studentData);

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
        maxValue: 40.236724062345,
        gridlines: {
          color: "black",
        },
        ticks: [{
          v: threshold,
          f: "Acceptance Threshold"
        }, {
          v: 40.236724062345,
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
