$(function() {
  $('#nextStepButton').click(function() {
    window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
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
      // $("#main-page").animateRotate(0, 0);
      // $("#main-page").css("height", "25px");
      // $("#main-page").css("width", "375px");
      $("#main-page").fadeIn();
      $(".maincontent").fadeIn(300);
      $('[data-toggle="tooltip"]').tooltip();
      updateResult()
    }, 300);
  });

  // constant term
  var SVM_constant = -17.08976608
  // weights
  var greVerWt = 0.1376453793,
    greQuanWt = 0.07802271239,
    greWriWt = 0.3124308781,
    gpaWt = 1.456150174,
    rankWt = 0.003788262564,
    // major weights
    csceWt = 1.5594831748,
    stemWt = 0.30693782874,
    otherWt = 0,
    // country weights
    usaWt = 0,
    asiaWt = 1.03588023043,
    euroWt = 0.48266027481,
    elseWt = 0.513354407198,
    //
    psWt = 0.8300898821,
    diverWt = 0.4184694261,
    // recommendation weights
    rec1top5Wt = 2.00627220247,
    rec1top10Wt = 1.11329686474,
    rec1top20Wt = 0.87623872879,
    rec1top50Wt = 0,
    rec2top5Wt = 1.52087808051,
    rec2top10Wt = 1.00101344554,
    rec2top20Wt = 0.44907150816,
    rec2top50Wt = 0,
    rec3top5Wt = 1.51416715224,
    rec3top10Wt = 0.93864978431,
    rec3top20Wt = 0.27703027917,
    rec3top50Wt = 0,

    rec1instWt = -0.006982607425,
    rec2instWt = -1.58e-03,
    rec3instWt = -1.58e-03
  // default values (for sliders)
  var greVerVal = 170,
    greQuanVal = 170,
    greWriVal = 3,
    gpaVal = 3.6,
    rankVal = 200,
    rec1instVal = 500,
    rec2instVal = 500,
    rec3instVal = 500,
    psVal = 3,
    diverVal = 3;

  var weights = [
    0.114911184251 // GRE-verb
    , 0.0880320310069 // GRE-quant
    , 0.2926697271 // GRE-write
    , 1.584509831 // GPA
    , 0.00294640714041 // Inst-Rank
    , 1 // Major
    , 1 // Country of origin
    , 1 // Recommendation letter 1
    , 0.00643092126893 // Rec1 inst
    , 1 // Recommendation letter 2
    , 0.00163152813703 // Rec2 inst
    , 1 // Recommendation letter 3
    , 0.00109465199226 // Rec3 inst
    , 0.756277254266 // Personal Statement
    , 0.317935719456 // Diversity score
  ];
  // inital values
  var vals = [
    12             // GRE-verb - 130
    ,10            // GRE-quant - 130
    ,3             // GRE-write
    ,3.2           // GPA
    ,274           // 1000 - Inst-Rank
    ,1.5594831748  // Major
    ,0             // Country of origin
    ,0.87623872879 // Recommendation letter 1
    ,0             // 1000 - Rec1 inst rank
    ,0.44907150816 // Recommendation letter 2
    ,0             // 1000 - Rec2 inst rank
    ,0.27703027917 // Recommendation letter 3
    ,0             // 1000 - Rec3 inst rank
    ,2             // Personal Statement - 1
    ,1             // Diversity score - 1
  ];


  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Major', 'Country', 'Rec1', 'Rec1 Rank', 'Rec2', 'Rec2 Rank', 'Rec3', 'Rec3 Rank', 'PS', 'Diversity'],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  for (var i = 0; i < studentData[1].length-1; i++) {
    studentData[1][i + 1] = vals[i] * weights[i];
  }

  var threshold = 42.962524 - 130 * weights[0] - 130 * weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[13] - weights[14] //threshold needs to minus weight of PS/ diversity?

  var barcolors = ['#F01010', '#FB0074', '#C82CCC', '#006DFF', '#0089FF', '#90A0E0', '#00BF70', '#00BF70', '#009F00', '#009F00', '#5BE500', '#5BE500', '#FFA500', '#E05050', '#FF90B0']



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
    },
    change: function(event, ui) {
      studentData[1][1] = ui.value * weights[0]; //greV
      updateResult();
    }
  });

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
      updateResult();
    }
  });

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
      $("#greW-data").text((ui.value))
    },
    change: function(event, ui) {
      studentData[1][3] = ui.value * weights[2]; //greW
      updateResult();
    }
  });

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
      updateResult();
    }
  });

  // $("#rank-input").change(function() {
  //   $("#rank-slider").slider("value", 1000 - $("#rank-input").val());
  //   updateResult();
  // });
  // $("#rank-input").val(1000 - vals[4])

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
      $("#rank-data").text((1000 - ui.value))
    },
    change: function(event, ui) {
      studentData[1][5] = ui.value * weights[4];
      //      adjustedData[4] = (ui.value-studentData[2][5])*rankWt;
      updateResult();
    }
  });


  $("#major-dropdown").selectmenu({
    change: function(event, ui) {
      let majorWt = 0;
      switch ($("#major-dropdown").val()) {
        case 'csce':
          majorWt = csceWt;
          break;
        case 'stem':
          majorWt = stemWt;
          break;
        case 'other':
          majorWt = otherWt;
          break;
      }
      studentData[1][6] = majorWt * weights[5];
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
          countryWt = euroWt;
          break;
        case 'other':
          countryWt = elseWt;
          break;
      }
      studentData[1][7] = countryWt * weights[6];
      updateResult();
    }
  });

  $("#rec1-dropdown").selectmenu({
    change: function(event, ui) {
      let rec1Wt = 0;
      switch ($("#rec1-dropdown").val()) {
        case 'rec1top5Wt':
          rec1Wt = rec1top5Wt;
          break;
        case 'rec1top10Wt':
          rec1Wt = rec1top10Wt;
          break;
        case 'rec1top20Wt':
          rec1Wt = rec1top20Wt;
          break;
        case 'rec1top50Wt':
          rec1Wt = rec1top50Wt;
          break;
      }
      studentData[1][8] = rec1Wt * weights[7];
      updateResult();
    }
  });

  $("#rec2-dropdown").selectmenu({
    change: function(event, ui) {
      let rec2Wt = 0;
      switch ($("#rec2-dropdown").val()) {
        case 'rec2top5Wt':
          rec2Wt = rec2top5Wt;
          break;
        case 'rec2top10Wt':
          rec2Wt = rec2top10Wt;
          break;
        case 'rec2top20Wt':
          rec2Wt = rec2top20Wt;
          break;
        case 'rec2top50Wt':
          rec2Wt = rec2top50Wt;
          break;
      }
      studentData[1][10] = rec2Wt * weights[9];
      updateResult();
    }
  });

  $("#rec3-dropdown").selectmenu({
    change: function(event, ui) {
      let rec3Wt = 0;
      switch ($("#rec3-dropdown").val()) {
        case 'rec3top5Wt':
          rec3Wt = rec3top5Wt;
          break;
        case 'rec3top10Wt':
          rec3Wt = rec3top10Wt;
          break;
        case 'rec3top20Wt':
          rec3Wt = rec3top20Wt;
          break;
        case 'rec3top50Wt':
          rec3Wt = rec3top50Wt;
          break;
      }
      studentData[1][12] = rec3Wt * weights[11];
      updateResult();
    }
  });

  // $("#rec1rank-input").change(function() {
  //   $("#rec1rank-slider").slider("value", 1000 - $("#rec1rank-input").val());
  //   updateResult();
  // });
  // $("#rec1rank-input").val(1000 - vals[8]);

  $("#rec1rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec1rank-data").text((1000 - ui.value))
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[8],
    step: 1,
    change: function(event, ui) {
      studentData[1][9] = ui.value * weights[8];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      updateResult();
    }
  });

  // $("#rec2rank-input").change(function() {
  //   $("#rec2rank-slider").slider("value", 1000 - $("#rec2rank-input").val());
  //   updateResult();
  // });
  // $("#rec2rank-input").val(1000 - vals[10]);

  $("#rec2rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec2rank-data").text((1000 - ui.value))
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[10],
    step: 1,
    change: function(event, ui) {
      studentData[1][11] = ui.value * weights[10];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      updateResult();
    }
  });



  // $("#rec3rank-input").change(function() {
  //   $("#rec3rank-slider").slider("value", 1000 - $("#rec3rank-input").val());
  //   updateResult();
  // });
  // $("#rec3rank-input").val(1000 - vals[12]);

  $("#rec3rank-slider").slider({
    // options
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rec3rank-data").text((1000 - ui.value))
    },
    range: "min",
    min: 0,
    max: 999,
    value: vals[12],
    step: 1,
    change: function(event, ui) {
      studentData[1][13] = ui.value * weights[12];
      updateResult();
    }
  });

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
      studentData[1][14] = ui.value * weights[13];
      updateResult();
    }
  });

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
      studentData[1][15] = ui.value * weights[14];
      updateResult();
    }
  });

  function updateResult() {
    // var totalScore = studentData[1][1] + studentData[1][2] + studentData[1][3] + studentData[1][4] + studentData[1][5] + studentData[1][6] + studentData[1][7] + studentData[1][8] + studentData[1][9] + studentData[1][10] + studentData[1][11];
    var totalScore = 0;
    for (var i = 1; i < studentData[1].length; i++) {
      totalScore += studentData[1][i];
    }
    // console.log(totalScore);

    // Loading animation
    $("#result").css('opacity', 1).animate({
      opacity: 0
    }, 0.1, function() {
      $(".loader").css('visibility', 'visible');
      setTimeout(function() {
        $(".loader").css('visibility', 'hidden');
        if (totalScore >= threshold) {
          $("#result").text("Admission accepted.");
          $("#result").css("color", "green");
        } else {
          $("#result").text("Admission rejected.");
          $("#result").css("color", "red");
        }
        $("#result").css('opacity', 0).animate({
          opacity: 1
        }, 200);
      }, 500);
    });

  }

});
