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
  // Categorical variables -- weights
  var
    // Institution Rank weights
    tier1Wt = 0.5,
    tier2Wt = 0.30693782874,
    tier3Wt = 0,
    // major weights
    csceWt = 1.5594831748,
    stemWt = 0.30693782874,
    otherWt = 0,
    // country weights
    usaWt = 0,
    asiaWt = 1.03588023043,
    euroWt = 0.48266027481,
    elseWt = 0.513354407198,
    // recommendation weights
    rec1strong = 2.00627220247,
    rec1average = 1.11329686474,
    rec1weak = 0,
    rec2strong = 2.00627220247,
    rec2average = 1.11329686474,
    rec2weak = 0,
    rec3strong = 2.00627220247,
    rec3average = 1.11329686474,
    rec3weak = 0


  var weights = [
    0.114911184251 // GRE-verb
    , 0.0880320310069 // GRE-quant
    , 0.2926697271 // GRE-write
    , 1.584509831 // GPA
    , 1 // Inst-Rank
    , 1 // Major
    , 1 // Country of origin
    , 0.756277254266 // Personal Statement
    , 0.317935719456 // Diversity score
    , 1 // Recommendation letter 1
    , 1 // Recommendation letter 2
    , 1 // Recommendation letter 3
    , 0.03643092126893 // Mystery 1
    , -0.0363152813703 // Mystery 2
    , 0.000109465199226 // Mystery 3
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
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Major', 'Country', 'PS', 'Diversity', 'Rec1', 'Rec2', 'Rec3', 'Mystery1', 'Mystery2', 'Mystery3'],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  for (var i = 0; i < studentData[1].length-1; i++) {
    studentData[1][i + 1] = vals[i] * weights[i];
  }

  // Original threshold
  var original_threshold = 42.962524 - 130 * weights[0] - 130 * weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[13] - weights[14] //threshold needs to minus weight of PS/ diversity?

  var low_threshold = 37.962524 - 130 * weights[0] - 130 * weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[13] - weights[14] //threshold needs to minus weight of PS/ diversity?
  var high_threshold = 47.962524 - 130 * weights[0] - 130 * weights[1] + 0.622140334514 + 0.805488066489 + 0.742740758554 + 0.875925686442 + 0.513354407198 - weights[13] - weights[14] //threshold needs to minus weight of PS/ diversity?

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
      updateResult();
    }
  });

  // $("#mystery1-input").change(function() {
  //   $("#mystery1-slider").slider("value", 1000 - $("#mystery1-input").val());
  //   updateResult();
  // });
  // $("#mystery1-input").val(1000 - vals[8]);

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
      studentData[1][13] = ui.value * weights[12];
      //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
      updateResult();
    }
  });

  // $("#mystery2-input").change(function() {
  //   $("#mystery2-slider").slider("value", 1000 - $("#mystery2-input").val());
  //   updateResult();
  // });
  // $("#mystery2-input").val(1000 - vals[10]);

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
      updateResult();
    }
  });



  // $("#mystery3-input").change(function() {
  //   $("#mystery3-slider").slider("value", 1000 - $("#mystery3-input").val());
  //   updateResult();
  // });
  // $("#mystery3-input").val(1000 - vals[12]);

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
      studentData[1][15] = ui.value * weights[14];
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
      studentData[1][8] = ui.value * weights[7];
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
      studentData[1][9] = ui.value * weights[8];
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
        if (totalScore >= high_threshold) {
          $("#result").text("Likely accepted");
          $("#result").css("color", "green");
        } else if (totalScore >= original_threshold && totalScore < high_threshold){
          $("#result").text("Probably accepted");
          $("#result").css("color", "LimeGreen ");
        } else if (totalScore >= low_threshold && totalScore < original_threshold){
          $("#result").text("Probably rejected");
          $("#result").css("color", "crimson ");
        } else {
          $("#result").text("Likely rejected");
          $("#result").css("color", "red");
        }
        $("#result").css('opacity', 0).animate({
          opacity: 1
        }, 200);
      }, 500);
    });

  }

});
