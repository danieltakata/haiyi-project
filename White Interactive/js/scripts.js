// Load Google Charts first

google.charts.load('current', {
  packages: ['corechart', 'bar']
});
// Only starts running after google charts is loaded
google.charts.setOnLoadCallback(function(){

  // weights
  var greVerWt = 0.1376453793,
    greQuanWt = 0.07802271239,
    greWriWt = 0.3124308781,
    gpaWt = 1.456150174,
    rankWt = 0.003788262564,
    // major weights
    csceWt = 1.025214391,
    stemWt = -0.8304791985,
    otherWt = -0.1947351929,
    // country weights
    usaWt = -0.5237106007,
    canadaWt = 0.01552394752,
    asiaWt = 0.5767599123,
    euroWt = -0.0685732591,
    elseWt = 0,
    //
    psWt = 0.8300898821,
    diverWt = 0.4184694261,
    // recommendation weights
    rec1top5Wt = 1.025707346,
    rec1top10Wt = 0.3958125738,
    rec1top20Wt = -0.5793790725,
    rec1top50Wt = -0.8421408468,
    rec2top5Wt = 0.9066696731,
    rec2top10Wt = 0.2192430001,
    rec2top20Wt = -0.8250712596,
    rec2top50Wt = -0.3008414136,
    rec3top5Wt = -0.07554566214,
    rec3top10Wt = 0.6270885095,
    rec3top20Wt = 0.2935430003,
    rec3top50Wt = -0.8450858476,
    rec1instWt = -0.006982607425,
    rec2instWt = -1.58e-03,
    rec3instWt = -1.58e-03
  // default values (for sliders)
  var greVerVal = 150,
    greQuanVal = 150,
    greWriVal = 3,
    gpaVal = 3.6,
    rankVal = 200,
    rec1instVal = 500,
    rec2instVal = 500,
    rec3instVal = 500,
    psVal = 3,
    diverVal = 3;

  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Major', 
    'Country', 'Rec1', 'Rec2', 'Rec3', 'Rec1-inst', 'Rec2-inst', 'Rec3-inst', 
    'PS', 'Diversity'],
    ['', (greVerVal-130) * greVerWt, (greQuanVal-130) * greQuanWt, greWriVal * greWriWt, gpaVal * gpaWt, rankVal * rankWt, csceWt,
      usaWt, rec1top5Wt, rec2top5Wt, rec3top5Wt, rec1instVal * rec1instWt, rec2instVal * rec2instWt, rec3instVal * rec3instWt, 
      psVal * psWt, diverVal * diverWt
    ]
    //    ,['', 152.33, 164.75, 3.715, 3.61, 173.08, 0.53, 64.5, 64.5, 64.5, 3.54, 3.58] //average values
  ]

  for (var i = 1; i < studentData.length; i ++){
    studentData[1][i] = studentData[1][i]/33.66839414*100
  }

  /*  var importantIndex = 4
    var dummy = 999
    var adjustedData = [(greVerVal-studentData[2][1])*greVerWt, (greQuanVal-studentData[2][2])*greQuanWt,
                        (greWriVal-studentData[2][3])*greWriWt, (gpaVal-studentData[2][4])*gpaWt,
                        (rankVal-studentData[2][5])*rankWt, (degVal-studentData[2][6])*degWt,
  					  (rec1-studentData[2][7])*recWt, (rec2-studentData[2][8])*recWt,
  					  (rec3-studentData[2][9])*recWt, (psVal-studentData[2][10])*psWt]
    var i */

  $("#greV-input").change(function() {
    $("#greV-slider").slider("value", $("#greV-input").val());
    updateResult();
  });
  $("#greV-input").val(greVerVal);


  $("#greV-slider").slider({
    // options
    range: "min",
    value: greVerVal,
    min: 130,
    max: 170,
    step: 1,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#greV-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][1] = (ui.value-130) * greVerWt /33.66839414*100;
      //      adjustedData[0] = (ui.value-studentData[2][1])*greVerWt
      drawStacked();
      updateResult();
    }
  });
  $("#greV-slider .ui-slider-range").css('background', '#CC0000');

  $("#greQ-input").change(function() {
    $("#greQ-slider").slider("value", $("#greQ-input").val());
    updateResult();
  });
  $("#greQ-input").val(greQuanVal);


  $("#greQ-slider").slider({
    // options
    range: "min",
    value: greQuanVal,
    min: 130,
    max: 170,
    step: 1,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#greQ-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][2] = (ui.value-130) * greQuanWt /33.66839414*100;
      //    adjustedData[1] = (ui.value-studentData[2][2])*greQuanWt
      drawStacked();
      updateResult();
    }
  });
  $("#greQ-slider .ui-slider-range").css('background', '#FF0000');

  $("#greW-input").change(function() {
    $("#greW-slider").slider("value", $("#greW-input").val());
    updateResult();
  });
  $("#greW-input").val(greWriVal);

  $("#greW-input").change(function() {
    $("#greW-slider").slider("value", $("#greW-input").val());
    updateResult();
  });

  $("#greW-slider").slider({
    // options
    range: "min",
    value: greWriVal,
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
      studentData[1][3] = ui.value * greWriWt /33.66839414*100;
      //  adjustedData[2] = (ui.value-studentData[2][3])*greWriWt
      drawStacked();
      updateResult();
    }
  });
  $("#greW-slider .ui-slider-range").css('background', '#FF9999');

  $("#greW-slider").slider({
    // options
    range: "min",
    value: 3,
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
      studentData[1][3] = ui.value * greWriWt /33.66839414*100;
      //adjustedData[2] = (ui.value - studentData[1][3]) * greWriWt
      drawStacked();
      updateResult();
    }
  });
  $("#gpa-input").val(gpaVal);


  $("#gpa-slider").slider({
    // options
    range: "min",
    value: gpaVal,
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
      studentData[1][4] = ui.value * gpaWt /33.66839414*100;
      //      adjustedData[3] = (ui.value-studentData[2][4])*gpaWt
      drawStacked();
      updateResult();
    }
  });
  $("#gpa-slider .ui-slider-range").css('background', '#5BE500');

  $("#rank-input").change(function() {
    $("#rank-slider").slider("value", 1000 - $("#rank-input").val());
    updateResult();
  });
  $("#rank-input").val(rankVal)

  $("#rank-slider").slider({
    // options
    range: "min",
    value: 1000 - rankVal,
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
      studentData[1][5] = ui.value * rankWt /33.66839414*100;
      //      adjustedData[4] = (ui.value-studentData[2][5])*rankWt;
      drawStacked();
      updateResult();
    }
  });
  $("#rank-slider .ui-slider-range").css('background', '#62D119');

  $("#major-dropdown").selectmenu({
    change: function(event, ui) {
      switch ($("#major-dropdown").val()){
        case 'csce':
        studentData[1][6] = csceWt;
        break;
        case 'stem':
        studentData[1][6] = stemWt;
        break;
        case 'other':
        studentData[1][6] = otherWt;
        break;
      }
      studentData[1][6] = studentData[1][6]/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });

  $("#ctry-dropdown").selectmenu({
    change: function(event, ui) {
      switch ($("#ctry-dropdown").val()){
        case 'usa':
        studentData[1][7] = usaWt;
        break;
        case 'canada':
        studentData[1][7] = canadaWt;
        break;
        case 'asia':
        studentData[1][7] = asiaWt;
        break;
        case 'euro':
        studentData[1][7] = euroWt;
        break;
        case 'other':
        studentData[1][7] = elseWt;
        break;
      }      
      studentData[1][7] = studentData[1][7]/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });

  $("#rec1-dropdown").selectmenu({
    change: function(event, ui) {
      switch ($("#rec1-dropdown").val()){
        case 'rec1top5Wt':
        studentData[1][8] = rec1top5Wt;
        break;
        case 'rec1top10Wt':
        studentData[1][8] = rec1top10Wt;
        break;
        case 'rec1top20Wt':
        studentData[1][8] = rec1top20Wt;
        break;
        case 'rec1top50Wt':
        studentData[1][8] = rec1top50Wt;
        break;
      }      
      studentData[1][8] = studentData[1][8]/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });

  $("#rec2-dropdown").selectmenu({
    change: function(event, ui) {
      switch ($("#rec2-dropdown").val()){
        case 'rec2top5Wt':
        studentData[1][9] = rec2top5Wt;
        break;
        case 'rec2top10Wt':
        studentData[1][9] = rec2top10Wt;
        break;
        case 'rec2top20Wt':
        studentData[1][9] = rec2top20Wt;
        break;
        case 'rec2top50Wt':
        studentData[1][9] = rec2top50Wt;
        break;
      }      
      studentData[1][9] = studentData[1][9]/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });

  $("#rec3-dropdown").selectmenu({
    change: function(event, ui) {
      switch ($("#rec3-dropdown").val()){
        case 'rec3top5Wt':
        studentData[1][10] = rec3top5Wt;
        break;
        case 'rec3top10Wt':
        studentData[1][10] = rec3top10Wt;
        break;
        case 'rec3top20Wt':
        studentData[1][10] = rec3top20Wt;
        break;
        case 'rec3top50Wt':
        studentData[1][10] = rec3top50Wt;
        break;
      }      
      studentData[1][10] = studentData[1][10]/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });

  $("#rec1rank-input").change(function() {
    $("#rec1rank-slider").slider("value", $("#rec1rank-input").val());
    updateResult();
  });
  $("#rec1rank-input").val(rec1instVal);

  $("#rec1rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec1rank-input").val(ui.value)
    },
    range: "min",
    min: 1,
    max: 1000,
    value: rec1instVal,
    step: 1,
    change: function(event, ui) {
      studentData[1][11] = ui.value * rec1instWt/33.66839414*100;
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      drawStacked();
      updateResult();
    }
  });
  $("#rec1rank-slider .ui-slider-range").css('background', '#8900E5');

  $("#rec2rank-input").change(function() {
    $("#rec2rank-slider").slider("value", $("#rec2rank-input").val());
    updateResult();
  });
  $("#rec2rank-input").val(rec2instVal)

  $("#rec2rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec2rank-input").val(ui.value)
    },
    range: "min",
    min: 1,
    max: 1000,
    value: rec2instVal,
    step: 1,
    change: function(event, ui) {
      studentData[1][12] = ui.value * recWt/33.66839414*100;
      //  adjustedData[7] = (ui.value-studentData[2][8])*recWt;
      drawStacked();
      updateResult();
    }
  });
  $("#rec2rank-slider .ui-slider-range").css('background', '#AD33FF');

  $("#rec3rank-input").change(function() {
    $("#rec3rank-slider").slider("value", $("#rec3rank-input").val());
    updateResult();
  });
  $("#rec3rank-input").val(rec3instVal);

  $("#rec3rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec3rank-input").val(ui.value)
    },
    range: "min",
    min: 1,
    max: 1000,
    value: rec3instVal,
    step: 1,
    change: function(event, ui) {
      studentData[1][13] = ui.value * recWt/33.66839414*100;
      //  adjustedData[8] = (ui.value-studentData[2][9])*recWt;
      drawStacked();
      updateResult();
    }
  });
  $("#rec3rank-slider .ui-slider-range").css('background', '#D699FF');

  $("#ps-input").change(function() {
    $("#ps-slider").slider("value", $("#ps-input").val());
    updateResult();
  });
  $("#ps-input").val(psVal)


  $("#ps-slider").slider({
    // options
    range: "min",
    value: psVal,
    min: 1,
    max: 5,
    step: 0.5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#ps-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][14] = ui.value * psWt/33.66839414*100;
      //  adjustedData[9] = (ui.value-studentData[2][10])*psWt
      drawStacked();
      updateResult();
    }
  });
  $("#ps-slider .ui-slider-range").css('background', '#00F7FF');

  $("#diver-input").change(function() {
    $("#diver-slider").slider("value", $("#diver-input").val());
    updateResult();
  });
  $("#diver-input").val(diverVal);

  $("#diver-slider").slider({
    // options
    range: "min",
    value: diverVal,
    min: 1,
    max: 5,
    step: 0.5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#diver-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][15] = ui.value * diverWt/33.66839414*100;
      drawStacked();
      updateResult();
    }
  });
  $("#diver-slider .ui-slider-range").css('background', '#99FBFF');



  function updateResult() {
    //	$("#a" + studentData[0][importantIndex]).val( "" );
    var rawScore = (studentData[1][1] + studentData[1][2] + studentData[1][3] + studentData[1][4] + studentData[1][5] + studentData[1][6] +
      studentData[1][7] + studentData[1][8] + studentData[1][9] + studentData[1][10] + studentData[1][11] + studentData[1][12] +
      studentData[1][13] + studentData[1][14] + studentData[1][15] - 17.08976608)
    if ((rawScore + 26.1499034)/ 33.66839414 * 100 >= 77.66899512) {
      $("#result").text("Yay, accepted!")
      //document.getElementById("lookat").style.color = "white";
      $("#result").css("color", "green")
    } else {
      /* 	  for (i=0; i < adjustedData.length; i++){
      			if (dummy > adjustedData[i]) {
      				dummy = adjustedData[i];
      				importantIndex = i+1;
      			}
      		}
      		dummy = 9999;
      		$("#a" + studentData[0][importantIndex]).val( "Most important!" ); */
      document.getElementById("result").innerHTML = "Sorry, rejected...";
      //	    document.getElementById("lookat").style.color = "black";
      $("#result").css("color", "red")
    }
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
        maxValue: 100-26.90991819,
        gridlines: {
          color: "black",
        },
        ticks: [{
          v: 77.66899512-26.90991819,
          f: "Acceptance Threshold"
        }, {
          v: 100,
          f: ""
        }]
      },
      vAxis: {
        title: ''
      },
      colors: ['#CC0000', '#FF0000', '#FF9999', '#5BE500', '#62D119', '#A8E57F', '#8900E5', '#AD33FF', '#D699FF', '#00F7FF', '#99FBFF']
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
});
